<template>
    <div :class="`VueScreen ${(className !== void 0) ? className : ''}`">
        <slot></slot>
    </div>
</template>

<script>
    import util from 'vsroot/util';
    export default {
        name: 'VueScreen',
        props: {
            className: String,
            active: {
                type: String,
                default: `false`,
                validator(value) {
                    let eNum = [`true`, `false`],
                        isValid = util.inArray(eNum, value);
                    if (util.isFalse(isValid)) util.logger.error(`Possible values for "active" property are [${eNum}]`);
                    return isValid;
                }
            }
        },
        data() {
            return {
                isActive: `false`
            }
        },
        created() {
            this.isActive = this.active;
            util.logger.info(`Created VueScreen component with uid ${this._uid}`);
        },
        mounted() {
            util.logger.info(`Mounted VueScreen component with uid ${this._uid}`);
        },
        updated() {
            util.logger.info(`Updated VueScreen component with uid ${this._uid}`);
        },
        destroyed() {
            util.logger.info(`Destroyed VueScreen component with uid ${this._uid}`);
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