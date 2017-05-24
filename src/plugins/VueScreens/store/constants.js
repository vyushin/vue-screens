import util from '../util';

const   VS_SET_OPTIONS          = 'VueScreens/setOptions',
        VS_GET_OPTIONS          = 'VueScreens/getOptions',
        VS_GET_SCREENS          = 'VueScreens/getScreens',
        VS_RM_SCREENS           = 'VueScreens/rmScreens',
        VS_ADD_SCREEN           = 'VueScreens/addScreen',
        VS_REPLACE_SCREENS      = 'VueScreens/replaceScreens',
        VS_SHUFFLE              = 'VueScreens/shuffleScreens';

function getWithoutNamespaces() {
    let result = {};
    Object.keys(this).map(key => {
        let exceptions = ['getWithoutNamespaces'];
        if (util.isFalse(util.inArray(exceptions, key)))
        result[key] = this[key].replace(/^VueScreens\//, '')
    });
    return result;
}

export {
    VS_SET_OPTIONS,
    VS_GET_OPTIONS,
    VS_GET_SCREENS,
    VS_RM_SCREENS,
    VS_ADD_SCREEN,
    VS_REPLACE_SCREENS,
    VS_SHUFFLE,
    getWithoutNamespaces
};