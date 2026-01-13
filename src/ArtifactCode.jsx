import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Sparkles, Calendar, Clock, ArrowRight, Brain, Target, Layers, 
  BarChart, CheckCircle2, MessageSquare, MapPin, Phone, Mail, ChevronRight, User, Award, Star
} from 'lucide-react';
import { getAIAdvisorAnalysis } from './services/geminiService';

// --- Types & Interfaces ---
interface Trainer {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const REGISTRATION_URL = "https://forms.cloud.microsoft/r/FPLwbAsYyU";
const WHATSAPP_URL = "https://wa.me/905337642450";

// --- Data ---
const trainers: Trainer[] = [
  {
    id: 1,
    name: "د. رامي شاهين",
    role: "خبير الذكاء الاصطناعي العالمي",
    image: "https://drive.google.com/thumbnail?id=1gwL1YOxAQCLiwXM0KPockBJ21gAyK0fR&sz=w1000",
    bio: "خبير دولي متخصص في استراتيجيات الذكاء الاصطناعي والتحول الرقمي، قاد العديد من المشاريع الاستراتيجية في كبرى المؤسسات العالمية."
  },
  {
    id: 2,
    name: "أ. أحمد الطويل",
    role: "خبير التطوير المؤسسي",
    image: "https://drive.google.com/thumbnail?id=1vPbj5AULuI0lRLjJqDakI71eb6ChRs78&sz=w1000",
    bio: "مستشار متخصص في بناء الهياكل المؤسسية وتطوير الأداء التنظيمي، يمتلك خبرة واسعة في تحليل الفجوات وبناء الجدارات."
  },
  {
    id: 3,
    name: "د. سالم موسى",
    role: "خبير التطوير واستشاري جودة التدريب",
    image: "https://drive.google.com/thumbnail?id=1fvRFsuV8l6Lfbgqz1NwlBa4HJ_ZLCJ-S&sz=w1000",
    bio: "استشاري الجودة والتميز المؤسسي، يركز على معايير جودة العملية التدريبية وقياس العائد على الاستثمار في رأس المال البشري."
  }
];

// --- Main App Component ---
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTrainerIndex, setActiveTrainerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, mins: number, secs: number}>({ days: 0, hours: 0, mins: 0, secs: 0 });

  // AI Advisor State
  const [advisorInput, setAdvisorInput] = useState('');
  const [advisorResult, setAdvisorResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Refs for scrolling
  const trainersSectionRef = useRef<HTMLElement>(null);

  // --- Effects ---
  
  // Trainer Rotation Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrainerIndex((prev) => (prev + 1) % trainers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date('2026-01-19T09:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Handlers ---
  const handleScrollToTrainers = () => {
    trainersSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAIAnalyze = async () => {
    if (!advisorInput.trim()) return;
    setIsAnalyzing(true);
    setAdvisorResult('');
    
    try {
      const response = await getAIAdvisorAnalysis(advisorInput);
      setAdvisorResult(response);
    } catch (e) {
      setAdvisorResult("حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // --- Render Helpers ---
  const NavLink = ({ children, targetId, isSpecial = false }: React.PropsWithChildren<{ targetId: string, isSpecial?: boolean }>) => (
    <button 
      onClick={() => scrollToSection(targetId)}
      className={`
        px-4 py-2 rounded-full transition-all duration-300 font-bold text-sm md:text-base
        ${isSpecial 
          ? 'bg-corporate text-white flex items-center gap-2 shadow-lg hover:bg-navy hover:scale-105 animate-pulse-fast ring-2 ring-blue-300 ring-offset-2' 
          : 'text-gray-700 hover:text-corporate hover:bg-slate-100'}
      `}
    >
      {isSpecial && <Sparkles className="w-4 h-4 text-yellow-400" />}
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden selection:bg-accent selection:text-white">
      
      {/* --- Navigation Bar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100 h-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-corporate p-2">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Links (Desktop) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6 flex-1 justify-center">
            <NavLink targetId="home">الرئيسية</NavLink>
            <NavLink targetId="about">عن البرنامج</NavLink>
            <NavLink targetId="axes">المحاور</NavLink>
            <NavLink targetId="trainers">المدربين</NavLink>
            <NavLink targetId="ai-advisor" isSpecial>المستشار الذكي</NavLink>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-end md:items-start select-none">
            <img 
               src="https://drive.google.com/thumbnail?id=1l4GCnGgjY65XiSnJevl0y7goxr5nFP2j&sz=w1000" 
               alt="Reference Training Center" 
               className="h-16 w-auto object-contain"
            />
          </div>

          {/* Call to Action */}
          <div className="hidden md:block mr-6">
            <a 
              href={REGISTRATION_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-accent hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
            >
              حجز مقعد
            </a>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            <NavLink targetId="home">الرئيسية</NavLink>
            <NavLink targetId="ai-advisor" isSpecial>المستشار الذكي</NavLink>
            <NavLink targetId="about">عن البرنامج</NavLink>
            <NavLink targetId="axes">المحاور</NavLink>
            <NavLink targetId="trainers">المدربين</NavLink>
            <a 
              href={REGISTRATION_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-accent text-white text-center py-3 rounded-lg font-bold shadow-md"
            >
              حجز مقعد الآن
            </a>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-28 pb-16 md:pt-40 md:pb-24 px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent -z-10 rounded-l-[100px] opacity-60"></div>
        
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Visuals (Left side in LTR, Right side in RTL visually, but code structure follows logical flow) */}
          <div className="order-2 md:order-1 relative h-[400px] md:h-[500px] flex items-center justify-center">
            {/* Orbital Animation Container */}
            <div className="relative w-full h-full flex items-center justify-center">
               <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-3xl animate-pulse"></div>
               
               {trainers.map((trainer, idx) => {
                 const isActive = idx === activeTrainerIndex;
                 const positionClass = isActive 
                    ? "z-20 scale-100 opacity-100 translate-y-0 shadow-2xl border-corporate" 
                    : "z-10 scale-90 opacity-60 translate-y-8 blur-[1px] border-transparent cursor-pointer hover:opacity-80";
                 
                 return (
                   <div 
                     key={trainer.id}
                     onClick={handleScrollToTrainers}
                     className={`
                       absolute w-64 md:w-72 bg-white rounded-2xl overflow-hidden transition-all duration-700 ease-in-out border-2
                       ${positionClass}
                     `}
                     style={{ 
                       transform: isActive ? 'translateX(0) rotate(0)' : `translateX(${idx % 2 === 0 ? '-40px' : '40px'}) rotate(${idx % 2 === 0 ? '-5deg' : '5deg'})`
                     }}
                   >
                     <img src={trainer.image} alt={trainer.name} className="w-full h-64 object-cover" />
                     <div className="p-4 text-center bg-white">
                       <h3 className="font-bold text-corporate text-lg">{trainer.name}</h3>
                       {/* Role removed for Header as requested */}
                     </div>
                   </div>
                 );
               })}
            </div>
          </div>

          {/* Content (Right side in LTR) */}
          <div className="order-1 md:order-2 space-y-8 text-right">
            
            {/* Date Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-corporate px-4 py-1.5 rounded-full border border-blue-200 shadow-sm self-start">
              <Calendar size={18} />
              <span className="font-bold font-mono" dir="ltr">19 – 23 January, 2026</span>
            </div>

            {/* Countdown - LTR Enabled */}
            <div className="flex gap-4 justify-start md:justify-end" dir="ltr">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.mins },
                { label: 'Secs', value: timeLeft.secs }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md border border-gray-100 w-16 md:w-20">
                  <span className="text-2xl md:text-3xl font-black text-accent font-mono">{String(item.value).padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase text-gray-500 font-bold">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Headlines */}
            <div className="space-y-2">
               <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-corporate to-blue-500 py-2">
                 تحليل الاحتياجات التدريبية باستخدام الذكاء الاصطناعي بمنهجية مركز التقييم الذكي
               </h1>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href={REGISTRATION_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-accent hover:bg-red-700 text-white text-center px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2"
              >
                سجل الآن
                <ArrowRight size={20} className="rtl:rotate-180" />
              </a>
              <button className="bg-white hover:bg-gray-50 text-corporate border border-gray-200 text-center px-8 py-4 rounded-xl font-bold text-lg shadow hover:shadow-lg transition-all">
                تحميل البروشور
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* --- Value Proposition --- */}
      <section id="about" className="py-12 px-4">
        <div className="container mx-auto">
          <div className="bg-corporate rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-white">
               {[
                 { title: "منهجيات حديثة", desc: "أحدث أساليب التحليل والقياس المعتمدة عالمياً.", icon: <Brain size={40} className="text-blue-300" /> },
                 { title: "دقة الذكاء الاصطناعي", desc: "استخدام خوارزميات AI لتحديد الفجوات بدقة متناهية.", icon: <Sparkles size={40} className="text-blue-300" /> },
                 { title: "الأداء المؤسسي", desc: "ربط مباشر بين مخرجات التدريب ومؤشرات الأداء KPI.", icon: <BarChart size={40} className="text-blue-300" /> }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center space-y-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                   <div className="bg-white/20 p-4 rounded-full">{item.icon}</div>
                   <h3 className="text-xl font-bold">{item.title}</h3>
                   <p className="text-blue-100 leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- AI Advisor Section (RefeAI) --- */}
      <section id="ai-advisor" className="py-20 px-4 relative overflow-hidden bg-[#1a1c2e] text-white">
        {/* Background Circuit Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1a1c2e] via-transparent to-[#1a1c2e]"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          
          <div className="flex items-center justify-between mb-8 border-b border-gray-700 pb-4">
             <div className="flex items-center gap-3">
               <div className="bg-blue-600 p-2 rounded-lg animate-pulse">
                 <Sparkles className="text-white" size={24} />
               </div>
               <div>
                 <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">RefeAI</h2>
                 <p className="text-sm text-gray-400">مستشار التدريب الذكي</p>
               </div>
             </div>
             <div className="opacity-50 grayscale hover:grayscale-0 transition-all">
                {/* Small Reference Logo mark */}
                <div className="flex items-center gap-2 text-white">
                  <div className="w-6 h-6 bg-white text-[#1a1c2e] rounded flex items-center justify-center font-bold text-xs">R</div>
                  <span className="font-bold text-sm tracking-widest hidden sm:block">REFERENCE</span>
                </div>
             </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">أخبرنا عن التحديات التي تواجهها في مؤسستك</h3>
            
            <div className="space-y-6">
              <textarea 
                value={advisorInput}
                onChange={(e) => setAdvisorInput(e.target.value)}
                placeholder="مثال: نعاني من صعوبة في تحديد المهارات الناقصة لدى الموظفين الجدد، مما يؤدي إلى ضعف الإنتاجية في الأشهر الأولى..."
                className="w-full bg-[#0f111a] border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-none"
              />
              
              <button 
                onClick={handleAIAnalyze}
                disabled={isAnalyzing || !advisorInput}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                  ${isAnalyzing ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-corporate hover:from-blue-500 hover:to-blue-700 shadow-lg hover:shadow-blue-500/30'}
                `}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري التحليل...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    حلل الآن باستخدام الذكاء الاصطناعي
                  </>
                )}
              </button>
            </div>

            {advisorResult && (
              <div className="mt-8 bg-blue-900/30 border border-blue-500/30 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 rounded-full p-2 mt-1">
                    <MessageSquare size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-300 mb-2">تحليل المستشار الذكي:</h4>
                    <p className="leading-relaxed text-gray-200">{advisorResult}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- Workshop Pillars --- */}
      <section id="axes" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-corporate font-bold tracking-wider uppercase text-sm bg-blue-50 px-3 py-1 rounded-full">المنهجية العلمية</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-4">ركائز البرنامج التدريبي</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "تحديد الاحتياجات الذكي", icon: <Brain className="text-white" size={32} />, bg: "bg-blue-500" },
              { title: "القرارات التدريبية", icon: <Target className="text-white" size={32} />, bg: "bg-red-500" },
              { title: "التكامل الاستراتيجي", icon: <Layers className="text-white" size={32} />, bg: "bg-purple-500" },
              { title: "فجوات الجدارات", icon: <ChartIcon className="text-white" size={32} />, bg: "bg-green-500" }
            ].map((pillar, idx) => (
              <div key={idx} className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`${pillar.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{pillar.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  منهجية متكاملة لضمان تحقيق أقصى عائد من الاستثمار في رأس المال البشري باستخدام أحدث التقنيات.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Timeline / Axes --- */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-black text-corporate mb-4 sticky top-24">مسار التعلم والتطوير</h2>
              <p className="text-gray-600 mb-8 sticky top-36">خطوات عملية تنقلك من التحليل التقليدي إلى القيادة بالذكاء الاصطناعي.</p>
            </div>
            <div className="md:w-2/3 space-y-4">
              {[
                "مفهوم تحليل الاحتياجات التدريبية والعائد على الاستثمار ROI",
                "التحليل المبني على البيانات Data-Driven Analysis",
                "التحول الرقمي في إدارات الموارد البشرية",
                "تصميم مراكز التقييم الذكية Smart Assessment Centers",
                "تطبيقات الذكاء الاصطناعي في قياس الكفاءات",
                "بناء خطط التطوير الفردي والمؤسسي IDP"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-6 rounded-xl border-r-4 border-corporate shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-black text-gray-200 font-mono">{(idx + 1).toString().padStart(2, '0')}</div>
                  <h3 className="text-lg font-bold text-gray-800">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Target Audience --- */}
      <section className="py-20 px-4 bg-corporate text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-12">الفئات المستهدفة</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["مدراء الموارد البشرية", "الرؤساء التنفيذيين CEOs", "مدراء التحول الرقمي", "أخصائيي التدريب والتطوير", "قادة الفرق", "الاستشاريين"].map((role, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-corporate transition-all cursor-default">
                {role}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Trainers Section --- */}
      <section id="trainers" ref={trainersSectionRef} className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-corporate">نخبة المدربين</h2>
            <p className="text-gray-500 mt-2">خبراء عالميون يجمعون بين الخبرة الأكاديمية والتطبيق العملي</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="relative group mt-12">
                 {/* Card Background */}
                 <div className="absolute top-0 left-0 right-0 h-full bg-slate-50 border border-slate-100 rounded-3xl shadow-xl transform transition-transform duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl"></div>
                 
                 <div className="relative p-8 pt-0 flex flex-col items-center">
                    {/* Floating Avatar */}
                    <div className="w-36 h-36 -mt-16 rounded-full border-[6px] border-white shadow-xl overflow-hidden relative z-10 bg-white">
                       <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    
                    {/* Content */}
                    <div className="mt-6 text-center w-full">
                       <h3 className="text-2xl font-black text-corporate mb-2">{trainer.name}</h3>
                       
                       <div className="inline-block px-4 py-1.5 bg-blue-50 text-accent text-sm font-bold rounded-full mb-6 border border-blue-100 shadow-sm">
                         {trainer.role}
                       </div>
                       
                       <div className="bg-white p-6 rounded-2xl shadow-inner mb-2 border border-slate-50 min-h-[140px] flex items-center justify-center">
                         <p className="text-gray-600 text-sm leading-relaxed">
                            {trainer.bio}
                         </p>
                       </div>
                       
                       <div className="mt-4 flex justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                         <div className="w-2 h-2 rounded-full bg-corporate"></div>
                         <div className="w-2 h-2 rounded-full bg-accent"></div>
                         <div className="w-2 h-2 rounded-full bg-corporate"></div>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-navy border-t-4 border-accent text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="space-y-4">
              <div className="inline-block bg-white p-2 rounded-lg">
                <img 
                   src="https://drive.google.com/thumbnail?id=1l4GCnGgjY65XiSnJevl0y7goxr5nFP2j&sz=w1000" 
                   alt="Reference Training Center" 
                   className="h-12 w-auto object-contain"
                 />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                مركز رائد في تقديم الحلول التدريبية المتكاملة، نجمع بين الأصالة والحداثة لتمكين المؤسسات من تحقيق أهدافها.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white border-b border-gray-700 pb-2 inline-block">روابط سريعة</h4>
              <ul className="space-y-3 text-gray-300">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-accent transition-colors">الرئيسية</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-accent transition-colors">عن البرنامج</button></li>
                <li><button onClick={() => scrollToSection('trainers')} className="hover:text-accent transition-colors">المدربين</button></li>
                <li><a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">التسجيل</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-lg mb-6 text-white border-b border-gray-700 pb-2 inline-block">تواصل معنا</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a href="tel:+905337642450" className="flex items-center gap-3 text-gray-300 hover:text-white group">
                  <div className="bg-white/10 p-2 rounded-full group-hover:bg-accent transition-colors">
                    <Phone size={18} />
                  </div>
                  <span className="font-mono" dir="ltr">+90 533 764 24 50</span>
                </a>
                
                <a href="mailto:info@reference-rcb.com" className="flex items-center gap-3 text-gray-300 hover:text-white group">
                  <div className="bg-white/10 p-2 rounded-full group-hover:bg-accent transition-colors">
                    <Mail size={18} />
                  </div>
                  <span className="font-sans">info@reference-rcb.com</span>
                </a>

                <div className="flex items-center gap-3 text-gray-300">
                  <div className="bg-white/10 p-2 rounded-full">
                    <MapPin size={18} />
                  </div>
                  <span className="dir-ltr">Istanbul, Turkiye</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Reference Training Center. All rights reserved.</p>
            <div className="flex gap-4">
               <span className="hover:text-white cursor-pointer">Privacy Policy</span>
               <span className="hover:text-white cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp --- */}
      <a 
        href={WHATSAPP_URL} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-pulse group"
        aria-label="Chat on WhatsApp"
      >
         <MessageSquare size={28} fill="white" />
         <span className="absolute left-full ml-4 bg-white text-gray-800 px-3 py-1 rounded shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity w-32 pointer-events-none">
           تواصل معنا
         </span>
      </a>

    </div>
  );
}

// Icon Helper
const ChartIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
);
