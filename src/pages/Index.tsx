import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import { missions } from '@/data/missions';

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-slate-900 min-h-screen">
      <HeroSection />

      <section className="py-24 px-8 md:px-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-yellow-400 mb-6">
              Миссии
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Выбери свою миссию
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Каждая миссия — это реальная жизненная ситуация. Принимай решения, учись и становись настоящим героем!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missions.map((mission) => (
              <div
                key={mission.id}
                className={`relative rounded-2xl border ${mission.border} bg-gradient-to-br ${mission.color} p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <div className="mb-6">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${mission.badge} mb-4`}>
                    {mission.level}
                  </span>
                  <div className="text-5xl mb-4">{mission.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{mission.title}</h3>
                  <p className="text-white/60 leading-relaxed">{mission.description}</p>
                </div>
                <button
                  onClick={() => navigate(`/mission/${mission.id}`)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20 cursor-pointer"
                >
                  Начать миссию →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8 md:px-16 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '3+', label: 'Миссии' },
              { value: '100%', label: 'Безопасно' },
              { value: '7-12', label: 'Лет' },
              { value: '∞', label: 'Попыток' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                <div className="text-white/50 text-sm uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
