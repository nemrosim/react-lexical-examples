import { URL_REGEX } from './matchers';

const urlRegExp = new RegExp(URL_REGEX);

export const validateUrl = (url: string): boolean => {
   return url === 'https://' || urlRegExp.test(url);
};
