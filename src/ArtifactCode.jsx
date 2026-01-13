import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight,
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
  Lightbulb
} from 'lucide-react';

// --- Global Styles & Utilities ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800&display=swap');
    
    :root {
      --font-tajawal: 'Tajawal', sans-serif;
      --primary: #284e7f;
      --accent: #b11e22;
      --glass-bg: rgba(255, 255, 255, 0.65);
      --glass-border: rgba(255, 255, 255, 0.4);
      --glass-blur: blur(16px);
    }

    body, html {
      font-family: 'Tajawal', sans-serif !important;
      background-color: #f0f4f8; /* Softer mobile background */
      margin: 0;
      padding: 0;
      width: 100%;
      overflow-x: hidden;
      -webkit-tap-highlight-color: transparent;
    }

    /* Hide Scrollbar but allow scrolling */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Modern Glass Card Utility */
    .glass-card {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
    }

    .glass-card-dark {
      background: rgba(30, 41, 59, 0.7);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    }
  `}</style>
);

// --- Micro Components ---

const SectionTitle = ({ title, subtitle, light = false }) => (
  <div className="px-6 mb-6">
    {subtitle && (
      <span className={`text-xs font-bold tracking-wider mb-2 block ${light ? 'text-blue-200' : 'text-[#b11e22]'}`}>
        {subtitle}
      </span>
    )}
    <h2 className={`text-2xl font-extrabold leading-tight ${light ? 'text-white' : 'text-[#284e7f]'}`}>
      {title}
    </h2>
  </div>
);

// --- Horizontal Scroll Loop Container ---
const ScrollLoop = ({ children, className = "" }) => (
  <div className={`flex overflow-x-auto gap-4 px-6 pb-8 snap-x snap-mandatory no-scrollbar ${className}`}>
    {children}
  </div>
);

const MobileNav = ({ isOpen, setIsOpen, links, onRegister }) => (
  <>
    <div 
      className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      onClick={() => setIsOpen(false)}
    />
    <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 z-50 transform transition-transform duration-500 ease-out shadow-[0_-10px_40px_rgba(0,0,0,0.1)] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-[1.5rem] active:bg-gray-100 transition-colors"
          >
            <span className="text-lg font-bold text-gray-700">{link.name}</span>
            <div className="bg-white p-2 rounded-full shadow-sm text-gray-400">
              <ArrowLeft size={20} />
            </div>
          </a>
        ))}
        <button 
          onClick={() => { onRegister(); setIsOpen(false); }}
          className="mt-4 w-full bg-[#b11e22] text-white py-5 rounded-[2rem] font-bold text-lg shadow-lg shadow-red-900/20 active:scale-95 transition-transform"
        >
          تسجيل الآن
        </button>
      </div>
    </div>
  </>
);

// --- Redesigned RefeAI Section ---
const AIAdvisorSection = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    // Simulating API call for design preview
    setTimeout(() => {
        setLoading(false);
        setResponse("بناءً على التحدي الذي ذكرته، تقترح الورشة استخدام تحليل البيانات التنبؤي لتحديد الفجوات قبل حدوثها، مما يرفع العائد على الاستثمار بنسبة قد تصل إلى 40% من خلال توجيه الميزانية بدقة.");
        // Scroll to response
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 2000);
  };

  return (
    <section className="relative py-8 px-4" id="ai-advisor">
      <div className="absolute inset-0 bg-gradient-to-b from-[#284e7f] to-[#1a3558] rounded-[3rem] mx-2 -z-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
      </div>

      <div className="pt-8 pb-10 px-4">
        <div className="flex items-center justify-between mb-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-white/10 text-yellow-300 text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-1">
                        <Sparkles size={10} /> BETA
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-white leading-tight">RefeAI المستشار</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg border border-white/20">
                <Bot className="text-white w-6 h-6" />
            </div>
        </div>

        {/* Chat Interface */}
        <div className="flex flex-col gap-4">
            {/* AI Message Bubble */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl rounded-tr-sm p-4 text-white/90 text-sm leading-relaxed self-start max-w-[90%] shadow-sm">
                مرحباً بك! أنا مستشارك الذكي للتدريب. 
                <br />
                صف لي تحدياً تواجهه في مؤسستك، وسأخبرك كيف نساعدك.
            </div>

            {/* User Response Area (Input) */}
            {!response ? (
                <div className="mt-2 relative group">
                    <textarea 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="أكتب التحدي هنا..."
                        className="w-full bg-white/95 backdrop-blur-xl text-[#284e7f] placeholder-gray-400 rounded-[2rem] py-5 px-6 pr-14 min-h-[140px] focus:outline-none focus:ring-4 focus:ring-blue-400/30 shadow-xl transition-all resize-none text-base"
                        dir="rtl"
                    />
                    <button 
                        onClick={handleAnalyze}
                        disabled={!query.trim() || loading}
                        className="absolute bottom-4 left-4 w-12 h-12 bg-[#b11e22] rounded-full flex items-center justify-center text-white shadow-lg disabled:opacity-50 disabled:scale-95 active:scale-90 transition-all z-10"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5 rtl:rotate-180" />}
                    </button>
                </div>
            ) : (
                <div ref={scrollRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* User Message Bubble */}
                    <div className="bg-white/20 backdrop-blur-sm border border-white/5 rounded-2xl rounded-tl-sm p-4 text-white text-sm mb-4 self-end max-w-[85%] mr-auto shadow-sm">
                        {query}
                    </div>
                    
                    {/* AI Response Bubble */}
                    <div className="bg-gradient-to-br from-indigo-600/90 to-blue-600/90 backdrop-blur-xl border border-white/20 rounded-[2rem] rounded-tr-sm p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-3 opacity-80">
                            <Sparkles size={14} className="text-yellow-300" />
                            <span className="text-xs font-bold text-yellow-300">تحليل الذكاء الاصطناعي</span>
                        </div>
                        <p className="text-base leading-loose font-medium">
                            {response}
                        </p>
                        <button 
                            onClick={() => { setResponse(''); setQuery(''); }}
                            className="mt-6 flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white bg-black/20 px-4 py-2 rounded-full w-fit"
                        >
                            <ArrowLeft size={12} /> استشارة جديدة
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

// --- Trainer Card (Mobile) ---
const MobileTrainerCard = ({ name, title, imageId }) => (
  <div className="min-w-[85vw] snap-center">
    <div className="glass-card rounded-[2.5rem] p-3 h-full flex flex-col relative overflow-hidden group">
      <div className="h-64 w-full rounded-[2rem] overflow-hidden relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-t from-[#284e7f]/80 to-transparent z-10" />
        <img 
            src={`https://lh3.googleusercontent.com/d/${imageId}`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            alt={name}
        />
        <div className="absolute bottom-4 right-4 z-20 text-white">
            <h3 className="text-2xl font-bold mb-1">{name}</h3>
            <p className="text-xs font-bold text-blue-200 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit">{title}</p>
        </div>
      </div>
      <div className="px-2 pb-2">
         <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            مدرب خبير يمتلك سنوات من الخبرة في تقديم الاستشارات الدولية وبناء استراتيجيات التحول الرقمي للمؤسسات الكبرى.
         </p>
      </div>
    </div>
  </div>
);

// --- Axis Card (Mobile) ---
const MobileAxisCard = ({ number, title, icon: Icon }) => (
  <div className="min-w-[75vw] snap-center">
    <div className="bg-white rounded-[2.5rem] p-6 h-full border border-gray-100 shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#284e7f]/5 rounded-full blur-2xl" />
        
        <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#f8fafc] flex items-center justify-center text-[#284e7f]">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            <span className="text-4xl font-extrabold text-gray-100">{number}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight min-h-[3.5rem]">{title}</h3>
        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
            <div className="w-1/3 h-full bg-[#b11e22] rounded-full" />
        </div>
    </div>
  </div>
);

// --- Feature/Pillar Card (Mobile) ---
const MobileFeatureCard = ({ title, description, icon: Icon }) => (
  <div className="min-w-[45vw] snap-center">
    <div className="bg-white rounded-[2rem] p-5 h-full border border-gray-100 shadow-sm flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-[#284e7f] flex items-center justify-center mb-3">
            <Icon size={20} />
        </div>
        <h4 className="font-bold text-gray-800 mb-2 text-sm">{title}</h4>
        <p className="text-xs text-gray-500 leading-normal">{description}</p>
    </div>
  </div>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const registerUrl = "https://forms.cloud.microsoft/r/FPLwbAsYyU";
  
  const navLinks = [
    { name: 'الرئيسية', href: '#' },
    { name: 'المستشار الذكي', href: '#ai-advisor' },
    { name: 'المحاور', href: '#axes' },
    { name: 'المدربين', href: '#trainers' },
  ];

  return (
    <div dir="rtl" className="bg-[#f0f4f8] text-gray-900 min-h-screen pb-24">
      <GlobalStyles />
      
      {/* --- Top Bar (App Header) --- */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/50">
        <div className="flex justify-between items-center">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                <img 
                    src="https://lh3.googleusercontent.com/d/1-SLAi3PFnVcRKY54w97J4H3sYQ2Prj3G" 
                    alt="Logo" 
                    className="w-full h-full object-contain p-1"
                />
            </div>
            
            <button 
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-700 active:bg-gray-100"
            >
                <Menu size={20} />
            </button>
        </div>
      </header>

      {/* --- Main Content Wrapper --- */}
      <main className="pt-24 space-y-12">

        {/* --- Hero Section --- */}
        <section className="px-6 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent -z-10 blur-3xl" />
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm text-[#284e7f] text-xs font-bold mb-6" dir="ltr">
                <Calendar size={12} className="text-[#b11e22]" />
                <span>19-23 Jan, 2026</span>
            </div>

            <h1 className="text-4xl font-extrabold text-[#284e7f] leading-[1.15] mb-4">
                تحديد الاحتياجات <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#284e7f] to-[#b11e22]">
                    بالذكاء الاصطناعي
                </span>
            </h1>

            <p className="text-gray-500 text-sm leading-relaxed font-medium px-4 mb-8">
                برنامج احترافي متقدم للقيادات لاتخاذ قرارات تدريبية ذكية وربط التدريب بالأداء المؤسسي.
            </p>

            <div className="flex flex-col gap-3">
                <button 
                    onClick={() => window.open(registerUrl)}
                    className="w-full bg-[#284e7f] text-white py-4 rounded-[2rem] font-bold text-lg shadow-lg shadow-blue-900/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                    احجز مقعدك الآن <ArrowLeft size={18} />
                </button>
                <div className="flex gap-3">
                    <button className="flex-1 bg-white text-[#284e7f] py-4 rounded-[2rem] font-bold text-sm shadow-sm border border-gray-100 flex items-center justify-center gap-2">
                        <Download size={16} /> الكتيب
                    </button>
                    <a href="#ai-advisor" className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 rounded-[2rem] font-bold text-sm shadow-lg flex items-center justify-center gap-2 relative overflow-hidden">
                        <Sparkles size={16} className="text-yellow-400 animate-pulse" /> المستشار
                        <div className="absolute inset-0 bg-white/10 animate-[shimmer_2s_infinite]" />
                    </a>
                </div>
            </div>
        </section>

        {/* --- AI Advisor Section (Redesigned) --- */}
        <AIAdvisorSection />

        {/* --- Trainers Loop --- */}
        <section id="trainers">
            <SectionTitle title="نخبة الخبراء"/>
            <ScrollLoop>
                <MobileTrainerCard 
                    name="د. رامي شاهين" 
                    title="خبير الذكاء الاصطناعي" 
                    imageId="1gwL1YOxAQCLiwXM0KPockBJ21gAyK0fR" 
                />
                <MobileTrainerCard 
                    name="أ. أحمد الطويل" 
                    title="خبير التطوير المؤسسي" 
                    imageId="1vPbj5AULuI0lRLjJqDakI71eb6ChRs78" 
                />
                <MobileTrainerCard 
                    name="د. سالم موسى" 
                    title="استشاري الجودة" 
                    imageId="1fvRFsuV8l6Lfbgqz1NwlBa4HJ_ZLCJ-S" 
                />
            </ScrollLoop>
        </section>

        {/* --- Dashboard Preview (Compact) --- */}
        <section className="px-4">
            <div className="glass-card rounded-[2.5rem] p-4 overflow-hidden relative">
                <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#284e7f]">
                            <BarChart3 size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">تحليل الفجوات</h3>
                            <p className="text-[10px] text-gray-400">محدث الآن</p>
                        </div>
                    </div>
                    <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold">
                        94% دقة
                    </div>
                </div>
                
                {/* Visual Bars */}
                <div className="bg-white/50 rounded-2xl p-4 flex items-end justify-between h-32 gap-2 mb-4">
                    {[40, 70, 90, 60, 45].map((h, i) => (
                        <div key={i} className="w-full bg-[#284e7f] opacity-80 rounded-t-lg transition-all duration-1000" style={{ height: `${h}%`, opacity: i===2 ? 1 : 0.4 }} />
                    ))}
                </div>

                <div className="flex items-center justify-between bg-[#284e7f] text-white p-4 rounded-[1.5rem] shadow-lg">
                    <div>
                        <p className="text-xs opacity-80 mb-1">ROI المتوقع</p>
                        <p className="text-xl font-bold">185%</p>
                    </div>
                    <div className="h-8 w-px bg-white/20" />
                    <div>
                        <p className="text-xs opacity-80 mb-1">توفير ميزانية</p>
                        <p className="text-xl font-bold text-green-300">$12K</p>
                    </div>
                </div>
            </div>
        </section>

        {/* --- Axes Loop --- */}
        <section id="axes" className="bg-white rounded-t-[3rem] pt-10 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] -mb-12 z-10 relative">
            <SectionTitle title="رحلة التعلم" subtitle="محاور ورشة العمل" />
            <ScrollLoop>
                <MobileAxisCard number="01" title="قياس أثر التدريب ROI" icon={TrendingUp} />
                <MobileAxisCard number="02" title="الاحتياجات بالبيانات" icon={Database} />
                <MobileAxisCard number="03" title="التحول الذكي" icon={Zap} />
                <MobileAxisCard number="04" title="دعم القرار بالـ AI" icon={Scale} />
            </ScrollLoop>
        </section>

        {/* --- Pillars Loop (Features) --- */}
        <section className="bg-slate-50 pt-16 pb-8">
            <SectionTitle title="الركائز الأساسية" subtitle="لماذا هذه الورشة؟" />
            <ScrollLoop>
                <MobileFeatureCard title="الاحتياجات الذكية" description="أدوات AI متقدمة" icon={Brain} />
                <MobileFeatureCard title="القرار التدريبي" description="كفاءة واتزان" icon={Target} />
                <MobileFeatureCard title="التكامل" description="مواءمة الاستراتيجية" icon={Layers} />
                <MobileFeatureCard title="الفجوات" description="تحليل دقيق" icon={Puzzle} />
            </ScrollLoop>
        </section>

        {/* --- Target Audience (Chips Loop) --- */}
        <section className="py-8 bg-[#284e7f] text-white rounded-[2.5rem] mx-2 mb-8">
            <div className="px-6 mb-6 text-center">
                <h2 className="text-2xl font-bold mb-2">لمن هذه الورشة؟</h2>
                <div className="w-12 h-1 bg-[#b11e22] rounded-full mx-auto" />
            </div>
            <ScrollLoop>
                {['مدراء التدريب', 'قيادات HR', 'مدراء التحول الرقمي', 'التنفيذيين', 'صناع القرار'].map((role, i) => (
                    <div key={i} className="snap-center bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full whitespace-nowrap font-bold text-sm min-w-fit">
                        {role}
                    </div>
                ))}
            </ScrollLoop>
        </section>

      </main>

      {/* --- Footer (Simple Mobile) --- */}
      <footer className="bg-white pt-10 pb-28 px-6 text-center rounded-t-[2.5rem] shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
        <img 
            src="https://lh3.googleusercontent.com/d/1-SLAi3PFnVcRKY54w97J4H3sYQ2Prj3G" 
            alt="Logo" 
            className="h-12 mx-auto mb-6"
        />
        <div className="flex justify-center gap-6 mb-8 text-gray-500 font-bold text-sm">
            <a href="#">الرئيسية</a>
            <a href="#">سياسة الخصوصية</a>
            <a href="#">اتصل بنا</a>
        </div>
        <p className="text-xs text-gray-400 font-sans">© 2026 Reference Training Center</p>
      </footer>

      {/* --- Floating Action Bar (Mobile Sticky) --- */}
      <div className="fixed bottom-6 left-6 right-6 z-40">
        <div className="glass-card-dark rounded-full p-2 flex items-center justify-between pl-2 pr-6 shadow-2xl">
            <div className="flex flex-col">
                <span className="text-white font-bold text-sm">سجل الآن</span>
                <span className="text-gray-400 text-[10px]">المقاعد محدودة</span>
            </div>
            <button 
                onClick={() => window.open(registerUrl)}
                className="w-10 h-10 bg-[#b11e22] rounded-full flex items-center justify-center text-white shadow-lg animate-pulse"
            >
                <ArrowLeft size={18} />
            </button>
        </div>
      </div>

      {/* --- Mobile Navigation Drawer --- */}
      <MobileNav 
        isOpen={mobileMenuOpen} 
        setIsOpen={setMobileMenuOpen} 
        links={navLinks}
        onRegister={() => window.open(registerUrl)}
      />

    </div>
  );
}
