import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Defs, Pattern, Rect } from 'react-native-svg';

const CELL_SIZE = 8;
const PATTERN_ID = 'pixelGridPattern';
const PATTERN_SIZE = CELL_SIZE * 2;

export function PixelGridTest() {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <Pattern
            id={PATTERN_ID}
            x={0}
            y={0}
            width={PATTERN_SIZE}
            height={PATTERN_SIZE}
            patternUnits="userSpaceOnUse">
            <Rect
              x={0}
              y={0}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill="#FFFFFF"
            />
            <Rect
              x={CELL_SIZE}
              y={0}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill="#000000"
            />
            <Rect
              x={0}
              y={CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill="#000000"
            />
            <Rect
              x={CELL_SIZE}
              y={CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill="#FFFFFF"
            />
          </Pattern>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`url(#${PATTERN_ID})`}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
