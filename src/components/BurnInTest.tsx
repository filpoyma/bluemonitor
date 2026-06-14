import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CenterBlackCircle } from './CenterBlackCircle';

const BURN_IN_COLORS = ['#FF0000', '#00FF00', '#0000FF', '#808080'];
const CYCLE_INTERVAL_MS = 300;

export function BurnInTest() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex(prev => (prev + 1) % BURN_IN_COLORS.length);
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: BURN_IN_COLORS[colorIndex] }]}>
      <CenterBlackCircle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
});
