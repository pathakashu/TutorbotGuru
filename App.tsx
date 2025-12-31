
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
  Languages
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
    return matchesSubject && matchesGrade;
  });

  if (!userProfile && activeTab === AppTab.ONBOARDING) {
    return <div className="min-h-screen"><Onboarding onComplete={handleOnboarding} /></div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/80 backdrop-blur-md border-b border-orange-100 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-lg flex items-center justify-center text-white font-black shadow-md">T</div>
          <span className="font-black text-lg text-slate-900 font-heading">Tutorbot Guru</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600 bg-slate-50 rounded-xl">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 md:relative md:flex md:flex-col bg-white border-r border-orange-100 transition-transform duration-500 w-72 flex-shrink-0 shadow-2xl md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-8 hidden md:flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-orange-200">T</div>
          <span className="font-black text-xl text-slate-900 tracking-tight font-heading">Tutorbot Guru</span>
        </div>
        
        <nav className="flex-1 px-4 mt-4 space-y-2">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => { setActiveTab(item.id); setActiveLesson(null); setIsSidebarOpen(false); }} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-orange-600 text-white shadow-xl shadow-orange-200' : 'text-slate-500 hover:bg-orange-50'}`}
            >
              <item.icon size={22} className={activeTab === item.id ? "text-white" : "text-slate-400"} /> 
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-[24px] mb-4 border border-slate-100 shadow-inner group">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-600 shadow-sm shrink-0 border border-orange-50">
               <UserIcon size={20} />
             </div>
             <div className="overflow-hidden">
                <p className="font-black text-sm text-slate-900 truncate font-heading">{userProfile?.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('class')} {userProfile?.grade.replace('Class ', '')}</p>
             </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 py-3 transition-colors">
            <LogOut size={14} /> {t('logout')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 overflow-x-hidden">
        {activeLesson ? (
          <LessonViewer 
            lesson={activeLesson} onBack={() => setActiveLesson(null)} 
            onComplete={handleCompleteLesson} onDownload={toggleDownload}
            onOpenChat={() => { setChatContext(activeLesson.title); setActiveTab(AppTab.CHAT); setActiveLesson(null); }}
            isDownloaded={downloadedIds.includes(activeLesson.id)}
            t={t}
          />
        ) : (
          <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
            {activeTab === AppTab.DASHBOARD && userProfile && (
              <Dashboard 
                profile={userProfile} 
                onStartLesson={setActiveLesson} 
                onOpenChat={() => setActiveTab(AppTab.CHAT)} 
                t={t}
              />
            )}
            
            {activeTab === AppTab.LIBRARY && (
              <div className="space-y-8">
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 font-heading">{t('library')}</h1>
                    <p className="text-sm text-slate-500 font-medium">Syllabus: {userProfile?.board}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm transition-all focus-within:ring-2 focus-within:ring-orange-500/20">
                      <Filter size={16} className="text-slate-400" />
                      <select 
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        className="bg-transparent text-sm font-bold outline-none cursor-pointer"
                      >
                        <option value="All">{t('allGrades')}</option>
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={`Class ${n}`}>{t('class')} {n}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm transition-all focus-within:ring-2 focus-within:ring-orange-500/20">
                      <select 
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value as Subject | 'All')}
                        className="bg-transparent text-sm font-bold outline-none cursor-pointer"
                      >
                        <option value="All">{t('allSubjects')}</option>
                        {['Maths', 'Science', 'EVS', 'Social Science', 'English', 'Coding'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </header>

                {filteredLessons.length === 0 ? (
                  <div className="bg-white/60 p-16 rounded-[48px] text-center border border-slate-100 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                      <Library size={32} />
                    </div>
                    <p className="text-slate-400 font-bold">No lessons found. Change your filters!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredLessons.map(lesson => (
                      <div 
                        key={lesson.id} 
                        className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-full" 
                        onClick={() => setActiveLesson(lesson)}
                      >
                        <div className="h-48 bg-slate-200 relative overflow-hidden">
                          <img src={lesson.videoUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                          <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-orange-600 shadow-sm">
                            {lesson.level}
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                           <span className="text-[10px] font-black text-orange-600 uppercase mb-2 tracking-widest">{lesson.subject}</span>
                           <h3 className="font-bold text-xl leading-tight mb-2 group-hover:text-orange-600 transition-colors font-heading">{lesson.title}</h3>
                           <p className="text-xs text-slate-500 mb-6 line-clamp-2 leading-relaxed">{lesson.description}</p>
                           <div className="flex items-center justify-between mt-auto">
                             <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg">{lesson.duration}</span>
                             <button className="text-orange-600 font-black text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                               {t('startLearning')} <ChevronRight size={16} />
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
              <div className="space-y-8">
                <h1 className="text-3xl font-black font-heading">{t('offline')} Pathshala</h1>
                {downloadedIds.length === 0 ? (
                  <div className="bg-white/60 p-16 rounded-[48px] text-center border border-slate-100 backdrop-blur-sm">
                    <p className="text-slate-400 font-bold mb-6">No offline lessons yet.</p>
                    <button 
                      onClick={() => setActiveTab(AppTab.LIBRARY)} 
                      className="px-8 py-4 bg-orange-600 text-white rounded-[20px] font-bold shadow-lg shadow-orange-100 hover:scale-105 transition-transform"
                    >
                      {t('library')}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_LESSONS.filter(l => downloadedIds.includes(l.id)).map(lesson => (
                      <div 
                        key={lesson.id} 
                        className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm p-6 cursor-pointer hover:shadow-lg transition-all" 
                        onClick={() => setActiveLesson(lesson)}
                      >
                         <div className="flex items-center gap-4 mb-4">
                           <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600"><CheckCircle2 size={24} /></div>
                           <h3 className="font-bold text-slate-900 font-heading">{lesson.title}</h3>
                         </div>
                         <button className="w-full py-3 bg-slate-50 border-2 border-slate-100 text-slate-600 rounded-[18px] text-xs font-black hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all">
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
