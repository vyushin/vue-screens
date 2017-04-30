import VueScreens       from './components/VueScreens';
import VueScreen        from './components/VueScreen';
import Store            from './store';
import util             from './util';

const VueScreensPlugin = {

    /**
     * Function of Vue.js framework. Will be called for initialization vue-screens
     * @param {Vue} Vue
     * @param {Object} developerOptions
     * @return {Void}
     */
    install(Vue, developerOptions) {
        util.logger.info('Start installation vue-screen plugin');
        if (util.isTrue(this.installed)) {
            util.logger.warn('VueScreens has already installed');
            return false;
        }

        this.mergeOptions(developerOptions);
        this.registerVuexStore(Vue);
        this.registerVueComponents(Vue);
    },

    /**
     * There are default configuration of vue-screens
     */
    defaultOptions: {
        Store: null,
        Route: null,
        smartWheel: true,
        containerTagName: 'vue-screens',
        screenTagName: 'vue-screen',
        direction: 'vertical'
    },

    /**
     * List of options which can be changed in Data ot Vuex state
     */
    reactiveOptions: ['smartWheel'],

    /**
     * There will be saved merged configuration between defaultOptions and developerOptions
     */
    options: {},

    /**
     * Plugin state. There sill be saved result of operations
     */
    state: {
        vuexModuleInstalled: null
    },

    /**
     * Merging defaultOptions and developerOptions and save new object in options
     * @param {Object} userOptions
     */
    mergeOptions(developerOptions) {
        util.logger.info('Merge developer options');
        this.options = util.extend(this.defaultOptions, developerOptions);
    },

    /**
     * Register Vue Global components
     * @return {Void}
     */
    registerVueComponents(Vue) {
        util.logger.info('Register Vue components');
        Vue.component(this.options.containerTagName, VueScreens),
        Vue.component(this.options.screenTagName, VueScreen);
    },

    /**
     * Register Vuex module or Data
     * @return {Void}
     */
    registerVuexStore(Vue) {
        util.logger.info('Looking for Vuex Store');
        if (util.isNotNull(this.options.Store)) {
            if (util.isFunction(this.options.Store.registerModule)) {
                util.logger.info('Register VueScreens Vuex module');
                Vue.set(Store.state, 'options', util.filterByKeys(this.options, this.reactiveOptions));
                this.options.Store.registerModule('VueScreens', Store);
                this.state.vuexModuleInstalled = true;
            } else {
                util.logger.error('Vuex Store is incorrect or not Vuex instance');
                this.state.vuexModuleInstalled = false;
            }
        } else {
            util.logger.info(`Vuex Store not found`);
            this.state.vuexModuleInstalled = false;
        }
    }
};

export default VueScreensPlugin;