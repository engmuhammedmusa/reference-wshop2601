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
  Bot       // Bot Icon
} from 'lucide-react';

// --- Fonts & Global Styles ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&display=swap');
    
    body {
      font-family: 'Cairo', sans-serif;
    }
    
    .rtl-flip {
      transform: scaleX(-1);
    }
    
    @keyframes gradient-xy {
        0%, 100% {
            background-size: 400% 400%;
            background-position: left center;
        }
        50% {
            background-size: 200% 200%;
            background-position: right center;
        }
    }
  `}</style>
);

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', icon: Icon, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border-transparent text-white bg-[#b11e22] hover:bg-[#8a1619] shadow-lg shadow-red-900/20 hover:shadow-xl hover:translate-y-[-2px]",
    secondary: "border-transparent text-white bg-[#284e7f] hover:bg-[#1d3a61] shadow-md hover:shadow-lg",
    outline: "border-2 border-[#284e7f]/20 text-[#284e7f] bg-transparent hover:bg-[#284e7f]/5",
    white: "bg-white text-[#284e7f] hover:bg-gray-50 shadow-lg",
    ai: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/25 border-transparent",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
      {Icon && <Icon className="mr-2 h-5 w-5 rtl:mr-0 rtl:ml-2" />} 
    </button>
  );
};

const SectionHeading = ({ subtitle, title, align = 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-right'} max-w-4xl mx-auto`}>
    <span className="inline-block py-1 px-3 rounded-full bg-[#284e7f]/10 text-[#284e7f] text-sm font-bold tracking-wider mb-4 border border-[#284e7f]/20">
      {subtitle}
    </span>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#284e7f] leading-tight">
      {title}
    </h2>
    <div className={`h-1.5 w-24 bg-[#b11e22] mt-6 rounded-full ${align === 'center' ? 'mx-auto' : 'ml-auto'}`} />
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="relative group p-8 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#284e7f] to-[#b11e22] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
    
    <div className="h-16 w-16 rounded-2xl bg-[#284e7f]/5 flex items-center justify-center mb-6 group-hover:bg-[#284e7f] transition-colors duration-300">
      <Icon className="h-8 w-8 text-[#284e7f] group-hover:text-white transition-colors duration-300" />
    </div>
    
    <h3 className="text-xl font-bold text-[#284e7f] mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const TimelineItem = ({ number, title, description }) => (
  <div className="flex gap-6 group">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-[#284e7f] text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:bg-[#b11e22] transition-colors duration-300 relative z-10 border-4 border-white">
        {number}
      </div>
      <div className="w-0.5 h-full bg-gray-200 group-last:hidden mt-2" />
    </div>
    <div className="pb-12 pt-2">
      <h3 className="text-xl font-bold text-[#284e7f] mb-2 group-hover:text-[#b11e22] transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed max-w-xl">{description}</p>
    </div>
  </div>
);

const TrainerCard = ({ name, title, bio, imageId }) => (
  <div className={`bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}>
    <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden group">
      <div className="absolute inset-0 bg-[#284e7f]/10 group-hover:bg-transparent transition-colors duration-300 mix-blend-multiply" />
      <img 
        src={`https://lh3.googleusercontent.com/d/${imageId}`}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = "https://ui-avatars.com/api/?name=" + name + "&background=284e7f&color=fff&size=500";
        }}
        alt={name} 
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#284e7f] to-transparent p-6 pt-20">
        <h3 className="text-white font-bold text-xl">{name}</h3>
        <p className="text-gray-200 text-sm opacity-90">{title}</p>
      </div>
    </div>
    <div className="p-6">
      <p className="text-gray-600 text-sm leading-relaxed text-justify">
        {bio}
      </p>
    </div>
  </div>
);

// --- Countdown Component ---
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target Date: January 19, 2026
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

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center bg-white border border-gray-100 shadow-sm rounded-lg p-2 min-w-[60px] md:min-w-[70px] backdrop-blur-sm bg-white/80">
      <span className="text-xl md:text-2xl font-bold text-[#b11e22]">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-3 justify-center lg:justify-end mb-8 animate-in fade-in slide-in-from-bottom-5" dir="ltr">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

// --- WhatsApp Floating Button ---
const FloatingWhatsApp = () => {
  const phoneNumber = "905337642450";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group animate-in fade-in slide-in-from-bottom-10 duration-1000"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute -top-12 left-0 bg-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap text-sm font-bold text-gray-700 mb-2">
        تواصل معنا عبر واتساب
        <div className="absolute bottom-0 left-6 -mb-2 border-8 border-transparent border-t-white transform -translate-x-1/2"></div>
      </div>
      <div className="bg-[#25D366] p-3.5 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20"></div>
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

    const apiKey = ""; // Set at runtime
    // Prompt engineered to act as a consultant for this specific workshop
    const prompt = `
      You are a senior HR consultant promoting a high-level workshop titled "Training Needs Analysis using AI & Smart Assessment Centers".
      
      Workshop Pillars to reference in your advice:
      1. ROI on Training (Financial Impact)
      2. Data-driven Training Needs Analysis (Moving away from guessing)
      3. AI in Training Decisions (Smart algorithms)
      4. Smart Assessment Centers (Simulation & Prediction)
      5. Competency Gap Analysis (Precision)
      
      User Challenge: "${query}"
      
      Task: Analyze the user's challenge and explain specifically, in a professional and persuasive tone, how this workshop's topics will help them solve it.
      Output Language: Arabic.
      Style: Executive, concise (max 3-4 sentences), helpful.
      Start with a supportive phrase.
    `;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) {
        setResponse(aiText);
      } else {
        throw new Error("No response generated");
      }
    } catch (err) {
      setError('عذراً، حدث خطأ في الاتصال بالمستشار الذكي. يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#1a1c2e] to-[#284e7f] text-white overflow-hidden relative">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>

      {/* Reference Logo - Top Right of AI Section */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-80 hover:opacity-100 transition-opacity z-20">
         <img 
            src="https://lh3.googleusercontent.com/d/1l4GCnGgjY65XiSnJevl0y7goxr5nFP2j" 
            alt="Reference Training Center" 
            className="h-16 md:h-20 w-auto object-contain brightness-0 invert opacity-90"
         />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">RefeAI مستشار التدريب الذكي</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            هل تواجه تحدياً في إدارتك؟ اكتب التحدي هنا وسيقوم الذكاء الاصطناعي بتحليله وتوضيح كيف يمكن لهذه الورشة مساعدتك.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl max-w-3xl mx-auto">
          {!response ? (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-blue-200 mb-1">
                صف التحدي الذي تواجهه (مثلاً: صعوبة قياس أثر التدريب، ميزانية محدودة، فجوات مهارات غير واضحة...)
              </label>
              <div className="relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="اكتب التحدي هنا..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[120px] resize-none text-right"
                  dir="rtl"
                />
                <div className="absolute bottom-4 left-4">
                  <Button 
                    variant="ai" 
                    onClick={handleAnalyze} 
                    disabled={loading || !query.trim()}
                    className="!py-2 !px-6 !text-sm flex items-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                    {loading ? 'جاري التحليل...' : 'حلل الآن'}
                  </Button>
                </div>
              </div>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white mb-2">تحليل المستشار الذكي:</h3>
                  <div className="bg-white/10 rounded-xl p-6 text-blue-50 leading-relaxed text-lg border border-white/5">
                    {response}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => setResponse('')} 
                  className="text-sm text-blue-300 hover:text-white underline underline-offset-4"
                >
                  تحليل تحدي آخر
                </button>
              </div>
            </div>
          )}
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

  const registerUrl = "https://forms.cloud.microsoft/r/FPLwbAsYyU";

  const handleRegister = () => {
    window.open(registerUrl, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#' },
    { name: 'عن الورشة', href: '#about' },
    { name: 'المستشار الذكي', href: '#ai-advisor' }, 
    { name: 'المحاور', href: '#axes' },
    { name: 'المدربين', href: '#trainers' },
    { name: 'التسجيل', href: '#register' },
  ];

  const trainers = [
    {
      name: "د. رامي شاهين",
      title: "خبير الذكاء الاصطناعي العالمي",
      imageId: "1gwL1YOxAQCLiwXM0KPockBJ21gAyK0fR",
      bio: "خبير عالمي في الذكاء الاصطناعي والتحول الرقمي، يقود مشاريع استراتيجية في عدة دول. حاصل على دكتوراه في إدارة الموارد البشرية الدولية، ويشغل منصب الأمين العام لجائزة الذكاء الاصطناعي."
    },
    {
      name: "أحمد الطويل",
      title: "خبير التطوير المؤسسي",
      imageId: "1vPbj5AULuI0lRLjJqDakI71eb6ChRs78",
      bio: "خبير أردني في التطوير المؤسسي والقيادة بخبرة تتجاوز 18 عامًا في إدارة التغيير وبناء الكفاءات. مستشار لهيئات محلية ودولية، ومعتمد من ICF وILM وProsci."
    },
    {
      name: "د. سالم موسى",
      title: "استشاري التطوير وجودة التدريب",
      imageId: "1fvRFsuV8l6Lfbgqz1NwlBa4HJ_ZLCJ-S",
      bio: "دكتوراه في الإدارة العامة وتطوير المنظمات، وماجستير إدارة أعمال في علم النفس الإداري. استشاري جودة معتمد ومدرب دولي في القيادة والتطوير المستمر."
    }
  ];

  // Auto-loop trainers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrainerIndex((prev) => (prev + 1) % trainers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trainers.length]);

  const scrollToTrainers = () => {
    const element = document.getElementById('trainers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getTrainer = (offset) => {
    return trainers[(activeTrainerIndex + offset) % trainers.length];
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-gray-900 selection:bg-[#b11e22] selection:text-white">
      <GlobalStyles />
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Image */}
            <div className="flex items-center gap-3">
               <img 
                 src="https://lh3.googleusercontent.com/d/1l4GCnGgjY65XiSnJevl0y7goxr5nFP2j" 
                 alt="Reference Training Center" 
                 className="h-12 w-auto object-contain"
               />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isSpecial = link.name === 'المستشار الذكي';
                return (
                  <a 
                    key={link.name} 
                    href={link.href}
                    className={`text-base font-medium transition-all relative group flex items-center gap-1.5 ${
                      isSpecial 
                        ? 'text-[#284e7f] font-extrabold animate-pulse bg-blue-50/50 px-3 py-1 rounded-full border border-blue-200 shadow-[0_0_15px_rgba(40,78,127,0.3)]' 
                        : 'text-gray-700 hover:text-[#b11e22]'
                    }`}
                  >
                    {isSpecial && <Sparkles className="w-4 h-4 text-[#b11e22] fill-current" />}
                    {link.name}
                    {!isSpecial && (
                      <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#b11e22] transition-all group-hover:w-full"></span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="primary" onClick={handleRegister} className="!px-6 !py-2 !text-sm !rounded-md">
                احجز مقعدك
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-white border-b border-gray-100 p-4 md:hidden shadow-lg animate-in slide-in-from-top-5 z-40">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-gray-700 p-2 hover:bg-gray-50 rounded-lg text-right"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-gray-100 my-2" />
              <Button onClick={handleRegister} className="w-full justify-center">سجل الآن</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] bg-[#284e7f]/5 rounded-full blur-3xl" />
          <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#b11e22]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
            
            {/* Right: Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-right">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#284e7f] text-sm font-bold mb-6 animate-in fade-in slide-in-from-bottom-4" dir="ltr">
                  <Calendar className="w-4 h-4" />
                  <span>19 – 23 January, 2026</span>
               </div>
               
               {/* Modern Countdown Timer */}
               <CountdownTimer />
               
               <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#284e7f] leading-tight mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
                 تحديد الاحتياجات التدريبية <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#284e7f] to-[#b11e22]">
                   باستخدام الذكاء الاصطناعي
                 </span>
               </h1>
               
               <p className="text-xl text-gray-500 font-light mb-6 font-english dir-ltr tracking-wide">
                 AI-Driven Training Needs Analysis & <br/>Smart Assessment Centers
               </p>

               <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 border-r-4 border-[#b11e22] pr-4 bg-gradient-to-l from-gray-50 to-transparent py-2">
                 برنامج احترافي متقدم يمكّن القيادات من اتخاذ قرارات تدريبية ذكية قائمة على البيانات والذكاء الاصطناعي، وربط التدريب مباشرة بالأداء المؤسسي والاستراتيجية.
               </p>

               <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                 <Button variant="primary" icon={ArrowLeft} onClick={handleRegister} className="w-full sm:w-auto">
                   التسجيل والاشتراك
                 </Button>
                 <Button variant="outline" icon={Download} className="w-full sm:w-auto">
                   تحميل الكتيب
                 </Button>
               </div>
            </div>

            {/* Left: Trainers Visual Composition */}
            <div className="w-full lg:w-1/2 relative">
               <div className="relative h-[400px] sm:h-[500px] w-full max-w-lg mx-auto lg:mr-auto lg:ml-0">
                  {/* Decorative Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#284e7f]/10 rounded-full animate-[spin_60s_linear_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-dashed border-[#284e7f]/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

                  {/* Trainers Floating Cards */}
                  {/* Main Center (Active) */}
                  <div 
                    onClick={scrollToTrainers}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 z-20 hover:scale-105 transition-all duration-700 cursor-pointer"
                  >
                    <div className="bg-white p-2 rounded-2xl shadow-2xl ring-4 ring-white/50 backdrop-blur-xl">
                      <div className="rounded-xl overflow-hidden aspect-[4/5] relative">
                         <img 
                            key={getTrainer(0).imageId} 
                            src={`https://lh3.googleusercontent.com/d/${getTrainer(0).imageId}`} 
                            alt={getTrainer(0).name} 
                            className="object-cover w-full h-full animate-in fade-in zoom-in duration-700" 
                         />
                         <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-center">
                            <p className="font-bold text-sm">{getTrainer(0).name}</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Left (Next) */}
                  <div 
                    onClick={scrollToTrainers}
                    className="absolute top-0 left-0 sm:left-4 w-32 sm:w-40 z-10 hover:scale-105 transition-all duration-700 hover:z-30 cursor-pointer opacity-80 hover:opacity-100"
                  >
                     <div className="bg-white p-1.5 rounded-xl shadow-xl">
                      <div className="rounded-lg overflow-hidden aspect-[4/5] relative">
                         <img 
                            key={getTrainer(1).imageId}
                            src={`https://lh3.googleusercontent.com/d/${getTrainer(1).imageId}`} 
                            alt={getTrainer(1).name} 
                            className="object-cover w-full h-full animate-in fade-in duration-700" 
                         />
                         <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-center">
                            <p className="font-bold text-xs">{getTrainer(1).name}</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Right (Previous/Last) */}
                  <div 
                    onClick={scrollToTrainers}
                    className="absolute bottom-0 right-0 sm:right-4 w-32 sm:w-40 z-10 hover:scale-105 transition-all duration-700 hover:z-30 cursor-pointer opacity-80 hover:opacity-100"
                  >
                     <div className="bg-white p-1.5 rounded-xl shadow-xl">
                      <div className="rounded-lg overflow-hidden aspect-[4/5] relative">
                         <img 
                            key={getTrainer(2).imageId}
                            src={`https://lh3.googleusercontent.com/d/${getTrainer(2).imageId}`} 
                            alt={getTrainer(2).name} 
                            className="object-cover w-full h-full animate-in fade-in duration-700" 
                         />
                         <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-center">
                            <p className="font-bold text-xs">{getTrainer(2).name}</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute top-20 right-0 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-gray-100 animate-bounce delay-1000">
                    <Award className="text-[#b11e22] w-5 h-5" />
                    <span className="font-bold text-[#284e7f] text-sm">نخبة الخبراء</span>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-[#284e7f] rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
             {/* Abstract Grid */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')]"></div>
             
             <div className="relative z-10 text-center max-w-3xl mx-auto">
               <h2 className="text-3xl font-bold mb-8">لماذا هذه الورشة؟</h2>
               <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10">
                 يهدف البرنامج إلى تمكين المشاركين من فهم منهجيات تحديد الاحتياجات التدريبية الحديثة، 
                 وتوظيف الذكاء الاصطناعي في تحليل فجوات الأداء، 
                 وتحويل نتائج التحليل إلى خطط تدريبية فعّالة مرتبطة بالأداء المؤسسي.
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right rtl:text-right">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                     <CheckCircle2 className="w-8 h-8 text-[#b11e22] mb-4" />
                     <h4 className="font-bold text-lg mb-2">منهجيات حديثة</h4>
                     <p className="text-sm text-blue-100 opacity-80">فهم أعمق لأحدث الطرق العالمية</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                     <Brain className="w-8 h-8 text-[#b11e22] mb-4" />
                     <h4 className="font-bold text-lg mb-2">ذكاء اصطناعي</h4>
                     <p className="text-sm text-blue-100 opacity-80">تحليل الفجوات بدقة متناهية</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                     <Target className="w-8 h-8 text-[#b11e22] mb-4" />
                     <h4 className="font-bold text-lg mb-2">أداء مؤسسي</h4>
                     <p className="text-sm text-blue-100 opacity-80">ربط التدريب بالأهداف الاستراتيجية</p>
                  </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Insert AI Section Here */}
      <div id="ai-advisor">
        <AIAdvisorSection />
      </div>

      {/* Smart Highlights (Pillars) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="القيمة المضافة" title="ركائز الورشة الأساسية" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Axes / Learning Path */}
      <section id="axes" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="المسارات التعليمية" title="محاور ورشة العمل" align="center" />
          
          <div className="mt-16 space-y-2">
             <TimelineItem 
               number="01"
               title="قياس أثر التدريب والعائد على الاستثمار (ROI)"
               description="كيفية حساب القيمة الحقيقية للتدريب وتأثيره المباشر على الأرباح والأداء."
             />
             <TimelineItem 
               number="02"
               title="تحديد الاحتياجات التدريبية المعتمد على البيانات"
               description="الانتقال من التخمين إلى اليقين باستخدام تحليلات البيانات الضخمة."
             />
             <TimelineItem 
               number="03"
               title="التحول الذكي في التدريب"
               description="إعادة هيكلة عمليات التدريب لتتواكب مع الثورة الرقمية."
             />
             <TimelineItem 
               number="04"
               title="اتخاذ القرار التدريبي باستخدام الذكاء الاصطناعي"
               description="بناء أنظمة دعم قرار ذكية للموافقة على الخطط التدريبية."
             />
             <TimelineItem 
               number="05"
               title="مراكز التقييم الذكية (AI Assessment Centers)"
               description="تصميم وإدارة مراكز تقييم حديثة تعتمد على المحاكاة والذكاء الاصطناعي."
             />
             <TimelineItem 
               number="06"
               title="تحليل فجوات الأداء والكفاءات"
               description="رسم خرائط الكفاءات وتحديد الفجوات بدقة لردمها بالتدريب المناسب."
             />
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-[#284e7f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="md:w-1/3 text-right">
                <h2 className="text-3xl font-bold text-white mb-4">هذه الورشة موجهة إلى</h2>
                <div className="h-1 w-20 bg-[#b11e22] mb-6" />
                <p className="text-blue-200">
                  صممت هذه الورشة خصيصاً للقادة وصناع القرار الذين يسعون لإحداث نقلة نوعية في مؤسساتهم.
                </p>
             </div>
             
             <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {['قيادات الموارد البشرية', 'القيادات التنفيذية', 'مدراء التحول الرقمي', 'مدراء التدريب والتطوير', 'صناع القرار'].map((role, idx) => (
                 <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-lg flex items-center gap-3 text-white hover:bg-white hover:text-[#284e7f] transition-all duration-300 group cursor-default">
                    <div className="w-2 h-2 rounded-full bg-[#b11e22] group-hover:scale-150 transition-transform" />
                    <span className="font-medium">{role}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#284e7f]/5 rounded-bl-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading subtitle="الخبراء" title="نخبة المتحدثين والمدربين" align="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12">
            {trainers.map((trainer, index) => (
               <TrainerCard key={index} {...trainer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="register" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-[#284e7f] mb-6">
            كن جزءاً من مستقبل التدريب الذكي
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            لا تفوت فرصة الانضمام إلى نخبة القادة في هذا البرنامج الاستثنائي. المقاعد محدودة لضمان جودة التجربة.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="primary" onClick={handleRegister} className="!px-10 !py-4 text-lg" icon={ArrowLeft}>
              سجل الآن
            </Button>
            <Button variant="outline" className="!px-10 !py-4 text-lg" icon={Download}>
              تحميل الكتيب
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3558] text-white pt-16 pb-8 border-t border-[#b11e22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                 {/* Footer Logo Image */}
                 <img 
                   src="https://lh3.googleusercontent.com/d/1l4GCnGgjY65XiSnJevl0y7goxr5nFP2j" 
                   alt="Reference Training Center" 
                   className="h-12 w-auto object-contain brightness-0 invert"
                 />
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                برنامج تدريبي متكامل يهدف لتمكين المؤسسات من استخدام تقنيات المستقبل في بناء رأس المال البشري.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">روابط سريعة</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#b11e22] rounded-full" /> الرئيسية</a></li>
                <li><a href="#axes" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#b11e22] rounded-full" /> المحاور</a></li>
                <li><a href="#trainers" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#b11e22] rounded-full" /> المدربين</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">تواصل معنا</h4>
              <ul className="space-y-4 text-gray-400 text-left" dir="ltr">
                <li className="flex items-center gap-2"><Smartphone size={18} /> +90 533 764 24 50</li>
                <li className="flex items-center gap-2"><Users size={18} /> info@reference-rcb.com</li>
                <li className="flex items-center gap-2"><Layout size={18} /> Istanbul, Turkiye</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © 2026 Reference Training Center. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
