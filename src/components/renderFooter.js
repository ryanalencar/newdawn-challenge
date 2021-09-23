import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const styles = StyleSheet.create({
  loading: {
    alignSelf: 'center',
    marginVertical: 20
  }
});

export default function renderFooter() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator />
    </View>
  );
}
