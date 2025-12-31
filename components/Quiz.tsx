
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  title: string;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, title }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === questions[currentIdx].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-600 mx-auto mb-6">
          <Trophy size={40} />
        </div>
        <h2 className="text-3xl font-black mb-2">Quiz Completed!</h2>
        <p className="text-slate-500 mb-8">You scored {score} out of {questions.length}</p>
        <button 
          onClick={() => onComplete(score)}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all"
        >
          Continue to Dashboard
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-2xl font-black text-slate-900">{title}</h2>
          <span className="text-sm font-bold text-slate-400">Question {currentIdx + 1}/{questions.length}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold mb-8 text-slate-800">{q.question}</h3>
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let stateClass = "border-slate-100 bg-slate-50 hover:border-indigo-200 text-slate-700";
            if (showResult) {
              if (idx === q.correctAnswer) {
                stateClass = "border-green-500 bg-green-50 text-green-700";
              } else if (idx === selected) {
                stateClass = "border-red-500 bg-red-50 text-red-700";
              } else {
                stateClass = "border-slate-100 bg-slate-50 text-slate-300 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleSelect(idx)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 font-bold transition-all text-left ${stateClass}`}
              >
                <span>{opt}</span>
                {showResult && idx === q.correctAnswer && <CheckCircle2 size={20} className="text-green-500" />}
                {showResult && idx === selected && idx !== q.correctAnswer && <XCircle size={20} className="text-red-500" />}
              </button>
            );
          })}
        </div>

        {showResult && (
          <button
            onClick={handleNext}
            className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all animate-in fade-in slide-in-from-bottom-2"
          >
            {currentIdx < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
