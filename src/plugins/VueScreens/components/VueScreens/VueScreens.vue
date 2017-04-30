<template>
    <div class="VueScreens" @wheel="handleWheel">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'VueScreens',
        data() {
            return {
                pluginOptions: null
            }
        },
        methods: {
            discoverDirection(event) {
                let xDirection = (event.wheelDeltaY < 0) ? 'down' : 'up',
                    yDirection = null;

                return (xDirection) ? xDirection : yDirection;
            },
            handleWheel(event) {
                let direction = this.discoverDirection(event);
                window.ts = this;
            }
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