'use client';

import { TinyColor } from '@ctrl/tinycolor';
import { PaintBucket } from 'lucide-react';
import { cn } from '@/lib/utils';

const SHADE_VALUES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const PRIMARY_SHADE_PROPERTIES = {
  50: { l: 96, s: 90 },
  100: { l: 90, s: 70 },
  200: { l: 82, s: 60 },
  300: { l: 70, s: 70 },
  400: { l: 53, s: 60 },
  500: { l: 43, s: 70 },
  600: { l: 36, s: 70 },
  700: { l: 30, s: 60 },
  800: { l: 26, s: 50 },
  900: { l: 23, s: 50 },
  950: { l: 15, s: 60 },
};

const SECONDARY_SHADE_PROPERTIES = {
  50: { l: 96, s: 10 },
  100: { l: 90, s: 10 },
  200: { l: 82, s: 10 },
  300: { l: 70, s: 10 },
  400: { l: 50, s: 10 },
  500: { l: 42, s: 10 },
  600: { l: 36, s: 10 },
  700: { l: 30, s: 10 },
  800: { l: 26, s: 10 },
  900: { l: 23, s: 10 },
  950: { l: 15, s: 10 },
};

/**
 * @typedef {Object} ShadeProperties
 * @property {number} l - Lightness value (0-100).
 * @property {number} s - Saturation value (0-100).
 */
const generateShades = (
  baseColor: string,
  shadeProperties: { [key: number]: { l: number; s: number } },
  prefix: string,
) => {
  const inputColor = new TinyColor(baseColor);
  const inputHsl = inputColor.toHsl();
  const isAchromatic = inputHsl.s === 0;
  const baseHue = inputHsl.h;
  const shades: { [key: string]: string } = {};

  SHADE_VALUES.forEach((shade) => {
    const props = shadeProperties[shade];
    if (props) {
      let newColor;
      if (isAchromatic) {
        newColor = new TinyColor({ h: 0, s: 0, l: props.l });
      } else {
        newColor = new TinyColor({ h: baseHue, s: props.s, l: props.l });
      }
      shades[`--${prefix}-${shade}`] = newColor.toHexString();
    }
  });

  return shades;
};

const Customizer = () => {
  const generateTailwindShades = (baseColor: string) => {
    return generateShades(baseColor, PRIMARY_SHADE_PROPERTIES, 'primary');
  };

  const generateSecondaryShades = (baseColor: string) => {
    return generateShades(baseColor, SECONDARY_SHADE_PROPERTIES, 'secondary');
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const primaryShades = generateTailwindShades(event.target.value);
      const secondaryShades = generateSecondaryShades(event.target.value);
      let cssVariables = '';

      for (const key in primaryShades) {
        document.documentElement.style.setProperty(key, primaryShades[key]);
        cssVariables += `${key}: ${primaryShades[key]};\n`;
      }
      for (const key in secondaryShades) {
        document.documentElement.style.setProperty(key, secondaryShades[key]);
        cssVariables += `${key}: ${secondaryShades[key]};\n`;
      }

      console.log(
        '/* Copy & paste the following CSS variables to src/app/globals.css, replacing the existing ones */\n' +
          cssVariables,
      );
    }
  };

  const handleOpenCV = () => {
    window.open('/CV-STEVEN.pdf', '_blank');
  };

  return (
    <div className={cn('fixed bottom-4 right-4 flex flex-col gap-3')}>
      {/* Botón de color */}
      <label
        className={cn(
          'inline-flex p-3 rounded-full',
          'bg-primary-500 hover:bg-primary-600 text-primary-100',
          'shadow-2xl shadow-black/10 transition-colors',
        )}
      >
        <PaintBucket className="w-6 h-6" />
        <input type="color" className="absolute opacity-0" onChange={handleColorChange} />
      </label>

      {/* Nuevo botón para CV */}
      <button
        onClick={handleOpenCV}
        className={cn(
          'inline-flex p-3 rounded-full',
          'bg-primary-500 hover:bg-primary-600 text-primary-100',
          'shadow-2xl shadow-black/10 transition-colors',
        )}
      >
        <span className="w-6 h-6 flex items-center justify-center font-bold">CV</span>
      </button>
    </div>
  );
};

export default Customizer;


