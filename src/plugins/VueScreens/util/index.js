/**
 * Helper Collection
 */

import {pickBy, without, flatten, shuffle, debounce} from 'lodash';

const Util = {
    without,
    flatten,
    shuffle,
    debounce,

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
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isUndefined(some) {
        return some === undefined;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isNotUndefined(some) {
        return some !== undefined;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isArray(some) {
        return some instanceof Array === true;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isNotArray(some) {
        return some instanceof Array === false;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isString(some) {
        return typeof some === `string`;
    },

    /**
     * Checking type
     * @param {*} some
     * @return {Boolean}
     */
    isVoid(some) {
        return some === void 0;
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
     * Call function 'action' until condition 'condition' returns true by animation frame with time interval
     * @param {Function} action
     * @param {Function} condition
     * @return {Promise}
     */
    until(action, condition) {
        let self = this;
        return new Promise((resolve, reject) => {
            let animationId = this.requestAnimationFrame(function step(timePassed) {
                if (self.isTrue(condition())) {
                    action(timePassed);
                    self.requestAnimationFrame(step);
                } else {
                    cancelAnimationFrame(animationId);
                    resolve();
                }
            });
        });
    },

    /**
     * Checking debug env
     * @return {Boolean}
     */
    isDebugEnv() {
        return process.env.NODE_ENV === `debug`;
    },

    /**
     * Logger that supports some levels and features (time, timeEnd)
     * @param {String} message
     */
    logger: (() => {
        let prefix = `[vue-screens]`,
            issue = `Please, check your code or create an issue https://github.com/vyushin/vue-screens/issues`,
            isDebug = process.env.NODE_ENV === `debug`,
            timers = {};

        return {
            info (message) {
                if (isDebug === true) console.info(`%c ${prefix}: ${message}`, `color: blue`);
            },
            warn(message) {
                console.warn(`%c ${prefix}: ${message}. ${issue}`, `color: orange`);
            },
            error(message) {
                console.error(`%c ${prefix}: ${message}. ${issue}`, `color: red`);
            },
            time(timerName) {
                if (isDebug === true) timers[timerName] = new Date().getTime();
            },
            timeEnd(timerName) {
                if (isDebug === true) return new Date().getTime() - timers[timerName];
            }
        }
    })(),

    /**
     * Checking support requestAnimationFrame and save it into util property requestAnimationFrame
     */
    requestAnimationFrame: (() => {
        let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        return (step) => {
            return requestAnimationFrame.call(window, step);
        }
    })(),

    /**
     * Each array with support "brake"
     * @param {Array} array
     * @param {Function} iterator
     * @return {Void}
     */
    each(array, iterator) {
        for (let i = 0; i < array.length; i++) {
            if (iterator(array[i], i) === 'break') break;
        }
    },

    /**
     * Emulate event.path property if event object of browser doesn't support it
     * @param {Event} event
     * @return {Array}
     */
    getPathFromEvent(event) {
        if (this.isArray(event.path)) return event.path;
        let result = [event.target],
            lastElement = event.target;
        while (lastElement.parentElement) {
            result.push(lastElement = lastElement.parentElement);
        }
        result.push(document);
        result.push(window);
        return result;
    },

    /**
     * Check existong scroll on DOM Element
     * @param {Object} el
     * @return {Boolean}
     */
    hasScroll(el) {
        /**@TODO Fixed has scroll conditional*/
        if (el.scrollTop > 0) return true;
        return Math.floor(el.getBoundingClientRect().height) > el.clientHeight;
    }
};

export default Util;