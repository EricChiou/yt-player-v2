import { Video } from '@/interface/video';

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
}
