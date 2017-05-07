<script>
    import VSP          from 'vsroot';
    import VueScreen    from '../VueScreen';
    import util         from 'vsroot/util';

    export default {
        name: `VueScreensPlugin`,
        data() {
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
            },
            checkChildren() {
                this.$children.forEach((item) => {
                    if (util.isFalse(item instanceof VueScreen.constructor)) {
                        util.logger.error(`Children of vue-screens container must be the instance of VueScreen only`);
                    }
                });
            }
        },
        computed: {
            VSP() {
                return VSP;
            },
            console() {
                return console;
            }
        },
        created() {
            util.logger.info(`Created VueScreens container with uid ${this._uid}`);

            let areVueScreensOnly = VSP._areVueScreenOnly(this.$slots.default),
                vueScreenInstances;

            if (util.isTrue(areVueScreensOnly)) {
                vueScreenInstances = VSP._getVueScreenInstances(this.$slots.default);
                vueScreenInstances.forEach((item) => {
                    VSP.addScreen(item);
                });
                this.$slots.default = null;
            } else if (util.isFalse(areVueScreensOnly)) {
                util.logger.error(`<${VSP._initialOptions.containerTagName}> tag must contains <${VSP._initialOptions.screenTagName}> tags only`);
                delete this.$slots.default;
            }
        },
        mounted() {
            util.logger.info(`Mounted VueScreens container with uid ${this._uid}`);
            this.checkChildren();
        },
        render(createElement) {
            window.ts = this;
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