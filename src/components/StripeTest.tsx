import React, { useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import type { StripeVariant } from '../constants/tests';

interface StripeTestProps {
  variant: StripeVariant;
}

const STRIPE_WIDTH = 4;

export function StripeTest({ variant }: StripeTestProps) {
  const { width, height } = useWindowDimensions();

  const stripes = useMemo(() => {
    if (variant === 'vertical-bw') {
      const count = Math.ceil(width / STRIPE_WIDTH);
      return Array.from({ length: count }, (_, i) => ({
        key: `v-${i}`,
        style: {
          left: i * STRIPE_WIDTH,
          top: 0,
          width: STRIPE_WIDTH,
          height,
          backgroundColor: i % 2 === 0 ? '#000000' : '#FFFFFF',
        },
      }));
    }

    if (variant === 'horizontal-bw') {
      const count = Math.ceil(height / STRIPE_WIDTH);
      return Array.from({ length: count }, (_, i) => ({
        key: `h-${i}`,
        style: {
          left: 0,
          top: i * STRIPE_WIDTH,
          width,
          height: STRIPE_WIDTH,
          backgroundColor: i % 2 === 0 ? '#000000' : '#FFFFFF',
        },
      }));
    }

    // RGB vertical stripes
    const rgbColors = ['#FF0000', '#00FF00', '#0000FF'];
    const count = Math.ceil(width / STRIPE_WIDTH);
    return Array.from({ length: count }, (_, i) => ({
      key: `rgb-${i}`,
      style: {
        left: i * STRIPE_WIDTH,
        top: 0,
        width: STRIPE_WIDTH,
        height,
        backgroundColor: rgbColors[i % 3],
      },
    }));
  }, [variant, width, height]);

  return (
    <View style={styles.container}>
      {stripes.map(stripe => (
        <View key={stripe.key} style={[styles.stripe, stripe.style]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  stripe: {
    position: 'absolute',
  },
});
