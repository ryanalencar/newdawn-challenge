import { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

export function useFetchVideos() {
  const [pageToken, setPageToken] = useState('');
  const [shouldFetch, setShouldFetch] = useState(true);
  const [videos, setVideos] = useState([]);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const fetch = async () => {
      const newVideos = await api.get(
        `videos?key=AIzaSyAWnti42XWjeUrqwPjHqIaG6tv_KGSSwpM&part=snippet&chart=mostPopular&pageToken=${pageToken}`
      );

      const newData = await Promise.all(
        newVideos.data.items.map(async (video) => {
          const channelInfo = await api.get(
            `channels?key=AIzaSyAWnti42XWjeUrqwPjHqIaG6tv_KGSSwpM&part=snippet&id=${video.snippet.channelId}`
          );
          return {
            ...video,
            channelLogo: channelInfo.data.items[0].snippet.thumbnails.high.url
          };
        })
      );

      console.log(newData.map((logo) => logo.channelLogo));

      setShouldFetch(false);
      setVideos((oldVideos) => [...oldVideos, ...newData]);

      setPageToken(newVideos.data.nextPageToken);
    };

    fetch();
  }, [pageToken, shouldFetch]);

  return [videos, fetchMore];
}
