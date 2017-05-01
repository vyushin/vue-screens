import Vue                      from 'vue';
import VueScreens               from './components/VueScreens';
import VueScreen                from './components/VueScreen';
import VueScreensStore          from './store';
import {VUE_SCREENS_OPTIONS}    from './store/constants';
import util                     from './util';

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
            this.previewInstallation();

            util.logger.info(`Start installation vue-screen plugin`);
            this.createInitialOptions(developerOptions);
            this.registerVuexModule();
            this.registerVueComponents(Vue);
            this.createPublicOptions();

            util.logger.info(`Removing initialOptions, defaultOptions`);
            delete this.initialOptions;
            delete this.defaultOptions;

            util.logger.info(`VueScreens installed`);
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

        createPublicOptions() {
            util.logger.info(`Creating public options`);
            if (util.isObject(this.initialOptions.Store) && util.isFunction(this.initialOptions.Store.commit)) {
                this.initialOptions.Store.commit(
                    VUE_SCREENS_OPTIONS,
                    util.filterByKeys(this.initialOptions, Object.keys(this.options))
                );
                this.options = this.initialOptions.Store.getters[VUE_SCREENS_OPTIONS];
            } else {
                this.options = util.filterByKeys(this.initialOptions, Object.keys(this.options));
            }
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
        }
    }
});

export default VueScreensPlugin;