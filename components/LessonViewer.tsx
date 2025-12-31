
import React, { useState } from 'react';
import { Volume2, ChevronLeft, Download, CheckCircle, Play, HelpCircle, AlertCircle, X, Headphones } from 'lucide-react';
import { Lesson } from '../types';
import { speakText } from '../services/ai';
import Quiz from './Quiz';

interface LessonViewerProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (id: string) => void;
  onDownload: (id: string) => void;
  onOpenChat: () => void;
  isDownloaded: boolean;
  t: (key: string) => string;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onBack, onComplete, onDownload, onOpenChat, isDownloaded, t }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSpeech = async () => {
    if (isPlaying && audioSource) {
      audioSource.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const buffer = await speakText(lesson.content);
    if (buffer) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start();
      source.onended = () => setIsPlaying(false);
      setAudioSource(source);
    } else {
      setIsPlaying(false);
      alert("Speech synthesis failed.");
    }
  };

  const handleCompleteClick = () => {
    setShowConfirmModal(true);
  };

  const confirmCompletion = () => {
    setShowConfirmModal(false);
    onComplete(lesson.id);
  };

  if (showQuiz && lesson.quiz) {
    return (
      <div className="py-6">
        <button onClick={() => setShowQuiz(false)} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-8 transition-all font-bold group">
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-orange-50">
            <ChevronLeft size={20} />
          </div>
          Back to Lesson
        </button>
        <Quiz 
          questions={lesson.quiz} 
          title={`${lesson.title} - Quiz`}
          onComplete={(score) => onComplete(lesson.id)} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-16 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-8 transition-all font-bold group">
        <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-orange-50">
          <ChevronLeft size={20} />
        </div>
        {t('backToLibrary')}
      </button>

      <div className="bg-white rounded-[40px] shadow-2xl shadow-orange-100/50 border border-slate-100 overflow-hidden">
        {lesson.videoUrl && (
          <div className="aspect-video bg-slate-900 relative group cursor-pointer overflow-hidden">
            <img src={lesson.videoUrl} alt={lesson.title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-white/40 transition-all duration-500">
                <Play size={36} className="text-white fill-white ml-1" />
              </div>
            </div>
            {isPlaying && (
              <div className="absolute top-4 right-4 px-4 py-2 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse flex items-center gap-2 shadow-lg">
                <Headphones size={14} /> Listening
              </div>
            )}
          </div>
        )}

        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
            <div className="flex-1 min-w-[300px]">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block px-3 py-1.5 bg-orange-50 text-orange-600 text-[10px] font-black tracking-widest uppercase rounded-xl">
                  {lesson.subject}
                </span>
                <span className="inline-block px-3 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black tracking-widest uppercase rounded-xl">
                  {lesson.level}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight font-heading">{lesson.title}</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => onDownload(lesson.id)}
                className={`p-4 rounded-2xl border-2 transition-all ${isDownloaded ? 'bg-green-50 border-green-200 text-green-600' : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-orange-200 hover:text-orange-600 shadow-sm'}`}
                title={isDownloaded ? 'Downloaded' : 'Download for offline'}
              >
                <Download size={22} />
              </button>
              <button
                onClick={handleSpeech}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black transition-all shadow-lg ${isPlaying ? 'bg-red-50 text-red-600 border-2 border-red-200 shadow-red-100' : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-200'}`}
              >
                <Volume2 size={22} className={isPlaying ? 'animate-pulse' : ''} />
                <span className="text-sm tracking-wide">{isPlaying ? t('stop') : t('readToMe')}</span>
              </button>
            </div>
          </div>

          <div className={`p-8 md:p-10 rounded-[32px] border-l-8 transition-all duration-500 ${isPlaying ? 'bg-orange-50/50 border-orange-400 ring-4 ring-orange-50' : 'bg-slate-50 border-slate-200'}`}>
            <p className="text-slate-800 leading-relaxed text-xl font-medium">
              {lesson.content}
            </p>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-6 justify-between items-center">
            <button 
              onClick={onOpenChat}
              className="group flex items-center gap-3 text-orange-600 font-black hover:bg-orange-50 px-5 py-3 rounded-2xl transition-all"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <HelpCircle size={20} />
              </div>
              Ask Tutorbot Guru
            </button>
            
            {lesson.quiz ? (
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-[24px] font-black text-lg hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all active:scale-95"
              >
                <CheckCircle size={24} />
                {t('takeQuiz')}
              </button>
            ) : (
              <button
                onClick={handleCompleteClick}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-green-600 text-white px-10 py-5 rounded-[24px] font-black text-lg hover:bg-green-700 shadow-2xl shadow-green-200 transition-all active:scale-95"
              >
                <CheckCircle size={24} />
                {t('completeLesson')} (+50 XP)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
                <AlertCircle size={32} />
              </div>
              <button onClick={() => setShowConfirmModal(false)} className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                <X size={28} />
              </button>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 font-heading">Shabash!</h2>
            <p className="text-slate-500 mb-10 font-medium">Have you finished your Abhyas for this lesson?</p>
            <div className="space-y-4">
              <button 
                onClick={confirmCompletion}
                className="w-full py-5 bg-green-600 text-white rounded-[22px] font-black text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-100 active:scale-95"
              >
                Yes, Finish Lesson
              </button>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-5 bg-slate-50 text-slate-500 rounded-[22px] font-black text-sm hover:bg-slate-100 transition-all"
              >
                Wait, Not Yet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonViewer;
