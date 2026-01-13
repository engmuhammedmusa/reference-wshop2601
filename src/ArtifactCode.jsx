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
  Sparkles, // AI Icon
  Send,     // Send Icon
  Loader2,  // Loading Icon
  Bot,      // Bot Icon
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
  FileSignature, // New Icon
  DownloadCloud  // New Icon
} from 'lucide-react';

// --- Fonts & Global Styles ---
const GlobalStyles = () => (
  <style>{`
    /* Changed Font to Tajawal - A modern, geometric Arabic font */
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800&display=swap');

    :root {
      --font-tajawal: 'Tajawal', sans-serif;
    }

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

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .font-sans {
      font-family: 'Tajawal', sans-serif !important;
    }

    .rtl-flip {
      transform: scaleX(-1);
    }

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
    .animate-rotate-border {
      animation: rotate-border 4s linear infinite;
    }
  `}</style>
);

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', icon: Icon, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-3.5 md:py-4 text-sm md:text-base font-bold rounded-[2rem] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-sans gap-3 group";

  const variants = {
    primary: "border-transparent text-white bg-[#b11e22] hover:bg-[#8a1619] shadow-lg shadow-red-900/10 hover:shadow-red-900/20 hover:-translate-y-0.5",
    secondary: "border-transparent text-white bg-[#284e7f] hover:bg-[#1d3a61] shadow-md hover:shadow-lg",
    outline: "border border-gray-200 text-[#284e7f] bg-white/50 hover:bg-white hover:border-[#284e7f]/20 shadow-sm hover:shadow-md backdrop-blur-sm",
    white: "bg-white text-[#284e7f] hover:bg-gray-50 shadow-lg",
    ai: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/30",
  };

  const iconContainerStyle = variant === 'primary'
    ? 'bg-white/20 text-white'
    : variant === 'outline'
      ? 'bg-[#284e7f]/10 text-[#284e7f]'
      : 'bg-white/20 text-white';

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span>{children}</span>
      {Icon && (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1 ${iconContainerStyle}`}>
          <Icon size={18} />
        </div>
      )}
    </button>
  );
};

const SectionHeading = ({ subtitle, title, align = 'center' }) => (
  <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-right'} max-w-4xl mx-auto px-4`}>
    {subtitle && (
      <span className="inline-block py-2 px-5 rounded-[1.5rem] bg-[#284e7f]/5 text-[#284e7f] text-sm font-bold tracking-wider mb-4 border border-[#284e7f]/10 font-sans">
        {subtitle}
      </span>
    )}
    <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#284e7f] leading-tight font-sans">
      {title}
    </h2>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="relative group p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
    <div className="h-14 w-14 md:h-16 md:w-16 rounded-[1.5rem] bg-[#284e7f]/5 flex items-center justify-center mb-6 group-hover:bg-[#284e7f] transition-colors duration-300">
      <Icon className="h-7 w-7 md:h-8 md:w-8 text-[#284e7f] group-hover:text-white transition-colors duration-300" />
    </div>

    <h3 className="text-lg md:text-xl font-extrabold text-[#284e7f] mb-3 font-sans">{title}</h3>
    <p className="text-gray-600 leading-relaxed font-sans font-bold text-sm">
      {description}
    </p>
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

const TrainerCard = ({ name, title, bio, imageId, isActive }) => (
  <div className={`bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_10px_40px_rgb(0,0,0,0.06)] border border-gray-100 transition-all duration-700 h-full transform ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-50 blur-[1px]'}`}>
    <div className="flex flex-col md:flex-row h-full">
      {/* Image Side */}
      <div className="w-full md:w-2/5 relative overflow-hidden group h-64 md:h-auto">
        <div className="absolute inset-0 bg-[#284e7f]/20 group-hover:bg-transparent transition-colors duration-500 mix-blend-multiply z-10" />
        <img
          src={`https://lh3.googleusercontent.com/d/${imageId}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://ui-avatars.com/api/?name=" + name + "&background=284e7f&color=fff&size=500";
          }}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content Side */}
      <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center bg-white relative">
        <Quote className="absolute top-6 right-6 md:top-8 md:right-8 text-gray-100 w-12 h-12 md:w-16 md:h-16 -z-0 rotate-180" />
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 md:px-4 md:py-1 rounded-full bg-blue-50 text-[#284e7f] text-[10px] md:text-xs font-bold mb-3 md:mb-4 border border-blue-100">مدرب خبير</span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#284e7f] mb-1 md:mb-2 font-sans">{name}</h3>
          <p className="text-[#b11e22] font-bold text-xs md:text-sm mb-4 md:mb-6 font-sans">{title}</p>
          <div className="h-1 w-16 md:w-20 bg-gray-100 rounded-full mb-4 md:mb-6"></div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed md:leading-loose font-sans font-medium line-clamp-6 md:line-clamp-none">
            {bio}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-01-19T09:00:00").getTime();
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
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-[2rem] blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
      <div className="relative w-16 h-20 md:w-24 md:h-28 flex flex-col items-center justify-center bg-white/20 backdrop-blur-2xl border border-white/40 rounded-2xl md:rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:-translate-y-1 transition-all duration-300">
        <div className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#284e7f] to-[#1a3558] mb-1 tabular-nums tracking-tight font-sans">
          {String(value).padStart(2, '0')}
        </div>
        <div className="text-[9px] md:text-xs font-semibold text-gray-500 uppercase tracking-widest font-sans">
          {label}
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent rounded-[2rem] pointer-events-none"></div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-4 justify-center mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000" dir="ltr">
      <GlassUnit value={timeLeft.days} label="Days" />
      <GlassUnit value={timeLeft.hours} label="Hours" />
      <GlassUnit value={timeLeft.minutes} label="Mins" />
      <GlassUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

const FloatingWhatsApp = () => {
  const phoneNumber = "905337642450";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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

// --- AI Advisor Section Component ---
const AIAdvisorSection = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResponse('');

    const apiKey = "AIzaSyDpsuHfDotJQGoe9wyLhAP0yHmZmCJ6-Ig"; // Set at runtime// Set at runtime
    const prompt = `
      You are a senior HR consultant promoting a high-level workshop titled "Training Needs Analysis using AI & Smart Assessment Centers".
      User Challenge: "${query}"
      Output Language: Arabic. Style: Executive, concise (max 3-4 sentences), helpful.
    `;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) setResponse(aiText);
      else throw new Error("No response generated");
    } catch (err) {
      setError('عذراً، حدث خطأ في الاتصال بالمستشار الذكي.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-24 bg-white relative w-full overflow-hidden">
      {/* Background with abstract shapes */}
      <div className="absolute inset-0 bg-[#f8fafc]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#284e7f]/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-[#b11e22]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Glassy Floating Container with Moving Border Animation */}
        <div className="relative group p-[2px] rounded-[3.5rem] overflow-hidden">
          {/* Animated Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b11e22] to-transparent opacity-50 animate-rotate-border w-[200%] h-[200%] -left-[50%] -top-[50%]"></div>
          <div className="absolute inset-[2px] bg-white rounded-[3.5rem]"></div>

          <div className="bg-white/60 backdrop-blur-2xl rounded-[3.5rem] p-6 md:p-12 lg:p-16 relative overflow-hidden h-full">
            {/* Branding Tag */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 px-6 py-2 bg-white border border-blue-100 rounded-full shadow-md transform hover:scale-105 transition-transform cursor-default">
                <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
                <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-[#284e7f] to-[#b11e22] tracking-widest font-sans">RefeAI BETA</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Text Content */}
              <div className="flex flex-col justify-center h-full text-center lg:text-right">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-[#284e7f] leading-tight font-sans">
                  مستشار التدريب <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#284e7f] to-[#b11e22]">الذكي والشخصي</span>
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-sans font-medium">
                  هل تواجه تحدياً في تحديد الاحتياجات التدريبية؟ أو تبحث عن طريقة لربط التدريب بالأهداف الاستراتيجية؟
                  <br /><br />
                  اكتب التحدي الذي تواجهه هنا، وسيقوم نموذج الذكاء الاصطناعي الخاص بنا بتحليله فوراً وتقديم استشارة مبدئية توضح كيف يمكن لهذه الورشة أن تكون الحل الأمثل لك.
                </p>
              </div>

              {/* Interaction Box */}
              <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-2 h-full flex flex-col justify-center">
                {!response ? (
                  <div className="p-4 md:p-6">
                    <label className="block text-sm font-bold text-gray-700 mb-3 font-sans">صف التحدي الذي تواجهه:</label>
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="مثال: نجد صعوبة في قياس العائد الاستثماري من برامج التدريب الحالية..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-[1.5rem] p-4 md:p-5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#284e7f]/20 focus:border-[#284e7f] outline-none min-h-[150px] md:min-h-[180px] resize-none text-right transition-all font-sans mb-4 text-sm md:text-base font-medium"
                      dir="rtl"
                    />
                    <div className="flex justify-end">
                      <Button
                        variant="ai"
                        onClick={handleAnalyze}
                        disabled={loading || !query.trim()}
                        className="!py-3 !px-8 !text-base flex items-center gap-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                      >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                        {loading ? 'جاري التحليل...' : 'تحليل الآن'}
                      </Button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-4 text-center font-sans">{error}</p>}
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-[#284e7f] to-[#1a3558] rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden h-full flex flex-col justify-center">
                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-xl font-sans">رأي المستشار الذكي</h3>
                      </div>
                      <div className="text-blue-50 leading-loose text-base md:text-lg font-sans border-r-2 border-yellow-400/50 pr-4 mb-6 font-medium">
                        {response}
                      </div>
                      <button
                        onClick={() => setResponse('')}
                        className="text-sm font-bold text-yellow-400 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <ArrowLeft size={16} /> تحليل تحدي آخر
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App Component ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTrainerIndex, setActiveTrainerIndex] = useState(0);
  const [activeAudienceIndex, setActiveAudienceIndex] = useState(0);

  const registerUrl = "https://forms.cloud.microsoft/r/FPLwbAsYyU";
  const handleRegister = () => window.open(registerUrl, '_blank');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrainerIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const audienceRoles = [
    'قيادات الموارد البشرية',
    'القيادات التنفيذية',
    'مدراء التحول الرقمي',
    'مدراء التدريب والتطوير',
    'صناع القرار'
  ];

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
      name: "د. رامي شاهين",
      title: "خبير الذكاء الاصطناعي العالمي",
      imageId: "1gwL1YOxAQCLiwXM0KPockBJ21gAyK0fR",
      bio: "خبير عالمي في الذكاء الاصطناعي والتحول الرقمي، يقود مشاريع استراتيجية في عدة دول. حاصل على دكتوراه في إدارة الموارد البشرية الدولية."
    },
    {
      name: "أ. أحمد الطويل",
      title: "خبير التطوير المؤسسي",
      imageId: "1vPbj5AULuI0lRLjJqDakI71eb6ChRs78",
      bio: "خبير أردني في التطوير المؤسسي والقيادة بخبرة تتجاوز 18 عامًا في إدارة التغيير وبناء الكفاءات. مستشار لهيئات محلية ودولية."
    },
    {
      name: "د. سالم موسى",
      title: "استشاري التطوير وجودة التدريب",
      imageId: "1fvRFsuV8l6Lfbgqz1NwlBa4HJ_ZLCJ-S",
      bio: "دكتوراه في الإدارة العامة وتطوير المنظمات، وماجستير إدارة أعمال في علم النفس الإداري. استشاري جودة معتمد ومدرب دولي."
    }
  ];

  const axesData = [
    {
      number: "01",
      title: "قياس أثر التدريب والعائد على الاستثمار (ROI)",
      description: "كيفية حساب القيمة الحقيقية للتدريب وتأثيره المباشر على الأرباح والأداء.",
      icon: TrendingUp
    },
    {
      number: "02",
      title: "تحديد الاحتياجات التدريبية المعتمد على البيانات",
      description: "الانتقال من التخمين إلى اليقين باستخدام تحليلات البيانات الضخمة.",
      icon: Database
    },
    {
      number: "03",
      title: "التحول الذكي في التدريب",
      description: "إعادة هيكلة عمليات التدريب لتتواكب مع الثورة الرقمية.",
      icon: Zap
    },
    {
      number: "04",
      title: "اتخاذ القرار التدريبي باستخدام الذكاء الاصطناعي",
      description: "بناء أنظمة دعم قرار ذكية للموافقة على الخطط التدريبية.",
      icon: Scale
    },
    {
      number: "05",
      title: "مراكز التقييم الذكية (AI Assessment Centers)",
      description: "تصميم وإدارة مراكز تقييم حديثة تعتمد على المحاكاة والذكاء الاصطناعي.",
      icon: ClipboardCheck
    },
    {
      number: "06",
      title: "تحليل فجوات الأداء والكفاءات",
      description: "رسم خرائط الكفاءات وتحديد الفجوات بدقة لردمها بالتدريب المناسب.",
      icon: Puzzle
    }
  ];

  return (
    <div dir="rtl" className="min-h-screen w-full bg-[#f8fafc] text-gray-900 selection:bg-[#b11e22] selection:text-white overflow-x-hidden">
      <GlobalStyles />

      <FloatingWhatsApp />

      {/* Navigation */}
      <nav
        className={`fixed z-50 transition-all duration-300 ease-in-out ${
          'top-0 left-0 right-0 w-full md:top-4 md:px-4'
        }`}
      >
        <div className={`mx-auto transition-all duration-300 ${
          'md:max-w-7xl md:rounded-full ' + (isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md border-b md:border md:shadow-lg border-white/20 py-2'
            : 'bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none py-3 md:py-4')
        }`}>
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
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#b11e22] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#ai-advisor"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 border border-white/20 font-sans"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
                <span>RefeAI</span>
              </a>

              <button
                onClick={handleRegister}
                className="px-6 py-2.5 text-sm font-bold text-[#b11e22] bg-red-50 border border-red-100 rounded-full hover:bg-red-100 transition-colors font-sans"
              >
                احجز مقعدك
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-600 rounded-full hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
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
              <Button onClick={handleRegister} className="w-full justify-center rounded-xl">سجل الآن</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden bg-grid-slate w-full">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] left-[20%] w-[60%] h-[60%] bg-[#284e7f]/5 rounded-full blur-[100px]" />
          <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-[#b11e22]/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-blue-100 shadow-sm text-[#284e7f] text-lg font-bold mb-8 animate-in fade-in slide-in-from-bottom-3 font-sans" dir="ltr">
            <Calendar className="w-5 h-5 text-[#b11e22]" />
            <span>19 – 23 January, 2026</span>
          </div>

          <div className="flex justify-center mb-8 w-full">
            <CountdownTimer />
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#284e7f] tracking-tight leading-[1.2] mb-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 font-sans px-2">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#284e7f] to-[#1a3558] mb-2 opacity-80">تحديد الاحتياجات التدريبية</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#284e7f] to-[#1a3558]">
              باستخدام الذكاء الاصطناعي
            </span>
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-[#b11e22]">بمنهجية مركز التقييم الذكي</span>
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 font-sans px-4 font-bold">
            برنامج احترافي متقدم يمكّن القيادات من اتخاذ قرارات تدريبية ذكية قائمة على البيانات والذكاء الاصطناعي، وربط التدريب مباشرة بالأداء المؤسسي والاستراتيجية.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 w-full px-4">
            <Button
              variant="primary"
              icon={FileSignature}
              onClick={handleRegister}
              className="w-full sm:w-auto min-w-[240px] shadow-xl shadow-red-900/10"
            >
              التسجيل والاشتراك
            </Button>
            <Button
              variant="outline"
              icon={DownloadCloud}
              className="w-full sm:w-auto min-w-[240px]"
            >
              تحميل الكتيب
            </Button>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="py-20 bg-white relative overflow-hidden w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <SectionHeading subtitle="الخبراء" title="نخبة المتحدثين والمدربين" align="center" />

          <div className="relative mt-12 h-[650px] md:h-[450px]">
            {trainers.map((trainer, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === activeTrainerIndex
                    ? 'opacity-100 translate-x-0 z-20'
                    : 'opacity-0 translate-x-10 z-10'
                }`}
              >
                <TrainerCard {...trainer} isActive={index === activeTrainerIndex} />
              </div>
            ))}

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {trainers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTrainerIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeTrainerIndex ? 'bg-[#b11e22] w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
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
                <AxisCard
                  key={index}
                  number={axis.number}
                  title={axis.title}
                  description={axis.description}
                  icon={axis.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-white relative w-full overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-[#1e293b] via-[#284e7f] to-[#1e3a8a] rounded-[3rem] p-6 md:p-10 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] mix-blend-overlay"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#b11e22]/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-8 font-sans leading-loose md:leading-[1.4] relative inline-block">
                  <span className="relative z-10 drop-shadow-md">لماذا هذه الورشة</span>
                  <span className="relative mx-3 inline-block transform -rotate-2">
                    <span className="absolute inset-0 bg-[#b11e22] rounded-xl transform rotate-2 shadow-lg"></span>
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
                  <p className="text-base text-blue-100/80 leading-relaxed font-sans font-bold">الانتقال من الطرق التقليدية إلى أحدث الممارسات العالمية المعتمدة على البيانات.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 group shadow-lg">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                    <Brain className="w-8 h-8 text-[#b11e22]" />
                  </div>
                  <h4 className="font-bold text-2xl mb-4 font-sans text-white">ذكاء اصطناعي</h4>
                  <p className="text-base text-blue-100/80 leading-relaxed font-sans font-bold">استخدام خوارزميات ذكية لتحليل الفجوات بدقة متناهية وسرعة فائقة.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 group shadow-lg">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                    <Target className="w-8 h-8 text-[#b11e22]" />
                  </div>
                  <h4 className="font-bold text-2xl mb-4 font-sans text-white">أداء مؤسسي</h4>
                  <p className="text-base text-blue-100/80 leading-relaxed font-sans font-bold">ربط مخرجات التدريب بالأهداف الاستراتيجية للمؤسسة بشكل مباشر وقابل للقياس.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="ai-advisor">
        <AIAdvisorSection />
      </div>

      {/* Pillars */}
      <section className="py-24 bg-slate-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="ركائز الورشة الأساسية" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Brain}
              title="الاحتياجات الذكية"
              description="إتقان تحديد الاحتياجات التدريبية باستخدام أدوات الذكاء الاصطناعي المتقدمة."
            />
            <FeatureCard
              icon={Target}
              title="القرار التدريبي"
              description="تعزيز كفاءة واتزان قرارات التدريب في إدارات الموارد البشرية."
            />
            <FeatureCard
              icon={Layers}
              title="التكامل الاستراتيجي"
              description="مواءمة خطط التدريب بشكل كامل مع الاستراتيجية العامة للمؤسسة."
            />
            <FeatureCard
              icon={BarChart3}
              title="فجوات الكفاءات"
              description="تحليل فجوات الكفاءات بطرق عملية وذكية تعتمد على البيانات."
            />
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#284e7f] rounded-[3rem] relative overflow-hidden p-8 md:p-16 shadow-2xl shadow-blue-900/20 flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
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
                      idx === activeAudienceIndex
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
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
        {/* Dashboard Visual - Moved & Redesigned */}
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
                      {/* Sidebar - Hidden on mobile */}
                      <div className="hidden md:flex w-16 border-l border-gray-100 flex-col items-center py-6 gap-6 bg-gray-50/50">
                         <div className="w-8 h-8 rounded-lg bg-[#284e7f] flex items-center justify-center text-white font-bold">R</div>
                         <div className="w-8 h-8 rounded-lg text-gray-400 hover:bg-white hover:shadow-sm flex items-center justify-center"><Layout size={18} /></div>
                         <div className="w-8 h-8 rounded-lg text-[#b11e22] bg-white shadow-sm flex items-center justify-center"><BarChart3 size={18} /></div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1 p-4 md:p-8 bg-slate-50/30 overflow-hidden relative">
                         {/* Header inside dash */}
                         <div className="flex justify-between items-center mb-6">
                            <div>
                               <h3 className="font-bold text-lg md:text-xl text-gray-800 font-sans">تحليل فجوات الأداء</h3>
                               <p className="text-xs md:text-sm text-gray-400 font-sans">آخر تحديث: قبل 5 دقائق</p>
                            </div>
                            <div className="flex gap-2">
                               <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400"><Search size={14} /></div>
                               <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400"><Bell size={14} /></div>
                            </div>
                         </div>
                         
                         {/* Simplified Grid */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {/* Chart Area */}
                            <div className="col-span-1 md:col-span-2 bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100/50">
                               <div className="flex justify-between mb-4">
                                  <div className="h-3 md:h-4 w-20 md:w-24 bg-gray-100 rounded-md" />
                                  <div className="h-3 md:h-4 w-3 md:w-4 bg-gray-100 rounded-full" />
                               </div>
                               <div className="flex items-end gap-2 md:gap-3 h-24 md:h-32 mt-2 px-1">
                                  {/* Bars */}
                                  <div className="w-full bg-blue-50 rounded-t-sm md:rounded-t-lg h-[40%]" />
                                  <div className="w-full bg-blue-100 rounded-t-sm md:rounded-t-lg h-[70%]" />
                                  <div className="w-full bg-[#284e7f] rounded-t-sm md:rounded-t-lg h-[90%]" />
                                  <div className="w-full bg-blue-100 rounded-t-sm md:rounded-t-lg h-[60%]" />
                                  <div className="w-full bg-blue-50 rounded-t-sm md:rounded-t-lg h-[30%]" />
                               </div>
                            </div>
                            
                            {/* Stats Card */}
                            <div className="col-span-1 bg-gradient-to-br from-[#284e7f] to-[#1a3558] rounded-xl md:rounded-2xl p-4 md:p-5 text-white shadow-lg shadow-blue-900/10 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start">
                               <div>
                                   <div className="text-xs md:text-sm opacity-80 mb-1 font-sans">ROI Score</div>
                                   <div className="text-2xl md:text-3xl font-bold mb-0 md:mb-4 font-sans">94%</div>
                               </div>
                               
                               <div className="hidden md:block h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                  <div className="h-full w-[94%] bg-[#b11e22] rounded-full" />
                               </div>
                               
                               {/* Avatars */}
                               <div className="flex -space-x-2 space-x-reverse overflow-hidden md:mt-4">
                                  {trainers.slice(0, 3).map((t, i) => (
                                    <img key={i} className="inline-block h-6 w-6 md:h-8 md:w-8 rounded-full ring-2 ring-[#284e7f] object-cover" src={`https://lh3.googleusercontent.com/d/${t.imageId}`} alt="" />
                                  ))}
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Floating Element - Adjusted position for mobile */}
              <div className="absolute -left-4 md:-left-8 top-12 md:top-20 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] animate-bounce delay-700 border border-gray-100 transform scale-75 md:scale-100 origin-top-left">
                 <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-1.5 md:p-2 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
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
                  <a href="tel:+905337642450" className="hover:text-[#284e7f] transition-colors flex items-center gap-2 justify-center md:justify-start font-bold">
                    <Smartphone size={16} className="text-[#b11e22]" /> +90 533 764 24 50
                  </a>
                  <a href="mailto:info@reference-rcb.com" className="hover:text-[#284e7f] transition-colors flex items-center gap-2 justify-center md:justify-start font-bold">
                    <Users size={16} className="text-[#b11e22]" /> info@reference-rcb.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200/60 text-center">
              <p className="text-xs text-gray-400 font-sans font-bold">
                © 2026 Reference Training Center. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
