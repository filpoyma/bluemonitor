import React, { useCallback, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BurnInTest } from '../components/BurnInTest';
import { ColorCheckerTest } from '../components/ColorCheckerTest';
import { ColorTest } from '../components/ColorTest';
import { DeadPixelTest } from '../components/DeadPixelTest';
import { GradientTest } from '../components/GradientTest';
import { PixelGridTest } from '../components/PixelGridTest';
import { StripeTest } from '../components/StripeTest';
import { TestIndicator } from '../components/TestIndicator';
import { TestIntro } from '../components/TestIntro';
import { TouchTest } from '../components/TouchTest';
import { colors } from '../constants/colors';
import { tests } from '../constants/tests';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useSessionStore } from '../store/sessionStore';

type ScreenTestScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ScreenTest'
>;

interface ScreenTestScreenProps {
  navigation: ScreenTestScreenNavigationProp;
}

export function ScreenTestScreen({ navigation }: ScreenTestScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { hasSeenTestHint, dismissTestHint } = useSessionStore();

  const currentTest = tests[currentIndex];
  const isTouchTest = currentTest.type === 'touch';

  const goToNextTest = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % tests.length);
  }, []);

  const goToPreviousTest = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + tests.length) % tests.length);
  }, []);

  const renderTest = () => {
    switch (currentTest.type) {
      case 'color':
        return <ColorTest color={currentTest.color!} />;
      case 'gradient':
        return <GradientTest colors={currentTest.gradientColors!} />;
      case 'stripe':
        return <StripeTest variant={currentTest.stripeVariant!} />;
      case 'pixel-grid':
        return <PixelGridTest />;
      case 'dead-pixel':
        return <DeadPixelTest />;
      case 'color-checker':
        return <ColorCheckerTest />;
      case 'burn-in':
        return <BurnInTest />;
      case 'touch':
        return (
          <TouchTest
            onPrevious={goToPreviousTest}
            onNext={goToNextTest}
          />
        );
      default:
        return null;
    }
  };

  if (!hasSeenTestHint) {
    return <TestIntro onStart={dismissTestHint} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.testLayer}>
        {renderTest()}

        {!isTouchTest && (
          <View style={styles.tapOverlay}>
            <Pressable style={styles.tapHalf} onPress={goToPreviousTest} />
            <Pressable style={styles.tapHalf} onPress={goToNextTest} />
          </View>
        )}
      </View>

      <TestIndicator
        title={currentTest.title}
        currentIndex={currentIndex}
        total={tests.length}
        onClose={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  testLayer: {
    ...StyleSheet.absoluteFill,
  },
  tapOverlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    zIndex: 1,
  },
  tapHalf: {
    flex: 1,
  },
});
