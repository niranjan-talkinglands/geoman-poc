import { CLOUD_DOMAIN } from '../constants/url';

export const getAssetsURL = (suffix: string): string => CLOUD_DOMAIN + suffix;
