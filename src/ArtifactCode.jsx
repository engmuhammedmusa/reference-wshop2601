import React, { useState, useEffect, useCallback, useRef } from 'react';

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

const BrainIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const DataIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2c-4.4 0-8 1.8-8 4v12c0 2.2 3.6 4 8 4s8-1.8 8-4V6c0-2.2-3.6-4-8-4Z" />
    <path d="M20 12c0 2.2-3.6 4-8 4s-8-1.8-8-4" />
    <path d="M20 6c0 2.2-3.6 4-8 4s-8-1.8-8-4" />
  </svg>
);

const ChipIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M8.5 3v18" />
    <path d="M15.5 3v18" />
    <path d="M3 8.5h18" />
    <path d="M3 15.5h18" />
  </svg>
);

const SparkleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9.81 5.9a4 4 0 0 1 3.29-3.29 1.5 1.5 0 0 1 1.7 1.7 4 4 0 0 1-3.29 3.29 1.5 1.5 0 0 1-1.7-1.7Z" />
    <path d="M16.19 13.9a4 4 0 0 1 3.29-3.29 1.5 1.5 0 0 1 1.7 1.7 4 4 0 0 1-3.29 3.29 1.5 1.5 0 0 1-1.7-1.7Z" />
    <path d="M2 12s4-1 5-5 1-5 1-5 1 4 5 5-5 5-5 5-1-4-1-4-4-1-5-1Z" />
  </svg>
);

const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
    <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-[#284e7f]/10 rounded-full blur-[80px] animate-pulse-slow"></div>
    <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-[#b11e22]/5 rounded-full blur-[100px] animate-pulse-slower"></div>
    <div className="absolute top-[15%] left-[5%] opacity-30 animate-float-slow text-[#284e7f]">
      <div className="relative">
           <div className="absolute inset-0 bg-[#284e7f]/20 blur-xl rounded-full"></div>
           <BrainIcon className="w-16 h-16 relative z-10" />
      </div>
    </div>
    <div className="absolute top-[20%] right-[8%] opacity-20 animate-float-medium text-[#b11e22] delay-700">
       <div className="relative">
           <div className="absolute inset-0 bg-[#b11e22]/20 blur-xl rounded-full"></div>
           <DataIcon className="w-12 h-12 relative z-10" />
       </div>
    </div>
    <div className="absolute bottom-[30%] left-[15%] opacity-25 animate-float-fast text-[#284e7f] delay-1000">
       <ChipIcon className="w-10 h-10" />
    </div>
    <div className="absolute bottom-[40%] right-[20%] opacity-30 animate-float-slow text-[#b11e22] delay-500">
      <SparkleIcon className="w-8 h-8" />
    </div>
    <div className="absolute top-[40%] left-[30%] w-2 h-2 bg-[#284e7f]/40 rounded-full animate-float-random shadow-[0_0_10px_#284e7f]"></div>
    <div className="absolute top-[60%] right-[40%] w-3 h-3 bg-[#b11e22]/30 rounded-full animate-float-random delay-1000 shadow-[0_0_10px_#b11e22]"></div>
    <div className="absolute top-[25%] right-[25%] w-1.5 h-1.5 bg-[#284e7f]/50 rounded-full animate-float-random delay-2000"></div>
  </div>
);

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/905337642450"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-green-500/50 group border border-white/20"
    aria-label="تواصل معنا عبر واتساب"
  >
    <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-30"></div>
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
    </svg>
  </a>
);

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

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
    <div className={`${className} transition-all duration-300 ease-in-out transform ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-1'}`}>
      {currentText}
    </div>
  );
};

const StarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM9 15a.75.75 0 01.721.544l.195.682a1.125 1.125 0 00.773.773l.682.195a.75.75 0 010 1.442l-.682.195a1.125 1.125 0 00-.773.773l-.195.682a.75.75 0 01-1.442 0l-.195-.682a1.125 1.125 0 00-.773-.773l-.682-.195a.75.75 0 010-1.442l.682-.195a1.125 1.125 0 00.773-.773l.195-.682A.75.75 0 019 15z" clipRule="evenodd" />
  </svg>
);

const Background = () => (
  <>
    <div className="fixed inset-0 pointer-events-none z-[-2] gridGlow" />
    <div className="fixed inset-0 pointer-events-none z-[-1] softGrid" />
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');

      :root {
        --accent: 40 78 127; 
        --accent2: 177 30 34; 
        --fg: 40 78 127;
        --bg: 226 232 240;
      }

      body {
        margin: 0;
        font-family: "Tajawal", sans-serif;
        background-color: rgb(var(--bg));
        background-attachment: fixed;
        color: #284e7f;
        overflow-x: hidden;
      }

      .gridGlow {
        background-image:
          radial-gradient(900px 600px at 50% -20%, rgba(40, 78, 127, 0.1), transparent 70%),
          radial-gradient(600px 400px at 90% 60%, rgba(177, 30, 34, 0.1), transparent 60%);
        filter: saturate(1.2) contrast(1.1);
        animation: drift 15s ease-in-out infinite alternate;
      }

      .softGrid {
        background-image:
          linear-gradient(rgba(40, 78, 127,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(40, 78, 127,0.07) 1px, transparent 1px);
        background-size: 48px 48px;
        mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
        opacity: 0.6;
      }

      @keyframes drift {
        0% { transform: translate3d(0,0,0) scale(1); }
        50% { transform: translate3d(18px,-22px,0) scale(1.03); }
        100% { transform: translate3d(0,0,0) scale(1); }
      }

      @keyframes float-slow {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(20px, -20px) rotate(5deg); }
      }
      
      @keyframes float-medium {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(-15px, 25px) rotate(-5deg); }
      }
      
      @keyframes float-fast {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(10px, 10px) scale(1.1); }
      }

      @keyframes float-random {
        0%, 100% { transform: translate(0, 0); opacity: 0.2; }
        25% { transform: translate(30px, -30px); opacity: 0.4; }
        50% { transform: translate(-20px, 20px); opacity: 0.2; }
        75% { transform: translate(-40px, -10px); opacity: 0.4; }
      }

      @keyframes pulse-slow {
        0%, 100% { opacity: 0.1; transform: scale(1); }
        50% { opacity: 0.2; transform: scale(1.2); }
      }

      @keyframes pulse-slower {
        0%, 100% { opacity: 0.05; transform: scale(1); }
        50% { opacity: 0.15; transform: scale(1.3); }
      }

      .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
      .animate-float-medium { animation: float-medium 12s ease-in-out infinite; }
      .animate-float-fast { animation: float-fast 8s ease-in-out infinite; }
      .animate-float-random { animation: float-random 20s linear infinite; }
      .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
      .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }

      .glass {
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.7);
        border-top: 1px solid rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        box-shadow: 0 8px 32px rgba(40, 78, 127, 0.08);
      }

      .gradient-text {
        background: linear-gradient(to left, #284e7f, #1e293b, #b11e22);
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

  const Circle = ({ val, label }) => (
    <div className="flex flex-col items-center gap-1">
       <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#284e7f]/20 flex items-center justify-center bg-white shadow-sm">
         <span className="text-sm sm:text-base font-black text-[#284e7f]">{val}</span>
       </div>
       <span className="text-[9px] font-bold text-[#b11e22] uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-2 sm:gap-3" dir="ltr">
        <Circle val={t.d} label="Day" />
        <span className="text-[#284e7f]/20 font-bold mb-4">:</span>
        <Circle val={t.h} label="Hr" />
        <span className="text-[#284e7f]/20 font-bold mb-4">:</span>
        <Circle val={t.m} label="Min" />
        <span className="text-[#284e7f]/20 font-bold mb-4">:</span>
        <Circle val={t.s} label="Sec" />
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
    <div className="glass rounded-[22px] p-6 relative min-h-[380px] mt-6 shadow-xl shadow-[#284e7f]/10 border border-[#284e7f]/10">
      <div className="md:grid md:grid-cols-[4fr_8fr] md:gap-6 md:items-center md:text-right">
        <div className="order-1 relative mx-auto md:mx-0 mb-4 md:mb-0 aspect-[4/5] max-w-[300px] md:max-w-none rounded-[18px] overflow-hidden border border-white/60 bg-gradient-to-b from-white/40 to-white/10 shadow-lg">
          <img 
            src={t.image} 
            alt={t.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="eager"
            onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentNode.style.backgroundColor = '#cbd5e1'; 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
        </div>
        <div className={`order-2 flex flex-col items-center md:items-start transition-all duration-300 ${animating ? 'opacity-0 blur-sm translate-y-2' : 'opacity-100 blur-0 translate-y-0'}`}>
          <div className="text-xs text-[#b11e22] font-bold mb-2 tracking-wide uppercase">Team • Experts</div>
          <div className="text-3xl font-black text-[#284e7f]">{t.name}</div>
          <div className="text-[#284e7f]/80 mt-2 leading-relaxed max-w-full font-medium">{t.title}</div>
          <div className="mt-4 p-4 rounded-2xl bg-white/40 border border-white/60 w-full text-center md:text-right shadow-sm">
            <div className="text-xs text-[#284e7f]/60 mb-1 font-semibold">Bio & Vision</div>
            <div className="text-[15px] leading-relaxed text-[#284e7f]">{t.bio}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {trainersData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => switchTrainer(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${active === idx ? 'bg-[#b11e22] scale-125' : 'bg-black/10 hover:bg-black/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen text-[#284e7f] selection:bg-[#b11e22]/20">
      <Background />
      <FloatingWhatsApp />

      <main className="w-full relative flex flex-col items-center text-center">
        
        {/* NEW HERO SECTION - SAAS STYLE */}
        <section className="w-full relative flex flex-col items-center pt-24 pb-20 sm:pt-32 sm:pb-32 overflow-hidden">
            
            {/* Scrollable Navbar (Absolute) */}
            <nav className="absolute top-6 left-0 right-0 z-50 w-[92%] max-w-7xl mx-auto px-4 py-2 rounded-full flex flex-col md:flex-row justify-between items-center glass shadow-lg shadow-[#284e7f]/5 transition-all">
                <div className="flex items-center mb-2 md:mb-0">
                    <img 
                      src="https://lh3.googleusercontent.com/d/1-SLAi3PFnVcRKY54w97J4H3sYQ2Prj3G" 
                      alt="Company Logo" 
                      className="h-9 sm:h-10 object-contain filter drop-shadow-sm" 
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2 rounded-full bg-white/40 hover:bg-white/60 border border-white/60 text-[#284e7f] text-xs sm:text-sm font-bold transition-all shadow-sm">
                        تحميل الكتيب
                    </button>
                    <button className="px-5 py-2 rounded-full bg-gradient-to-l from-[#284e7f] to-[#b11e22] hover:scale-105 text-white text-xs sm:text-sm font-bold transition-transform shadow-lg shadow-[#b11e22]/20">
                        احجز مقعدك
                    </button>
                </div>
            </nav>

            {/* Hero Content Area */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center mt-8">
                
                <FloatingParticles />

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-[#284e7f]/20 shadow-sm mb-6 backdrop-blur-sm animate-[fadeIn_1s_ease-out] relative z-10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b11e22] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b11e22]"></span>
                    </span>
                    <span className="text-xs font-bold text-[#284e7f] tracking-wide">AI Assessment Centre</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#284e7f] leading-tight tracking-tight mb-4 text-center relative z-10">
                    تحديد الاحتياجات التدريبية
                    <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-[#284e7f] via-[#284e7f] to-[#b11e22] drop-shadow-sm filter pb-2">
                        باستخدام الذكاء الاصطناعي
                    </span>
                </h1>

                <p className="text-lg sm:text-xl text-[#284e7f]/80 leading-relaxed max-w-2xl mb-10 font-medium text-center relative z-10">
                    كل مؤسسة ناجحة اليوم تسابق الزمن لتحويل بيانات موظفيها من أرقام صامتة إلى خطط تطوير شاملة تعمل بالذكاء الاصطناعي. الفجوة تتسع كل ثانية. إما أن تقفز الآن إلى عصر التقييم الذكي،{' '}
                    <span className="font-bold text-[#b11e22]">
                        أو تستعد لمشاهدة مؤسستك تتآكل ببطء أمام من تحركوا قبلك.
                    </span>
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8 relative z-10">
                    <button className="px-8 py-4 rounded-full bg-gradient-to-l from-[#284e7f] to-[#b11e22] text-white font-black text-lg hover:-translate-y-1 transition-all shadow-xl shadow-[#b11e22]/30 flex items-center gap-2">
                        <span>سجل الآن</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </button>
                    <button className="px-8 py-4 rounded-full bg-white/60 hover:bg-white/80 border border-[#284e7f]/30 text-[#284e7f] font-bold text-lg transition-all shadow-lg backdrop-blur-sm">
                        عرض التفاصيل
                    </button>
                </div>

                {/* Compact Countdown - Centered */}
                <div className="w-full max-w-lg mx-auto mt-4 mb-12 bg-white/60 border border-[#284e7f]/20 rounded-2xl p-4 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative z-10">
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <div>
                            <div className="text-xs font-bold text-[#284e7f]/60 mb-0.5 uppercase tracking-wider">تاريخ الورشة</div>
                            <div className="text-lg font-black text-[#284e7f] leading-none">19–23 يناير</div>
                        </div>
                        <div className="w-3/4 h-px bg-[#284e7f]/10"></div>
                        <div className="flex flex-col items-center">
                             <div className="text-[9px] text-[#284e7f]/60 font-bold mb-2 uppercase tracking-wider">الوقت المتبقي</div>
                             <Countdown />
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* DASHBOARD PRODUCT SHOT */}
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20 mb-20">
            <FadeIn>
                <div className="glass rounded-[24px] p-2 shadow-2xl shadow-[#284e7f]/20 overflow-hidden border border-white/60 ring-1 ring-[#284e7f]/5 bg-white/50 backdrop-blur-xl">
                    <div className="h-8 bg-[#284e7f]/5 border-b border-[#284e7f]/5 flex items-center px-4 gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/60"></div>
                        <div className="ml-auto text-[10px] font-mono text-[#284e7f]/40">AI Assessment Center v2.0</div>
                    </div>
                    <div className="p-6 sm:p-10 bg-white/40">
                        <div className="text-center mb-8">
                            <p className="text-lg sm:text-xl font-bold text-[#284e7f] leading-snug">
                                من بيانات خام إلى قرارات تدريبية ذكية خلال ثوانٍ
                            </p>
                            <p className="text-base sm:text-lg font-medium text-[#b11e22] mt-2">
                                هذا هو الفرق بين التقييم التقليدي، ومركز التقييم الذكي
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/70 border border-[#284e7f]/10 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="text-right">
                                        <div className="text-xs text-[#284e7f]/60 font-bold mb-1">تحليل الكفاءات الحية</div>
                                        <div className="text-base font-black text-[#284e7f]">
                                            الموظف: <span className="text-[#b11e22]">#8492</span>
                                        </div>
                                    </div>
                                    <div className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold border border-green-200">نشط الآن</div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between text-xs text-[#284e7f] font-bold mb-1">
                                            <span>القيادة الاستراتيجية</span>
                                            <span>85%</span>
                                        </div>
                                        <div className="h-2 bg-[#284e7f]/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#284e7f] w-[85%] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between text-xs text-[#284e7f] font-bold mb-1">
                                            <span>التحليل الرقمي</span>
                                            <span className="text-[#b11e22]">42% (فجوة)</span>
                                        </div>
                                        <div className="h-2 bg-[#284e7f]/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#b11e22] w-[42%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/70 border border-[#284e7f]/10 rounded-xl p-5 shadow-sm relative overflow-hidden text-right hover:shadow-md transition-shadow"> 
                                <div className="flex justify-between items-center mb-4 border-b border-[#284e7f]/10 pb-3">
                                    <div className="text-xs text-[#284e7f]/60 font-bold uppercase">سجل المعالجة</div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        <span className="text-[10px] text-emerald-600 font-bold">متصل</span>
                                    </div>
                                </div>
                                <div className="space-y-3 relative">
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-[#284e7f]/5">
                                        <div className="w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center text-[#284e7f] shadow-sm">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-[#284e7f] truncate">فحص بيانات الأداء</div>
                                            <div className="text-[10px] text-[#284e7f]/60 truncate font-bold">تم تحليل 450 سجل وظيفي</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 rounded-lg bg-[#b11e22]/5">
                                        <div className="w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center text-[#b11e22] shadow-sm">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-[#284e7f] truncate">تنبيه: فجوة مهارات</div>
                                            <div className="text-[10px] text-[#284e7f]/60 truncate font-bold">نقص في مهارات التفاوض (45%)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-[#284e7f]/10 text-center">
                            <span className="text-[10px] text-[#284e7f]/50 font-bold tracking-wide flex items-center justify-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#284e7f]/40"></span>
                                مثال حي من نظام التقييم الذكي
                            </span>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>

        {/* TRAINERS */}
        <section id="trainers" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <FadeIn delay={200}>
            <h2 className="text-xl md:text-2xl font-black mb-2 text-[#284e7f]">
              مدربونا ليسوا متحدثين؛ بل هم مهندسوا التحول
            </h2>
            <TrainersCarousel />
          </FadeIn>
        </section>

        {/* QUOTES */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <FadeIn delay={100}>
            <div className="glass rounded-[22px] p-6 text-center shadow-lg shadow-[#b11e22]/20 border border-[#b11e22]/20">
              <div className="flex items-center justify-center gap-2 text-xs text-[#284e7f]/60 mb-2 font-bold uppercase tracking-wider">
                 <StarIcon className="w-4 h-4 text-[#b11e22]" /> RefeAI Says
              </div>
              <div className="min-h-[60px] flex items-center justify-center">
                <AnimatedText text={quotesData} interval={4000} className="text-lg md:text-xl font-black gradient-text leading-tight" />
              </div>
            </div>
          </FadeIn>
        </section>

        {/* REFE AI Chat */}
        <section id="refeai" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <FadeIn delay={300}>
            <h2 className="text-3xl md:text-4xl font-black mb-2 text-[#284e7f]">RefeAI</h2>
            <span className="block text-[#284e7f]/80 font-extrabold text-sm mb-6">مساعد قرار التدريب الذكي</span>
            
            <div className="glass rounded-[22px] overflow-hidden text-right shadow-xl shadow-[#284e7f]/20 border border-[#284e7f]/20">
              {/* Header */}
              <div className="px-4 py-3 bg-white/40 border-b border-white/60 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/60 border border-white/60 flex items-center justify-center shadow-sm">
                    <StarIcon className="text-[#284e7f] w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-black leading-none text-[#284e7f]">RefeAI</div>
                    <div className="text-[10px] text-[#284e7f]/60 mt-1 font-semibold">AI Decision Support</div>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-100/50 border border-emerald-200/60 text-xs text-emerald-700 font-bold">Active</div>
              </div>

              {/* Body */}
              <div className="p-4 min-h-[240px] flex flex-col gap-3">
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 rounded-2xl rounded-tr-sm border border-white/60 bg-white/40 text-sm text-[#284e7f] font-medium shadow-sm">
                    من يحتاج تدريبًا فعلًا؟
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-sm border border-[#284e7f]/30 bg-gradient-to-l from-[#284e7f]/10 to-white/40 text-sm text-[#284e7f] font-medium shadow-sm">
                    دعني أحلل فجوات الأداء والكفاءات…
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-sm border border-[#284e7f]/30 bg-gradient-to-l from-[#284e7f]/10 to-white/40 text-sm text-[#284e7f] font-medium shadow-sm">
                    تم رصد 3 فجوات حرجة. أولوية: إدارة الأداء + قيادة الفرق + تحليل البيانات.
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <div className="px-3 py-2 rounded-2xl bg-white/40 border border-white/60 flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#284e7f]/40 dotPulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#284e7f]/40 dotPulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#284e7f]/40 dotPulse"></div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/60 bg-white/30 flex gap-2">
                <input disabled placeholder="اكتب سؤالك…" className="flex-1 px-3 py-3 rounded-xl bg-white/50 border border-white/60 text-sm text-[#284e7f] placeholder-[#284e7f]/40 focus:outline-none focus:bg-white/70 transition-all" />
                <button disabled className="px-4 py-2 rounded-xl bg-white/40 border border-white/60 text-[#284e7f]/40 font-bold text-sm cursor-not-allowed">إرسال</button>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* FINAL CTA */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <FadeIn delay={400}>
            <div className="glass rounded-[26px] p-8 shadow-2xl shadow-[#b11e22]/20 border border-[#b11e22]/20">
              <h3 className="text-2xl md:text-4xl font-black mb-3 text-[#284e7f]">كن جزءًا من مستقبل التدريب الذكي</h3>
              <p className="text-[#284e7f]/80 max-w-[700px] mx-auto leading-relaxed mb-6 font-medium">
                مقاعد محدودة لضمان تجربة عالية الجودة — التحول يبدأ عندما يصبح التدريب قرارًا.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-l from-[#284e7f] to-[#b11e22] text-white font-black hover:-translate-y-px transition-transform shadow-lg shadow-[#b11e22]/20">
                  سجّل الآن
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/40 border border-white/60 text-[#284e7f] font-bold hover:bg-white/60 transition-colors">
                  تحميل الكتيّب
                </button>
              </div>
            </div>
          </FadeIn>
        </section>

        <footer className="text-xs text-[#284e7f]/60 pb-10 font-semibold">
          © 2026 — AI Assessment Center
        </footer>

      </main>
    </div>
  );
}
