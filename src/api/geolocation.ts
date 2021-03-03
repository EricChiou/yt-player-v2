import axios, { AxiosResponse } from 'axios';

import ApiUrl from '@/constants/api-url';
import { setCountryCode } from '@/store/setting';

const getGeoLocation1 = (): Promise<AxiosResponse | null> => {
  return new Promise((resolve) => {
    axios.get(ApiUrl.GET_GEOLOCATION_URL_1).then((resp) => {
      resolve(resp);
    }).catch(() => {
      resolve(null);
    });
  });
};

const getGeoLocation2 = (): Promise<AxiosResponse | null> => {
  return new Promise((resolve) => {
    axios.get(ApiUrl.GET_GEOLOCATION_URL_2).then((resp) => {
      resolve(resp);
    }).catch(() => {
      resolve(null);
    });
  });
};

export const getCountryCode = () => {
  Promise.all([getGeoLocation1(), getGeoLocation2()]).then((resp) => {
    let countryCode1 = '';
    let countryCode2 = '';

    if (resp[0] && resp[0].status === 200) {
      const data = resp[0].data;
      countryCode1 = data.alpha2;
    }

    if (resp[1] && resp[1].status === 200) {
      const data = resp[1].data;
      if (data.ip && data.ip.country_code) {
        countryCode2 = data.ip.country_code;
      } else {
      }
    }

    setCountryCode(countryCode2 || countryCode1 || 'US');
  });
};
