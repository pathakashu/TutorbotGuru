
import React, { useState } from 'react';
import { UserProfile, Board } from '../types';
import { Sparkles, GraduationCap, Globe, ArrowRight, MapPin } from 'lucide-react';
import { LANGUAGES, INDIAN_STATES, BOARDS } from '../constants';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    learningGoal: 'Skill Mastery',
    preferredLanguage: 'hi',
    board: 'NCERT/CBSE' as Board,
    state: 'Maharashtra'
  });

  const nextStep = () => setStep(prev => prev + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      ...formData,
      completedLessons: [],
      points: 50,
      badges: [],
      streak: 1,
      level: 'Beginner'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FDF6F0]">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-xl border border-orange-100 overflow-hidden">
        <div className="h-2 bg-slate-100">
          <div 
            className="h-full bg-orange-600 transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                  <Sparkles size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Namaste! What is your name?</h2>
              </div>
              <input
                autoFocus
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-orange-500 text-lg transition-all"
              />
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Select Your Language</label>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.slice(0, 4).map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, preferredLanguage: lang.code }))}
                      className={`px-3 py-3 rounded-xl border-2 text-sm font-bold transition-all ${formData.preferredLanguage === lang.code ? 'border-orange-600 bg-orange-50 text-orange-600' : 'border-slate-50 bg-slate-50 text-slate-400'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.name}
                className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold text-lg hover:bg-orange-700 disabled:bg-slate-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
              >
                Next <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <GraduationCap size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Your School Info</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">School Board</label>
                  <select
                    value={formData.board}
                    onChange={e => setFormData(prev => ({ ...prev, board: e.target.value as Board }))}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-orange-500 outline-none"
                  >
                    {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Class / Grade</label>
                  <select
                    required
                    value={formData.grade}
                    onChange={e => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-orange-500 outline-none"
                  >
                    <option value="">Select Class</option>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={`Class ${n}`}>Class {n}</option>)}
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.grade}
                className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold text-lg hover:bg-orange-700 disabled:bg-slate-300 transition-all flex items-center justify-center gap-2"
              >
                Next <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                  <MapPin size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Last Step!</h2>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Your State</label>
                <select
                  value={formData.state}
                  onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-orange-500 outline-none mb-6"
                >
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                <p className="text-xs text-orange-700 leading-relaxed font-medium text-center">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-xl hover:bg-orange-700 shadow-xl shadow-orange-100 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Let's Study! <Sparkles size={24} />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
