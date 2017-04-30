<template>
    <div class="VueScreen">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'VueScreensPlugin-VueScreen',
        props: {
            name: {
                type: String,
                default: '',
                required: false
            }
        },
        data() {
            return {}
        }
    }
</script>

<style>
    .VueScreen {
        box-sizing: border-box;
        height: 100vh;
        overflow: hidden;
        padding: 3vh;
        width: 100%;
    }
</style>