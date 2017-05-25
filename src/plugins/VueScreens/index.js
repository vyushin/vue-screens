import Vue                                  from 'vue';
import VueScreens                           from './components/VueScreens';
import VueScreen                            from './components/VueScreen';
import VueScreensStore                      from './store';
import VuexMixin                            from './vuexMixin';
import * as CONSTANTS                       from './store/constants';
import util                                 from './util';

const SHORT_NAMES = CONSTANTS.getWithoutNamespaces();

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
            scrollingElement: (util.isObject(document)) ? document.scrollingElement : null,
            containerTagName: `vue-screens`,
            screenTagName: `screen`,
            direction: `v` // vertical
        },

        /**
         * There will be saved merged configuration between defaultOptions and developerOptions
         * @private
         */
        initialOptions: {},

        /**
         * There will be saved screens data if Vuex is not defined
         * @private
         */
        screens: [],

        /**
         * Public options (This options can be changed during application live)
         * @public
         */
        options: {
            smartWheel: null,
            direction: null
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

            util.logger.info(`VueScreens installed in ${util.logger.timeEnd('VueScreensPluginInstall')} ms`);
            /*
            window.VSP = this;
            window.screens = [];
            window.Vue = Vue;
            window.util = util;
            */
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
            this.initialOptions = Object.assign(this.defaultOptions, developerOptions);
        },

        /**
         * Checks Store exist in the plugin
         * @private
         * @return {Boolean}
         */
        _isStoreExist() {
            return util.isObject(this.initialOptions.Store)
                && util.isFunction(this.initialOptions.Store.registerModule)
                && util.isObject(this.initialOptions.Store)
                && util.isFunction(this.initialOptions.Store.commit);
        },

        /**
         * If Vuex is exist then the plugin saves public options into state, otherwise into data
         * @private
         * @return {Void}
         */
        _createPublicOptions() {
            /**@TODO*/
            util.logger.info(`Creating public options`);
            this.options = util.filterByKeys(this.initialOptions, Object.keys(this.options));
        },

        /**
         * Register Vue Global components
         * @private
         * @return {Void}
         */
        _registerVueComponents(Vue) {
            util.logger.info(`Register Vue components`);
            Vue.component(this.initialOptions.containerTagName, VueScreens);
            Vue.component(this.initialOptions.screenTagName, VueScreen);
        },

        /**
         * Register Vuex module or Data
         * @private
         * @return {Void}
         */
        _registerVuexModule() {
            util.logger.info(`Looking for Vuex Store`);
            if (util.isNotObject(this.initialOptions.Store)) {
                util.logger.info(`Vuex Store not found`); return void 0;
            }
            if (util.isNotFunction(this.initialOptions.Store.registerModule)) {
                util.logger.error(`Vuex Store is incorrect or not Vuex instance`); return void 0;
            }
            util.logger.info(`Register VueScreens Vuex module`);
            this.initialOptions.Store.registerModule(`VueScreens`, VueScreensStore);

            util.logger.info(`Override plugin methods to Vuex methods`);
            Object.assign(this, VuexMixin);
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

        // PUBLIC

        /**
         * @public
         */
        [SHORT_NAMES.VS_SHUFFLE]() {
            this.replaceScreens(util.shuffle(this.getScreens()))
        },

        /**
         * @public
         */
        [SHORT_NAMES.VS_GET_SCREENS]() {
            return this.screens;
        },

        /**
         * @public
         */
        [SHORT_NAMES.VS_ADD_SCREEN](screens) {
            this.screens.push(screens);
        },

        /**
         * @public
         */
        [SHORT_NAMES.VS_REPLACE_SCREENS](screens) {
            this.screens = screens;
        }
    }
});

export default VueScreensPlugin;