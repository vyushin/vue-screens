<script>
    import VSP          from 'vsroot';
    import VueScreen    from '../VueScreen';
    import util         from 'vsroot/util';

    export default {
        name: `VueScreensPlugin`,
        data() {
            window.container = this;
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
                if (util.isTrue(VSP.options.smartWheel)) {
                }
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
            VSP: () => VSP
        },
        created() {
            util.logger.info(`Created VueScreens container with uid ${this._uid}`);
        },
        beforeMount() {
            let areVueScreensOnly = VSP._areVueScreenOnly(this.$slots.default),
                vueScreenInstances;

            if (util.isTrue(areVueScreensOnly)) {
                vueScreenInstances = VSP._getVueScreenInstances(this.$slots.default);
                vueScreenInstances.forEach((item) => {
                    VSP.addScreen(item);
                });
                this.$slots.default = null;
            } else if (util.isFalse(areVueScreensOnly)) {
                util.logger.error(`<${VSP.initialOptions.containerTagName}> tag must contains <${VSP.initialOptions.screenTagName}> tags only`);
                delete this.$slots.default;
            }
        },
        mounted() {
            util.logger.info(`Mounted VueScreens container with uid ${this._uid}`);
            this.checkChildren();
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