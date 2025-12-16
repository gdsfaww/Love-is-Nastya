import React, { useState, useEffect } from 'react';
import { ALL_DAYS, QR_NOTES, START_DATE } from './constants';
import { DayStatus, UserState, DayConfig, INITIAL_STATE } from './types';
import { generateDailyLoveNote, getHintForQuest } from './services/geminiService';
import { Lock, Star, Heart, Sparkles, X, ChevronRight, Gift, KeyRound, MapPin, Clock, CheckCircle } from 'lucide-react';

/**
 * LoveRain Background Effect
 */
const LoveRain: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`snow-${i}`}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animation: `float ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: `-${Math.random() * 10}s`
          }}
        />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={`heart-${i}`}
          className="absolute text-rose-400/20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 15 + 10}px`,
            animation: `float ${Math.random() * 10 + 15}s linear infinite`,
            animationDelay: `-${Math.random() * 10}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

/**
 * QR Note Viewer Component
 * Displays the message when a QR code is scanned
 */
const NoteViewer: React.FC<{ noteId: string }> = ({ noteId }) => {
  const note = QR_NOTES.find(n => n.id === noteId);

  if (!note) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-6 text-center animate-in fade-in duration-700">
        <div className="glass-panel p-8 rounded-2xl w-full max-w-sm">
          <p className="text-rose-400 font-serif text-xl">Записка не найдена или унесена ветром...</p>
          <a href="/" className="mt-6 inline-block text-sm uppercase tracking-widest text-rose-100/60 border-b border-rose-100/20 pb-1">Вернуться домой</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 relative overflow-hidden animate-in fade-in zoom-in-95 duration-1000">
      <LoveRain />
      <div className="relative z-10 w-full max-w-md bg-[#fff0f5] text-velvet-dark rounded-[3px] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transform rotate-1 border border-rose-900/10 flex flex-col max-h-[90dvh] overflow-y-auto scrollbar-hide">
        
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none rounded-[3px]" />
        
        <div className="relative z-10 text-center my-auto">
          <div className="inline-flex justify-center mb-4 md:mb-6">
            <MapPin className="w-6 h-6 md:w-8 md:h-8 text-rose-500 animate-bounce" />
          </div>
          
          <h2 className="font-serif text-2xl md:text-3xl mb-2 text-rose-900 leading-tight">{note.title}</h2>
          <div className="h-px w-16 bg-rose-300 mx-auto mb-6" />
          
          <p className="font-serif text-lg md:text-xl leading-relaxed whitespace-pre-line mb-8 text-velvet-dark/90">
            {note.text}
          </p>

          {note.id === '5' ? (
             <a href="/" className="inline-block w-full md:w-auto bg-velvet-dark text-white font-serif px-8 py-4 rounded-xl md:rounded-full shadow-lg hover:bg-rose-900 transition-colors active:scale-95 transform">
               Ввести пароль
             </a>
          ) : (
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-velvet-dark/40 font-sans mt-4">
              Ищи следующий код...
            </p>
          )}
        </div>
      </div>
      <p className="relative z-10 mt-8 text-white/20 text-[10px] uppercase tracking-[0.3em]">С любовью, Антон</p>
    </div>
  );
};

/**
 * Login Screen
 */
interface LoginProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = password.trim().toLowerCase();
    // Updated password check
    if (cleanPass === 'любовь') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center p-4 md:p-6 text-center animate-in fade-in zoom-in-95 duration-1000">
      <div className="max-w-md w-full glass-panel p-8 md:p-12 rounded-[2rem] border-white/10 relative overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(251,113,133,0.2)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />
        
        <div className="mb-6 md:mb-8 flex justify-center relative">
          <div className="absolute inset-0 blur-xl bg-rose-500/20 rounded-full animate-pulse-soft" />
          <Heart className="w-12 h-12 md:w-16 md:h-16 text-rose-400 relative z-10 drop-shadow-[0_0_15px_rgba(251,113,133,0.5)]" fill="currentColor" />
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl mb-2 text-rose-100 text-glow leading-tight">Антон и Анастасия</h1>
        <p className="text-rose-100/60 mb-8 md:mb-10 font-sans tracking-widest text-[10px] md:text-xs uppercase">Зимняя История Любви</p>
        
        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
          <div className="relative group/input">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль..."
              className="w-full bg-velvet-dark/40 border border-rose-100/10 rounded-xl px-4 py-4 text-center text-rose-100 placeholder-rose-100/20 focus:outline-none focus:border-rose-400/50 focus:bg-velvet-dark/60 transition-all font-serif text-lg md:text-xl"
            />
          </div>
          
          {error && (
            <p className="text-rose-400 text-xs md:text-sm font-serif italic animate-bounce">
              Это главное чувство в нашей жизни...
            </p>
          )}

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-rose-900 to-velvet-light hover:from-rose-800 hover:to-velvet-dark text-white font-serif tracking-wide py-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] transform transition active:scale-[0.98] md:hover:scale-[1.02] border border-white/5 flex items-center justify-center gap-2 group-hover:border-rose-500/30 text-base md:text-lg"
          >
            <KeyRound className="w-4 h-4 opacity-70" /> Открыть
          </button>
        </form>
      </div>
    </div>
  );
};

/**
 * Quest Modal - Full screen on mobile, centered modal on desktop
 */
const QuestModal: React.FC<{ day: DayConfig; isOpen: boolean; onClose: () => void; onComplete: () => void }> = ({ day, isOpen, onClose, onComplete }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [viewState, setViewState] = useState<'input' | 'success' | 'reward'>('input');
  const [hint, setHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setViewState('input');
      setCode('');
      setError('');
      setHint(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === day.unlockCode.toUpperCase()) {
      setViewState('success');
      
      // Delay before showing the reward screen
      setTimeout(() => {
        if (day.rewardNote) {
          setViewState('reward');
        } else {
          // If no reward note, complete immediately
          onComplete();
          onClose();
        }
      }, 2500);
    } else {
      setError("Пока не подходит... Слушай сердце ❤️");
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleRewardClaimed = (e: React.MouseEvent) => {
    // Prevent any bubbling issues and ensure action
    e.stopPropagation();
    onComplete();
    onClose();
  };

  const fetchHint = async () => {
    setLoadingHint(true);
    const hintText = await getHintForQuest(day.content);
    setHint(hintText);
    setLoadingHint(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-6 isolate">
      {/* Desktop Backdrop */}
      <div 
        className="fixed inset-0 bg-velvet-dark/95 backdrop-blur-md transition-opacity duration-500 hidden md:block animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      {/* Card Container */}
      <div className="
        relative w-full h-[100dvh] md:h-auto md:max-h-[85dvh] md:max-w-lg 
        bg-[#fff0f5] text-velvet-dark 
        md:rounded-[3px] shadow-2xl 
        flex flex-col 
        overflow-hidden
        animate-in fade-in zoom-in-95 duration-500 slide-in-from-bottom-8
      ">
        
        {/* Paper Texture */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none md:rounded-[3px]" />
        
        {/* Success / Reward Overlay */}
        {(viewState === 'success' || viewState === 'reward') && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-velvet-dark text-rose-100 transition-all duration-700 animate-in fade-in p-6 overflow-y-auto">
             {/* Decorative background elements */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(251,113,133,0.1)_0%,rgba(0,0,0,0)_70%)] animate-pulse-soft" />
             </div>
             
             {viewState === 'success' ? (
               <div className="flex flex-col items-center text-center my-auto">
                 <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-heartbeat mb-6 relative z-10 drop-shadow-[0_0_30px_rgba(244,63,94,0.6)]" />
                 <h3 className="font-serif text-5xl md:text-6xl text-rose-100 italic text-center relative z-10 text-glow leading-none mb-2">Принято</h3>
                 <div className="w-16 h-px bg-rose-500/50 my-6 relative z-10" />
               </div>
             ) : (
               <div className="flex flex-col items-center text-center w-full max-w-sm my-auto relative z-10">
                 <Gift className="w-20 h-20 text-gold-warm animate-bounce mb-6 drop-shadow-[0_0_30px_rgba(222,184,135,0.4)]" />
                 <h3 className="font-serif text-3xl md:text-4xl text-rose-100 italic text-glow leading-tight mb-6">Сюрприз!</h3>
                 
                 <div className="glass-panel p-6 rounded-xl w-full border border-white/10 bg-white/5 mb-8">
                   <p className="font-serif text-lg md:text-xl leading-relaxed whitespace-pre-line text-rose-100">
                     {day.rewardNote}
                   </p>
                 </div>

                 <button 
                  type="button"
                  onClick={handleRewardClaimed}
                  className="bg-rose-500 text-white font-serif italic px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(244,63,94,0.4)] hover:bg-rose-600 active:scale-95 transition-all flex items-center gap-2 cursor-pointer z-50"
                 >
                   Я нашла! <CheckCircle className="w-5 h-5" />
                 </button>
               </div>
             )}
          </div>
        )}

        {/* Scrollable Content (Input View) */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-6 pt-12 md:p-12 relative z-10 flex flex-col">
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-2 text-velvet-dark/40 hover:text-rose-500 transition-colors bg-white/50 rounded-full md:bg-transparent"
          >
            <X className="w-8 h-8 md:w-6 md:h-6" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-rose-900/10 bg-rose-50/50 mb-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-rose-500">
                День {day.day}
              </span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-5xl text-velvet-dark italic leading-[0.95]">
              {day.title}
            </h2>
            
            <div className="w-12 h-px bg-rose-400/40 mt-6" />
          </div>

          {/* Task Content */}
          <div className="prose prose-lg prose-p:text-velvet-dark/80 prose-headings:text-velvet-dark font-serif text-xl leading-relaxed mb-12">
            <p className="whitespace-pre-line">{day.content}</p>
          </div>

          {/* Bottom Action Area (Pushed to bottom) */}
          <div className="mt-auto">
            <form onSubmit={handleSubmit} className="space-y-8 pb-4">
              <div className="relative group">
                <input 
                  type="text" 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  placeholder="Тайное слово" 
                  className="w-full bg-transparent border-b border-rose-900/20 px-0 py-4 text-center text-3xl font-serif text-velvet-dark placeholder-rose-900/20 focus:outline-none focus:border-rose-500 transition-colors rounded-none" 
                />
                {error && <p className="absolute -bottom-8 left-0 right-0 text-center text-rose-500 font-serif italic animate-pulse">{error}</p>}
              </div>
              
              <div className="pt-4 space-y-4">
                <button 
                  type="submit" 
                  className="w-full bg-velvet-dark text-rose-50 font-serif italic text-2xl py-5 rounded-xl shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
                >
                  Открыть <Heart className="w-6 h-6 fill-rose-500/50 text-rose-500" />
                </button>
                
                <button 
                  type="button" 
                  onClick={fetchHint} 
                  disabled={loadingHint || !!hint} 
                  className="w-full py-2 text-center"
                >
                  {loadingHint ? (
                    <span className="text-xs uppercase tracking-widest text-rose-400 animate-pulse">Спрашиваю звезды...</span>
                  ) : hint ? (
                    <span className="font-serif italic text-rose-600 text-lg">"{hint}"</span>
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-velvet-dark/40 flex items-center justify-center gap-2 hover:text-velvet-dark transition-colors">
                      <Sparkles className="w-3 h-3" /> Мне нужна подсказка
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [noteId, setNoteId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const note = params.get('note');
    if (note) {
      setNoteId(note);
    }
  }, []);

  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('anton_anastasia_advent');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });
  
  const [selectedDay, setSelectedDay] = useState<DayConfig | null>(null);
  const [dailyQuote, setDailyQuote] = useState<string>("");
  
  useEffect(() => {
    localStorage.setItem('anton_anastasia_advent', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (user.isAuthenticated && !noteId) {
      const today = new Date().getDate(); 
      generateDailyLoveNote(today, user.name).then(setDailyQuote);
    }
  }, [user.isAuthenticated, user.name, noteId]);

  if (noteId) {
    return <NoteViewer noteId={noteId} />;
  }

  const handleCompleteDay = (dayNum: number) => {
    setUser(prev => {
      // Prevent duplicates in completedDays
      if (prev.completedDays.includes(dayNum)) {
        return prev;
      }
      return {
        ...prev,
        completedDays: [...prev.completedDays, dayNum],
        // Only advance currentDay if we are completing the latest day
        currentDay: Math.max(prev.currentDay, dayNum + 1)
      };
    });
    // Scroll to top automatically when a quest is completed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getDayStatus = (day: DayConfig): DayStatus => {
    if (user.completedDays.includes(day.day)) return DayStatus.COMPLETED;
    
    const now = new Date();
    const currentDay = now.getDate();
    
    // Logic: Day 1 opens on START_DATE (16). Day 2 on 17, etc.
    const unlockDate = START_DATE + (day.day - 1);
    
    // If today (16) < unlockDate (17 for day 2) -> Locked
    if (currentDay < unlockDate) return DayStatus.LOCKED_DATE;

    if (day.day > user.currentDay) return DayStatus.LOCKED_PREV;
    
    return DayStatus.AVAILABLE;
  };

  const getUnlockDateText = (day: number) => {
    return `${START_DATE + (day - 1)} дек`;
  }

  if (!user.isAuthenticated) {
    return (
      <>
        <LoveRain />
        <LoginScreen onLogin={() => setUser(prev => ({ ...prev, isAuthenticated: true }))} />
      </>
    );
  }

  return (
    <div className="relative min-h-[100dvh] pb-20 overflow-x-hidden animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <LoveRain />
      
      {/* Header */}
      <header className="relative z-10 pt-10 md:pt-16 pb-8 md:pb-12 px-4 md:px-6 text-center">
        <div className="inline-flex items-center justify-center mb-4 md:mb-6">
           <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-500 animate-pulse-soft fill-current opacity-80" />
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-rose-100 mb-2 md:mb-4 text-glow tracking-tight leading-none">
          14 Дней Нас
        </h1>
        <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-gold-warm mb-8 md:mb-10 opacity-80">
          Путешествие к Новому году
        </p>
        
        {/* Dynamic AI Quote */}
        <div className="max-w-xl mx-auto glass-panel rounded-2xl p-4 md:p-6 flex items-center justify-center min-h-[60px] md:min-h-[80px]">
          {dailyQuote ? (
             <p className="text-rose-100 font-serif italic text-lg md:text-2xl leading-relaxed">"{dailyQuote}"</p>
          ) : (
             <div className="h-2 w-16 md:w-24 bg-white/10 rounded mx-auto animate-pulse" />
          )}
        </div>
      </header>

      {/* Grid */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {ALL_DAYS.map((day) => {
            const status = getDayStatus(day);
            const isCompleted = status === DayStatus.COMPLETED;
            const isAvailable = status === DayStatus.AVAILABLE;
            const isDateLocked = status === DayStatus.LOCKED_DATE;
            const isPrevLocked = status === DayStatus.LOCKED_PREV;
            const isLocked = isDateLocked || isPrevLocked;

            return (
              <div 
                key={day.day}
                onClick={() => { if (isAvailable) setSelectedDay(day); }}
                className={`
                  relative w-[44%] md:w-[22%] aspect-[3/4] rounded-xl md:rounded-2xl transition-all duration-700 group
                  flex flex-col items-center justify-center cursor-pointer overflow-hidden border border-white/5
                  ${isAvailable 
                    ? 'bg-gradient-to-br from-velvet-light/80 to-velvet-dark hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(251,113,133,0.3)] border-rose-400/30' 
                    : isCompleted 
                      ? 'bg-rose-900/20 backdrop-blur-sm grayscale-[0.3]' 
                      : 'bg-black/20 opacity-40 cursor-not-allowed'
                  }
                `}
              >
                {/* Number */}
                <span className={`
                  font-serif text-4xl md:text-6xl z-10 transition-all duration-500
                  ${isAvailable ? 'text-rose-100 group-hover:scale-110 group-hover:text-gold-warm text-glow' : 'text-white/10'}
                  ${isCompleted ? 'text-rose-500/50 line-through decoration-rose-500/30' : ''}
                `}>
                  {day.day}
                </span>

                {/* Status Icons & Text */}
                <div className="absolute bottom-3 md:bottom-4 z-10 w-full flex flex-col items-center gap-1">
                  {isAvailable && (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-rose-500/20 flex items-center justify-center group-hover:bg-rose-500 transition-colors">
                      <Gift className="w-3 h-3 md:w-4 md:h-4 text-rose-200 group-hover:text-white" />
                    </div>
                  )}
                  {isCompleted && <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-500 fill-current" />}
                  {isPrevLocked && <Lock className="w-4 h-4 md:w-5 md:h-5 text-white/20" />}
                  {isDateLocked && (
                    <>
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-white/20" />
                      <span className="text-[10px] text-white/20 font-sans tracking-wide mt-1">{getUnlockDateText(day.day)}</span>
                    </>
                  )}
                </div>
                
                {/* Available Glow */}
                {isAvailable && (<div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />)}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="relative z-10 text-center pb-8 px-6">
        <div className="flex flex-col items-center gap-3">
          <Sparkles className="w-5 h-5 text-gold-warm opacity-50" />
          <p className="font-serif text-rose-100/40 italic text-sm">"Я люблю тебя больше, чем вчера..."</p>
        </div>
      </footer>

      {selectedDay && (
        <QuestModal 
          day={selectedDay} 
          isOpen={!!selectedDay} 
          onClose={() => setSelectedDay(null)} 
          onComplete={() => handleCompleteDay(selectedDay.day)} 
        />
      )}
    </div>
  );
}