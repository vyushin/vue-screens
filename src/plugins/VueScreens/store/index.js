import util             from '../util';
import {VS_OPTIONS,
        VS_SCREENS,
        VS_RM_SCREENS}  from './constants';

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
         * @param {Array} screens
         */
        [VS_SCREENS](state, screens) {
            state.screens = screens;
        },
        [VS_RM_SCREENS](state) {

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