import React, { useState, useEffect } from 'react';

// --- DATA ---
const VENUES = ["الكويت", "عمان", "تركيا"];

const TRAINERS = [
  {
    name: "د. رامي شاهين",
    title: "خبير الذكاء الاصطناعي والتحول الرقمي",
    role: "خبير عالمي في الذكاء الاصطناعي والتحول الرقمي، يقود مشاريع متعددة الدول. دكتوراه في إدارة الموارد البشرية الدولية.",
    focus: "بناء الخوارزميات للتنبؤ بالفجوات المهارية",
    initials: "RS",
    color: "from-blue-500 to-blue-700",
    image: "https://drive.google.com/thumbnail?id=1Agf19eCAbARzkPgKNQ13Rg2PoydTlo2-&sz=w800",
  },
  {
    name: "د. سالم موسى",
    title: "استشاري التطوير وجودة التدريب",
    role: "استشاري التطوير وجودة التدريب. دكتوراه إدارة عامة وتطوير منظمات. MBA في علم النفس الإداري. استشاري جودة معتمد.",
    focus: "تصميم سيناريوهات التقييم المعقدة",
    initials: "SM",
    color: "from-sky-500 to-blue-600",
    image: "https://drive.google.com/thumbnail?id=12r7lppBDqCAX5oFBldy-7O77uREbwMVr&sz=w800",
  },
  {
    name: "أ. أحمد الطويل",
    title: "خبير التطوير المؤسسي والقيادة",
    role: "خبير التطوير المؤسسي والقيادة بخبرة +18 عامًا في إدارة التغيير وبناء الكفاءات. مستشار لجهات محلية ودولية.",
    focus: "تحويل البيانات إلى خطط تطوير تنفيذية",
    initials: "AT",
    color: "from-blue-400 to-sky-600",
    image: "https://drive.google.com/thumbnail?id=1hG5wGbMOjcCvaWSSfeyWNLhrhcfA0Srq&sz=w800",
  },
];

const QUOTES = [
  "التدريب بدون بيانات هدر للمال",
  "الفجوات المهارية تنمو بصمت",
  "العائد على الاستثمار قرار وليس صدفة",
  "الذكاء الاصطناعي يرفع دقة الموارد البشرية",
  "من التخمين إلى اليقين الرقمي",
  "التطوير الشخصي هو المستقبل",
  "مراكز التقييم أصبحت أنظمة حية",
  "تحتاج تدريباً أذكى، لا أكثر",
];

const IMAGINE_CARDS = [
  {
    text: "يقرأ الأداء الحالي",
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
      </svg>
    ),
  },
  {
    text: "يكشف الفجوات الخفية",
    color: "text-sky-600",
    bg: "bg-sky-50",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    text: "يقترح خطط تطوير فورية",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    text: "يحسب العائد قبل الصرف",
    color: "text-blue-500",
    bg: "bg-blue-50",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    text: "يحاكي مراكز التقييم",
    color: "text-slate-600",
    bg: "bg-slate-100",
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
];

const OUTPUTS = [
  { title: "قياس ROI", desc: "أدوات دقيقة لحساب العائد المالي" },
  { title: "TNA مدفوع بالبيانات", desc: "تحديد احتياجات مبني على حقائق" },
  { title: "تحول تدريبي ذكي", desc: "خارطة طريق لرقمنة القسم" },
  { title: "دعم قرار بالـ AI", desc: "لوحات مؤشرات لاتخاذ القرار" },
  { title: "AI Assessment Blueprint", desc: "مخطط بناء مركز تقييم آلي" },
  { title: "خريطة فجوات الكفاءات", desc: "تحديد دقيق لنقاط الضعف والقوة" },
];

const AUDIENCE_LIST = [
  {
    id: "hr-lead",
    label: "قائد موارد بشرية",
    desc: "حوّل قسمك من مركز تكلفة إلى شريك استراتيجي يثبت عوائده بالأرقام.",
  },
  {
    id: "ld-mgr",
    label: "مدير تدريب وتطوير",
    desc: "توقف عن تخمين الدورات التدريبية؛ صمم برامج تعالج احتياجات فعلية بدقة متناهية.",
  },
  {
    id: "dx-mgr",
    label: "مدير تحول رقمي",
    desc: "أضف الذكاء الاصطناعي لمحفظة مشاريعك عبر تطبيق عملي يمس كل موظف.",
  },
  {
    id: "ceo",
    label: "قائد تنفيذي",
    desc: "اضمن أن كل دولار يُصرف في التدريب يصب مباشرة في تحقيق أهداف المنظمة.",
  },
  {
    id: "perf-off",
    label: "مسؤول أداء وكفاءات",
    desc: "اربط تقييم الأداء بخطط التطوير آلياً وأغلق دائرة الكفاءة المفقودة.",
  },
];

// --- UTILS ---
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// --- COMPONENTS ---

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <React.Fragment>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50 h-24 transition-all duration-300 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <img 
              src="https://drive.google.com/thumbnail?id=1-SLAi3PFnVcRKY54w97J4H3sYQ2Prj3G&sz=w400" 
              alt="Reference Academy" 
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className="hidden sm:block px-4 py-2 text-sm text-slate-500 bg-slate-100 rounded-full cursor-not-allowed hover:bg-slate-200 transition-colors border border-slate-200"
              disabled
            >
              تحميل الكتيّب (قريباً)
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 text-sm font-bold text-white bg-blue-700 hover:bg-blue-600 rounded-full shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              احجز مقعدك
            </button>
          </div>
        </div>
      </nav>

      {/* Simple Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" dir="rtl">
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          />
          <div
            className="relative w-full max-w-md p-8 bg-white rounded-2xl text-center border border-slate-200 shadow-2xl animate-scale-up"
          >
            <h3 className="text-2xl font-bold mb-2 text-slate-900">التسجيل يفتح قريباً</h3>
            <p className="text-slate-500 mb-6">
              رابط التسجيل المباشر سيكون متاحاً خلال أيام. شكراً لاهتمامك.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl transition-colors font-medium"
            >
              حسناً
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

function RefeAIWidget() {
  const [typedText, setTypedText] = useState("");
  const fullText = "بناءً على تحليل البيانات، يوصى بتركيز ميزانية التدريب على المهارات الرقمية لتقليل الفجوة بنسبة 35%.";
  const [showChart, setShowChart] = useState(false);
  const [showUserMsg, setShowUserMsg] = useState(false);

  useEffect(() => {
    // Sequence the animations
    const t1 = setTimeout(() => setShowUserMsg(true), 500);
    const t2 = setTimeout(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
                setShowChart(true);
            }
        }, 40);
        return () => clearInterval(typingInterval);
    }, 1500);

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative h-[450px] w-full hidden lg:block perspective-1000" dir="rtl">
      {/* Floating Elements */}
      <div 
        className="absolute top-10 -right-8 z-20 bg-white p-3 rounded-2xl shadow-xl border border-white/40 backdrop-blur-md animate-float-slow"
      >
        <div className="text-2xl">🤖</div>
      </div>
      <div 
        className="absolute bottom-20 -left-8 z-20 bg-white p-3 rounded-2xl shadow-xl border border-white/40 backdrop-blur-md animate-float-delayed"
      >
        <div className="text-2xl">📊</div>
      </div>

      {/* Main Glass Dashboard */}
      <div
        className="relative w-full h-full bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-[0_20px_60px_-15px_rgba(37,99,235,0.2)] overflow-hidden flex flex-col animate-slide-up-fade"
      >
        {/* Glass Header */}
        <div className="h-16 border-b border-white/10 bg-white/10 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
              <span className="text-white font-bold text-xs">AI</span>
            </div>
            <span className="text-slate-800 font-bold tracking-wide">RefeAI</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 space-y-6 overflow-hidden relative">
          {/* Decor Gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/20 blur-[80px] rounded-full pointer-events-none" />

          {/* User Message */}
          <div 
            className={`flex justify-start transition-all duration-700 ${showUserMsg ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <div className="bg-white/60 backdrop-blur-md text-slate-700 px-5 py-3 rounded-2xl rounded-br-none shadow-sm border border-white/40 max-w-[80%]">
              <p className="text-sm font-medium">ما هي التوصية الحالية لرفع الكفاءة؟</p>
            </div>
          </div>

          {/* Bot Message */}
          <div className="flex justify-end w-full">
            <div className="flex gap-3 max-w-[90%] flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs">
                🤖
              </div>
              <div className="bg-blue-600 text-white px-5 py-4 rounded-2xl rounded-bl-none shadow-lg shadow-blue-500/20">
                <p className="text-sm leading-relaxed min-h-[40px]">
                  {typedText}
                  <span className="animate-pulse inline-block w-1.5 h-4 bg-blue-300 align-middle mr-1" />
                </p>
                {/* Mini Chart Mockup inside chat */}
                <div 
                  className={`mt-4 bg-white/10 rounded-lg p-3 border border-white/10 overflow-hidden transition-all duration-700 ${showChart ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="flex items-end gap-2 h-16 pb-1">
                    <div className="w-full bg-white/20 rounded-t h-[40%]" />
                    <div className="w-full bg-white/40 rounded-t h-[60%]" />
                    <div className="w-full bg-white/80 rounded-t h-[85%]" />
                    <div className="w-full bg-blue-300 rounded-t h-[50%]" />
                  </div>
                  <div className="text-[10px] text-blue-100 mt-1 text-center">تحليل الفجوات المتوقع</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-40 pb-20 min-h-[90vh] flex flex-col justify-center overflow-hidden w-full">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px] animate-spin-slow"
        />
        <div
          className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] animate-reverse-spin-slow"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Content Side */}
        <div className={`space-y-8 text-center lg:text-start transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700 mx-auto lg:mx-0 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            توقف عن التخمين. دع الذكاء الاصطناعي يقرر.
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight space-y-2 md:space-y-4">
            <span className="block text-slate-900">تحديد الاحتياجات التدريبية</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-600">
              باستخدام الذكاء الاصطناعي
            </span>
            <span className="block text-slate-900">AI Assessment Center</span>
          </h1>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm md:text-base text-slate-600">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>19 – 23 يناير، 2026</span>
            </div>
            <div className="flex gap-2">
              {VENUES.map((venue) => (
                <span key={venue} className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 select-none shadow-sm">
                  {venue}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-red-500 font-medium">
            * المقاعد محدودة جداً لضمان جودة التطبيق العملي
          </p>
        </div>

        {/* Visual Side (Chat Mock) */}
        <RefeAIWidget />
      </div>
    </section>
  );
}

function DashboardDemo() {
  return (
    <section className="py-20 bg-slate-50 relative z-20 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Container */}
        <div 
          className="bg-white rounded-3xl shadow-2xl shadow-blue-200/50 border border-slate-200 overflow-hidden animate-fade-in-up"
        >
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="mr-4 text-sm font-bold text-slate-700 hidden md:inline">نظام تحليل الاحتياجات التدريبية - لوحة القيادة</span>
              <span className="mr-4 text-sm font-bold text-slate-700 md:hidden">لوحة القيادة</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">LIVE DATA v2.4</div>
          </div>

          {/* Content Grid */}
          <div className="p-4 md:p-8 bg-slate-50/50">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="الموظفون" value="1,240" sub="تم تحليلهم هذا الربع" trend="+12%" />
              <StatCard title="فجوات حرجة" value="18%" sub="تتطلب تدخلاً فورياً" trend="-5%" trendColor="text-red-500" />
              <StatCard title="توفير الميزانية" value="$42,500" sub="بفضل التخصيص الدقيق" trend="+8%" trendColor="text-green-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Chart Area (Mock) */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800">تحليل الفجوات حسب القسم</h3>
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600"></span> <span className="text-xs text-slate-500">مستهدف</span>
                    <span className="w-3 h-3 rounded-full bg-slate-300"></span> <span className="text-xs text-slate-500">حالي</span>
                  </div>
                </div>
                {/* Bars */}
                <div className="space-y-6">
                  <ChartBar label="المبيعات والتسويق" current={65} target={85} />
                  <ChartBar label="تكنولوجيا المعلومات" current={75} target={90} />
                  <ChartBar label="الموارد البشرية" current={80} target={85} />
                  <ChartBar label="العمليات والتشغيل" current={60} target={88} />
                </div>
              </div>

              {/* Recommendations List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">التوصيات الذكية</h3>
                <div className="space-y-3">
                  <RecItem title="علم البيانات للقادة" type="ورشة عمل" priority="عالية" />
                  <RecItem title="إدارة التغيير الرقمي" type="دورة ذاتية" priority="متوسطة" />
                  <RecItem title="أساسيات AI" type="ندوة" priority="منخفضة" />
                  <RecItem title="التفكير التصميمي" type="تدريب عملي" priority="متوسطة" />
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <span className="text-xl">💡</span>
                    <p className="text-xs text-blue-800 leading-tight">
                      يقترح النظام زيادة ميزانية التدريب التقني بنسبة 15% للربع القادم بناءً على اتجاهات السوق.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ title, value, sub, trend, trendColor = "text-green-600" }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-500 text-sm font-medium">{title}</span>
        <span className={`text-xs font-bold bg-slate-100 px-2 py-1 rounded-full ${trendColor}`}>{trend}</span>
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1 font-mono tracking-tight">{value}</div>
      <div className="text-xs text-slate-400">{sub}</div>
    </div>
  )
}

function ChartBar({ label, current, target }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-2">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-400 font-mono">{current}% / {target}%</span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
        <div 
            className="absolute top-0 right-0 h-full bg-blue-200 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${target}%` }}
        />
        <div 
            className="absolute top-0 right-0 h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)] transition-all duration-1000 delay-200 ease-out"
            style={{ width: `${current}%` }}
        />
      </div>
    </div>
  )
}

function RecItem({ title, type, priority }) {
  const priorityColors = {
    "عالية": "bg-red-100 text-red-700 border-red-200",
    "متوسطة": "bg-amber-100 text-amber-700 border-amber-200",
    "منخفضة": "bg-green-100 text-green-700 border-green-200"
  }
  return (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100 cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-sm flex items-center justify-center text-lg transition-all">📚</div>
        <div>
          <div className="text-sm font-bold text-slate-800">{title}</div>
          <div className="text-xs text-slate-500">{type}</div>
        </div>
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${priorityColors[priority] || "bg-slate-100"}`}>
        {priority}
      </span>
    </div>
  )
}

function Countdown() {
  const TARGET_DATE = new Date("2026-01-19T09:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div className="h-32 bg-slate-50" />;

  return (
    <section className="py-12 border-y border-slate-200 bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-slate-500 mb-8 text-sm md:text-base font-light">
          الوقت يمضي… والقرارات التدريبية الخاطئة تُتخذ يومياً
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8" dir="ltr">
          <TimeBlock value={timeLeft.days} label="Days" />
          <div className="text-4xl font-thin text-slate-300 self-center hidden md:block">:</div>
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <div className="text-4xl font-thin text-slate-300 self-center hidden md:block">:</div>
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <div className="text-4xl font-thin text-slate-300 self-center hidden md:block">:</div>
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div 
        key={value}
        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-3xl md:text-5xl font-bold text-slate-900 shadow-xl shadow-slate-200 animate-pop-in"
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-xs text-slate-500 mt-2 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function ImagineSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGINE_CARDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-200/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-fade-in">
            تخيل نظام تقييم ذكي داخل مؤسستك…
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="h-[300px] flex items-center justify-center relative">
            <div
                key={index}
                className="bg-white border border-slate-200 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 w-full max-w-lg mx-auto flex flex-col items-center gap-6 animate-slide-in-right"
            >
                <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center mb-2 shadow-lg", IMAGINE_CARDS[index].bg, IMAGINE_CARDS[index].color)}>
                    {IMAGINE_CARDS[index].icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{IMAGINE_CARDS[index].text}</h3>
                
                <div className="flex gap-2 mt-4">
                    {IMAGINE_CARDS.map((_, i) => (
                    <div 
                        key={i} 
                        className={cn(
                        "w-2 h-2 rounded-full transition-colors duration-300", 
                        i === index ? "bg-blue-600" : "bg-slate-200"
                        )} 
                    />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

function StickyQuotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative w-full">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center relative z-20">
        <h2 className="text-3xl font-bold text-white mb-6">حقيقة التحول الرقمي</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
      </div>

      <div className="h-[200px] flex items-center justify-center relative z-20">
        <div
            key={index}
            className="w-full max-w-2xl px-8 text-center animate-fade-in-up"
        >
            <span className="text-6xl text-blue-500/20 font-serif block mb-6">"</span>
            <p className="text-2xl md:text-3xl font-medium text-slate-100 leading-relaxed">
                {QUOTES[index]}
            </p>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-8 relative z-20">
        {QUOTES.map((_, i) => (
          <button 
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              i === index ? "bg-blue-500 w-4" : "bg-slate-700 hover:bg-slate-500"
            )}
          />
        ))}
      </div>
    </section>
  );
}

function Outputs() {
  return (
    <section className="py-24 bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            نتائج <span className="text-blue-600">فورية</span> ستخرج بها
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OUTPUTS.map((output, idx) => (
            <div
              key={idx}
              className="group glass-card p-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 border-r-2 border-r-transparent hover:border-r-blue-600 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="mb-4 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-700 transition-colors">
                {output.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {output.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceChips() {
  const [selectedId, setSelectedId] = useState(AUDIENCE_LIST[0].id);

  const selectedAudience = AUDIENCE_LIST.find((a) => a.id === selectedId);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-10 text-slate-900">اختر وصفك… وسنريك لماذا تهمك</h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {AUDIENCE_LIST.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border",
                selectedId === item.id
                  ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-200 scale-105"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="min-h-[100px] flex items-center justify-center">
          <div
            key={selectedId}
            className="text-xl md:text-2xl text-slate-700 font-light max-w-2xl leading-relaxed animate-fade-in"
          >
            "{selectedAudience?.desc}"
          </div>
        </div>
      </div>
    </section>
  );
}

function TrainersCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDetailOpen) {
        setActiveIndex((prev) => (prev + 1) % TRAINERS.length);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isDetailOpen]);

  const nextTrainer = () => {
    setActiveIndex((prev) => (prev + 1) % TRAINERS.length);
    setIsDetailOpen(false);
  };

  const prevTrainer = () => {
    setActiveIndex((prev) => (prev - 1 + TRAINERS.length) % TRAINERS.length);
    setIsDetailOpen(false);
  };

  const activeTrainer = TRAINERS[activeIndex];

  return (
    <section className="py-24 bg-white relative w-full">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-100 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            مدربونا ليسوا متحدثين؛ بل هم مهندسوا التحول
          </h2>
          <p className="text-slate-500 max-w-3xl mx-auto leading-relaxed text-lg">
            من الذكاء الاصطناعي إلى تحليل البيانات الضخمة، ومن استراتيجيات الأداء إلى مراكز التقييم المتقدمة، كل مدرب يجمع بين المعرفة العميقة والخبرة العملية ليضمن لك تجربة تدريبية ذكية، ملموسة، ومؤثرة
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-12">
          <button 
            onClick={prevTrainer}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
          >
            <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="relative w-full max-w-md h-[550px]">
                <div
                    key={activeIndex}
                    className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group bg-slate-200 animate-fade-in"
                    onClick={() => setIsDetailOpen(true)}
                >
                    <div className="absolute inset-0">
                        <img 
                            src={activeTrainer.image} 
                            alt={activeTrainer.name}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                                e.target.src = "https://placehold.co/600x800?text=Trainer+Image";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    </div>

                    <div 
                        className={`absolute bottom-0 left-0 right-0 p-8 text-white z-10 transition-all duration-300 ${isDetailOpen ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                    >
                        <h3 className="text-3xl font-bold mb-2">{activeTrainer.name}</h3>
                        <p className="text-white/90 font-bold text-lg border-l-4 border-blue-500 pl-3">
                            {activeTrainer.title}
                        </p>
                    </div>

                    <div 
                        className={`absolute inset-0 bg-slate-900/95 backdrop-blur-md p-8 flex flex-col justify-center text-center z-20 transition-all duration-300 ${isDetailOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            setIsDetailOpen(false);
                        }}
                    >
                        <div className="w-20 h-20 mx-auto rounded-full border-2 border-blue-500 overflow-hidden mb-6 shadow-lg shadow-blue-500/20">
                            <img src={activeTrainer.image} className="w-full h-full object-cover" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-4">{activeTrainer.name}</h3>
                        
                        <div className="space-y-6 overflow-y-auto max-h-[60%] custom-scrollbar">
                            <div>
                                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">النبذة المختصرة</p>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {activeTrainer.role}
                                </p>
                            </div>
                            
                            <div>
                                <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">التركيز في الورشة</p>
                                <p className="text-base text-white font-medium">
                                    {activeTrainer.focus}
                                </p>
                            </div>
                        </div>

                        <button className="mt-auto text-sm text-blue-300 hover:text-white transition-colors flex items-center justify-center gap-2 pt-6">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            إغلاق
                        </button>
                    </div>
                </div>
          </div>

          <button 
            onClick={nextTrainer}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {TRAINERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                setIsDetailOpen(false);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                idx === activeIndex ? "bg-blue-600 w-6" : "bg-slate-300 hover:bg-slate-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyNow() {
  return (
    <section className="py-20 bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-10 text-slate-900">لماذا الآن؟ لأن التدريب تغيّر…</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Item text="الميزانيات تتقلص وتطلب دليلاً رقمياً" delay={0} />
          <Item text="الموظفون يتوقعون مسارات مخصصة لهم" delay={0.1} />
          <Item text="الذكاء الاصطناعي جعل التقييم فورياً" delay={0.2} />
        </div>
      </div>
    </section>
  );
}

function Item({ text, delay }) {
  return (
    <div 
        className="flex flex-col items-center gap-4 animate-fade-in-up"
        style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent opacity-50" />
      <p className="text-lg font-medium text-slate-700">{text}</p>
    </div>
  )
}

function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <React.Fragment>
      <section className="py-32 relative overflow-hidden text-center bg-slate-50 w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/40 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            كن ضمن نخبة القادة الذين يبنون التدريب الذكي
          </h2>
          <p className="text-red-500 font-medium mb-10 bg-red-50 inline-block px-4 py-2 rounded-lg border border-red-200">
            ⚠️ المقاعد محدودة لضمان التطبيق العملي
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-10 py-4 text-lg font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              احجز مقعدك الآن
            </button>
            <button
              disabled
              className="w-full sm:w-auto px-10 py-4 text-lg font-medium text-slate-400 bg-slate-100 rounded-full cursor-not-allowed border border-slate-200"
            >
              تحميل الكتيّب (قريباً)
            </button>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-slate-200 z-40 md:hidden">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 font-bold text-white bg-blue-600 rounded-xl shadow-lg"
        >
          احجز مقعدك الآن
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" dir="rtl">
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
          />
          <div
            className="relative w-full max-w-md p-8 bg-white rounded-2xl text-center border border-slate-200 shadow-2xl animate-scale-up"
          >
            <h3 className="text-2xl font-bold mb-2 text-slate-900">التسجيل يفتح قريباً</h3>
            <p className="text-slate-500 mb-6">
              رابط التسجيل المباشر سيكون متاحاً خلال أيام.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl transition-colors font-medium"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-slate-200 text-center text-sm text-slate-500 pb-24 md:pb-8 bg-slate-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-bold text-slate-900">Reference Academy</div>
        <div dir="ltr">contact@reference-academy.com</div>
        <div>جميع الحقوق محفوظة © 2026</div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800&display=swap');
        
        .glass {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .glass-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        @keyframes floatDelayed { 0% { transform: translateY(0px); } 50% { transform: translateY(15px); } 100% { transform: translateY(0px); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes spinSlow { from { transform: rotate(0deg) scale(1); } to { transform: rotate(360deg) scale(1.1); } }
        @keyframes reverseSpinSlow { from { transform: rotate(0deg) scale(1); } to { transform: rotate(-360deg) scale(1.2); } }

        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-scale-up { animation: scaleUp 0.3s ease-out forwards; }
        .animate-float-slow { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 5s ease-in-out infinite; }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out forwards; }
        .animate-spin-slow { animation: spinSlow 20s linear infinite; }
        .animate-reverse-spin-slow { animation: reverseSpinSlow 25s linear infinite; }
      `}</style>

      <Navbar />
      <Hero />
      <DashboardDemo />
      <TrainersCarousel />
      <Countdown />
      <ImagineSection />
      <StickyQuotes />
      <Outputs />
      <AudienceChips />
      <WhyNow />
      <FinalCTA />
      <Footer />
    </div>
  );
}
