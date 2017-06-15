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
            smartScroll: true,
            scrollSpeed: 0,
            scrollCoefficient: 0.03,
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
         * @private
         */
        options: {
            smartWheel: null,
            smartScroll: null,
            scrollCoefficient: null
        }
    },
    methods: {
        /**
         * Function of Vue.js framework. Will be called for initialization vue-screens
         * @private
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

            window.VSP = this;
            window.screens = [];
            window.Vue = Vue;
            window.util = util;
            window.Vue = Vue;

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
            /**
             * Override methods
             */
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

        /**
         * Save body sizes into cache
         * @return {Void}
         */
        _cacheBodySizes() {
            util.cache.set('bodySizes', {
                height: window.document.body.offsetHeight,
                width: window.document.body.offsetWidth
            });
        },

        _bodySizesChangeHandler() {
            let bodySizes = util.cache.get('bodySizes'),
                body = window.document.body;

            if (bodySizes.width !== body.offsetWidth) {
                this._cacheBodySizes();
                /** @TODO*/
            }
        },

        _runBodySizesObserver() {
            let zoomObserverIntervalId = util.cache.get('bodySizesIntervalId');
            if (util.isNotUndefined(zoomObserverIntervalId)) clearInterval(zoomObserverIntervalId);
            util.cache.set('bodySizesIntervalId', setInterval(this._bodySizesChangeHandler, 0));
            /** @TODO*/
        },

        // PUBLIC

        /**
         * @public
         */
        [SHORT_NAMES.VS_GET_OPTIONS]() {
            return this.options;
        },

        /**
         * @public
         */
        [SHORT_NAMES.VS_SET_OPTIONS](options) {
            this.options = Object.assign({},  this.options, options);
        },

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
        },

        /**
         * @public
         */
        [SHORT_NAMES.VS_SET_ACTIVE_SCREEN](activeScreenIndex) {
            this.screens.forEach((screen, index) => {
                (index === activeScreenIndex) ? screen.componentInstance.isActive = `true` : screen.componentInstance.isActive = `false`;
            });
        },

        /**
         * @public
         * @return {Object|Undefined}
         */
        getActiveScreen() {
            let screens = this[SHORT_NAMES.VS_GET_SCREENS](),
                result;

            screens.forEach((screen, index) => {
                if (screen.componentInstance.isActive === `true`) {
                    if (util.isNotUndefined(result)) util.logger.error(`Detected 2 or more active screen`);
                    result = {screen: screen, index: index};
                }
            });
            return result;
        },

        /**
         * Returns index of screen that the most visible on viewport
         * @public
         * @return {Object}
         */
        getTheMostVisibleScreen() {
            let screens = this[SHORT_NAMES.VS_GET_SCREENS](),
                viewport = this.initialOptions.scrollingElement,
                result;

            return result;
        },

        /**
         * Returns offsetTop and offsetLeft positions of screen
         * @public
         * @param {Object} screen
         * @return {Array}
         */
        getScreenOffset(screen) {
            return {
                top: screen.componentInstance.$el.offsetTop,
                bottom: screen.componentInstance.$el.offsetTop + screen.componentInstance.$el.offsetHeight,
                left: screen.componentInstance.$el.offsetLeft,
                right: screen.componentInstance.$el.offsetLeft + screen.componentInstance.$el.offsetWidth,
                vMiddle: screen.componentInstance.$el.offsetTop + screen.componentInstance.$el.offsetHeight / 2,
                hMiddle: screen.componentInstance.$el.offsetLeft + screen.componentInstance.$el.offsetWidth / 2
            }
        }
    }
});

export default VueScreensPlugin;