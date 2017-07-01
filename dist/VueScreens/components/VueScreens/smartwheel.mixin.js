import VSP              from 'vsroot';
import * as CONSTANTS   from '../../store/constants';
import util             from 'vsroot/util';

const SHORT_NAMES = CONSTANTS.getWithoutNamespaces();
const SMART_WHEEL_DOWN = 'smartWheelDown';
const SMART_WHEEL_UP = 'smartWheelUp';

/**
 * Contains methods for smart wheel functional
 * @module
 */
const SMART_WHEEL_MIXIN = {
    methods: {
        /**
         * Common smart wheel method
         * @param {String} direction
         * @return {Void}
         */
        smartWheel(direction) {
            switch (direction) {
                case `down`:
                    this.downSmartWheel();
                    break;
                case `up`:
                    this.upSmartWheel();
                    break;
            }
        },
        /**
         * Check completeness all of smart wheel processes
         * @return {Boolean}
         */
        isAllSmartWheelProcessesDone() {
            return util.isUndefined(util.cache.get(SMART_WHEEL_DOWN)) && util.isUndefined(util.cache.get(SMART_WHEEL_UP));
        },
        /**
         * Run up scroll animation from current active screen to next screen
         * @return {Void}
         */
        upSmartWheel() {
            if (util.isFalse(this.isAllSmartWheelProcessesDone())) return;

            let screens = VSP.getScreens(),
                activeScreen = VSP.getActiveScreen(),
                scrollCoefficient = VSP[SHORT_NAMES.VS_GET_OPTIONS]().scrollCoefficient,
                newScreenOffset;

            if (util.isNotUndefined(activeScreen) &&
                activeScreen.index > 0
            ) {
                util.logger.info(`Run smart wheel from ${activeScreen.index} to ${activeScreen.index - 1} screen`);
                util.cache.set(SMART_WHEEL_UP, 'processing');
                newScreenOffset = VSP.getScreenOffset(screens[activeScreen.index - 1]);
                util.until(
                    function() {
                        VSP.initialOptions.scrollingElement.scrollTop -= (VSP.initialOptions.scrollingElement.scrollTop - newScreenOffset.top) * scrollCoefficient;
                    },
                    function() {
                        return newScreenOffset.top < VSP.initialOptions.scrollingElement.scrollTop;
                    },
                    VSP[SHORT_NAMES.VS_GET_OPTIONS]().scrollSpeed
                ).then(() => {
                    VSP.setActiveScreen(activeScreen.index - 1);
                    util.cache.del(SMART_WHEEL_UP);
                })
            }
        },
        /**
         * Run down scroll animation from current active screen to next screen
         * @return {Void}
         */
        downSmartWheel() {
            if (util.isFalse(this.isAllSmartWheelProcessesDone())) return;

            let screens = VSP.getScreens(),
                lastScreenIndex = screens.length - 1,
                activeScreen = VSP.getActiveScreen(),
                scrollCoefficient = VSP[SHORT_NAMES.VS_GET_OPTIONS]().scrollCoefficient,
                newScreenOffset;

            if (util.isNotUndefined(activeScreen) &&
                activeScreen.index < lastScreenIndex
            ) {
                util.logger.info(`Run smart wheel from ${activeScreen.index} to ${activeScreen.index + 1} screen`);
                util.cache.set(SMART_WHEEL_DOWN, 'processing');
                newScreenOffset = VSP.getScreenOffset(screens[activeScreen.index + 1]);
                util.until(
                    function() {
                        VSP.initialOptions.scrollingElement.scrollTop += Math.ceil((newScreenOffset.top - VSP.initialOptions.scrollingElement.scrollTop) * scrollCoefficient);
                    },
                    function() {
                        return VSP.initialOptions.scrollingElement.scrollTop < newScreenOffset.top
                    },
                    VSP[SHORT_NAMES.VS_GET_OPTIONS]().scrollSpeed
                ).then(() => {
                    VSP.setActiveScreen(activeScreen.index + 1);
                    util.cache.del(SMART_WHEEL_DOWN);
                })
            }
        },

        alignScrollToActiveScreen() {
            if (util.isFalse(this.isAllSmartWheelProcessesDone())) return;

            let direction = VSP[SHORT_NAMES.VS_GET_OPTIONS].direction,
                scrollingElement = VSP.initialOptions.scrollingElement,
                activeScreenOffset = VSP.getScreenOffset(VSP.getActiveScreen());

            if (direction === `v` && scrollingElement.scrollTop !== activeScreenOffset.top) {
                if (scrollingElement.scrollTop > activeScreenOffset.top) {
                    util.cache.set(SMART_WHEEL_UP, 'processing');
                    /** @TODO*/
                }
                if (scrollingElement.scrollTop < activeScreenOffset.top) {
                    util.cache.set(SMART_WHEEL_DOWN, 'processing');
                    /** @TODO*/
                }
            } else if (direction === `h`) {}
        },
    }
}

export default SMART_WHEEL_MIXIN;