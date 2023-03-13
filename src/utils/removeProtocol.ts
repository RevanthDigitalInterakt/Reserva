const REGEX_VALID_URL = /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/gi;

export const removeProtocol = (url: string): string => {
  const regexValidURL = new RegExp(REGEX_VALID_URL);
  if (!regexValidURL.test(url)) return url;

  // To remove the protocol like http:// , https:// , ftp:// , //  from an URL string with
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url.replace(/(^\w+:|^)\/\//, '');
  }

  return url;
};
