import util from './';

describe(`Util Test`, () => {

    const TEST_TYPES = [undefined, null, true, false, -1, 0, 1, 'str', '', /^$/, function() {}, [], {}];

    it(`isNull()`, () => {
        TEST_TYPES.forEach((type) => {
            if (type === null) {
                expect(util.isNull(type)).toBeTruthy()
            } else {
                expect(util.isNull(type)).toBeFalsy()
            }
        })
    });

    it(`isNotNull()`, () => {
        TEST_TYPES.forEach((type) => {
            if (type === null) {
                expect(util.isNotNull(type)).not.toBeTruthy()
            } else {
                expect(util.isNotNull(type)).not.toBeFalsy()
            }
        })
    });

});