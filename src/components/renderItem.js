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
          uri:
            item.snippet.thumbnails.maxres.url ||
            'https://reactnative.dev/img/tiny_logo.png'
        }}
      />
      <Card.Title
        subtitle={item.snippet.title}
        title={item.snippet.channelTitle}
        left={() => (
          <Image
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png'
            }}
            style={{ width: 24, height: 24 }}
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
