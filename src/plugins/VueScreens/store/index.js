import util                 from '../util';
import {VS_OPTIONS,
         VS_SCREENS,
          VS_RM_SCREENS,
           VS_ADD_SCREEN,
            VS_SHUFFLE}     from './constants';

export default {
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
        [VS_OPTIONS](state, options) {
            state.options = Object.assign(state.options, options);
        },
        /**
         * Add screens of vue-screens plugin
         * @param {Object} state State of VUEX
         * @param {Array|Object} screens
         */
        [VS_ADD_SCREEN](state, screens) {
            if (util.isObject(screens)) {
                state.screens.push(screens);
            } else if (util.isArray(screens)) {
                //TODO
                state.screens = screens;
            }
        },
        [VS_RM_SCREENS](state) {

        },
        [VS_SHUFFLE](state) {
            state.screens = util.shuffle(state.screens).map((item, index) => {
                item.key = index;
                return item;
            });
        }
    },
    getters: {
        /**
         * Returns public options of vue-screens plugin from state
         * @return {Object}
         */
        [VS_OPTIONS]: (state) => (state.options),
        /**
         * Returns screens of vue-screens plugin from state
         * @return {Array} Array of objects
         */
        [VS_SCREENS]: (state) => (state.screens)
    },
    actions: {}
}