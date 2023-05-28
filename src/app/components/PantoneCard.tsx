'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Theme } from '~/src/app/constants';
import ClientRendered from '~/src/components/ClientRendered';
import Card from '~/src/components/ui/Card';
import { InfoIcon } from '../../components/icons';
import './PantoneCard.css';

type Pantone = {
  name: string;
};

const pantoneByTheme: Record<Theme, Pantone> = {
  'blue-light': { name: 'Misty Morning' },
  'blue-dark': { name: 'Midnight Cruising' },
  'red-light': { name: 'Golden Hour' },
  'red-dark': { name: 'Lava Lamp' },
  'green-light': { name: 'Pistacchio Cream' },
  'green-dark': { name: 'The Matrix' },
  dark: { name: 'Jade Dusk' },
  light: { name: 'Ghost Fog' },
};

export default function PantoneCard() {
  const [pantone, setPantone] = useState<Pantone | undefined>();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const el = document.querySelector('.main');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const [theme] = Array.from(el?.classList.values()!).filter((c) => c.startsWith('theme-'));

          setPantone(theme ? pantoneByTheme[theme.slice(6) as Theme] : undefined);
        }
      });
    });

    observer.observe(el!, {
      attributes: true,
    });
  }, []);

  return (
    <Card containerClassName="z-[3]">
      <div className="h-[268px] flex flex-col gap-4 w-full">
        <div className="bg-main-theme-2 transition-all duration-250 flex-1 rounded-lg"></div>
        <div className="flex justify-between">
          <p className="text-text-secondary">
            PANTONE{' '}
            <ClientRendered>
              {(pantone || pantoneByTheme[resolvedTheme as Theme])?.name}
            </ClientRendered>
          </p>
          <button aria-describedby="pantone-tooltip">
            <InfoIcon className="text-text-alt" />
            <div role="tooltip" id="pantone-tooltip">
              Note: These Pantone color names are entirely fictional.
            </div>
          </button>
        </div>
      </div>
    </Card>
  );
}
