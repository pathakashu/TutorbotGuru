
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Library, 
  MessageSquare, 
  DownloadCloud, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  User as UserIcon,
  CheckCircle2,
  Filter,
  Languages,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { UserProfile, AppTab, Lesson, Subject } from './types';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import LessonViewer from './components/LessonViewer';
import Onboarding from './components/Onboarding';
import { MOCK_LESSONS, LANGUAGES } from './constants';
import { translations } from './translations';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [chatContext, setChatContext] = useState<string | undefined>(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // Library filters
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All'>('All');
  const [selectedGrade, setSelectedGrade] = useState<string | 'All'>('All');

  useEffect(() => {
    const saved = localStorage.getItem('tutorbot_india_profile');
    if (saved) {
      const profile = JSON.parse(saved);
      setUserProfile(profile);
      setSelectedGrade(profile.grade);
    } else {
      setActiveTab(AppTab.ONBOARDING);
    }
    const savedDownloads = localStorage.getItem('tutorbot_downloads');
    if (savedDownloads) {
      setDownloadedIds(JSON.parse(savedDownloads));
    }
  }, []);

  const handleOnboarding = (profile: UserProfile) => {
    setUserProfile(profile);
    setSelectedGrade(profile.grade);
    localStorage.setItem('tutorbot_india_profile', JSON.stringify(profile));
    setActiveTab(AppTab.DASHBOARD);
  };

  const handleLogout = () => {
    if (confirm('Log out of Tutorbot?')) {
      localStorage.removeItem('tutorbot_india_profile');
      setUserProfile(null);
      setActiveTab(AppTab.ONBOARDING);
    }
  };

  const changeLanguage = (code: string) => {
    if (!userProfile) return;
    const updatedProfile = { ...userProfile, preferredLanguage: code };
    setUserProfile(updatedProfile);
    localStorage.setItem('tutorbot_india_profile', JSON.stringify(updatedProfile));
    setIsLangMenuOpen(false);
  };

  const t = (key: string) => {
    const lang = userProfile?.preferredLanguage || 'en';
    return translations[lang]?.[key] || translations['en'][key] || key;
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!userProfile) return;
    const isNewCompletion = !userProfile.completedLessons.includes(lessonId);
    if (isNewCompletion) {
      const updatedProfile = {
        ...userProfile,
        completedLessons: [...userProfile.completedLessons, lessonId],
        points: userProfile.points + 50,
      };
      setUserProfile(updatedProfile);
      localStorage.setItem('tutorbot_india_profile', JSON.stringify(updatedProfile));
    }
    setActiveLesson(null);
    setActiveTab(AppTab.DASHBOARD);
  };

  const toggleDownload = (id: string) => {
    const newDownloads = downloadedIds.includes(id) ? downloadedIds.filter(d => d !== id) : [...downloadedIds, id];
    setDownloadedIds(newDownloads);
    localStorage.setItem('tutorbot_downloads', JSON.stringify(newDownloads));
  };

  const navItems = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: t('home') },
    { id: AppTab.LIBRARY, icon: Library, label: t('library') },
    { id: AppTab.CHAT, icon: MessageSquare, label: t('doubtSupport') },
    { id: AppTab.OFFLINE, icon: DownloadCloud, label: t('offline') },
  ];

  const filteredLessons = MOCK_LESSONS.filter(lesson => {
    const matchesSubject = selectedSubject === 'All' || lesson.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'All' || lesson.level.includes(selectedGrade.replace('Class ', '')) || lesson.level === selectedGrade;
    const isBoardRelevant = lesson.board === 'All' || lesson.board === userProfile?.board;
    return matchesSubject && matchesGrade && isBoardRelevant;
  });

  if (!userProfile && activeTab === AppTab.ONBOARDING) {
    return <div className="min-h-screen"><Onboarding onComplete={handleOnboarding} /></div>;
  }

  const currentLangName = LANGUAGES.find(l => l.code === (userProfile?.preferredLanguage || 'en'))?.name || 'English';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDF6F0]">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/90 backdrop-blur-md border-b border-orange-100 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-lg flex items-center justify-center text-white font-black shadow-md">T</div>
          <span className="font-black text-lg text-slate-900 font-heading tracking-tight">Tutorbot Guru</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 text-slate-600 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm active:scale-95 transition-all">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 md:relative md:flex md:flex-col bg-white border-r border-orange-100 transition-transform duration-500 w-72 flex-shrink-0 shadow-2xl md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-10 hidden md:flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-2xl flex items-center justify-center text-white font-black shadow-xl shadow-orange-100 font-heading text-xl">T</div>
          <span className="font-black text-2xl text-slate-900 tracking-tight font-heading">Tutorbot Guru</span>
        </div>
        
        <nav className="flex-1 px-5 mt-4 space-y-2">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => { setActiveTab(item.id); setActiveLesson(null); setIsSidebarOpen(false); }} 
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-[24px] font-black transition-all group ${activeTab === item.id ? 'bg-orange-600 text-white shadow-xl shadow-orange-200' : 'text-slate-500 hover:bg-orange-50'}`}
            >
              <item.icon size={22} className={`${activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-orange-500"} transition-colors`} /> 
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-4">
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="w-full flex items-center justify-between gap-3 p-4 bg-white border-2 border-slate-100 rounded-[22px] hover:border-orange-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Languages size={18} className="text-orange-500" />
                <span className="text-xs font-black text-slate-600 group-hover:text-orange-600">{currentLangName}</span>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-[24px] shadow-2xl border border-slate-100 p-2 z-[60] animate-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 gap-1 max-h-[200px] overflow-y-auto custom-scrollbar">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors ${userProfile?.preferredLanguage === lang.code ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-[28px] border border-slate-100 shadow-inner group transition-all hover:bg-slate-100">
             <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-orange-600 shadow-sm shrink-0 border border-orange-50 transition-transform group-hover:scale-110">
               <UserIcon size={22} />
             </div>
             <div className="overflow-hidden">
                <p className="font-black text-sm text-slate-900 truncate font-heading">{userProfile?.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('class')} {userProfile?.grade.replace('Class ', '')}</p>
             </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 hover:text-red-500 py-3 transition-colors uppercase tracking-[0.2em]">
            <LogOut size={14} /> {t('logout')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-12 overflow-x-hidden">
        {activeLesson ? (
          <LessonViewer 
            lesson={activeLesson} onBack={() => setActiveLesson(null)} 
            onComplete={handleCompleteLesson} onDownload={toggleDownload}
            onOpenChat={() => { setChatContext(activeLesson.title); setActiveTab(AppTab.CHAT); setActiveLesson(null); }}
            isDownloaded={downloadedIds.includes(activeLesson.id)}
            t={t}
          />
        ) : (
          <div className="max-w-6xl mx-auto animate-in fade-in duration-1000">
            {activeTab === AppTab.DASHBOARD && userProfile && (
              <Dashboard 
                profile={userProfile} 
                onStartLesson={setActiveLesson} 
                onOpenChat={() => setActiveTab(AppTab.CHAT)} 
                t={t}
              />
            )}
            
            {activeTab === AppTab.LIBRARY && (
              <div className="space-y-10">
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-900 font-heading leading-tight">{t('library')}</h1>
                    <p className="text-sm text-slate-500 font-medium tracking-wide">Verified: {userProfile?.board} Syllabus</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-[24px] border border-slate-200 shadow-sm transition-all focus-within:ring-4 focus-within:ring-orange-500/10 focus-within:border-orange-200">
                      <Filter size={18} className="text-slate-400" />
                      <select 
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        className="bg-transparent text-sm font-black outline-none cursor-pointer text-slate-700"
                      >
                        <option value="All">{t('allGrades')}</option>
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={`Class ${n}`}>{t('class')} {n}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-[24px] border border-slate-200 shadow-sm transition-all focus-within:ring-4 focus-within:ring-orange-500/10 focus-within:border-orange-200">
                      <select 
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value as Subject | 'All')}
                        className="bg-transparent text-sm font-black outline-none cursor-pointer text-slate-700"
                      >
                        <option value="All">{t('allSubjects')}</option>
                        {['Maths', 'Science', 'EVS', 'Social Science', 'English', 'Coding'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </header>

                {filteredLessons.length === 0 ? (
                  <div className="bg-white/40 p-20 rounded-[56px] text-center border-2 border-dashed border-slate-200 backdrop-blur-sm">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-6">
                      <Library size={40} />
                    </div>
                    <p className="text-slate-400 text-lg font-black tracking-tight mb-2">No board-specific lessons found</p>
                    <p className="text-slate-400 text-sm font-medium">Try changing your grade or subject filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredLessons.map(lesson => (
                      <div 
                        key={lesson.id} 
                        className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group flex flex-col h-full border-b-4 border-b-transparent hover:border-b-orange-500" 
                        onClick={() => setActiveLesson(lesson)}
                      >
                        <div className="h-56 bg-slate-200 relative overflow-hidden">
                          <img src={lesson.videoUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                          <div className="absolute top-5 left-5 flex flex-col gap-2">
                            <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-orange-600 shadow-xl">
                              {lesson.level}
                            </div>
                            {lesson.board && lesson.board !== 'All' && (
                              <div className="px-3 py-1.5 bg-indigo-600/90 backdrop-blur-md rounded-xl text-[8px] font-black uppercase tracking-widest text-white flex items-center gap-1 shadow-xl">
                                <ShieldCheck size={10} /> {lesson.board.split(' ')[0]}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                           <span className="text-[10px] font-black text-orange-500 uppercase mb-3 tracking-[0.2em]">{lesson.subject}</span>
                           <h3 className="font-bold text-2xl leading-tight mb-3 group-hover:text-orange-600 transition-colors font-heading">{lesson.title}</h3>
                           <p className="text-sm text-slate-500 mb-8 line-clamp-2 leading-relaxed font-medium">{lesson.description}</p>
                           <div className="flex items-center justify-between mt-auto">
                             <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">{lesson.duration}</span>
                             <button className="text-orange-600 font-black text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                               {t('startLearning')} <ChevronRight size={18} />
                             </button>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === AppTab.CHAT && userProfile && <ChatBot userProfile={userProfile} initialContext={chatContext} />}
            
            {activeTab === AppTab.OFFLINE && (
              <div className="space-y-10">
                <h1 className="text-4xl font-black font-heading leading-tight">{t('offline')} Pathshala</h1>
                {downloadedIds.length === 0 ? (
                  <div className="bg-white/40 p-20 rounded-[56px] text-center border-2 border-dashed border-slate-200 backdrop-blur-sm">
                    <p className="text-slate-400 text-lg font-black tracking-tight mb-8">No offline lessons saved yet.</p>
                    <button 
                      onClick={() => setActiveTab(AppTab.LIBRARY)} 
                      className="px-10 py-5 bg-orange-600 text-white rounded-[28px] font-black text-lg shadow-2xl shadow-orange-100 hover:scale-105 transition-all"
                    >
                      {t('library')}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_LESSONS.filter(l => downloadedIds.includes(l.id)).map(lesson => (
                      <div 
                        key={lesson.id} 
                        className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm p-8 cursor-pointer hover:shadow-2xl hover:border-orange-100 transition-all group" 
                        onClick={() => setActiveLesson(lesson)}
                      >
                         <div className="flex items-center gap-5 mb-6">
                           <div className="w-14 h-14 bg-green-50 rounded-[22px] flex items-center justify-center text-green-600 shadow-inner group-hover:scale-110 transition-transform"><CheckCircle2 size={28} /></div>
                           <h3 className="font-bold text-xl text-slate-900 font-heading leading-tight">{lesson.title}</h3>
                         </div>
                         <button className="w-full py-4 bg-slate-50 border-2 border-slate-100 text-slate-600 rounded-[22px] text-xs font-black hover:bg-orange-600 hover:border-orange-500 hover:text-white transition-all shadow-sm">
                           Open Offline
                         </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
