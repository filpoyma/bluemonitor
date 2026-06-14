import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

const SQUARE_SIZE_RATIO = 0.3;

export function CenterBlackCircle() {
  const { width, height } = useWindowDimensions();
  const size = Math.min(width, height) * SQUARE_SIZE_RATIO;

  return (
    <View
      pointerEvents="none"
      style={[
        styles.square,
        {
          width: size,
          height: size,
          top: (height - size) / 2,
          left: (width - size) / 2,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  square: {
    position: 'absolute',
    backgroundColor: '#000000',
  },
});
