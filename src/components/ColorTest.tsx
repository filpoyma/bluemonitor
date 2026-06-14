import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ColorTestProps {
  color: string;
}

export function ColorTest({ color }: ColorTestProps) {
  return <View style={[styles.container, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
