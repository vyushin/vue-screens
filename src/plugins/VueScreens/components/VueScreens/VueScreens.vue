<template>
    <div class="VueScreens" @wheel="handleWheel">
        <slot></slot>
    </div>
</template>

<script>
    import VueScreensPlugin     from 'vsroot';
    import VueScreen            from '../VueScreen';
    import util                 from 'vsroot/util';

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
            childScreens() {
                let result =  this.$children.map((item) => {
                    return util.isTrue(item instanceof VueScreen.constructor) ? item : null;
                });
                return util.without(result, null);
            }
        },
        created() {
            util.logger.info(`Created VueScreens container with uid ${this._uid}`);
        },
        mounted() {
            util.logger.info(`Mounted VueScreens container with uid ${this._uid}`);
            this.checkChildren();
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