<template>
    <div class="ls-Screen">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style>
    .ls-Screen {
        box-sizing: border-box;
        height: 100vh;
        padding: 3vh;
        width: 100%;
    }
</style>