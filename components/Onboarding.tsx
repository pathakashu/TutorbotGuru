
import React, { useState } from 'react';
import { UserProfile, Board } from '../types';
import { Sparkles, GraduationCap, Globe, ArrowRight, MapPin, CheckCircle } from 'lucide-react';
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
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FDF6F0]">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl border border-orange-100 overflow-hidden relative">
        <div className="h-2 bg-slate-100">
          <div 
            className="h-full bg-orange-600 transition-all duration-700 ease-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-10">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="space-y-2">
                <div className="w-14 h-14 bg-orange-100 rounded-[22px] flex items-center justify-center text-orange-600 mb-6 shadow-sm border border-orange-50">
                  <Sparkles size={28} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">Namaste!<br/>What is your name?</h2>
              </div>
              
              <input
                autoFocus
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
                className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-[24px] focus:outline-none focus:border-orange-500 text-lg transition-all shadow-inner font-bold"
              />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-orange-500" />
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Select Your Language</label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, preferredLanguage: lang.code }))}
                      className={`relative px-4 py-4 rounded-[20px] border-2 text-sm font-bold transition-all flex items-center justify-center gap-2 ${formData.preferredLanguage === lang.code ? 'border-orange-600 bg-orange-50 text-orange-600 shadow-md shadow-orange-100' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                    >
                      {lang.name}
                      {formData.preferredLanguage === lang.code && (
                        <CheckCircle size={14} className="absolute top-2 right-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.name}
                className="w-full py-5 bg-orange-600 text-white rounded-[24px] font-black text-xl hover:bg-orange-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-100 active:scale-95"
              >
                Next Step <ArrowRight size={22} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="space-y-2">
                <div className="w-14 h-14 bg-blue-100 rounded-[22px] flex items-center justify-center text-blue-600 mb-6 shadow-sm border border-blue-50">
                  <GraduationCap size={28} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">Great!<br/>Your School Info</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Which School Board?</label>
                  <div className="grid grid-cols-1 gap-2">
                    {BOARDS.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, board: b as Board }))}
                        className={`px-5 py-4 rounded-2xl border-2 text-sm font-bold text-left transition-all ${formData.board === b ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-50 bg-slate-50 text-slate-400'}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Which Class / Grade?</label>
                  <select
                    required
                    value={formData.grade}
                    onChange={e => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-[20px] focus:border-orange-500 outline-none font-bold"
                  >
                    <option value="">Select Grade</option>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={`Class ${n}`}>Class {n}</option>)}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.grade}
                className="w-full py-5 bg-orange-600 text-white rounded-[24px] font-black text-xl hover:bg-orange-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-100 active:scale-95"
              >
                Continue <ArrowRight size={22} />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="space-y-2">
                <div className="w-14 h-14 bg-green-100 rounded-[22px] flex items-center justify-center text-green-600 mb-6 shadow-sm border border-green-50">
                  <MapPin size={28} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 font-heading leading-tight">Almost there!<br/>Your Location</h2>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Which State are you from?</label>
                <div className="max-h-[240px] overflow-y-auto pr-2 grid grid-cols-1 gap-2 custom-scrollbar">
                  {INDIAN_STATES.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, state: s }))}
                      className={`px-5 py-4 rounded-2xl border-2 text-sm font-bold text-left transition-all ${formData.state === s ? 'border-green-600 bg-green-50 text-green-700' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-[28px] border border-orange-100 relative">
                <div className="absolute top-3 left-3 text-orange-200"><Sparkles size={20} /></div>
                <p className="text-xs text-orange-700 leading-relaxed font-bold text-center italic">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-6 bg-gradient-to-tr from-orange-600 to-orange-400 text-white rounded-[28px] font-black text-2xl hover:brightness-110 shadow-2xl shadow-orange-200 active:scale-95 transition-all flex items-center justify-center gap-4"
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
