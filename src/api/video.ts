import axios, { AxiosResponse } from 'axios';

import ApiUrl from '@/constants/api-url';
import Config from '@/constants/config';

export const getTrendingVideos = (
  regionCode: string,
  pageToken?: string,
): Promise<AxiosResponse> => {
  const params = {
    part: 'snippet,statistics',
    chart: 'mostPopular',
    maxResults: 20,
    regionCode: regionCode,
    key: Config.YT_API_KEY,
    pageToken: pageToken || undefined,
  };

  return axios.get(ApiUrl.GET_TRENDING_VIDEOS, { params: params });
};

export const searchVideo = (keyword: string, regionCode: string, pageToken: string) => {
  const params = {
    part: 'snippet',
    q: keyword,
    maxResults: 20,
    regionCode: regionCode,
    type: 'video',
    key: Config.YT_API_KEY,
    pageToken: pageToken || undefined,
  };

  return axios.get(ApiUrl.SEARCH_VIDEOS, { params: params });
};
