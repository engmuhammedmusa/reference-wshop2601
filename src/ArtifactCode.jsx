import React, { useState, useEffect, useCallback } from 'react';

// --- Assets & Data ---
const trainersData = [
  {
    name: "د. رامي شاهين",
    title: "خبير الذكاء الاصطناعي العالمي والتحول الرقمي الاستراتيجي",
    bio: "قائد مشاريع ذكاء اصطناعي دولية، ومحور علاقة الذكاء الاصطناعي بصنع القرار المؤسسي في المنطقة. يحمل دكتوراه في إدارة الموارد البشرية الذكية، ومعتمد من مؤسسات عالمية مثل IBM وISO.",
    image: "https://lh3.googleusercontent.com/d/1Agf19eCAbARzkPgKNQ13Rg2PoydTlo2-"
  },
  {
    name: "د. سالم موسى",
    title: "خبير التطوير المؤسسي وجودة التدريب الدولي",
    bio: "يجمع بين علم النفس الإداري والتطوير العملي للمنظمات. يحمل شهادات متقدمة في الجودة والقيادة، وقاد تحولات مؤسسية في قطاعات حكومية وخاصة في معظم الدول العربية.",
    image: "https://lh3.googleusercontent.com/d/12r7lppBDqCAX5oFBldy-7O77uREbwMVr"
  },
  {
    name: "أ. أحمد الطويل",
    title: "خبير التطوير المؤسسي وإدارة التغيير",
    bio: "يمتلك أكثر من 18 عامًا في تصميم وتنفيذ استراتيجيات تطوير المؤسسات والقيادات، يُدير هيئات محلية ودولية لتحقيق التميز المؤسسي والاستدامة التنظيمية.",
    image: "https://lh3.googleusercontent.com/d/1hG5wGbMOjcCvaWSSfeyWNLhrhcfA0Srq"
  }
];

const headlinesData = [
  "ليس تدريبًا… بل قرارًا ذكيًا",
  "توقف عن التخمين",
  "ابدأ التشخيص"
];

const quotesData = [
  "التدريب بلا بيانات… مجرد أمل.",
  "لا تموّل البرامج… موّل الأثر.",
  "التقييم أولًا. التدريب ثانيًا.",
  "العائد لا يُحسب بعد التدريب… بل يُصمَّم قبله.",
  "ليس كل موظف يحتاج تدريبًا… بعضهم يحتاج اتجاهًا.",
  "من الافتراضات إلى قرارات ذكية — هذه هي النقلة."
];

// --- Sub-Components ---

const Background = () => (
  <>
    <div className="fixed inset-0 pointer-events-none z-[-2] gridGlow" />
    <div className="fixed inset-0 pointer-events-none z-[-1] softGrid" />
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');

      :root {
        --accent: 14 165 233; /* Sky 500 */
        --accent2: 244 63 94; /* Rose 500 */
        --fg: 24 24 27;       /* Zinc 900 (Dark Text) */
        --bg: 240 249 255;    /* Very Light Blue Base */
      }

      body {
        margin: 0;
        font-family: "Tajawal", sans-serif;
        background-color: rgb(var(--bg));
        /* Glassy Light Blue to Light Red Gradient */
        background-image: 
          radial-gradient(circle at 10% 20%, rgba(14, 165, 233, 0.15), transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(244, 63, 94, 0.15), transparent 40%),
          linear-gradient(135deg, #e0f2fe 0%, #ffe4e6 100%);
        background-attachment: fixed;
        color: rgb(var(--fg));
        overflow-x: hidden;
      }

      .gridGlow {
        background-image:
          radial-gradient(900px 600px at 50% -20%, rgba(14, 165, 233, 0.1), transparent 70%),
          radial-gradient(600px 400px at 90% 60%, rgba(244, 63, 94, 0.08), transparent 60%);
        filter: saturate(1.2) contrast(1.1);
        animation: drift 15s ease-in-out infinite alternate;
      }

      .softGrid {
        background-image:
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
        background-size: 48px 48px;
        mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
        opacity: 0.5;
      }

      @keyframes drift {
        0% { transform: translate3d(0,0,0) scale(1); }
        50% { transform: translate3d(18px,-22px,0) scale(1.03); }
        100% { transform: translate3d(0,0,0) scale(1); }
      }

      /* Updated Glass for Light Mode */
      .glass {
        background: rgba(255, 255, 255, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);
      }

      .gradient-text {
        background: linear-gradient(to left, #0ea5e9, #1e293b, #f43f5e);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .dotPulse { animation: dotPulse 1.2s infinite ease-in-out; }
      .dotPulse:nth-child(2) { animation-delay: .15s; }
      .dotPulse:nth-child(3) { animation-delay: .30s; }
      @keyframes dotPulse {
        0%,80%,100% { transform: translateY(0); opacity:.4; }
        40% { transform: translateY(-4px); opacity:1; }
      }
    `}</style>
  </>
);

const StarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM9 15a.75.75 0 01.721.544l.195.682a1.125 1.125 0 00.773.773l.682.195a.75.75 0 010 1.442l-.682.195a1.125 1.125 0 00-.773.773l-.195.682a.75.75 0 01-1.442 0l-.195-.682a1.125 1.125 0 00-.773-.773l-.682-.195a.75.75 0 010-1.442l.682-.195a1.125 1.125 0 00.773-.773l.195-.682A.75.75 0 019 15z" clipRule="evenodd" />
  </svg>
);

const AnimatedText = ({ text, interval = 3000, className = "" }) => {
  const [currentText, setCurrentText] = useState(text[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % text.length);
        setIsVisible(true);
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [text, interval]);

  useEffect(() => {
    if (isVisible) setCurrentText(text[index]);
  }, [isVisible, index, text]);

  return (
    <div 
      className={`${className} transition-all duration-300 ease-in-out transform ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-1'}`}
    >
      {currentText}
    </div>
  );
};

const Countdown = () => {
  const [t, setT] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    const target = new Date("2026-01-19T09:00:00+03:00").getTime();
    
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const s = Math.floor(diff / 1000);
      const d = Math.floor(s / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      
      const pad = (n) => String(n).padStart(2, "0");
      setT({ d: pad(d), h: pad(h), m: pad(m), s: pad(sec) });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end justify-center sm:justify-start gap-2.5 font-mono text-rose-500" dir="ltr">
      <div className="flex flex-col items-center">
        <div className="text-xl leading-none font-black tracking-tight">{t.d}</div>
        <div className="text-[9px] text-zinc-400 font-sans font-bold mt-1">DD</div>
      </div>
      <span className="text-sm font-bold text-zinc-300 mb-4 opacity-50">:</span>
      <div className="flex flex-col items-center">
        <div className="text-xl leading-none font-black tracking-tight">{t.h}</div>
        <div className="text-[9px] text-zinc-400 font-sans font-bold mt-1">HH</div>
      </div>
      <span className="text-sm font-bold text-zinc-300 mb-4 opacity-50">:</span>
      <div className="flex flex-col items-center">
        <div className="text-xl leading-none font-black tracking-tight">{t.m}</div>
        <div className="text-[9px] text-zinc-400 font-sans font-bold mt-1">MM</div>
      </div>
      <span className="text-sm font-bold text-zinc-300 mb-4 opacity-50">:</span>
      <div className="flex flex-col items-center">
        <div className="text-xl leading-none font-black tracking-tight">{t.s}</div>
        <div className="text-[9px] text-zinc-400 font-sans font-bold mt-1">SS</div>
      </div>
    </div>
  );
};

const TrainersCarousel = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const switchTrainer = useCallback((index) => {
    if (index === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 250); 
  }, [active, animating]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating) {
        setAnimating(true);
        setTimeout(() => {
          setActive((prev) => (prev + 1) % trainersData.length);
          setAnimating(false);
        }, 250);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [animating]);

  const t = trainersData[active];

  return (
    <div className="glass rounded-[22px] p-6 relative min-h-[380px] mt-6 shadow-xl shadow-indigo-100/40">
      <div className="md:grid md:grid-cols-[4fr_8fr] md:gap-6 md:items-center md:text-right">
        
        {/* Photo Area */}
        <div className="order-1 relative mx-auto md:mx-0 mb-4 md:mb-0 aspect-[4/5] max-w-[300px] md:max-w-none rounded-[18px] overflow-hidden border border-white/60 bg-gradient-to-b from-white/40 to-white/10 shadow-lg">
          <img 
            src={t.image} 
            alt={t.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Info Area */}
        <div className={`order-2 flex flex-col items-center md:items-start transition-all duration-300 ${animating ? 'opacity-0 blur-sm translate-y-2' : 'opacity-100 blur-0 translate-y-0'}`}>
          <div className="text-xs text-sky-600 font-bold mb-2 tracking-wide uppercase">Team • Experts</div>
          <div className="text-3xl font-black text-zinc-900">{t.name}</div>
          <div className="text-zinc-600 mt-2 leading-relaxed max-w-full font-medium">{t.title}</div>
          
          <div className="mt-4 p-4 rounded-2xl bg-white/40 border border-white/60 w-full text-center md:text-right shadow-sm">
            <div className="text-xs text-zinc-500 mb-1 font-semibold">Bio & Vision</div>
            <div className="text-[15px] leading-relaxed text-zinc-800">{t.bio}</div>
          </div>
        </div>

      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {trainersData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => switchTrainer(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${active === idx ? 'bg-sky-500 scale-125' : 'bg-black/10 hover:bg-black/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen text-zinc-900 selection:bg-rose-500/20">
      <Background />

      <main className="max-w-[1120px] mx-auto px-4 relative flex flex-col items-center text-center">
        
        {/* SYSTEM HERO SECTION */}
        <section className="py-12 w-full relative z-10">
          {/* Main System Frame */}
          <div className="glass rounded-[32px] border border-white/60 p-1 shadow-2xl shadow-sky-200/50 overflow-hidden relative">
            
            {/* Top System Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent opacity-70"></div>
            
            <div className="bg-white/30 rounded-[28px] p-6 md:p-10 relative overflow-hidden backdrop-blur-sm">
                
                {/* Decorative Grid inside */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50"></div>

                {/* Header Status Bar (Translated) */}
                <div className="flex justify-between items-center mb-8 text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest relative z-10 border-b border-zinc-200/50 pb-2">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        <span className="font-bold">النظام نشط</span>
                    </div>
                    <div className="hidden sm:block">معرف الجلسة: AI-ASSESS-2026</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-12 items-center relative z-10">
                    
                    {/* Left: Main Interface Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-right">
                        
                        {/* Title Block */}
                        <div className="relative mb-6">
                            <h1 className="text-3xl md:text-5xl font-black text-zinc-800 leading-tight tracking-tight">
                                تحديد الاحتياجات التدريبية
                                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-sky-600 via-indigo-600 to-rose-500 text-4xl md:text-6xl drop-shadow-sm filter pb-1">
                                    باستخدام الذكاء الاصطناعي
                                </span>
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-zinc-600 leading-relaxed max-w-[550px] mb-8 font-medium">
                            تخيل لو استطعت بناء نظام تقييم ذكي خاص بمؤسستك، يفحص أداء فريقك ويحلل مهاراتهم ويُحدِّد احتياجاتهم التدريبية فوراً، بل وينسق برامج تطوير مخصصة لكل موظف!
                            <span className="block mt-3 text-xl font-bold text-sky-700">
                                هذا ليس خيالاً ، هــذه ورشتنـــا الجديـــدة
                            </span>
                        </p>

                        {/* Date & Counter System Block */}
                        <div className="w-full max-w-lg bg-white/60 border border-white/80 rounded-2xl p-5 backdrop-blur-md shadow-lg shadow-indigo-100/40 group hover:border-sky-300/50 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-3 border-b border-zinc-300/30 pb-2">
                                 <span className="text-xs font-black text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    تاريخ الورشة
                                 </span>
                                 <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">متزامن</span>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
                                <div className="text-center sm:text-right w-full sm:w-auto">
                                    <div className="text-2xl font-black text-zinc-800">19–23 يناير</div>
                                    <div className="text-sm font-bold text-zinc-400">2026</div>
                                </div>
                                
                                <div className="hidden sm:block h-8 w-px bg-zinc-300/50"></div>

                                <div className="text-center sm:text-left w-full sm:w-auto bg-zinc-50/50 rounded-lg px-4 py-2 border border-zinc-200/50">
                                     <div className="text-[10px] text-zinc-400 font-bold mb-2 uppercase tracking-wide">الوقت المتبقي</div>
                                     <Countdown />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right: Active Visualizations */}
                    <div className="relative w-full">
                         <div className="grid gap-4">
                            
                            {/* 1. Skill Analysis Simulator */}
                            <div className="bg-white/60 border border-white/60 rounded-xl p-4 shadow-sm backdrop-blur-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/5 rounded-bl-full"></div>
                                <div className="flex justify-between items-center mb-3">
                                    <div className="text-xs text-zinc-500 font-bold">تحليل الكفاءات الحية</div>
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                    </span>
                                </div>
                                
                                {/* Fake Chart/Bars */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-[10px] text-zinc-600 font-mono">
                                        <span>القيادة الاستراتيجية</span>
                                        <span>85%</span>
                                    </div>
                                    <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-[85%] rounded-full animate-[pulse_3s_infinite]"></div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-[10px] text-zinc-600 font-mono">
                                        <span>التحليل الرقمي</span>
                                        <span>42% <span className="text-rose-500 font-bold">(فجوة)</span></span>
                                    </div>
                                    <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-rose-500 w-[42%] rounded-full"></div>
                                    </div>
                                </div>
                                
                                <div className="mt-3 pt-2 border-t border-zinc-200/50 flex justify-between items-center">
                                     <span className="text-[10px] text-zinc-400">الموظف: #8492</span>
                                     <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-100">جاري المعالجة</span>
                                </div>
                            </div>

                            {/* 2. Simplified Live Log */}
                            <div className="bg-white/60 border border-white/60 rounded-xl p-4 shadow-sm backdrop-blur-sm relative overflow-hidden text-right"> 
                                 <div className="flex justify-between items-center mb-3 border-b border-zinc-200/50 pb-2">
                                     <div className="text-xs text-zinc-500 font-bold uppercase">سجل المعالجة</div>
                                     <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        <span className="text-[10px] text-emerald-600 font-bold">متصل</span>
                                     </div>
                                 </div>
                                 
                                 <div className="space-y-3 relative">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[11px] font-bold text-zinc-700">فحص بيانات الأداء</div>
                                            <div className="text-[9px] text-zinc-500">تم تحليل 450 سجل وظيفي</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[11px] font-bold text-zinc-700">تنبيه: فجوة مهارات</div>
                                            <div className="text-[9px] text-zinc-500">نقص في مهارات التفاوض (45%)</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 opacity-70">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[11px] font-bold text-zinc-700">توليد خطة علاجية</div>
                                            <div className="text-[9px] text-zinc-500">جاري إنشاء المسار...</div>
                                        </div>
                                    </div>
                                 </div>
                             </div>

                         </div>
                    </div>

                </div>
            </div>
          </div>
        </section>

        {/* QUOTES */}
        <section className="w-full pb-12">
          <div className="glass rounded-[22px] p-6 text-center shadow-lg shadow-rose-100/30">
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 mb-2 font-bold uppercase tracking-wider">
               <StarIcon className="w-4 h-4 text-rose-400" /> RefeAI Says
            </div>
            <div className="min-h-[60px] flex items-center justify-center">
              <AnimatedText text={quotesData} interval={4000} className="text-2xl md:text-3xl font-black gradient-text leading-tight" />
            </div>
          </div>
        </section>

        {/* TRAINERS */}
        <section id="trainers" className="w-full pb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-2 text-zinc-900">
            مدربونا ليسوا متحدثين…
            <span className="block text-zinc-500 mt-2 text-2xl">هم مهندسو التحول</span>
          </h2>
          <TrainersCarousel />
        </section>

        {/* REFE AI Chat */}
        <section id="refeai" className="w-full pb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-2 text-zinc-900">RefeAI</h2>
          <span className="block text-zinc-500 font-extrabold text-sm mb-6">مساعد قرار التدريب الذكي</span>
          
          <div className="glass rounded-[22px] overflow-hidden text-right shadow-xl shadow-sky-100/40">
            {/* Header */}
            <div className="px-4 py-3 bg-white/40 border-b border-white/60 flex items-center justify-between backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/60 border border-white/60 flex items-center justify-center shadow-sm">
                  <StarIcon className="text-sky-600 w-5 h-5" />
                </div>
                <div>
                  <div className="font-black leading-none text-zinc-800">RefeAI</div>
                  <div className="text-[10px] text-zinc-500 mt-1 font-semibold">AI Decision Support</div>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-100/50 border border-emerald-200/60 text-xs text-emerald-700 font-bold">Active</div>
            </div>

            {/* Body */}
            <div className="p-4 min-h-[240px] flex flex-col gap-3">
              <div className="flex justify-start">
                <div className="max-w-[85%] p-3 rounded-2xl rounded-tr-sm border border-white/60 bg-white/40 text-sm text-zinc-800 font-medium shadow-sm">
                  من يحتاج تدريبًا فعلًا؟
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-sm border border-sky-100 bg-gradient-to-l from-sky-50 to-white/40 text-sm text-zinc-800 font-medium shadow-sm">
                  دعني أحلل فجوات الأداء والكفاءات…
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-sm border border-sky-100 bg-gradient-to-l from-sky-50 to-white/40 text-sm text-zinc-800 font-medium shadow-sm">
                  تم رصد 3 فجوات حرجة. أولوية: إدارة الأداء + قيادة الفرق + تحليل البيانات.
                </div>
              </div>

              <div className="flex justify-end mt-2">
                <div className="px-3 py-2 rounded-2xl bg-white/40 border border-white/60 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dotPulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dotPulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dotPulse"></div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/60 bg-white/30 flex gap-2">
              <input disabled placeholder="اكتب سؤالك…" className="flex-1 px-3 py-3 rounded-xl bg-white/50 border border-white/60 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:bg-white/70 transition-all" />
              <button disabled className="px-4 py-2 rounded-xl bg-white/40 border border-white/60 text-zinc-400 font-bold text-sm cursor-not-allowed">إرسال</button>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="w-full pb-16">
          <div className="glass rounded-[26px] p-8 shadow-2xl shadow-rose-100/50">
            <h3 className="text-2xl md:text-4xl font-black mb-3 text-zinc-900">كن جزءًا من مستقبل التدريب الذكي</h3>
            <p className="text-zinc-600 max-w-[700px] mx-auto leading-relaxed mb-6 font-medium">
              مقاعد محدودة لضمان تجربة عالية الجودة — التحول يبدأ عندما يصبح التدريب قرارًا.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-l from-sky-500 to-rose-500 text-white font-black hover:-translate-y-px transition-transform shadow-lg shadow-rose-500/20">
                سجّل الآن
              </button>
              <button className="px-6 py-3 rounded-xl bg-white/40 border border-white/60 text-zinc-800 font-bold hover:bg-white/60 transition-colors">
                تحميل الكتيّب
              </button>
            </div>
          </div>
        </section>

        <footer className="text-xs text-zinc-500 pb-10 font-semibold">
          © 2026 — AI Assessment Center
        </footer>

      </main>
    </div>
  );
}
