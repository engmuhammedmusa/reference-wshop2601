import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowLeft,
  Download,
  CheckCircle2,
  Brain,
  Target,
  Layers,
  BarChart3,
  Users,
  Calendar,
  ChevronDown,
  Layout,
  Award,
  Smartphone,
  Sparkles,
  Send,
  Loader2,
  Bot,
  Search,
  Bell,
  MoreHorizontal,
  TrendingUp,
  Database,
  Zap,
  ClipboardCheck,
  Puzzle,
  Scale,
  Quote,
  Lightbulb,
  FileSignature,
  DownloadCloud,
  Cpu,
  Network,
  Binary,
  CircuitBoard,
} from 'lucide-react';

// --- Fonts & Global Styles ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800&display=swap');

    :root { --font-tajawal: 'Tajawal', sans-serif; }

    /* Full-width hard reset (fixes Vite/React template max-width constraints) */
    html, body, #root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    /* Some templates set #root { max-width: 1280px; margin: 0 auto; padding: 2rem; } */
    #root {
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    body {
      font-family: 'Tajawal', sans-serif !important;
      background-color: #f8fafc;
      overflow-x: hidden;
    }

    *, *::before, *::after { box-sizing: border-box; }

    .font-sans { font-family: 'Tajawal', sans-serif !important; }
    .rtl-flip { transform: scaleX(-1); }

    /* Subtle Grid Texture */
    .bg-grid-slate {
      background-size: 40px 40px;
      background-image: linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }

    @keyframes rotate-border {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .animate-rotate-border { animation: rotate-border 4s linear infinite; }

    @keyframes shimmer-border {
      0% { border-color: rgba(255, 255, 255, 0.1); box-shadow: 0 0 5px rgba(255,255,255,0.1); }
      50% { border-color: rgba(255, 255, 255, 0.6); box-shadow: 0 0 15px rgba(255,255,255,0.3); }
      100% { border-color: rgba(255, 255, 255, 0.1); box-shadow: 0 0 5px rgba(255,255,255,0.1); }
    }
    .animate-shimmer-border { animation: shimmer-border 3s infinite; }

    @keyframes float-in-out {
      0% { opacity: 0; transform: translateY(20px) scale(0.9); }
      10% { opacity: 1; transform: translateY(0) scale(1); }
      90% { opacity: 1; transform: translateY(-10px) scale(1); }
      100% { opacity: 0; transform: translateY(-30px) scale(0.9); }
    }
    .animate-float-in-out { animation: float-in-out 8s ease-in-out infinite; }

    @keyframes float-continuous {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(3deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    .animate-float-continuous { animation: float-continuous 6s ease-in-out infinite; }

    /* RefeAI brand treatment */
    .refeai-brand {
      font-weight: 900;
      letter-spacing: 0.08em;
      /* keep exact casing: RefeAI */
      text-shadow: 0 10px 30px rgba(0,0,0,0.18);
    }
    .refeai-pill {
      box-shadow: 0 16px 48px rgba(99,102,241,0.18);
    }
  `}</style>
);

// --- Components ---
const Button = ({ children, variant = 'primary', className = '', icon: Icon, ...props }) => {
  const baseStyle =
    'inline-flex items-center justify-center px-8 py-3.5 md:py-4 text-sm md:text-base font-bold rounded-[2rem] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-sans gap-3 group';

  const variants = {
    primary:
      'border-transparent text-white bg-[#b11e22] hover:bg-[#8a1619] shadow-lg shadow-red-900/10 hover:shadow-red-900/20 hover:-translate-y-0.5',
    secondary:
      'border-transparent text-white bg-[#284e7f] hover:bg-[#1d3a61] shadow-md hover:shadow-lg',
    outline:
      'border border-gray-200 text-[#284e7f] bg-white/50 hover:bg-white hover:border-[#284e7f]/20 shadow-sm hover:shadow-md backdrop-blur-sm',
    white: 'bg-white text-[#284e7f] hover:bg-gray-50 shadow-lg',
    ai: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/30',
  };

  const iconContainerStyle =
    variant === 'primary'
      ? 'bg-white/20 text-white'
      : variant === 'outline'
        ? 'bg-[#284e7f]/10 text-[#284e7f]'
        : 'bg-white/20 text-white';

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span>{children}</span>
      {Icon && (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1 ${iconContainerStyle}`}
        >
          <Icon size={18} />
        </div>
      )}
    </button>
  );
};

const SectionHeading = ({ subtitle, title, description, align = 'center', titleClasses }) => (
  <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-right'} max-w-4xl mx-auto px-4`}>
    {subtitle && (
      <span className="inline-block py-2 px-5 rounded-[1.5rem] bg-[#284e7f]/5 text-[#284e7f] text-sm font-bold tracking-wider mb-4 border border-[#284e7f]/10 font-sans">
        {subtitle}
      </span>
    )}
    <h2 className={`${titleClasses || 'text-2xl md:text-4xl lg:text-5xl'} font-extrabold text-[#284e7f] leading-tight font-sans ${description ? 'mb-6' : ''}`}>{title}</h2>
    {description && (
      <p className="text-base md:text-lg text-gray-600 leading-relaxed font-sans font-medium max-w-3xl mx-auto">
        {description}
      </p>
    )}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="relative group p-6 md:p-7 rounded-[2rem] md:rounded-[2.5rem] bg-white/25 backdrop-blur-2xl border border-white/45 shadow-[0_18px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center text-center md:items-start md:text-right">
    <div className="flex items-center gap-4 mb-4 w-full max-w-[22rem] mx-auto justify-center md:max-w-none md:mx-0 md:justify-start">
      <div className="h-12 w-12 rounded-[1.25rem] bg-white/22 border border-white/35 flex items-center justify-center shadow-sm shrink-0">
        <Icon className="h-6 w-6 text-[#284e7f]" />
      </div>
      <h3 className="text-lg md:text-xl font-extrabold text-[#284e7f] leading-snug font-sans">
        {title}
      </h3>
    </div>

    <p className="w-full max-w-[22rem] mx-auto text-gray-700/90 leading-relaxed font-sans font-bold text-sm md:text-[15px] md:max-w-none md:mx-0">
      {description}
    </p>

    <div className="pointer-events-none absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] ring-1 ring-white/30" />
  </div>
);

const AxisCard = ({ number, title, description, icon: Icon }) => (
  <div className="group relative bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full flex flex-col">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#284e7f]/5 to-transparent rounded-bl-[4rem] transition-all duration-500 group-hover:scale-110 group-hover:from-[#284e7f]/10" />
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-[#284e7f] group-hover:bg-[#284e7f] group-hover:text-white transition-colors duration-300 shadow-sm">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <span className="text-3xl md:text-4xl font-extrabold text-slate-100 group-hover:text-slate-200/80 transition-colors font-sans select-none">
        {number}
      </span>
    </div>
    <div className="relative z-10 flex-1 flex flex-col">
      <h3 className="text-lg md:text-xl font-extrabold text-[#284e7f] mb-3 leading-snug font-sans group-hover:text-[#b11e22] transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed font-sans opacity-90 group-hover:opacity-100 font-bold">
        {description}
      </p>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-100 overflow-hidden">
      <div className="h-full w-full bg-gradient-to-r from-[#284e7f] to-[#b11e22] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
    </div>
  </div>
);

/* Glassy, mobile-perfect Trainer Card */
const TrainerCard = ({ name, title, bio, imageId, isActive }) => (
  <div className="relative h-full w-full rounded-[2.5rem] p-2 bg-white/60 backdrop-blur-sm border border-white/50 shadow-2xl group isolate transition-all duration-300">
    
    {/* Inner Card Content - White Background */}
    <div className="relative h-full w-full bg-white rounded-[2.2rem] overflow-hidden shadow-inner">
        {/* Full Background Image - Clear, no dark overlay */}
        <img
            src={`https://drive.google.com/thumbnail?id=${imageId}&sz=w1400`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[20s] ease-linear ${isActive ? 'scale-110' : 'scale-100'}`}
            alt={name}
        />
        
        {/* Modern Gradient Mix - Blends details with photo */}
        <div className="absolute bottom-0 left-0 right-0 pt-32 pb-6 px-6 bg-gradient-to-t from-white via-white/90 to-transparent flex flex-col items-start text-right z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 rounded-full bg-white/80 border border-slate-200 backdrop-blur-sm text-[10px] md:text-xs font-bold text-[#284e7f] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b11e22] animate-pulse"></span>
                مدرب خبير
            </div>
            
            <h3 className="text-lg md:text-xl font-extrabold text-[#1e293b] font-sans mb-1">
                {name}
            </h3>
            <p className="text-[#b11e22] font-bold text-xs md:text-sm mb-2 font-sans tracking-wide">
                {title}
            </p>
            
            <div className="w-full h-px bg-slate-200/80 mb-2" />
            
            <p className="text-slate-700 text-xs md:text-sm leading-relaxed line-clamp-3 font-sans font-bold">
                {bio}
            </p>
        </div>
    </div>
  </div>
);

const FloatingComment = ({ text, className, delay = '0s', duration = '8s', color = 'blue' }) => {
  const shadowColor = color === 'red' ? 'rgba(177, 30, 34, 0.4)' : 'rgba(40, 78, 127, 0.4)';
  const borderColor = color === 'red' ? 'rgba(177, 30, 34, 0.3)' : 'rgba(40, 78, 127, 0.3)';
  const textColor = color === 'red' ? 'text-[#b11e22]' : 'text-[#284e7f]';
  
  return (
    // Positioning Wrapper: Handles placement (absolute) and centering (translate)
    <div className={`absolute z-50 pointer-events-none hidden lg:flex items-center justify-center ${className}`}>
      
      {/* Animated Content: Handles the float/bobbing animation separately */}
      <div 
        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border shadow-lg animate-float-in-out"
        style={{ 
          animationDelay: delay,
          animationDuration: duration,
          borderColor: borderColor,
          boxShadow: `0 8px 32px ${shadowColor}`
        }}
      >
        <div className={`w-2 h-2 rounded-full animate-pulse ${color === 'red' ? 'bg-[#b11e22]' : 'bg-[#284e7f]'}`} />
        <p className={`text-xs md:text-sm font-bold font-sans whitespace-nowrap ${textColor}`}>{text}</p>
      </div>
    </div>
  );
};

const FloatingIcon = ({ icon: Icon, className, delay = '0s', duration = '6s', size = 24, color = 'text-[#284e7f]' }) => (
  <div
    className={`absolute z-0 pointer-events-none opacity-60 animate-float-continuous ${className}`}
    style={{ animationDelay: delay, animationDuration: duration }}
  >
    <div className={`p-3 rounded-2xl bg-white/30 backdrop-blur-md border border-white/40 shadow-xl ${color}`}>
        <Icon size={size} strokeWidth={1.5} />
    </div>
  </div>
);

const CountdownTimer = ({ align = 'center' }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-01-19T09:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const GlassUnit = ({ value, label }) => (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-[2rem] blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
      <div className="relative w-16 h-20 md:w-20 md:h-24 flex flex-col items-center justify-center bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl md:rounded-[1.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:-translate-y-1 transition-all duration-300">
        <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#284e7f] to-[#1a3558] mb-1 tabular-nums tracking-tight font-sans">
          {String(value).padStart(2, '0')}
        </div>
        <div className="text-[9px] md:text-[10px] font-semibold text-gray-500 uppercase tracking-widest font-sans">{label}</div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent rounded-[2rem] pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className={`flex gap-2 md:gap-3 mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 ${align === 'center' ? 'justify-center' : 'justify-start'}`} dir="ltr">
      <GlassUnit value={timeLeft.days} label="Days" />
      <GlassUnit value={timeLeft.hours} label="Hours" />
      <GlassUnit value={timeLeft.minutes} label="Mins" />
      <GlassUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

const FloatingWhatsApp = () => {
  const phoneNumber = '905337642450';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group hover:-translate-y-1 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <div className="bg-[#25D366] p-3 md:p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.3)] flex items-center justify-center">
        <WhatsAppIcon />
      </div>
    </a>
  );
};

// --- Hero AI Widget ---
const HeroAIWidget = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResponse('');

    const apiKey = ''; // Set at runtime
    const prompt = `
      You are a senior HR consultant promoting a high-level workshop titled "Training Needs Analysis using AI & Smart Assessment Centers".
      User Challenge: "${query}"
      Output Language: Arabic. Style: Executive, concise (max 3-4 sentences), helpful.
    `;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) setResponse(aiText);
      else throw new Error('No response generated');
    } catch {
      setError('عذراً، حدث خطأ في الاتصال بالمستشار الذكي.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-widget" className="relative w-full max-w-xl mx-auto lg:mr-auto lg:ml-0">
        {/* Subtle Glow Behind */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 rounded-[2.5rem] opacity-30 blur-lg group-hover:opacity-50 transition duration-1000"></div>
        
        <div className="relative bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-6 md:p-8 overflow-hidden transition-all duration-300 hover:bg-white/50">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#284e7f] to-[#b11e22] flex items-center justify-center text-white shadow-lg shadow-blue-900/10">
                        {/* Changed Bot to Sparkles */}
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#284e7f] font-sans leading-none mb-1">RefeAI: مستشار التدريب الذكي</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] text-slate-500 font-sans font-bold tracking-wide">RefeAI Online</span>
                        </div>
                    </div>
                </div>
            </div>

            {!response ? (
              <div className="flex flex-col gap-4">
                <div className="relative group/input">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="مثال: كيف يمكنني وضع خطة تدريبية كاملة حسب احتياج موظفي قسم الموارد البشرية؟"
                    // Removed pl-32 since button is outside
                    className="w-full bg-white/60 hover:bg-white/90 focus:bg-white border border-white/50 focus:border-[#284e7f]/20 rounded-[1.5rem] p-5 text-gray-700 placeholder-gray-400 outline-none min-h-[130px] resize-none text-right transition-all duration-300 font-sans text-sm md:text-base font-medium shadow-sm focus:shadow-md"
                    dir="rtl"
                  />
                </div>
                
                <button 
                    onClick={handleAnalyze}
                    disabled={loading || !query.trim()}
                    // Moved button outside, made it full width
                    className="w-full h-12 rounded-xl bg-[#284e7f] hover:bg-[#1d3a61] disabled:bg-gray-300 disabled:cursor-not-allowed text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                    {loading ? (
                        <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        <span className="text-base font-bold">جاري التحليل...</span>
                        </>
                    ) : (
                        <>
                        <span className="text-base font-bold">تحليل</span>
                        <Send className="w-5 h-5 rtl:-rotate-90" />
                        </>
                    )}
                </button>

                {error && <p className="text-red-500 text-xs text-center font-sans">{error}</p>}
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* Chat Bubble Style Response */}
                <div className="bg-white/80 border border-white/60 rounded-[1.5rem] rounded-tr-sm p-6 shadow-sm relative">
                   <div className="text-[#1e293b] leading-loose text-sm md:text-base font-sans font-medium text-right">
                     {response}
                   </div>
                </div>
                
                <div className="flex justify-end">
                    <button
                      onClick={() => setResponse('')}
                      className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 hover:bg-white border border-white/60 text-gray-500 hover:text-[#284e7f] text-xs font-bold transition-all shadow-sm"
                    >
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      استشارة جديدة
                    </button>
                </div>
              </div>
            )}
        </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTrainerIndex, setActiveTrainerIndex] = useState(0);
  // New state to cycle through the larger list of comments independently
  const [activeCommentIndex, setActiveCommentIndex] = useState(0); 
  const [activeAudienceIndex, setActiveAudienceIndex] = useState(0);

  const registerUrl = 'https://forms.cloud.microsoft/r/FPLwbAsYyU';
  const handleRegister = () => window.open(registerUrl, '_blank');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trainer & Comment Carousel Loop (5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrainerIndex((prev) => (prev + 1) % 3);
      // Cycle through the 7 comments
      setActiveCommentIndex((prev) => (prev + 1) % 7);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const audienceRoles = [
    'قيادات الموارد البشرية',
    'القيادات التنفيذية',
    'مدراء التحول الرقمي',
    'مدراء التدريب والتطوير',
    'صناع القرار',
  ];

  // Audience Carousel Loop (3s)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAudienceIndex((prev) => (prev + 1) % audienceRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [audienceRoles.length]);

  const navLinks = [
    { name: 'الرئيسية', href: '#' },
    { name: 'عن الورشة', href: '#about' },
    { name: 'المحاور', href: '#axes' },
    { name: 'المدربين', href: '#trainers' },
    { name: 'التسجيل', href: '#register' },
  ];

  const trainers = [
    {
      name: 'د. رامي شاهين',
      title: 'خبير الذكاء الاصطناعي العالمي',
      imageId: '1Agf19eCAbARzkPgKNQ13Rg2PoydTlo2-',
      bio: 'خبير عالمي في الذكاء الاصطناعي والتحول الرقمي، يقود مشاريع استراتيجية في عدة دول. حاصل على دكتوراه في إدارة الموارد البشرية الدولية.',
    },
    {
      name: 'أ. أحمد الطويل',
      title: 'خبير التطوير المؤسسي',
      imageId: '1hG5wGbMOjcCvaWSSfeyWNLhrhcfA0Srq',
      bio: 'خبير أردني في التطوير المؤسسي والقيادة بخبرة تتجاوز 18 عامًا في إدارة التغيير وبناء الكفاءات. مستشار لهيئات محلية ودولية.',
    },
    {
      name: 'د. سالم موسى',
      title: 'استشاري التطوير وجودة التدريب',
      imageId: '12r7lppBDqCAX5oFBldy-7O77uREbwMVr',
      bio: 'دكتوراه في الإدارة العامة وتطوير المنظمات، وماجستير إدارة أعمال في علم النفس الإداري. استشاري جودة معتمد ومدرب دولي.',
    },
  ];

  // Centered position above the card
  const commentPosition = "left-1/2 -translate-x-1/2 -top-6";

  const trainerComments = [
    {
      text: "التدريب المؤثر لا يغير طريقة عملك، بل يغير طريقة تفكيرك",
      position: commentPosition,
      color: "blue"
    },
    {
      text: "نحن لا نقدم أدوات فقط، بل نُعرِّف مسارات",
      position: commentPosition,
      color: "red"
    },
    {
      text: "لا يوجد عظمة بدون قياس دقيق، ولا تطور بدون تقييم ذكي",
      position: commentPosition,
      color: "blue"
    },
    {
      text: "لا تخف من القياس، ففيه بداية كل تحسن حقيقي",
      position: commentPosition,
      color: "red"
    },
    {
      text: "نتائج لا تخمن.. تُقاس",
      position: commentPosition,
      color: "blue"
    },
    {
      text: "نحن لا نترجم البيانات فحسب، بل نفسر لغة النجاح",
      position: commentPosition,
      color: "red"
    },
    {
      text: "عندما تصبح الخوارزميات حدسًا عمليًا",
      position: commentPosition,
      color: "blue"
    }
  ];

  const axesData = [
    {
      number: '01',
      title: 'قياس أثر التدريب والعائد على الاستثمار (ROI)',
      description: 'كيفية حساب القيمة الحقيقية للتدريب وتأثيره المباشر على الأرباح والأداء.',
      icon: TrendingUp,
    },
    {
      number: '02',
      title: 'تحديد الاحتياجات التدريبية المعتمد على البيانات',
      description: 'الانتقال من التخمين إلى اليقين باستخدام تحليلات البيانات الضخمة.',
      icon: Database,
    },
    {
      number: '03',
      title: 'التحول الذكي في التدريب',
      description: 'إعادة هيكلة عمليات التدريب لتتواكب مع الثورة الرقمية.',
      icon: Zap,
    },
    {
      number: '04',
      title: 'اتخاذ القرار التدريبي باستخدام الذكاء الاصطناعي',
      description: 'بناء أنظمة دعم قرار ذكية للموافقة على الخطط التدريبية.',
      icon: Scale,
    },
    {
      number: '05',
      title: 'مراكز التقييم الذكية (AI Assessment Centers)',
      description: 'تصميم وإدارة مراكز تقييم حديثة تعتمد على المحاكاة والذكاء الاصطناعي.',
      icon: ClipboardCheck,
    },
    {
      number: '06',
      title: 'تحليل فجوات الأداء والكفاءات',
      description: 'رسم خرائط الكفاءات وتحديد الفجوات بدقة لردمها بالتدريب المناسب.',
      icon: Puzzle,
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen w-full bg-[#f8fafc] text-gray-900 selection:bg-[#b11e22] selection:text-white overflow-x-hidden">
      <GlobalStyles />
      <FloatingWhatsApp />

      {/* Navigation */}
      <nav className={`fixed z-50 transition-all duration-300 ease-in-out ${'top-0 left-0 right-0 w-full md:top-4 md:px-4'}`}>
        <div
          className={`mx-auto transition-all duration-300 ${
            'md:max-w-7xl md:rounded-full ' +
            (isScrolled
              ? 'bg-white/25 backdrop-blur-2xl shadow-lg border-b md:border border-white/35 py-2'
              : 'bg-white/15 md:bg-white/10 backdrop-blur-2xl border-b md:border border-white/25 py-3 md:py-4')
          }`}
        >
          <div className="px-4 md:px-8 flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/d/1-SLAi3PFnVcRKY54w97J4H3sYQ2Prj3G"
                alt="Reference Training Center"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-gray-600 hover:text-[#284e7f] transition-colors relative group font-sans"
                >
                  {link.name}
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#b11e22] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#ai-widget"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 border border-white/20 font-sans refeai-pill"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
                <span className="refeai-brand">RefeAI</span>
              </a>

              <button
                onClick={handleRegister}
                className="px-6 py-2.5 text-sm font-bold text-[#b11e22] bg-red-50 border border-red-100 rounded-full hover:bg-red-100 transition-colors font-sans"
              >
                احجز مقعدك
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-gray-600 rounded-full hover:bg-gray-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 shadow-xl animate-in slide-in-from-top-5 z-40 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-bold text-gray-700 p-3 hover:bg-gray-50 rounded-xl text-right font-sans"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-gray-100 my-2" />
              <Button onClick={handleRegister} className="w-full justify-center rounded-xl">
                سجل الآن
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-32 lg:pt-48 pb-16 overflow-hidden bg-grid-slate w-full" id="hero">
        {/* Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] left-[20%] w-[60%] h-[60%] bg-[#284e7f]/5 rounded-full blur-[100px]" />
          <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-[#b11e22]/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Right Column (Hero AI Widget - First in RTL) */}
            <div className="relative order-1 lg:order-1 flex justify-center lg:justify-start">
               <HeroAIWidget />
            </div>

            {/* Left Column (Text Content - Second in RTL) */}
            <div className="flex flex-col items-center text-center z-20 order-2 lg:order-2">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-blue-100 shadow-sm text-[#284e7f] text-sm font-bold mb-6 animate-in fade-in slide-in-from-bottom-3 font-sans" dir="ltr">
                <Calendar className="w-4 h-4 text-[#b11e22]" />
                <span>19 – 23 January, 2026</span>
              </div>

              {/* Title - Smaller Size (1.5x smaller approx) */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#284e7f] tracking-tight leading-[1.4] mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 font-sans">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#284e7f] to-[#1a3558]">
                  تحديد الاحتياجات التدريبية
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#284e7f] to-[#1a3558] mb-6">
                  باستخدام الذكاء الاصطناعي
                </span>
                
                <div className="relative inline-flex group mt-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#284e7f] to-[#b11e22] rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative inline-flex items-center gap-3 px-6 py-2.5 bg-gradient-to-r from-[#284e7f] to-[#b11e22] rounded-full border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
                     <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/10">
                        <Brain size={16} className="text-white" />
                     </div>
                     <span className="text-base md:text-lg font-bold tracking-wider text-white font-sans drop-shadow-md">
                      AI Assessment Center
                    </span>
                  </div>
                </div>
              </h1>

              {/* Paragraph */}
              <p className="text-sm md:text-base text-gray-700 mb-8 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 font-sans font-bold">
                تخيل لو استطعت بناء نظام تقييم ذكي خاص بمؤسستك — يحتوي على شات بوت ذكي تماماً مثل الذي في الأعلى — يفحص أداء فريقك ويحلل مهاراتهم ويُحدِّد احتياجاتهم التدريبية فوراً، بل وينسق برامج تطوير مخصصة لكل موظف!
                <br className="hidden md:block" />
                <span className="block mt-4 text-[#b11e22] font-black text-base md:text-lg bg-red-50/80 px-4 py-2 rounded-lg border border-red-100 shadow-sm inline-block transform hover:scale-105 transition-transform duration-300 cursor-default">
                  هذا ليس خيالاً ، هـــذه ورشتنـــا الجديـــدة
                </span>
              </p>

              <div className="w-full max-w-md flex justify-center">
                 <CountdownTimer align="center" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 w-full sm:w-auto justify-center">
                <Button variant="primary" icon={DownloadCloud} className="w-full sm:w-auto min-w-[200px] shadow-xl shadow-red-900/10">
                  تحميل الكتيب
                </Button>
                <Button variant="outline" icon={FileSignature} onClick={handleRegister} className="w-full sm:w-auto min-w-[200px]">
                  سجل الآن
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trainers (glassy + mobile-perfect) */}
      <section id="trainers" className="pt-8 pb-20 md:pt-12 md:pb-24 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[#f8fafc]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
          <div className="absolute -top-[15%] left-[5%] w-[55%] h-[55%] bg-[#284e7f]/8 rounded-full blur-[120px]" />
          <div className="absolute top-[25%] -right-[10%] w-[45%] h-[45%] bg-[#b11e22]/8 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <SectionHeading 
            title="مدربونا ليسوا مجرد خبراء؛ هم صانعوا التحول" 
            align="center" 
            titleClasses="text-lg md:text-xl lg:text-2xl"
            description="من الذكاء الاصطناعي إلى تحليل البيانات الضخمة، ومن استراتيجيات الأداء إلى مراكز التقييم المتقدمة، كل مدرب يجمع بين المعرفة العميقة والخبرة العملية ليضمن لك تجربة تدريبية ذكية، ملموسة، ومؤثرة!"
          />

          {/* Wrapper for Stack + Floating Comments + Icons */}
          <div className="relative w-full max-w-4xl mx-auto">
             
             {/* Card Stack Container */}
             <div className="relative mx-auto w-full max-w-md h-[550px] md:h-[650px] flex justify-center items-center perspective-1000">
                
                {/* Dynamic Single Floating Comment - Synced with Loop using activeCommentIndex */}
                <FloatingComment 
                    key={activeCommentIndex} // Forces remount to restart animation on swap
                    text={trainerComments[activeCommentIndex].text}
                    className={trainerComments[activeCommentIndex].position}
                    delay="0.3s" 
                    duration="4.5s" // Fades out just before the 5s loop triggers
                    color={trainerComments[activeCommentIndex].color}
                />

                {trainers.map((trainer, index) => {
                    // Determine position in stack relative to active index
                    // 0 = active, 1 = next, 2 = last
                    const position = (index - activeTrainerIndex + trainers.length) % trainers.length;
                    
                    let zIndex = 0;
                    let transformClass = '';
                    let opacityClass = '';

                    if (position === 0) {
                        // Active Card (Front)
                        zIndex = 30;
                        transformClass = 'scale-100 translate-y-0';
                        opacityClass = 'opacity-100';
                    } else if (position === 1) {
                        // Next Card (Behind 1)
                        zIndex = 20;
                        transformClass = 'scale-95 translate-y-4 md:translate-y-6 blur-[1px]';
                        opacityClass = 'opacity-60 grayscale-[0.5]';
                    } else {
                        // Last Card (Behind 2 - Hidden/Fading)
                        zIndex = 10;
                        transformClass = 'scale-90 translate-y-8 md:translate-y-12 blur-[2px]';
                        opacityClass = 'opacity-0'; // Hide the 3rd one to keep it clean or use low opacity
                    }

                    return (
                        <div
                          key={index}
                          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out origin-bottom ${transformClass} ${opacityClass}`}
                          style={{ zIndex }}
                        >
                          <TrainerCard {...trainer} isActive={position === 0} />
                        </div>
                    );
                })}

                {/* Navigation Dots */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-40">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm">
                      {trainers.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTrainerIndex(idx)}
                          className={`transition-all duration-300 rounded-full h-2.5 ${
                            idx === activeTrainerIndex 
                                ? 'w-8 bg-[#b11e22] shadow-[0_0_10px_rgba(177,30,34,0.5)]' 
                                : 'w-2.5 bg-white hover:bg-slate-200'
                          }`}
                          aria-label={`Trainer slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Axes */}
      <section id="axes" className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-gray-100">
            <SectionHeading title="محاور ورشة العمل" align="center" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {axesData.map((axis, index) => (
                <AxisCard key={index} number={axis.number} title={axis.title} description={axis.description} icon={axis.icon} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white relative w-full overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-[#1e293b] via-[#284e7f] to-[#1e3a8a] rounded-[3rem] p-6 md:p-10 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] mix-blend-overlay" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#b11e22]/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-8 font-sans leading-loose md:leading-[1.4] relative inline-block">
                  <span className="relative z-10 drop-shadow-md">لماذا هذه الورشة</span>
                  <span className="relative mx-3 inline-block transform -rotate-2">
                    <span className="absolute inset-0 bg-[#b11e22] rounded-xl transform rotate-2 shadow-lg" />
                    <span className="relative z-10 text-white px-3">الآن؟</span>
                  </span>
                </h2>

                <p className="text-base md:text-lg text-blue-50 leading-loose font-medium font-sans opacity-95 max-w-3xl mx-auto">
                  في ظل التطور المتسارع لتقنيات الذكاء الاصطناعي، لم يعد تحديد الاحتياجات التدريبية مجرد إجراء روتيني، بل أصبح ركيزة استراتيجية لبناء ميزة تنافسية مستدامة. تقدم هذه الورشة خارطة طريق عملية لدمج أدوات الذكاء الاصطناعي في صميم عمليات الموارد البشرية، مما يضمن دقة التقييم، وكفاءة الإنفاق، وتعظيم العائد على الاستثمار في رأس المال البشري.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right rtl:text-right">
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 group shadow-lg">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                    <CheckCircle2 className="w-8 h-8 text-[#b11e22]" />
                  </div>
                  <h4 className="font-bold text-2xl mb-4 font-sans text-white">منهجيات حديثة</h4>
                  <p className="text-base text-blue-100/80 leading-relaxed font-sans font-bold">
                    الانتقال من الطرق التقليدية إلى أحدث الممارسات العالمية المعتمدة على البيانات.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 group shadow-lg">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                    <Brain className="w-8 h-8 text-[#b11e22]" />
                  </div>
                  <h4 className="font-bold text-2xl mb-4 font-sans text-white">ذكاء اصطناعي</h4>
                  <p className="text-base text-blue-100/80 leading-relaxed font-sans font-bold">
                    استخدام خوارزميات ذكية لتحليل الفجوات بدقة متناهية وسرعة فائقة.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 group shadow-lg">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                    <Target className="w-8 h-8 text-[#b11e22]" />
                  </div>
                  <h4 className="font-bold text-2xl mb-4 font-sans text-white">أداء مؤسسي</h4>
                  <p className="text-base text-blue-100/80 leading-relaxed font-sans font-bold">
                    ربط مخرجات التدريب بالأهداف الاستراتيجية للمؤسسة بشكل مباشر وقابل للقياس.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-slate-50 relative overflow-hidden w-full">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
          <div className="absolute -top-[20%] left-[5%] w-[55%] h-[55%] bg-[#284e7f]/8 rounded-full blur-[120px]" />
          <div className="absolute top-[30%] -right-[10%] w-[45%] h-[45%] bg-[#b11e22]/8 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="ركائز الورشة الأساسية" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={Brain} title="الاحتياجات الذكية" description="إتقان تحديد الاحتياجات التدريبية باستخدام أدوات الذكاء الاصطناعي المتقدمة." />
            <FeatureCard icon={Target} title="القرار التدريبي" description="تعزيز كفاءة واتزان قرارات التدريب في إدارات الموارد البشرية." />
            <FeatureCard icon={Layers} title="التكامل الاستراتيجي" description="مواءمة خطط التدريب بشكل كامل مع الاستراتيجية العامة للمؤسسة." />
            <FeatureCard icon={BarChart3} title="فجوات الكفاءات" description="تحليل فجوات الكفاءات بطرق عملية وذكية تعتمد على البيانات." />
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#284e7f] rounded-[3rem] relative overflow-hidden p-8 md:p-16 shadow-2xl shadow-blue-900/20 flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
            <div className="relative z-10 w-full max-w-3xl flex flex-col gap-8">
              <div className="flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight font-sans">
                  هذه الورشة <span className="text-[#FFFFFF]">موجهة إلى</span>
                </h2>
                <div className="h-1.5 w-24 bg-[#b11e22] mb-6 rounded-full" />
                <p className="text-blue-100 text-lg font-light leading-relaxed font-sans font-medium mb-12">
                  صممت هذه الورشة خصيصاً للقادة وصناع القرار الذين يسعون لإحداث نقلة نوعية في مؤسساتهم باستخدام أحدث التقنيات.
                </p>
              </div>

              <div className="w-full relative h-32 flex items-center justify-center">
                {audienceRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className={`absolute transition-all duration-700 ease-in-out transform w-full max-w-lg ${
                      idx === activeAudienceIndex ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2rem] flex items-center justify-center gap-4 text-white shadow-2xl mx-auto">
                      <div className="w-3 h-3 rounded-full bg-[#b11e22] animate-pulse shrink-0" />
                      <span className="font-bold text-2xl font-sans">{role}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 justify-center mt-4">
                {audienceRoles.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAudienceIndex(idx)}
                    className={`transition-all duration-300 rounded-full h-2 ${idx === activeAudienceIndex ? 'w-8 bg-[#b11e22]' : 'w-2 bg-white/30'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Visual */}
      <section className="py-20 bg-grid-slate relative overflow-hidden w-full">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="relative mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-10 duration-1000 perspective-1000">
            <div className="relative bg-white rounded-[1.5rem] md:rounded-[2rem] border border-gray-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 h-8 md:h-10 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400/80" />
                <div className="ml-4 w-32 md:w-40 h-3 md:h-4 bg-gray-200/50 rounded-md" />
              </div>

              <div className="p-1 bg-white">
                <div className="flex flex-col md:flex-row h-auto min-h-[300px]">
                  <div className="hidden md:flex w-16 border-l border-gray-100 flex-col items-center py-6 gap-6 bg-gray-50/50">
                    <div className="w-8 h-8 rounded-lg bg-[#284e7f] flex items-center justify-center text-white font-bold">R</div>
                    <div className="w-8 h-8 rounded-lg text-gray-400 hover:bg-white hover:shadow-sm flex items-center justify-center">
                      <Layout size={18} />
                    </div>
                    <div className="w-8 h-8 rounded-lg text-[#b11e22] bg-white shadow-sm flex items-center justify-center">
                      <BarChart3 size={18} />
                    </div>
                  </div>

                  <div className="flex-1 p-4 md:p-8 bg-slate-50/30 overflow-hidden relative">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-bold text-lg md:text-xl text-gray-800 font-sans">تحليل فجوات الأداء</h3>
                        <p className="text-xs md:text-sm text-gray-400 font-sans">آخر تحديث: قبل 5 دقائق</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                          <Search size={14} />
                        </div>
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                          <Bell size={14} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="col-span-1 md:col-span-2 bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100/50">
                        <div className="flex justify-between mb-4">
                          <div className="h-3 md:h-4 w-20 md:w-24 bg-gray-100 rounded-md" />
                          <div className="h-3 md:h-4 w-3 md:w-4 bg-gray-100 rounded-full" />
                        </div>
                        <div className="flex items-end gap-2 md:gap-3 h-24 md:h-32 mt-2 px-1">
                          <div className="w-full bg-blue-50 rounded-t-sm md:rounded-t-lg h-[40%]" />
                          <div className="w-full bg-blue-100 rounded-t-sm md:rounded-t-lg h-[70%]" />
                          <div className="w-full bg-[#284e7f] rounded-t-sm md:rounded-t-lg h-[90%]" />
                          <div className="w-full bg-blue-100 rounded-t-sm md:rounded-t-lg h-[60%]" />
                          <div className="w-full bg-blue-50 rounded-t-sm md:rounded-t-lg h-[30%]" />
                        </div>
                      </div>

                      <div className="col-span-1 bg-gradient-to-br from-[#284e7f] to-[#1a3558] rounded-xl md:rounded-2xl p-4 md:p-5 text-white shadow-lg shadow-blue-900/10 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start">
                        <div>
                          <div className="text-xs md:text-sm opacity-80 mb-1 font-sans">ROI Score</div>
                          <div className="text-2xl md:text-3xl font-bold mb-0 md:mb-4 font-sans">94%</div>
                        </div>

                        <div className="hidden md:block h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full w-[94%] bg-[#b11e22] rounded-full" />
                        </div>

                        <div className="flex -space-x-2 space-x-reverse overflow-hidden md:mt-4">
                          {trainers.slice(0, 3).map((t, i) => (
                            <img
                              key={i}
                              className="inline-block h-6 w-6 md:h-8 md:w-8 rounded-full ring-2 ring-[#284e7f] object-cover"
                              src={`https://drive.google.com/thumbnail?id=${t.imageId}&sz=w300`}
                              alt=""
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 md:-left-8 top-12 md:top-20 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] animate-bounce delay-700 border border-gray-100 transform scale-75 md:scale-100 origin-top-left">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-1.5 md:p-2 rounded-full text-green-600">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs text-gray-400 font-bold font-sans">اكتمال التحليل</div>
                  <div className="text-xs md:text-sm font-bold text-gray-800 font-sans">ناجح 100%</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="register" className="py-32 bg-white relative overflow-hidden w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block p-4 rounded-full bg-blue-50 mb-6">
            <Award className="w-8 h-8 text-[#b11e22]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#284e7f] mb-6 tracking-tight font-sans">
            كن جزءاً من مستقبل التدريب الذكي
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light font-sans font-medium">
            لا تفوت فرصة الانضمام إلى نخبة القادة في هذا البرنامج الاستثنائي. المقاعد محدودة لضمان جودة التجربة.
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              variant="primary"
              icon={FileSignature}
              onClick={handleRegister}
              className="!px-12 !py-5 text-lg shadow-xl shadow-red-900/20 w-full sm:w-auto min-w-[280px]"
            >
              سجل الآن
            </Button>
            <Button
              variant="outline"
              icon={DownloadCloud}
              className="!px-12 !py-5 text-lg w-full sm:w-auto min-w-[280px]"
            >
              تحميل الكتيب
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative pt-20 pb-10 overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-right">
                <img
                  src="https://lh3.googleusercontent.com/d/1-SLAi3PFnVcRKY54w97J4H3sYQ2Prj3G"
                  alt="Reference Training Center"
                  className="h-16 w-auto object-contain mx-auto md:mx-0 mb-4"
                />
                <p className="text-gray-500 text-sm max-w-xs font-sans font-bold">
                  نمكن المؤسسات من بناء مستقبلها من خلال حلول تدريبية ذكية ومبتكرة.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-bold text-[#284e7f] font-sans">
                <a href="#" className="hover:text-[#b11e22] transition-colors">الرئيسية</a>
                <a href="#axes" className="hover:text-[#b11e22] transition-colors">المحاور</a>
                <a href="#trainers" className="hover:text-[#b11e22] transition-colors">المدربين</a>
                <a href="#" className="hover:text-[#b11e22] transition-colors">سياسة الخصوصية</a>
              </div>

              <div className="text-center md:text-left" dir="ltr">
                <div className="flex flex-col gap-2 text-sm text-gray-600 font-sans font-medium">
                  <a
                    href="tel:+905337642450"
                    className="hover:text-[#284e7f] transition-colors flex items-center gap-2 justify-center md:justify-start font-bold"
                  >
                    <Smartphone size={16} className="text-[#b11e22]" /> +90 533 764 24 50
                  </a>
                  <a
                    href="mailto:info@reference-rcb.com"
                    className="hover:text-[#284e7f] transition-colors flex items-center gap-2 justify-center md:justify-start font-bold"
                  >
                    <Users size={16} className="text-[#b11e22]" /> info@reference-rcb.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200/60 text-center">
              <p className="text-xs text-gray-400 font-sans font-bold">© 2026 Reference Training Center. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
