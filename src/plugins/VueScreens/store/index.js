import util                 from '../util';
import * as CONSTANTS       from './constants';

const _CONSTANTS = {};
Object.keys(CONSTANTS).map(key => _CONSTANTS[key] = CONSTANTS[key].replace(/^VueScreens\//, ''));

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
        [_CONSTANTS.VS_OPTIONS](state, options) {
            state.options = Object.assign(state.options, options);
        },
        /**
         * Add screens of vue-screens plugin
         * @param {Object} state State of VUEX
         * @param {Array|Object} screens
         */
        [_CONSTANTS.VS_ADD_SCREEN](state, screens) {
            if (util.isObject(screens)) {
                state.screens.push(screens);
            } else if (util.isArray(screens)) {
                //TODO
                state.screens = screens;
            }
        },
        [_CONSTANTS.VS_RM_SCREENS](state) {

        },
        [_CONSTANTS.VS_SHUFFLE](state) {
            state.screens = util.shuffle(state.screens);
        }
    },
    getters: {
        /**
         * Returns public options of vue-screens plugin from state
         * @return {Object}
         */
        [_CONSTANTS.VS_OPTIONS]: (state) => (state.options),
        /**
         * Returns screens of vue-screens plugin from state
         * @return {Array} Array of objects
         */
        [_CONSTANTS.VS_SCREENS]: (state) => (state.screens)
    },
    actions: {}
}