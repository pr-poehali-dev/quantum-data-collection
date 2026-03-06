import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { missions } from '@/data/missions';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';

export default function Mission() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mission = missions.find((m) => m.id === id);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!mission) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <p className="text-white/60 mb-4">Миссия не найдена</p>
          <button onClick={() => navigate('/')} className="text-yellow-400 underline">На главную</button>
        </div>
      </div>
    );
  }

  const question = mission.questions[currentQ];
  const isLast = currentQ === mission.questions.length - 1;
  const stars = score === mission.questions.length ? 3 : score >= 2 ? 2 : score >= 1 ? 1 : 0;

  const handleSelect = (answerId: string) => {
    if (selected) return;
    setSelected(answerId);
    const answer = question.answers.find((a) => a.id === answerId);
    if (answer?.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="text-8xl mb-6">{stars === 3 ? '🏆' : stars === 2 ? '🥈' : stars === 1 ? '🥉' : '💪'}</div>
          <h1 className="text-4xl font-bold text-white mb-3">
            {stars === 3 ? 'Отлично!' : stars >= 2 ? 'Хорошо!' : 'Попробуй ещё!'}
          </h1>
          <p className="text-white/60 text-lg mb-6">
            Ты ответил правильно на {score} из {mission.questions.length} вопросов
          </p>
          <div className="flex justify-center gap-3 mb-10">
            {[1, 2, 3].map((s) => (
              <span key={s} className={cn('text-5xl transition-all', s <= stars ? 'opacity-100' : 'opacity-20')}>
                ⭐
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setCurrentQ(0); setSelected(null); setScore(0); setFinished(false); }}
              className="w-full rounded-xl bg-yellow-400 py-4 text-base font-bold text-slate-900 hover:bg-yellow-300 transition-all"
            >
              Пройти ещё раз
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full rounded-xl border border-white/20 bg-white/10 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              К другим миссиям
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedAnswer = question.answers.find((a) => a.id === selected);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="border-b border-white/10 px-6 py-4">
        <div className="container mx-auto max-w-3xl flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <Icon name="ArrowLeft" size={18} />
            <span className="text-sm">Назад</span>
          </button>
          <div className="flex-1 mx-4">
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${((currentQ) / mission.questions.length) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-sm text-white/50 whitespace-nowrap">
            {currentQ + 1} / {mission.questions.length}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{mission.icon}</span>
            <span className={cn('text-sm font-semibold uppercase tracking-widest', mission.accentColor)}>
              {mission.title}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">
            {question.text}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-8">
          {question.answers.map((answer) => {
            const isSelected = selected === answer.id;
            const isCorrect = answer.correct;
            const showResult = !!selected;

            let stateClass = 'border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer';
            if (showResult && isSelected && isCorrect) {
              stateClass = 'border-green-500 bg-green-500/20 cursor-default';
            } else if (showResult && isSelected && !isCorrect) {
              stateClass = 'border-red-500 bg-red-500/20 cursor-default';
            } else if (showResult && isCorrect) {
              stateClass = 'border-green-500/60 bg-green-500/10 cursor-default';
            } else if (showResult) {
              stateClass = 'border-white/10 bg-white/5 opacity-50 cursor-default';
            }

            return (
              <button
                key={answer.id}
                onClick={() => handleSelect(answer.id)}
                className={cn(
                  'w-full rounded-xl border px-6 py-4 text-left transition-all duration-200',
                  stateClass
                )}
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold',
                    showResult && isCorrect ? 'bg-green-500 text-white' :
                    showResult && isSelected ? 'bg-red-500 text-white' :
                    'bg-white/10 text-white/60'
                  )}>
                    {showResult && isCorrect ? '✓' : showResult && isSelected ? '✗' : answer.id.toUpperCase()}
                  </span>
                  <span className="text-white font-medium">{answer.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {selected && selectedAnswer && (
          <div className={cn(
            'mb-8 rounded-xl p-5 border',
            selectedAnswer.correct
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
          )}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{selectedAnswer.correct ? '✅' : '❌'}</span>
              <div>
                <p className={cn('font-semibold mb-1', selectedAnswer.correct ? 'text-green-400' : 'text-red-400')}>
                  {selectedAnswer.correct ? 'Правильно!' : 'Неверно'}
                </p>
                <p className="text-white/70 text-sm leading-relaxed">{selectedAnswer.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {selected && (
          <button
            onClick={handleNext}
            className="w-full rounded-xl bg-yellow-400 py-4 text-base font-bold text-slate-900 hover:bg-yellow-300 transition-all"
          >
            {isLast ? 'Завершить миссию' : 'Следующий вопрос →'}
          </button>
        )}
      </div>
    </div>
  );
}
