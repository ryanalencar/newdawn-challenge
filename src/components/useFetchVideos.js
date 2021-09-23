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

      setShouldFetch(false);
      setVideos((oldVideos) => [...oldVideos, ...newVideos.data.items]);

      setPageToken(newVideos.data.nextPageToken);
    };

    fetch();
  }, [pageToken, shouldFetch]);

  return [videos, fetchMore];
}
