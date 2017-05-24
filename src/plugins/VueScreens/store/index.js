import util                 from '../util';
import * as _CONSTANTS      from './constants';

const CONSTANTS = _CONSTANTS.getWithoutNamespaces();

export default {
    namespaced: true,
    state: {
        options: {},
        screens: []
    },
    mutations: {
        /**
         * Options of vue-screens plugin
         * @param {Object} state State of VUEX
         * @param {Array} options Some new options for vue-screens plugin
         */
        [CONSTANTS.VS_SET_OPTIONS](state, options) {
            state.options = Object.assign(state.options, options);
        },
        /**
         * Add screen of vue-screens plugin
         * @param {Object} state State of VUEX
         * @param {Array|Object} screens
         */
        [CONSTANTS.VS_ADD_SCREEN](state, screen) {
            state.screens.push(screen);
        },
        /**
         * Replace all of screens
         * @param {Object} state
         * @param {Array} screens Array of some new screens
         */
        [CONSTANTS.VS_REPLACE_SCREENS](state, screens) {
            state.screens = screens;
        },
        [CONSTANTS.VS_RM_SCREENS](state) {

        }
    },
    getters: {
        /**
         * Returns public options of vue-screens plugin from state
         * @return {Object}
         */
        [CONSTANTS.VS_GET_OPTIONS]: (state) => (state.options),
        /**
         * Returns screens of vue-screens plugin from state
         * @return {Array} Array of objects
         */
        [CONSTANTS.VS_GET_SCREENS]: (state) => (state.screens)
    },
    actions: {
        /**
         * Shuffle all screens by random order
         */
        [CONSTANTS.VS_SHUFFLE]({commit, state}) {
            commit(CONSTANTS.VS_REPLACE_SCREENS, util.shuffle(state.screens));
        }
    }
}