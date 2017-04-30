<template>
    <div class="VueScreens" @wheel="handleWheel">
        <slot></slot>
    </div>
</template>

<script>
    import VueScreensPlugin     from '../../index';
    import util                 from '../../util';

    export default {
        name: 'VueScreensPlugin-VueScreens',
        data() {
            return {}
        },
        methods: {
            discoverDirection(wheelDeltaX, wheelDeltaY) {
                return (wheelDeltaY < 0) ? 'down' : (wheelDeltaY !== 0 ? 'up' : null);
            },
            handleWheel(event) {
                let isSmartWheelEnabled = util.isTrue(this.pluginOptions.smartWheel),
                    direction;

                if (util.isTrue(isSmartWheelEnabled)) {
                    direction = this.discoverDirection(event.wheelDeltaX, event.wheelDeltaY);
                    if (util.isNotNull(direction)) util.logger.info(`Handle wheel ${direction}`);
                }
            }
        },
        computed: {
            pluginOptions() {
                let vuexModuleInstalled = util.isTrue(VueScreensPlugin.state.vuexModuleInstalled);
                return (vuexModuleInstalled) ? VueScreensPlugin.options : null;
            }
        },
        created() {

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