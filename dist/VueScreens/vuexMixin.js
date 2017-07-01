/**
 * Methods for VUEX which override default methods of index.js of vue-screens plugin
 */

import * as CONSTANTS from './store/constants';
import util from './util';

const SHORT_NAMES = CONSTANTS.getWithoutNamespaces();

const VuexMixin = {
    /**
     * @override
     */
    [SHORT_NAMES.VS_SHUFFLE]() {
        this.initialOptions.Store.dispatch(CONSTANTS.VS_SHUFFLE);
    },
    /**
     * @override
     */
    [SHORT_NAMES.VS_GET_SCREENS]() {
        return this.initialOptions.Store.getters[CONSTANTS.VS_GET_SCREENS];
    },
    /**
     * @override
     */
    [SHORT_NAMES.VS_ADD_SCREEN](screens) {
        this.initialOptions.Store.commit(
            CONSTANTS.VS_ADD_SCREEN,
            screens
        );
    },
    /**
     * @override
     */
    [SHORT_NAMES.VS_REPLACE_SCREENS](screens) {
        this.initialOptions.Store.commit(CONSTANTS.VS_REPLACE_SCREENS, screens);
    },
    /**
     * @override
     */
    [SHORT_NAMES.VS_GET_OPTIONS]() {
        return this.initialOptions.Store.getters[CONSTANTS.VS_GET_OPTIONS];
    },
    /**
     * @override
     */
    [SHORT_NAMES.VS_SET_OPTIONS](options) {
        this.initialOptions.Store.commit(CONSTANTS.VS_SET_OPTIONS, options);
    },
    /**
     * @override
     */
    [SHORT_NAMES.VS_SET_ACTIVE_SCREEN](activeScreen) {
        this.initialOptions.Store.dispatch(CONSTANTS.VS_SET_ACTIVE_SCREEN, activeScreen);
    },

    /**
     * If Vuex is exist then the plugin saves public options into state, otherwise into data
     * @private
     * @return {Void}
     */
    _createPublicOptions() {
        util.logger.info(`Creating public options`);
        this.initialOptions.Store.commit(
            CONSTANTS.VS_SET_OPTIONS,
            util.filterByKeys(this.initialOptions, Object.keys(this.options))
        );
        this.options = this.initialOptions.Store.getters[CONSTANTS.VS_GET_OPTIONS];
    }
};
export default VuexMixin;