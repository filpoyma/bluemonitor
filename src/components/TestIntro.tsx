import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { radii } from '../constants/radii';

interface TestIntroProps {
  onStart: () => void;
}

export function TestIntro({ onStart }: TestIntroProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.text}>
          Tap the left side for the previous test, right side for the next.
        </Text>
        <Text style={styles.textSecondary}>
          Use the Touch Screen Test to verify touchscreen responsiveness. Tap ✕ to
          exit back to the home screen.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.startButton, pressed && styles.pressed]}
        onPress={onStart}>
        <Text style={styles.startButtonText}>Start</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.primaryText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 12,
  },
  textSecondary: {
    color: colors.secondaryText,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radii.button,
    alignItems: 'center',
  },
  startButtonText: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
