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
         * Scrolling element by new position
         * @param {Number} scrollDiff Different scroll between current scroll and new scroll
         * @return {Promise|Void}
         */
        scrollBy(scrollDiff) {
            if (util.isFalse(this.isSmartWheelProcessesDone())) return;

            let scrollingElement = VSP.initialOptions.scrollingElement,
                newScroll = scrollingElement.scrollTop + scrollDiff,
                scrollStep = Math.abs(scrollDiff)/100,
                direction = (newScroll > scrollingElement.scrollTop) ? `down` : `up`,
                calcResult;

            let promise = new Promise((resolve, reject) => {
                util.cache.set(SMART_WHEEL_PROCESSING, `processing`);

                util.until(() => {
                    if (direction === `up`) {
                        scrollingElement.scrollTop -= scrollStep * Math.ceil((scrollingElement.scrollTop - newScroll) / 50);
                    }
                    if (direction === `down`) {
                        scrollingElement.scrollTop += scrollStep * Math.ceil((newScroll - scrollingElement.scrollTop) / 50);
                    }
                }, () => {
                    if (direction === `up`) {
                        return ~~scrollingElement.scrollTop - scrollStep > ~~newScroll;
                    }
                    if (direction === `down`) {
                        return ~~scrollingElement.scrollTop + scrollStep < ~~newScroll;
                    }
                    util.logger.error(`Unknown direction`);
                }).then(() => {
                    scrollingElement.scrollTop = newScroll;
                    util.cache.del(SMART_WHEEL_PROCESSING);
                    resolve();
                });
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
                scrollingElement = VSP.initialOptions.scrollingElement,
                newScreenOffset;

            if (util.isNotUndefined(activeScreenIndex) &&  activeScreenIndex > 0) {
                util.logger.info(`Run smart wheel from ${activeScreenIndex} to ${activeScreenIndex - 1} screen`);
                newScreenOffset = VSP.getScreenOffset(VSP.getScreens()[activeScreenIndex - 1]);
                this.scrollBy(newScreenOffset.boundingRect.top).then(() => {
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
                scrollingElement = VSP.initialOptions.scrollingElement,
                lastScreenIndex = screens.length - 1,
                activeScreenIndex = VSP.getActiveScreenIndex(),
                newScreenOffset;

            if (util.isNotUndefined(activeScreenIndex) && activeScreenIndex < lastScreenIndex) {
                util.logger.info(`Run smart wheel from ${activeScreenIndex} to ${activeScreenIndex + 1} screen`);
                newScreenOffset = VSP.getScreenOffset(screens[activeScreenIndex + 1]);
                this.scrollBy(newScreenOffset.boundingRect.top).then(() => {
                    VSP.setActiveScreen(activeScreenIndex + 1);
                })
            }
        },

        alignScrollToActiveScreen() {
            if (util.isFalse(this.isSmartWheelProcessesDone())) return;

            let activeScreen = VSP.getActiveScreen(),
                scrollingElement = VSP.initialOptions.scrollingElement,
                newScreenOffset;

            if (util.isNotUndefined(activeScreen)) {
                newScreenOffset = VSP.getScreenOffset(activeScreen);
                this.scrollBy(newScreenOffset.boundingRect.top);
            }
        },
    }
}

export default SMART_WHEEL_MIXIN;