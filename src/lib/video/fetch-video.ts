// invalid ID for testing: 413420348
// valid ID for testing: 442251310

import type { IVimeoVideo } from '$lib/video/video.interface';

export async function fetchVideoData(videoId: string): Promise<IVimeoVideo> {
  const url = `https://api.vimeo.com/videos/${videoId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `bearer ${import.meta.env.VITE_vimeoUnauthenticatedAccessToken}`,
    },
  });
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  data.id = videoId;
  return data;
}
