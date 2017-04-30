import util from '../util';
import {VUE_SCREENS_OPTIONS} from './constants';

export default {
    state: {
        options: {}
    },
    mutations: {
        [VUE_SCREENS_OPTIONS](state, options) {
            state.options = Object.assign(state.options, options);
        }
    },
    getters: {
        [VUE_SCREENS_OPTIONS]: (state) => (state.options)
    },
    actions: {}
}