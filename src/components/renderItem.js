import React from 'react';
import { Card, IconButton } from 'react-native-paper';
import { Image, Linking } from 'react-native';

export default function renderItem({ item }) {
  return (
    <Card
      key={item.etag}
      style={{ margin: 20 }}
      onPress={() =>
        Linking.openURL(
          `https://www.youtube.com/watch?v=${item.id}&ab_channel=${item.snippet.channelTitle}`
        )
      }
    >
      <Card.Cover
        source={{
          uri: item.snippet.thumbnails.high.url
        }}
      />
      <Card.Title
        subtitle={item.snippet.title}
        title={item.snippet.channelTitle}
        left={() => (
          <Image
            source={{
              uri: item.channelLogo
            }}
            style={{ width: 36, height: 36 }}
            onPress={() =>
              Linking.openURL(
                `https://www.youtube.com/c/${item.snippet.channelTitle}`
              )
            }
          />
        )}
        right={(props) => (
          <IconButton
            {...props}
            icon="play"
            onPress={() =>
              Linking.openURL(
                `https://www.youtube.com/watch?v=${item.id}&ab_channel=${item.snippet.channelTitle}`
              )
            }
          />
        )}
      />
    </Card>
  );
}
