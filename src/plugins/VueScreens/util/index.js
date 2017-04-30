/**
 * Helpers Collection
 */

import {extend, pickBy} from 'lodash';

const Util = {
    extend,

    /**
     * Checking value in array
     * @param {Array} arr
     * @param {*} val
     * @return {Boolean}
     */
    inArray(arr, val) {
        return arr.indexOf(val) !== -1;
    },

    /**
     * Filter object by key in array keys and returns new object
     * @param {Object} obj
     * @param {Array} keys
     * @return {Object}
     */
    filterByKeys(obj, keys) {
        return pickBy(obj, (item, key) => (this.inArray(keys, key)))
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isNull(some) {
        return some === null;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isNotNull(some) {
        return some !== null;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isTrue(some) {
        return some === true;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isFunction(some) {
        return typeof some === 'function';
    },

    /**
     * Plugin logger
     * @param {String} message
     */
    logger: (() => {
        let isDebug,
            prefix = `[vue-screens]`,
            issue = `Please, check your code or create an issue https://github.com/vyushin/vue-screens/issues`;
        if (process.env.NODE_ENV === 'debug') isDebug = true;
        return {
            info(message) {
                if (isDebug === true) console.info(`%c ${prefix}: ${message}`, 'color: blue');
            },
            warn(message) {
                console.warn(`%c ${prefix}: ${message}. ${issue}`, 'color: orange');
            },
            error(message) {
                console.error(`%c ${prefix}: ${message}. ${issue}`, 'color: red');
            }
        }
    })()
};

export default Util;