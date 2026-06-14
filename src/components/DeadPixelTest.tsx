import React from 'react';
import { StyleSheet, View } from 'react-native';

const DOT_SIZE = 3;

export function DeadPixelTest() {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#000000',
  },
});
