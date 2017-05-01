<template>
    <div class="VueScreen">
        <slot></slot>
    </div>
</template>

<script>
    import util from 'vsroot/util';
    export default {
        name: 'VueScreen',
        props: {
            name: {
                type: String,
                default: '',
                required: false
            }
        },
        data() {
            return {}
        },
        created() {
            util.logger.info(`Created VueScreen component with uid ${this._uid}`);
        },
        mounted() {
            util.logger.info(`Mounted VueScreen component with uid ${this._uid}`);
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