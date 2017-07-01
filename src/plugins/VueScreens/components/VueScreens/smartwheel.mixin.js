import VSP              from 'vsroot';
import * as CONSTANTS   from '../../store/constants';
import util             from '../../util';

const SHORT_NAMES = CONSTANTS.getWithoutNamespaces();
const SMART_WHEEL_PROCESSING = 'smartWheelProcessing';

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
        isSmartWheelProcessesDone() {
            return util.isUndefined(util.cache.get(SMART_WHEEL_PROCESSING));
        },
        /**
         * Scrolling element to new position
         * @param {Number} newPosition New position
         * @param {Number} Scroll speed
         * @return {Promise|Void}
         */
        scrollTo(newScrollTop, speed) {
            if (util.isFalse(this.isSmartWheelProcessesDone())) return;

            let scrollingElement = VSP.initialOptions.scrollingElement,
                scrollCoefficient = VSP[SHORT_NAMES.VS_GET_OPTIONS]().scrollCoefficient,
                direction = (newScrollTop > scrollingElement.scrollTop) ? `down` : `up`,
                scrollSpeed = (util.isNotUndefined(speed)) ? speed : VSP[SHORT_NAMES.VS_GET_OPTIONS]().scrollSpeed;

            let promise = new Promise((resolve, reject) => {
                util.cache.set(SMART_WHEEL_PROCESSING, 'processing');
                util.until(
                    () => {
                        if (direction === `up`) {
                            scrollingElement.scrollTop -= Math.ceil((scrollingElement.scrollTop - newScrollTop) * scrollCoefficient);
                        }
                        if (direction === `down`) {
                            scrollingElement.scrollTop += Math.ceil((newScrollTop - scrollingElement.scrollTop) * scrollCoefficient);
                        }
                    },
                    () => {
                        if (direction === `up`) {
                            return newScrollTop < scrollingElement.scrollTop;
                        }
                        if (direction === `down`) {
                            return scrollingElement.scrollTop < newScrollTop;
                        }
                    },
                    scrollSpeed
                ).then(() => {
                    util.cache.del(SMART_WHEEL_PROCESSING);
                    resolve();
                })
            });

            return promise;
        },
        /**
         * Run up scroll animation from current active screen to next screen
         * @return {Void}
         */
        upSmartWheel() {
            if (util.isFalse(this.isSmartWheelProcessesDone())) return;

            let activeScreenIndex = VSP.getActiveScreenIndex(),
                newScreenOffset;

            if (util.isNotUndefined(activeScreenIndex) &&  activeScreenIndex > 0) {
                util.logger.info(`Run smart wheel from ${activeScreenIndex} to ${activeScreenIndex - 1} screen`);
                newScreenOffset = VSP.getScreenOffset(VSP.getScreens()[activeScreenIndex - 1]);
                this.scrollTo(newScreenOffset.top).then(() => {
                    VSP.setActiveScreen(activeScreenIndex - 1);
                });
            }
        },
        /**
         * Run down scroll animation from current active screen to next screen
         * @return {Void}
         */
        downSmartWheel() {
            if (util.isFalse(this.isSmartWheelProcessesDone())) return;

            let screens = VSP.getScreens(),
                lastScreenIndex = screens.length - 1,
                activeScreenIndex = VSP.getActiveScreenIndex(),
                newScreenOffset;

            if (util.isNotUndefined(activeScreenIndex) && activeScreenIndex < lastScreenIndex) {
                util.logger.info(`Run smart wheel from ${activeScreenIndex} to ${activeScreenIndex + 1} screen`);
                newScreenOffset = VSP.getScreenOffset(screens[activeScreenIndex + 1]);
                this.scrollTo(newScreenOffset.top).then(() => {
                    VSP.setActiveScreen(activeScreenIndex + 1);
                })
            }
        },

        alignScrollToActiveScreen() {
            if (util.isFalse(this.isSmartWheelProcessesDone())) return;

            let activeScreen = VSP.getActiveScreen(),
                newScreenOffset;

            if (util.isNotUndefined(activeScreen)) {
                newScreenOffset = VSP.getScreenOffset(activeScreen);
                this.scrollTo(newScreenOffset.top);
            }
        },
    }
}

export default SMART_WHEEL_MIXIN;