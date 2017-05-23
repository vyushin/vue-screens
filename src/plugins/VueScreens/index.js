import Vue                          from 'vue';
import VueScreens                   from './components/VueScreens';
import VueScreen                    from './components/VueScreen';
import VueScreensStore              from './store';
import VuexMixin                    from './vuexMixin';
import {VS_OPTIONS,
         VS_SCREENS,
          VS_ADD_SCREEN,
           VS_SHUFFLE}              from './store/constants';
import util                         from './util';

/**
 * Vue-Screens Plugin for Vue.js 2+
 * [GitHub]{@link https://github.com/vyushin/vue-screens}
 * [Demo]{@link https://vyushin.github.io/vue-screens/}
 * [License]{@link https://github.com/vyushin/vue-screens/blob/master/LICENSE}
 */
const VueScreensPlugin = new Vue({
    data: {
        /**
         * There are default configuration of vue-screens
         * @private
         */
        defaultOptions: {
            Store: null,
            Route: null,
            smartWheel: true,
            containerTagName: `vue-screens`,
            screenTagName: `screen`,
            direction: `v` // vertical
        },

        /**
         * There will be saved merged configuration between defaultOptions and developerOptions
         * @private
         */
        _initialOptions: {},

        /**
         * Public options (This options can be changed during application live)
         * @public
         */
        options: {
            smartWheel: null,
            direction: null
        },

        /**
         * There will be saved screens data if Vuex is not defined
         * @private
         */
        $screens: []
    },
    computed: {
        screens: {
            get() {
                return this.$screens;
            },
            set(screen) {
                let newScreenKey;
                if (util.isNotObject(screen)) {
                    util.logger.error(`Screen most be an object that add it`);
                    return void 0;
                }
                newScreenKey = this.$screens.length;
                this.$screens.push(Object.assign(screen, {key: newScreenKey}))
            }
        }
    },
    methods: {
        /**
         * Function of Vue.js framework. Will be called for initialization vue-screens
         * @param {Vue} Vue
         * @param {Object} developerOptions
         * @return {Void}
         */
        install(Vue, developerOptions) {
            util.logger.time('VueScreensPluginInstall');
            this._previewInstallation();

            util.logger.info(`Start installation vue-screen plugin`);
            this._createInitialOptions(developerOptions);
            this._registerVuexModule();
            this._registerVueComponents(Vue);
            this._createPublicOptions();
            this._createScreensGetters();

            util.logger.info(`VueScreens installed in ${util.logger.timeEnd('VueScreensPluginInstall')} ms`);
            window.VSP = this;
            window.screens = [];
            window.Vue = Vue;
            window.util = util;
        },

        /**
         * Preview installation
         * @private
         * @return {Void}
         */
        _previewInstallation() {
            util.logger.info(`Preview installation`);
            if (util.isTrue(this.installed)) {
                util.logger.error(`VueScreens has already installed`);
            }
        },

        /**
         * Merging defaultOptions and developerOptions and save new object to initialOptions
         * @private
         * @param {Object} developerOptions
         */
        _createInitialOptions(developerOptions) {
            util.logger.info(`Creating initial options`);
            console.log(111, this.defaultOptions)
            this._initialOptions = Object.assign(this.defaultOptions, developerOptions);
        },

        /**
         * Checks Store exist in the plugin
         * @private
         * @return {Boolean}
         */
        _isStoreExist() {
            return util.isObject(this._initialOptions.Store)
                && util.isFunction(this._initialOptions.Store.registerModule)
                && util.isObject(this._initialOptions.Store)
                && util.isFunction(this._initialOptions.Store.commit);
        },

        /**
         * If Vuex is exist then the plugin saves public options into state, otherwise into data
         * @private
         * @return {Void}
         */
        _createPublicOptions() {
            util.logger.info(`Creating public options`);
            if (this._isStoreExist()) {
                this._initialOptions.Store.commit(
                    VS_OPTIONS,
                    util.filterByKeys(this._initialOptions, Object.keys(this.options))
                );
                this.options = this._initialOptions.Store.getters[VS_OPTIONS];
            } else {
                this.options = util.filterByKeys(this._initialOptions, Object.keys(this.options));
            }
        },

        /**
         * If Vuex exists it will ne use its getter
         * @pivate
         * @return {Void}
         */
        _createScreensGetters() {
            util.logger.info(`Creating screens getters`);
            if (this._isStoreExist()) {
                this.screens = this._initialOptions.Store.getters[VS_SCREENS];
            }
        },

        /**
         * Register Vue Global components
         * @private
         * @return {Void}
         */
        _registerVueComponents(Vue) {
            util.logger.info(`Register Vue components`);
            Vue.component(this._initialOptions.containerTagName, VueScreens);
            Vue.component(this._initialOptions.screenTagName, VueScreen);
        },

        /**
         * Register Vuex module or Data
         * @private
         * @return {Void}
         */
        _registerVuexModule() {
            util.logger.info(`Looking for Vuex Store`);
            if (util.isNotObject(this._initialOptions.Store)) {
                util.logger.info(`Vuex Store not found`); return void 0;
            }
            if (util.isNotFunction(this._initialOptions.Store.registerModule)) {
                util.logger.error(`Vuex Store is incorrect or not Vuex instance`); return void 0;
            }
            util.logger.info(`Register VueScreens Vuex module`);
            this._initialOptions.Store.registerModule(`VueScreens`, VueScreensStore);
            VuexMixin.employ(this, this._initialOptions.Store);
        },

        /**
         * Returns VueScreen instances only from array
         * @private
         * @param {Array} arr
         * @return {Array}
         */
        _getVueScreenInstances(arr) {
            if (util.isNotArray(arr)) return [];
            let result =  arr.map((item) => {
                return util.isTrue(util.isString(item.tag) && item.tag.endsWith('VueScreen')) ? item : null;
            });
            return util.without(result, null);
        },

        /**
         * Checks for availability VueScreen components only
         * @private
         * @param {Array} arr Array of Vue components
         * @return {Boolean||Void}
         */
        _areVueScreenOnly(arr) {
            if (util.isNotArray(arr)) return void 0;
            let result =  arr.map((item) => {
                if (util.isUndefined(item.tag) && util.isTrue(/^\s*$/.test(item.text))) return true;
                if (util.isString(item.tag) && util.isTrue(item.tag.endsWith('VueScreen'))) return true;
                return null;
            });
            return util.without(result, null).length === arr.length;
        },

        //PUBLIC

        /**
         * Shuffle screens
         * @public
         * @return {Void}
         */
        shuffleScreens() {
            (this._isStoreExist()) ? this._initialOptions.Store.commit(VS_SHUFFLE) : this.screens = util.shuffle(this.screens);
        },

        /**
         * Register screen in VueScreens data or Vuex State
         * @public
         * @param {Object} screen
         * return {Void}
         */
        addScreen(screen) {
            let newScreenKey;
            if (util.isNotObject(screen)) {
                util.logger.error(`Screen most be an object that add it`);
                return void 0;
            }

            newScreenKey = this.screens.length;
            if (this._isStoreExist()) {
                this._initialOptions.Store.commit(
                    VS_ADD_SCREEN,
                    Object.assign(screen, {key: newScreenKey})
                );
            } else this.screens.push(Object.assign(screen, {key: newScreenKey}));
        },
    }
});

export default VueScreensPlugin;