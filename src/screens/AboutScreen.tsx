import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../constants/colors';
import { radii } from '../constants/radii';
import type { RootStackParamList } from '../navigation/RootNavigator';

type AboutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'About'
>;

interface AboutScreenProps {
  navigation: AboutScreenNavigationProp;
}

const FEATURES = [
  'Dead pixel detection',
  'Burn-in testing',
  'Touchscreen testing',
  'Color accuracy checks',
  'Backlight uniformity tests',
];

export function AboutScreen({ navigation }: AboutScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Screen Tester</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.description}>
          Simple smartphone display diagnostic tool.
        </Text>

        <Text style={styles.sectionTitle}>Features</Text>
        {FEATURES.map(feature => (
          <View key={feature} style={styles.featureRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </ScrollView>

      <Pressable
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </Pressable>
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  title: {
    color: colors.primaryText,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  version: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  description: {
    color: colors.secondaryText,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    color: colors.primaryText,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    color: colors.accent,
    fontSize: 16,
    marginRight: 10,
    lineHeight: 24,
  },
  featureText: {
    color: colors.secondaryText,
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  backButton: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    borderRadius: radii.button,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondaryText,
  },
  pressed: {
    opacity: 0.85,
  },
  backText: {
    color: colors.primaryText,
    fontSize: 17,
    fontWeight: '600',
  },
});
