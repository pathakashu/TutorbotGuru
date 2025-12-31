
import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Star, ChevronRight, TrendingUp, Target, Sparkles, Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { UserProfile, Lesson } from '../types';
import { MOCK_LESSONS, BADGES } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { analyzeProgress } from '../services/ai';

interface DashboardProps {
  profile: UserProfile;
  onStartLesson: (lesson: Lesson) => void;
  onOpenChat: () => void;
  t: (key: string) => string;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onStartLesson, onOpenChat, t }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const chartData = [
    { day: 'M', xp: 12 },
    { day: 'T', xp: 45 },
    { day: 'W', xp: 30 },
    { day: 'T', xp: 70 },
    { day: 'F', xp: Math.floor(profile.points / 10) },
  ];

  const fetchAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const completed = MOCK_LESSONS.filter(l => profile.completedLessons.includes(l.id));
      const result = await analyzeProgress(profile, completed);
      setAnalysis(result);
      if (result) localStorage.setItem(`tutorbot_analysis_${profile.name}`, result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem(`tutorbot_analysis_${profile.name}`);
    if (cached) {
      setAnalysis(cached);
    } else {
      fetchAnalysis();
    }
  }, [profile.points]);

  // Logic: First find lessons that match the user's Grade exactly AND their board.
  const recommended = MOCK_LESSONS.filter(lesson => {
    const isNotCompleted = !profile.completedLessons.includes(lesson.id);
    const matchesGrade = lesson.level.includes(profile.grade.replace('Class ', '')) || lesson.level === profile.grade;
    const matchesBoard = lesson.board === profile.board || lesson.board === 'All';
    return isNotCompleted && matchesGrade && matchesBoard;
  }).slice(0, 3);

  const finalRecommended = recommended.length > 0 ? recommended : MOCK_LESSONS.filter(l => !profile.completedLessons.includes(l.id)).slice(0, 2);

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-[24px] flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-orange-100 font-heading">
            {profile.name[0]}
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 leading-none mb-1 font-heading">{t('welcome')}, {profile.name}!</h1>
            <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">{t('class')} {profile.grade.replace('Class ', '')} • {profile.board}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-md p-5 rounded-[28px] border border-orange-50 shadow-sm flex items-center gap-4 group hover:bg-orange-600 transition-all duration-500">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-white/20 group-hover:text-white transition-colors">
              <Flame size={24} />
            </div>
            <div>
              <p className="text-2xl font-black leading-none group-hover:text-white font-heading">{profile.streak}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-orange-100">{t('days')}</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-5 rounded-[28px] border border-blue-50 shadow-sm flex items-center gap-4 group hover:bg-blue-600 transition-all duration-500">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-white/20 group-hover:text-white transition-colors">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-2xl font-black leading-none group-hover:text-white font-heading">{profile.points}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-100">{t('xp')}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-950 p-8 rounded-[40px] text-white shadow-2xl shadow-indigo-100 border border-white/10">
            <div className="absolute -top-10 -right-10 p-10 opacity-10 pointer-events-none">
              <Sparkles size={240} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black flex items-center gap-3 font-heading">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="text-yellow-400 fill-yellow-400" size={20} />
                  </div>
                  {t('guruInsight')}
                </h2>
                <button 
                  onClick={fetchAnalysis}
                  disabled={isAnalyzing}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all disabled:opacity-50 active:scale-90"
                >
                  <RefreshCw size={20} className={isAnalyzing ? "animate-spin" : ""} />
                </button>
              </div>

              {isAnalyzing ? (
                <div className="py-12 flex flex-col items-center justify-center text-indigo-100">
                  <div className="relative">
                    <Loader2 size={40} className="animate-spin mb-4" />
                    <Sparkles size={16} className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" />
                  </div>
                  <p className="text-sm font-bold animate-pulse tracking-wide uppercase">{t('guruAnalyzing')}</p>
                </div>
              ) : analysis ? (
                <div className="prose prose-sm prose-invert max-w-none">
                  <ReactMarkdown className="space-y-5 text-indigo-50/90 leading-relaxed font-medium">
                    {analysis}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="py-6 text-center bg-white/5 rounded-[24px] border border-white/5">
                   <p className="text-indigo-200 text-sm font-medium">{t('startFirstLesson')}</p>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-md p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-3 text-slate-900 mb-8 font-heading">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                <TrendingUp size={20} />
              </div>
              {t('progress')}
            </h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EA580C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EA580C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px 16px'}}
                  />
                  <Area type="monotone" dataKey="xp" stroke="#EA580C" strokeWidth={4} fillOpacity={1} fill="url(#colorXp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3 font-heading">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Target size={20} />
                </div>
                {t('syllabusFocus')}: {profile.grade}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {finalRecommended.map(lesson => (
                <div key={lesson.id} className="bg-white p-6 rounded-[32px] border border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden flex flex-col h-full" onClick={() => onStartLesson(lesson)}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 font-bold group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                      {lesson.subject[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lesson.subject}</p>
                        {lesson.board === profile.board && (
                          <span className="flex items-center gap-1 text-[8px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md uppercase">
                            <ShieldCheck size={10} /> Syllabus Match
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 leading-tight line-clamp-1 group-hover:text-orange-600 transition-colors font-heading">{lesson.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-6 line-clamp-2 leading-relaxed">{lesson.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl">{lesson.duration}</span>
                    <span className="text-orange-600 text-sm font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">Padho <ChevronRight size={16} /></span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white/80 backdrop-blur-md p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900 font-heading">
              <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-500">
                <Star className="fill-yellow-500" size={20} />
              </div>
              {t('achievements')}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {BADGES.map(badge => (
                <div 
                  key={badge.id} 
                  className={`flex flex-col items-center justify-center p-4 rounded-[24px] border-2 transition-all duration-500 ${profile.badges.includes(badge.id) ? badge.color : 'bg-slate-50 border-slate-50 opacity-40 grayscale'}`}
                >
                  <span className="text-3xl mb-2 drop-shadow-sm">{badge.icon}</span>
                  <span className="text-[10px] font-black text-center leading-tight uppercase tracking-widest">{badge.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-tr from-orange-600 to-orange-400 p-8 rounded-[40px] text-white shadow-2xl shadow-orange-200 relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-2 font-heading">{t('doubtSupport')}</h2>
              <p className="text-orange-50 text-xs mb-6 leading-relaxed opacity-90">{t('askGuru')} in your language to solve any board-specific doubts.</p>
              <button 
                onClick={onOpenChat}
                className="w-full py-4 bg-white text-orange-600 rounded-[20px] font-black text-sm hover:bg-orange-50 transition-all shadow-lg active:scale-95"
              >
                {t('askGuru')}
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
