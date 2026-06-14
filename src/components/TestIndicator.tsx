import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { radii } from '../constants/radii';

interface TestIndicatorProps {
  title: string;
  currentIndex: number;
  total: number;
  onClose: () => void;
}

const VISIBLE_DELAY_MS = 1200;
const FADE_DURATION_MS = 300;

const textShadow = {
  textShadowColor: 'rgba(0, 0, 0, 0.85)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 6,
};

export function TestIndicator({
  title,
  currentIndex,
  total,
  onClose,
}: TestIndicatorProps) {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(1)).current;
  const [isInteractive, setIsInteractive] = useState(true);

  useEffect(() => {
    opacity.setValue(1);
    setIsInteractive(true);

    const hideTimer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: FADE_DURATION_MS,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setIsInteractive(false);
        }
      });
    }, VISIBLE_DELAY_MS);

    return () => {
      clearTimeout(hideTimer);
      opacity.stopAnimation();
    };
  }, [currentIndex, opacity]);

  return (
    <Animated.View
      style={[styles.overlay, { paddingTop: insets.top + 8, opacity }]}
      pointerEvents={isInteractive ? 'box-none' : 'none'}>
      <Animated.View style={styles.content} pointerEvents="box-none">
        <Animated.View style={styles.textBlock} pointerEvents="none">
          <Text style={[styles.title, textShadow]}>{title}</Text>
          <Text style={[styles.progress, textShadow]}>
            Test {currentIndex + 1} / {total}
          </Text>
        </Animated.View>

        <Pressable
          style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
          onPress={onClose}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Exit tests">
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    elevation: 20,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: colors.primaryText,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  progress: {
    color: colors.secondaryText,
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: radii.close,
    backgroundColor: 'rgba(22, 27, 34, 0.75)',
    borderWidth: 1,
    borderColor: colors.secondaryText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  closeIcon: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
  },
});
