<template>
    <div class="VueScreen">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'VueScreen',
        data() {
            return {

            }
        }
    }
</script>

<style>
    .VueScreen {
        box-sizing: border-box;
        height: 100vh;
        padding: 3vh;
        width: 100%;
    }
</style>