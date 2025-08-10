import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export type GradientPreset =
  | 'ocean'
  | 'sunset'
  | 'purple'
  | 'forest'
  | 'fire'
  | 'mint'
  | 'cosmic'
  | 'rose'
  | 'custom';

export type PlacementPreset =
  | 'default'
  | 'scattered'
  | 'clustered'
  | 'corners'
  | 'center'
  | 'edges'
  | 'diagonal'
  | 'triangle'
  | 'spiral'
  | 'custom';

export interface BlobConfig {
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  width: number; // 0-100 percentage
  height: number; // 0-100 percentage
  color: 'primary' | 'secondary' | 'tertiary';
  opacity?: number; // 0-1, overrides color's default opacity
}

export interface PlacementConfig {
  preset?: PlacementPreset;
  blobs?: BlobConfig[];
  count?: number; // for generated presets
  randomSeed?: number; // for reproducible random patterns
}

export interface GradientProps {
  className?: string;
  preset?: GradientPreset;
  colors?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    background?: string;
  };
  intensity?: 'light' | 'medium' | 'heavy';
  blur?: boolean;
  placement?: PlacementConfig;
}

const GRADIENT_PRESETS = {
  ocean: {
    primary: 'rgba(59, 130, 246, 0.9)', // blue-500
    secondary: 'rgba(14, 165, 233, 0.9)', // sky-500
    tertiary: 'rgba(6, 182, 212, 0.7)', // cyan-500
    background: 'rgb(30, 58, 138)', // blue-800
  },
  sunset: {
    primary: 'rgba(251, 146, 60, 0.9)', // orange-400
    secondary: 'rgba(239, 68, 68, 0.9)', // red-500
    tertiary: 'rgba(236, 72, 153, 0.7)', // pink-500
    background: 'rgb(153, 27, 27)', // red-800
  },
  purple: {
    primary: 'rgba(168, 85, 247, 0.9)', // purple-500
    secondary: 'rgba(139, 92, 246, 0.9)', // violet-500
    tertiary: 'rgba(99, 102, 241, 0.7)', // indigo-500
    background: 'rgb(88, 28, 135)', // purple-800
  },
  forest: {
    primary: 'rgba(34, 197, 94, 0.9)', // green-500
    secondary: 'rgba(16, 185, 129, 0.9)', // emerald-500
    tertiary: 'rgba(20, 184, 166, 0.7)', // teal-500
    background: 'rgb(22, 101, 52)', // green-800
  },
  fire: {
    primary: 'rgba(239, 68, 68, 0.9)', // red-500
    secondary: 'rgba(251, 146, 60, 0.9)', // orange-400
    tertiary: 'rgba(245, 158, 11, 0.7)', // amber-500
    background: 'rgb(153, 27, 27)', // red-800
  },
  mint: {
    primary: 'rgba(20, 184, 166, 0.9)', // teal-500
    secondary: 'rgba(6, 182, 212, 0.9)', // cyan-500
    tertiary: 'rgba(34, 197, 94, 0.7)', // green-500
    background: 'rgb(13, 148, 136)', // teal-700
  },
  cosmic: {
    primary: 'rgba(99, 102, 241, 0.9)', // indigo-500
    secondary: 'rgba(139, 92, 246, 0.9)', // violet-500
    tertiary: 'rgba(236, 72, 153, 0.7)', // pink-500
    background: 'rgb(55, 48, 163)', // indigo-800
  },
  rose: {
    primary: 'rgba(244, 63, 94, 0.9)', // rose-500
    secondary: 'rgba(236, 72, 153, 0.9)', // pink-500
    tertiary: 'rgba(168, 85, 247, 0.7)', // purple-500
    background: 'rgb(159, 18, 57)', // rose-800
  },
};

const INTENSITY_MULTIPLIERS = {
  light: 0.6,
  medium: 1,
  heavy: 1.4,
};

const PLACEMENT_PRESETS: Record<PlacementPreset, BlobConfig[]> = {
  default: [
    { x: 80, y: 20, width: 60, height: 60, color: 'primary' },
    { x: 20, y: 70, width: 50, height: 50, color: 'secondary' },
    { x: 40, y: 40, width: 70, height: 70, color: 'tertiary' },
  ],
  scattered: [
    { x: 15, y: 15, width: 40, height: 40, color: 'primary' },
    { x: 75, y: 25, width: 35, height: 35, color: 'secondary' },
    { x: 25, y: 65, width: 45, height: 45, color: 'tertiary' },
    { x: 85, y: 80, width: 30, height: 30, color: 'primary', opacity: 0.6 },
    { x: 60, y: 10, width: 25, height: 25, color: 'secondary', opacity: 0.5 },
  ],
  clustered: [
    { x: 60, y: 30, width: 50, height: 50, color: 'primary' },
    { x: 70, y: 40, width: 40, height: 40, color: 'secondary' },
    { x: 55, y: 45, width: 35, height: 35, color: 'tertiary' },
    { x: 75, y: 25, width: 30, height: 30, color: 'primary', opacity: 0.7 },
  ],
  corners: [
    { x: 10, y: 10, width: 45, height: 45, color: 'primary' },
    { x: 85, y: 15, width: 40, height: 40, color: 'secondary' },
    { x: 15, y: 85, width: 42, height: 42, color: 'tertiary' },
    { x: 80, y: 80, width: 38, height: 38, color: 'primary', opacity: 0.8 },
  ],
  center: [
    { x: 50, y: 50, width: 80, height: 80, color: 'primary' },
    { x: 45, y: 45, width: 60, height: 60, color: 'secondary' },
    { x: 55, y: 55, width: 50, height: 50, color: 'tertiary' },
  ],
  edges: [
    { x: 0, y: 30, width: 50, height: 60, color: 'primary' },
    { x: 100, y: 70, width: 45, height: 55, color: 'secondary' },
    { x: 50, y: 0, width: 40, height: 50, color: 'tertiary' },
    { x: 50, y: 100, width: 35, height: 45, color: 'primary', opacity: 0.7 },
  ],
  diagonal: [
    { x: 20, y: 20, width: 45, height: 45, color: 'primary' },
    { x: 50, y: 50, width: 50, height: 50, color: 'secondary' },
    { x: 80, y: 80, width: 40, height: 40, color: 'tertiary' },
    { x: 35, y: 35, width: 30, height: 30, color: 'secondary', opacity: 0.6 },
  ],
  triangle: [
    { x: 50, y: 20, width: 45, height: 45, color: 'primary' },
    { x: 25, y: 75, width: 40, height: 40, color: 'secondary' },
    { x: 75, y: 75, width: 40, height: 40, color: 'tertiary' },
  ],
  spiral: [
    { x: 50, y: 50, width: 30, height: 30, color: 'primary' },
    { x: 70, y: 40, width: 35, height: 35, color: 'secondary' },
    { x: 75, y: 65, width: 40, height: 40, color: 'tertiary' },
    { x: 50, y: 80, width: 30, height: 30, color: 'primary', opacity: 0.7 },
    { x: 25, y: 70, width: 35, height: 35, color: 'secondary', opacity: 0.6 },
    { x: 20, y: 40, width: 25, height: 25, color: 'tertiary', opacity: 0.5 },
  ],
  custom: [], // Will be overridden by blobs prop
};

// Helper function to generate random blob positions with seed
const generateRandomBlobs = (
  count: number = 5,
  seed: number = 42
): BlobConfig[] => {
  // Simple seeded random number generator
  let seedValue = seed;
  const random = () => {
    seedValue = (seedValue * 9301 + 49297) % 233280;
    return seedValue / 233280;
  };

  const blobs: BlobConfig[] = [];
  const colors: ('primary' | 'secondary' | 'tertiary')[] = [
    'primary',
    'secondary',
    'tertiary',
  ];

  for (let i = 0; i < count; i++) {
    blobs.push({
      x: random() * 100,
      y: random() * 100,
      width: 25 + random() * 50, // 25-75% width
      height: 25 + random() * 50, // 25-75% height
      color: colors[i % colors.length],
      opacity: 0.4 + random() * 0.5, // 0.4-0.9 opacity
    });
  }

  return blobs;
};

// Helper function to convert Tailwind color classes to CSS color values
const tailwindToRgba = (tailwindColor: string, opacity: number = 1): string => {
  // This is a simplified mapping - in a real app you might want to use a more comprehensive solution
  const colorMap: Record<string, string> = {
    // Blues
    'blue-400': '59, 130, 246',
    'blue-500': '59, 130, 246',
    'blue-600': '37, 99, 235',
    'blue-700': '29, 78, 216',
    'blue-800': '30, 64, 175',

    // Reds
    'red-400': '248, 113, 113',
    'red-500': '239, 68, 68',
    'red-600': '220, 38, 38',
    'red-700': '185, 28, 28',
    'red-800': '153, 27, 27',

    // Greens
    'green-400': '74, 222, 128',
    'green-500': '34, 197, 94',
    'green-600': '22, 163, 74',
    'green-700': '21, 128, 61',
    'green-800': '22, 101, 52',

    // Purples
    'purple-400': '196, 181, 253',
    'purple-500': '168, 85, 247',
    'purple-600': '147, 51, 234',
    'purple-700': '126, 34, 206',
    'purple-800': '107, 33, 168',

    // Add more colors as needed
    'orange-400': '251, 146, 60',
    'orange-500': '249, 115, 22',
    'pink-400': '244, 114, 182',
    'pink-500': '236, 72, 153',
    'cyan-400': '34, 211, 238',
    'cyan-500': '6, 182, 212',
    'teal-400': '45, 212, 191',
    'teal-500': '20, 184, 166',
    'indigo-400': '129, 140, 248',
    'indigo-500': '99, 102, 241',
    'violet-400': '167, 139, 250',
    'violet-500': '139, 92, 246',
    'rose-400': '251, 113, 133',
    'rose-500': '244, 63, 94',
    'amber-400': '251, 191, 36',
    'amber-500': '245, 158, 11',
    'emerald-400': '52, 211, 153',
    'emerald-500': '16, 185, 129',
    'sky-400': '56, 189, 248',
    'sky-500': '14, 165, 233',
  };

  const rgb = colorMap[tailwindColor];
  return rgb ? `rgba(${rgb}, ${opacity})` : `rgba(59, 130, 246, ${opacity})`; // fallback to blue
};

export default function Gradient({
  className = '',
  preset = 'ocean',
  colors,
  intensity = 'medium',
  blur = true,
  placement = { preset: 'default' },
}: GradientProps) {
  const gradientStyle = useMemo(() => {
    const intensityMultiplier = INTENSITY_MULTIPLIERS[intensity];

    // Determine blob configuration
    let blobConfigs: BlobConfig[];

    if (placement.blobs) {
      // Use custom blob configuration
      blobConfigs = placement.blobs;
    } else if (placement.preset === 'scattered' && placement.count) {
      // Generate random scattered blobs
      blobConfigs = generateRandomBlobs(
        placement.count,
        placement.randomSeed || 42
      );
    } else {
      // Use predefined placement preset
      const placementPreset = placement.preset || 'default';
      blobConfigs =
        PLACEMENT_PRESETS[placementPreset] || PLACEMENT_PRESETS.default;
    }

    // Determine final colors
    let finalColors;

    if (preset === 'custom' && colors) {
      // Use custom colors with Tailwind support
      finalColors = {
        primary: colors.primary?.startsWith('rgb')
          ? colors.primary
          : tailwindToRgba(
              colors.primary || 'blue-500',
              0.9 * intensityMultiplier
            ),
        secondary: colors.secondary?.startsWith('rgb')
          ? colors.secondary
          : tailwindToRgba(
              colors.secondary || 'sky-500',
              0.9 * intensityMultiplier
            ),
        tertiary: colors.tertiary?.startsWith('rgb')
          ? colors.tertiary
          : tailwindToRgba(
              colors.tertiary || 'cyan-500',
              0.7 * intensityMultiplier
            ),
        background: colors.background?.startsWith('rgb')
          ? colors.background
          : `rgb(${
              tailwindToRgba(colors.background || 'blue-800', 1)
                .match(/\d+/g)
                ?.join(', ') || '30, 58, 138'
            })`,
      };
    } else {
      // Use preset colors with intensity adjustment
      const presetColors =
        GRADIENT_PRESETS[preset as keyof typeof GRADIENT_PRESETS] ||
        GRADIENT_PRESETS.ocean;
      finalColors = {
        primary: presetColors.primary.replace(
          /[\d.]+\)$/,
          `${0.9 * intensityMultiplier})`
        ),
        secondary: presetColors.secondary.replace(
          /[\d.]+\)$/,
          `${0.9 * intensityMultiplier})`
        ),
        tertiary: presetColors.tertiary.replace(
          /[\d.]+\)$/,
          `${0.7 * intensityMultiplier})`
        ),
        background: presetColors.background,
      };
    }

    // Generate radial gradients for each blob
    const gradients = blobConfigs.map(blob => {
      const colorKey = blob.color;
      let baseColor = finalColors[colorKey];

      // Override opacity if specified in blob config
      if (blob.opacity !== undefined) {
        baseColor = baseColor.replace(
          /[\d.]+\)$/,
          `${blob.opacity * intensityMultiplier})`
        );
      }

      return `radial-gradient(${blob.width}% ${blob.height}% at ${blob.x}% ${blob.y}%, ${baseColor} 0%, transparent 70%)`;
    });

    return {
      backgroundImage: gradients.join(','),
      backgroundColor: finalColors.background,
      filter: blur ? 'blur(0.0001px)' : 'none',
    };
  }, [preset, colors, intensity, blur, placement]);

  return (
    <div className={cn('w-full h-full', className)} style={gradientStyle} />
  );
}
