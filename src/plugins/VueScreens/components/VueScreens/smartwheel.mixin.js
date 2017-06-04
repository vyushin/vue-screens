import VSP              from 'vsroot';
import * as CONSTANTS   from '../../store/constants';
import util             from 'vsroot/util';

const SHORT_NAMES = CONSTANTS.getWithoutNamespaces();

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
            return util.isUndefined(util.cache.get('smartWheelDown')) && util.isUndefined(util.cache.get('smartWheelUp'));
        },
        /**
         * Run up scroll animation from current active screen to next screen
         * @return {Void}
         */
        upSmartWheel() {
            let screens = VSP.getScreens(),
                activeScreen = VSP.getActiveScreen(),
                scrollCoefficient = VSP[SHORT_NAMES.VS_GET_OPTIONS]().scrollCoefficient,
                newScreenOffset;

            if (util.isNotUndefined(activeScreen) &&
                activeScreen.index > 0 &&
                this.isAllSmartWheelProcessesDone()
            ) {
                util.logger.info(`Run smart wheel from ${activeScreen.index} to ${activeScreen.index - 1} screen`);
                util.cache.set('smartWheelUp', 'processing');
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
                    util.cache.del('smartWheelUp');
                })
            }
        },
        /**
         * Run down scroll animation from current active screen to next screen
         * @return {Void}
         */
        downSmartWheel() {
            let screens = VSP.getScreens(),
                lastScreenIndex = screens.length - 1,
                activeScreen = VSP.getActiveScreen(),
                scrollCoefficient = VSP[SHORT_NAMES.VS_GET_OPTIONS]().scrollCoefficient,
                newScreenOffset;

            if (util.isNotUndefined(activeScreen) &&
                activeScreen.index < lastScreenIndex &&
                this.isAllSmartWheelProcessesDone()
            ) {
                util.logger.info(`Run smart wheel from ${activeScreen.index} to ${activeScreen.index + 1} screen`);
                util.cache.set('smartWheelDown', 'processing');
                newScreenOffset = VSP.getScreenOffset(screens[activeScreen.index + 1]);
                util.until(
                    function() {
                        VSP.initialOptions.scrollingElement.scrollTop += Math.ceil((newScreenOffset.top - VSP.initialOptions.scrollingElement.scrollTop) * scrollCoefficient);
                    },
                    function() {
                        return VSP.initialOptions.scrollingElement.scrollTop <= newScreenOffset.top
                    },
                    VSP[SHORT_NAMES.VS_GET_OPTIONS]().scrollSpeed
                ).then(() => {
                    VSP.setActiveScreen(activeScreen.index + 1);
                    util.cache.del('smartWheelDown');
                })
            }
        }
    }
}

export default SMART_WHEEL_MIXIN;