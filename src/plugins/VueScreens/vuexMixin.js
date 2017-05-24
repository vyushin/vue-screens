/**
 * Methods for VUEX
 */

import * as CONSTANTS from './store/constants';

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
    }
};
export default VuexMixin;