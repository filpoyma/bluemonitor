import React, { useCallback, useRef, useState } from 'react';
import {
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants/colors';
import { radii } from '../constants/radii';

interface Stroke {
  id: number;
  d: string;
}

interface TouchTestProps {
  onPrevious: () => void;
  onNext: () => void;
}

const STROKE_COLOR = '#58A6FF';
const STROKE_WIDTH = 4;
const TAP_MOVE_THRESHOLD = 8;

export function TouchTest({ onPrevious, onNext }: TouchTestProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentPath = useRef('');
  const strokeId = useRef(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const hasMoved = useRef(false);
  const currentStrokeId = useRef(0);

  const handleClear = useCallback(() => {
    setStrokes([]);
    currentPath.current = '';
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        const { locationX, locationY } = evt.nativeEvent;
        startX.current = locationX;
        startY.current = locationY;
        hasMoved.current = false;
        currentPath.current = `M${locationX},${locationY}`;
        strokeId.current += 1;
        currentStrokeId.current = strokeId.current;
        const id = strokeId.current;
        setStrokes(prev => [...prev, { id, d: currentPath.current }]);
      },
      onPanResponderMove: evt => {
        const { locationX, locationY } = evt.nativeEvent;
        if (
          Math.abs(locationX - startX.current) > TAP_MOVE_THRESHOLD ||
          Math.abs(locationY - startY.current) > TAP_MOVE_THRESHOLD
        ) {
          hasMoved.current = true;
        }
        currentPath.current += ` L${locationX},${locationY}`;
        const id = currentStrokeId.current;
        const d = currentPath.current;
        setStrokes(prev => prev.map(s => (s.id === id ? { ...s, d } : s)));
      },
      onPanResponderRelease: () => {
        if (!hasMoved.current) {
          const strokeIdToRemove = currentStrokeId.current;
          setStrokes(prev => prev.filter(s => s.id !== strokeIdToRemove));

          if (startX.current < width / 2) {
            onPrevious();
          } else {
            onNext();
          }
        }
        currentPath.current = '';
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.canvas} {...panResponder.panHandlers}>
        <Svg style={StyleSheet.absoluteFill}>
          {strokes.map(stroke => (
            <Path
              key={stroke.id}
              d={stroke.d}
              stroke={STROKE_COLOR}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
        </Svg>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.clearButton,
          { bottom: insets.bottom + 16 },
          pressed && styles.pressed,
        ]}
        onPress={handleClear}
        hitSlop={8}>
        <Text style={styles.clearText}>Clear</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  canvas: {
    ...StyleSheet.absoluteFill,
  },
  clearButton: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.button,
    backgroundColor: 'rgba(22, 27, 34, 0.75)',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  pressed: {
    opacity: 0.75,
  },
  clearText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
});
