import React from 'react';
import { StyleSheet, View } from 'react-native';

export function ColorCheckerTest() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.quadrant, styles.red]} />
        <View style={[styles.quadrant, styles.green]} />
      </View>
      <View style={styles.row}>
        <View style={[styles.quadrant, styles.blue]} />
        <View style={[styles.quadrant, styles.white]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  quadrant: {
    flex: 1,
  },
  red: {
    backgroundColor: '#FF0000',
  },
  green: {
    backgroundColor: '#00FF00',
  },
  blue: {
    backgroundColor: '#0000FF',
  },
  white: {
    backgroundColor: '#FFFFFF',
  },
});
