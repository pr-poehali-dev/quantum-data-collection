import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const images = [
  'https://cdn.poehali.dev/projects/ecb8a2e0-d02d-4715-a53b-0cae1f726f6b/files/e5a34fc4-d53a-4f48-a1d4-54ab88c54a64.jpg',
  'https://cdn.poehali.dev/projects/ecb8a2e0-d02d-4715-a53b-0cae1f726f6b/files/2586b4ea-e682-4db4-bd11-15563d92d2b5.jpg',
  'https://cdn.poehali.dev/projects/ecb8a2e0-d02d-4715-a53b-0cae1f726f6b/files/eda44524-7603-431a-9256-e2ea268427bb.jpg',
  'https://cdn.poehali.dev/projects/ecb8a2e0-d02d-4715-a53b-0cae1f726f6b/files/7b1650a0-a9ab-47ab-b1d2-6a78412f40c4.jpg',
];

const missions = [
  'Пожар в здании',
  'Потерялся в городе',
  'Встреча с незнакомцем',
  'Команда спасателей',
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={src}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img
              src={src}
              alt={missions[index]}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent" />

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-8 md:px-16">
          <div className="flex max-w-2xl flex-col gap-10">

            <div
              className={cn(
                'transform transition-all duration-1000 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              )}
            >
              <span className="inline-block rounded-full border border-yellow-400/50 bg-yellow-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-yellow-400">
                🛡️ Игра-тренажёр по безопасности
              </span>
            </div>

            <div
              className={cn(
                'transform transition-all duration-1000 delay-200 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              )}
            >
              <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Герои-
                <br />
                <span className="text-yellow-400">Спасатели</span>
              </h1>
            </div>

            <div
              className={cn(
                'transform transition-all duration-1000 delay-300 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              )}
            >
              <p className="text-xl font-light leading-relaxed text-white/80 md:text-2xl">
                Стань героем и пройди миссии по безопасному поведению.
                Выбирай правильные действия — защити себя и других!
              </p>
            </div>

            <div
              className={cn(
                'transform transition-all duration-1000 delay-500 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              )}
            >
              <div className="flex flex-wrap gap-4">
                <button className="rounded-full bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-yellow-400/30 transition-all hover:scale-105 hover:bg-yellow-300">
                  Начать игру
                </button>
                <button className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  О миссиях
                </button>
              </div>
            </div>

            <div
              className={cn(
                'transform transition-all duration-1000 delay-700 ease-out',
                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/50">Текущая миссия:</span>
                <span className="text-sm font-semibold text-yellow-400">
                  {missions[currentIndex]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-1 transition-all duration-300',
              currentIndex === index ? 'w-12 bg-yellow-400' : 'w-8 bg-white/40 hover:bg-white/60'
            )}
            aria-label={`Перейти к миссии ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
