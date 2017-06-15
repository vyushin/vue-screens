<script>
    import VSP                  from 'vsroot';
    import VueScreen            from '../VueScreen';
    import * as CONSTANTS       from '../../store/constants';
    import util                 from 'vsroot/util';
    import SmartWheelMixin      from './smartwheel.mixin.js';

    const SHORT_NAMES = CONSTANTS.getWithoutNamespaces();

    export default {
        name: `VueScreensPlugin`,
        mixins: [SmartWheelMixin],
        data() {
            //window.container = this;
            return {
                screens: []
            }
        },
        methods: {
            discoverDirection(wheelDeltaX, wheelDeltaY) {
                return (wheelDeltaY < 0) ? `down` : (wheelDeltaY !== 0 ? `up` : null);
            },
            handleWheel(event) {
                let direction = this.discoverDirection(event.wheelDeltaX, event.wheelDeltaY);
                if (util.isNotNull(direction)) util.logger.info(`Handle wheel ${direction}`);
                if (util.isTrue(VSP[SHORT_NAMES.VS_GET_OPTIONS]().smartWheel) && util.isFalse(event.ctrlKey)) {
                    event.preventDefault();
                    this.smartWheel(direction)
                };
            },
            hasActiveScreen() {
                let vueScreenInstances;
                if (util.isNotNull(this.$slots.default)) {
                    vueScreenInstances = VSP._getVueScreenInstances(this.$slots.default);
                    return util.inArray(vueScreenInstances.map((screen) => (screen.componentOptions.propsData.active === `true`)), true);
                }
            }
        },
        computed: {
            VSP: () => VSP,
            scrollingElement: () => VSP.initialOptions.scrollingElement
        },
        created() {
            util.logger.info(`Created VueScreens container with uid ${this._uid}`);
        },
        beforeMount() {
            let areVueScreensOnly = VSP._areVueScreenOnly(this.$slots.default),
                vueScreenInstances = VSP._getVueScreenInstances(this.$slots.default);

            if (util.isTrue(areVueScreensOnly)) {
                vueScreenInstances.forEach((screen, key) => {
                    if (util.isFalse(this.hasActiveScreen()) && key === 0) {
                        screen.componentOptions.propsData.active = `true`;
                    }
                    VSP.addScreen(screen);
                });
                this.$slots.default = null;
            } else {
                util.logger.error(`<${VSP.initialOptions.containerTagName}> tag must contains <${VSP.initialOptions.screenTagName}> tags only`);
                delete this.$slots.default;
            }
        },
        mounted() {
            util.logger.info(`Mounted VueScreens container with uid ${this._uid}`);
        },
        updated() {
            util.logger.info(`Updated VueScreens container with uid ${this._uid}`);
        },
        destroyed() {
            util.logger.info(`Destroyed VueScreens container with uid ${this._uid}`);
        },
        render(createElement) {
            util.logger.info(`Render VueScreens container with uid ${this._uid}`);
            VSP.getScreens().forEach((item, index) => item.key = index);
            return createElement(
                'div',
                {
                    on: {
                        wheel: this.handleWheel
                    },
                    class: 'VueScreens'
                },
                VSP.getScreens()
            )
        }
    }
</script>

<style>
    .VueScreens {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        width: 100%;
    }
</style>