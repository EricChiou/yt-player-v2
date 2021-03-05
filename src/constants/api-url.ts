const YT_API_PRE_URL = 'https://www.googleapis.com/youtube/v3';

export default class ApiUrl {
  // IP Geolocation API
  public static readonly GET_GEOLOCATION_URL_1 = 'https://api.ipgeolocationapi.com/geolocate';
  public static readonly GET_GEOLOCATION_URL_2 = 'https://ip.nf/me.json';

  // Youtube API
  public static readonly GET_TRENDING_VIDEOS = YT_API_PRE_URL + '/videos';
  public static readonly SEARCH_VIDEOS = YT_API_PRE_URL + '/search';
  public static readonly GET_VIDEO_BY_ID = YT_API_PRE_URL + '/videos';
}
