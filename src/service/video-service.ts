import { Video } from '@/interface/video';
import player from '@/store/player';
import cookie from '@/util/cookie-util';
import CookieKeys from '@/constants/cookie-key';

export default class VideoService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static readonly parse = (data: any): Video => {
    const video: Video = {
      id: data.id ? data.id : '',
      channelTitle: '',
      title: '',
      publishedAt: '',
      thumbnailUrl: '',
      viewCount: data.statistics ? data.statistics.viewCount : '',
    };

    if (data.snippet) {
      video.channelTitle = data.snippet.channelTitle;
      video.title = data.snippet.title;
      video.publishedAt = data.snippet.publishedAt;
      video.thumbnailUrl = data.snippet.thumbnails ? data.snippet.thumbnails.medium.url : '';
    }

    return video;
  }

  public static readonly savePlayListIds2Cookie = () => {
    const ids = player.state.list.map((video) => video.id);
    cookie.set(CookieKeys.PLAY_LIST_IDS, JSON.stringify(ids), 3650);
  }

  public static readonly getPlayListIdsFrCookie = (): string | null => {
    return cookie.get(CookieKeys.PLAY_LIST_IDS);
  }
}
