/**
 * Helper Collection
 */

import {pickBy, without} from 'lodash';

const Util = {
    without,

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
    isObject(some) {
        return some instanceof Object;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isNotObject(some) {
        return some instanceof Object === false;
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
    isFalse(some) {
        return some === false;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isFunction(some) {
        return typeof some === `function`;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isNotFunction(some) {
        return typeof some !== `function`;
    },

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
     * Scroll document
     * @param {String} scrollType. Can be 'Top' or 'Left'
     * @param {Number} to New scroll position
     * @return {Void}
     */
    scrollDocument(scrollType, to) {
        let scrollEl = document.scrollingElement;
        scrollEl[`scroll${scrollType}`] = to;
    },

    cache: (() => {
        let cache = {};
        return {
            get: (key) => (cache[key]),
            set: (key, val) => (cache[key] = val),
            del: (key) => (delete cache[key]),
            clear: () => (cache = {})
        };
    })(),

    /**
     * Call function 'act' until condition 'cond' is true by interval time
     * @param {Function} act Action
     * @param {Function} cond Condition
     * @param {Number} interval Interval with which act calls (ms)
     * @return {Number} intervalId
     */
    until(act, cond, interval) {
        let intervalId = setInterval(
            () => {(this.isTrue(cond())) ? act() : clearInterval(intervalId)},
            interval
        );
        return intervalId;
    },

    /**
     * Set interval
     * @param {Function} func
     * @param {Number} time
     * @return {Number} interval id
     */
    interval(func, time) {
        return setInterval(func, time);
    },

    /**
     * Plugin logger
     * @param {String} message
     */
    logger: (() => {
        let prefix = `[vue-screens]`,
            issue = `Please, check your code or create an issue https://github.com/vyushin/vue-screens/issues`,
            isDebug = process.env.NODE_ENV === `debug`;

        return {
            info(message) {
                if (isDebug === true) console.info(`%c ${prefix}: ${message}`, `color: blue`);
            },
            warn(message) {
                console.warn(`%c ${prefix}: ${message}. ${issue}`, `color: orange`);
            },
            error(message) {
                console.error(`%c ${prefix}: ${message}. ${issue}`, `color: red`);
            }
        }
    })()
};

export default Util;