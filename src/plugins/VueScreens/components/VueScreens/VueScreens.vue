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
            handleWheel(event) {
                let direction = (event.wheelDeltaY < 0) ? 'down' : 'up';
                window.ts = this;
            },
            scrollTo() {
                let scrollingEl = window.document.scrollingElement;

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