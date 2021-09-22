import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import {
  Provider as PaperProvider,
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
  IconButton
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import useIsMounted from './components/common/useIsMounted';
import api from './services/api';
import { Container } from './styles';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const isMounted = useIsMounted();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await api.get(
      `videos?key=AIzaSyAWnti42XWjeUrqwPjHqIaG6tv_KGSSwpM&part=snippet&chart=mostPopular&maxResults=10`
    );
    if (isMounted.current) {
      setLoading(false);
      if (response) setVideos(response.data.items);
    }
  }, [isMounted]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(videos.map((video) => video.snippet.thumbnails.default));

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <PaperProvider>
      <SafeAreaView style={backgroundStyle}>
        <Container>
          {videos.map((video) => (
            <Card key={video.etag} style={{ margin: 20 }}>
              <Card.Cover
                source={{ uri: video.snippet.thumbnails.maxres.url }}
              />
              <Card.Title
                subtitle={video.snippet.title}
                title={video.snippet.channelTitle}
                left={() => <Icon name="rocket" size={30} color="#900" />}
                right={(props) => (
                  <IconButton {...props} icon="more-vert" onPress={() => {}} />
                )}
              />
              {/* <Card.Content>
                <Title>{video.snippet.title}</Title>
                <Paragraph>{video.snippet.channelTitle}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions> */}
            </Card>
          ))}
        </Container>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
