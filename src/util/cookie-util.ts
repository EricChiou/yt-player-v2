export default {
  set: (name: string, value: string, expireDays = 0) => {
    let expires = '';
    if (expireDays) {
      const date = new Date();
      date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    cookie += `${expires}; path=/;`;
    document.cookie = cookie;
  },
  get: (name: string) => {
    const cookieAll = document.cookie.split('; ');
    const cookieName = encodeURIComponent(name) + '=';
    for (const cookie of cookieAll) {
      if (cookie.indexOf(cookieName) === 0) {
        return decodeURIComponent(cookie.substring(cookieName.length));
      }
    }
    return null;
  },
  delete: (name: string) => {
    let cookie = `${encodeURIComponent(name)}=`;
    cookie += '; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
    document.cookie = cookie;
  },
};
