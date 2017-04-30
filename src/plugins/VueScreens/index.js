import LandingShell     from './components/VueScreens';
import LandingScreen    from './components/VueScreen';
import Store            from './store';
import util             from './util';

const VueScreens = {

    defaultOptions: {
        Store: null,
        Route: null,
        wheel: true,
        containerTagName: 'vue-screens',
        screenTagName: 'vue-screen',
        direction: 'horisontal'
    },

    options: null,

    defaultState: {

    },

    mergeOptions(options) {
        this.options = util.extend(this.defaultOptions, options);
    },

    registerVueComponents(Vue) {
        let pluginOptions = this.options;

        Vue.component(this.options.containerTagName, LandingShell);
        Vue.component(this.options.screenTagName, LandingScreen);
    },

    registerVuexModule(Vue) {
        if (util.isNotNull(this.options.Store)) {
            this.options.Store.registerModule('VueScreens', Store);
        }
    },

    install: function(Vue, options) {
        if (util.isTrue(this.installed)) {
            Vue.util.warn('VueScreens has already installed');
            return false;
        }

        this.mergeOptions(options);
        this.registerVueComponents(Vue);
        this.registerVuexModule(Vue);
    }
};

export default VueScreens;