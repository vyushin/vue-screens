import Vue                      from 'vue';
import VueScreens               from './components/VueScreens';
import VueScreen                from './components/VueScreen';
import VueScreensStore          from './store';
import {VS_OPTIONS}             from './store/constants';
import util                     from './util';

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
         */
        initialOptions: {},

        /**
         * Public options (This options can be changed during application live)
         */
        options: {
            smartWheel: null,
            direction: null
        },

        /**
         * There will be saved screens data if Vuex is not defined
         */
        screens: []
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
            this.previewInstallation();

            util.logger.info(`Start installation vue-screen plugin`);
            this.createInitialOptions(developerOptions);
            this.registerVuexModule();
            this.registerVueComponents(Vue);
            this.createPublicOptions();
            this.createScreensGetters();

            util.logger.info(`Removing initialOptions, defaultOptions`);
            delete this.defaultOptions;

            util.logger.info(`VueScreens installed in ${util.logger.timeEnd('VueScreensPluginInstall')} ms`);
        },

        /**
         * Preview installation
         * @return {Void}
         */
        previewInstallation() {
            util.logger.info(`Preview installation`);
            if (util.isTrue(this.installed)) {
                util.logger.error(`VueScreens has already installed`);
            }
        },

        /**
         * Merging defaultOptions and developerOptions and save new object to initialOptions
         * @param {Object} developerOptions
         */
        createInitialOptions(developerOptions) {
            util.logger.info(`Creating initial options`);
            this.initialOptions = Object.assign(this.defaultOptions, developerOptions);
        },

        /**
         * If Vuex is exist then the plugin saves public options into state, otherwise into data
         * @return {Void}
         */
        createPublicOptions() {
            util.logger.info(`Creating public options`);
            if (util.isObject(this.initialOptions.Store) && util.isFunction(this.initialOptions.Store.commit)) {
                this.initialOptions.Store.commit(
                    VS_OPTIONS,
                    util.filterByKeys(this.initialOptions, Object.keys(this.options))
                );
                this.options = this.initialOptions.Store.getters[VS_OPTIONS];
            } else {
                this.options = util.filterByKeys(this.initialOptions, Object.keys(this.options));
            }
        },

        /**
         * Returns current list of screens
         * @see {createScreensGetters}
         * @return {Array}
         */
        getScreens() {},

        createScreensGetters() {
            util.logger.info(`Creating screens getters`);
            /**TODO*/
        },

        /**
         * Register Vue Global components
         * @return {Void}
         */
        registerVueComponents(Vue) {
            util.logger.info(`Register Vue components`);
            Vue.component(this.initialOptions.containerTagName, VueScreens);
            Vue.component(this.initialOptions.screenTagName, VueScreen);
        },

        /**
         * Register Vuex module or Data
         * @return {Void}
         */
        registerVuexModule() {
            util.logger.info(`Looking for Vuex Store`);
            if (util.isNotObject(this.initialOptions.Store)) {
                util.logger.info(`Vuex Store not found`); return void 0;
            }
            if (util.isNotFunction(this.initialOptions.Store.registerModule)) {
                util.logger.error(`Vuex Store is incorrect or not Vuex instance`); return void 0;
            }
            util.logger.info(`Register VueScreens Vuex module`);
            this.initialOptions.Store.registerModule(`VueScreens`, VueScreensStore);
        },

        /**
         * Returns VueScreen instances only from array
         * @param {Array} arr
         * @return {Array}
         */
        getVueScreenInstances(arr) {
            if (util.isNotArray(arr)) return [];
            let result =  arr.map((item) => {
                return util.isTrue(util.isString(item.tag) && item.tag.endsWith('VueScreen')) ? item : null;
            });
            return util.without(result, null);
        },

        /**
         * Checks for availability VueScreen components only
         * @param {Array} arr Array of Vue components
         * @return {Boolean||Void}
         */
        areVueScreenOnly(arr) {
            if (util.isNotArray(arr)) return void 0;
            let result =  arr.map((item) => {
                if (util.isUndefined(item.tag) && util.isTrue(/^\s*$/.test(item.text))) return true;
                if (util.isString(item.tag) && util.isTrue(item.tag.endsWith('VueScreen'))) return true;
                return null;
            });
            return util.without(result, null).length === arr.length;
        }
    }
});

export default VueScreensPlugin;