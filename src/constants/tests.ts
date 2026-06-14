export type TestType =
  | 'color'
  | 'gradient'
  | 'stripe'
  | 'pixel-grid'
  | 'dead-pixel'
  | 'color-checker'
  | 'burn-in'
  | 'touch';

export type StripeVariant = 'vertical-bw' | 'horizontal-bw' | 'rgb';

export interface TestDefinition {
  id: string;
  title: string;
  type: TestType;
  color?: string;
  gradientColors?: [string, string];
  stripeVariant?: StripeVariant;
}

export const tests: TestDefinition[] = [
  { id: 'solid-red', title: 'Solid Red', type: 'color', color: '#FF0000' },
  { id: 'solid-green', title: 'Solid Green', type: 'color', color: '#00FF00' },
  { id: 'solid-blue', title: 'Solid Blue', type: 'color', color: '#0000FF' },
  { id: 'solid-white', title: 'Solid White', type: 'color', color: '#FFFFFF' },
  { id: 'solid-black', title: 'Solid Black', type: 'color', color: '#000000' },
  { id: 'gray-screen', title: 'Gray Screen', type: 'color', color: '#808080' },
  {
    id: 'vertical-stripes',
    title: 'Vertical Stripes',
    type: 'stripe',
    stripeVariant: 'vertical-bw',
  },
  {
    id: 'horizontal-stripes',
    title: 'Horizontal Stripes',
    type: 'stripe',
    stripeVariant: 'horizontal-bw',
  },
  {
    id: 'rgb-stripes',
    title: 'RGB Stripes',
    type: 'stripe',
    stripeVariant: 'rgb',
  },
  {
    id: 'gradient-bw',
    title: 'Gradient Black To White',
    type: 'gradient',
    gradientColors: ['#000000', '#FFFFFF'],
  },
  {
    id: 'gradient-red',
    title: 'Gradient Red',
    type: 'gradient',
    gradientColors: ['#330000', '#FF0000'],
  },
  {
    id: 'gradient-green',
    title: 'Gradient Green',
    type: 'gradient',
    gradientColors: ['#003300', '#00FF00'],
  },
  {
    id: 'gradient-blue',
    title: 'Gradient Blue',
    type: 'gradient',
    gradientColors: ['#000033', '#0000FF'],
  },
  { id: 'pixel-grid', title: 'Pixel Grid', type: 'pixel-grid' },
  { id: 'color-checker', title: 'Color Checker', type: 'color-checker' },
  { id: 'dead-pixel', title: 'Dead Pixel Test', type: 'dead-pixel' },
  { id: 'burn-in', title: 'Burn-In Test', type: 'burn-in' },
  { id: 'touch', title: 'Touch Screen Test', type: 'touch' },
];
