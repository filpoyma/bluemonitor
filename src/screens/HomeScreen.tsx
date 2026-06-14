import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../constants/colors';
import { radii } from '../constants/radii';
import type { RootStackParamList } from '../navigation/RootNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>Screen Tester</Text>
        <Text style={styles.subtitle}>
          Professional display diagnostics for smartphones
        </Text>
        <Text style={styles.description}>
          Check your display for dead pixels, burn-in, color issues and touch
          responsiveness.
        </Text>
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => navigation.navigate('ScreenTest')}>
          <Text style={styles.buttonText}>Start Testing</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.buttonSecondary,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate('About')}>
          <Text style={styles.buttonSecondaryText}>About App</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: colors.primaryText,
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  description: {
    color: colors.secondaryText,
    fontSize: 16,
    lineHeight: 24,
  },
  buttons: {
    gap: 12,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    borderRadius: radii.button,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    borderRadius: radii.button,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondaryText,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '700',
  },
  buttonSecondaryText: {
    color: colors.primaryText,
    fontSize: 17,
    fontWeight: '600',
  },
});
