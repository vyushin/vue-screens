import Vue                  from 'vue';
import Store                from 'store';
import {App}                from 'components';
import {VueScreens}         from 'plugins';

Vue.use(VueScreens, {
    Store,
    smartWheel: true,
    screenTagName: 'screen'
});

let vm = new Vue({
    el: '#root',
    store: Store,
    components: {
        App
    }
});