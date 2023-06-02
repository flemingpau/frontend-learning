import { DEV, BUILD_LIB, BUILD_SITE } from '../../constants';
import { getDevConfig } from './getDevConfig';
import { getBuildConfig } from './getBuildConfig';
export const getWebpackConfig = (type) => {
    switch (type) {
        case DEV:
            return getDevConfig();
        case BUILD_SITE:
            return getBuildConfig();
        case BUILD_LIB:
            return getBuildConfig();
        default:
            return getDevConfig();
    }
};
