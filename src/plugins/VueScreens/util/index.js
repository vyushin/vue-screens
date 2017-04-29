import {extend} from 'lodash';

export default {
    extend,
    isNull(some) {
        return some === null;
    },
    isNotNull(some) {
        return some !== null;
    },
    isTrue(some) {
        return some === true;
    }
}