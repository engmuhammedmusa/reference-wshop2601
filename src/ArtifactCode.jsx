<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Reference Academy Landing Page</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800&display=swap" rel="stylesheet">
    <!-- Mono font for numbers -->
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- React & ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    
    <!-- Babel for JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
        /* Force full width and prevent horizontal scroll */
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
            font-family: 'Tajawal', sans-serif;
            background-color: #f8fafc; /* slate-50 */
            color: #0f172a; /* slate-900 */
        }

        #root {
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
        }
        
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

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }

        /* Float Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 5s ease-in-out infinite; }

        @keyframes spinSlow { from { transform: rotate(0deg) scale(1); } to { transform: rotate(360deg) scale(1.1); } }
        @keyframes reverseSpinSlow { from { transform: rotate(0deg) scale(1); } to { transform: rotate(-360deg) scale(1.2); } }
        .animate-spin-slow { animation: spinSlow 20s linear infinite; }
        .animate-reverse-spin-slow { animation: reverseSpinSlow 25s linear infinite; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef } = React;

        // --- UTILS ---
        function cn(...inputs) {
            return inputs.filter(Boolean).join(" ");
        }

        /**
         * Custom hook to detect if an element is in view.
         * Replaces framer-motion's whileInView.
         */
        function useInView({ threshold = 0.1, once = true } = {}) {
            const ref = useRef(null);
            const [isInView, setIsInView] = useState(false);

            useEffect(() => {
                const element = ref.current;
                if (!element) return;

                const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                    setIsInView(true);
                    if (once) observer.unobserve(element);
                    } else if (!once) {
                    setIsInView(false);
                    }
                },
                { threshold }
                );

                observer.observe(element);
                return () => observer.disconnect();
            }, [threshold, once]);

            return { ref, isInView };
        }

        /**
         * Animated Wrapper Component
         * Replaces motion.div with a CSS transition version
         */
        function FadeInUp({ children, className = "", delay = 0 }) {
            const { ref, isInView } = useInView();
            
            return (
                <div
                ref={ref}
                className={cn(
                    "transition-all duration-700 ease-out transform",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                    className
                )}
                style={{ transitionDelay: `${delay}ms` }}
                >
                {children}
                </div>
            );
        }

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
            color: "text-purple-600",
            bg: "bg-purple-50",
            icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
            </svg>
            ),
        },
        {
            text: "يكشف الفجوات الخفية",
            color: "text-blue-600",
            bg: "bg-blue-50",
            icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            ),
        },
        {
            text: "يقترح خطط تطوير فورية",
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            icon: (
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            ),
        },
        {
            text: "يحسب العائد قبل الصرف",
            color: "text-violet-500",
            bg: "bg-violet-50",
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

        // --- COMPONENTS ---

        function Navbar() {
        const [isModalOpen, setIsModalOpen] = useState(false);

        return (
            <React.Fragment>
            {/* Updated Navbar: Gradient from Dark Right to Light Left */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pb-4 pointer-events-none">
                <nav className="pointer-events-auto w-full max-w-7xl bg-gradient-to-l from-indigo-900 via-purple-100 to-white backdrop-blur-2xl border border-white/20 rounded-2xl h-20 px-4 md:px-8 flex items-center justify-between shadow-xl shadow-indigo-900/10 transition-all duration-300">
                    {/* Logo / Brand */}
                    <div className="flex items-center gap-3">
                        {/* Logo adapted to be white to contrast with the dark gradient on the right */}
                        <img 
                        src="https://drive.google.com/thumbnail?id=1seyPWKdfudUSXXNQaJ8H3JBlr3YHSybP&sz=w400" 
                        alt="Reference Academy" 
                        className="h-14 w-auto object-contain hover:scale-105 transition-transform duration-300"
                        style={{ filter: 'brightness(0) invert(1)' }}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                        className="hidden sm:block px-5 py-2.5 text-xs md:text-sm font-medium text-slate-600 bg-white/60 rounded-full cursor-not-allowed hover:bg-white transition-all border border-slate-200 backdrop-blur-sm"
                        disabled
                        >
                        تحميل الكتيّب (قريباً)
                        </button>
                        <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2.5 text-xs md:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95 border border-white/20"
                        >
                        احجز مقعدك
                        </button>
                    </div>
                </nav>
            </div>

            {/* Simple Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" dir="rtl">
                <div
                    onClick={() => setIsModalOpen(false)}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
                />
                <div
                    className="relative w-full max-w-md p-8 bg-white rounded-2xl text-center border border-slate-200 shadow-2xl transform transition-all duration-300 scale-100"
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
        const { ref, isInView } = useInView(); 
        
        useEffect(() => {
            if (!isInView) return;

            let i = 0;
            const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
            }, 40); 
            
            return () => clearInterval(typingInterval);
        }, [isInView]);

        return (
            <div ref={ref} className="relative h-[450px] w-full hidden lg:block perspective-1000" dir="rtl">
            {/* Floating Elements (CSS Animation) */}
            <div 
                className="absolute top-10 -right-8 z-20 bg-white p-3 rounded-2xl shadow-xl border border-white/40 backdrop-blur-md animate-float"
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
                className={cn(
                "relative w-full h-full bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-[0_20px_60px_-15px_rgba(37,99,235,0.2)] overflow-hidden flex flex-col transition-all duration-1000",
                isInView ? "opacity-100 translate-y-0 rotate-x-0" : "opacity-0 translate-y-10 rotate-x-6"
                )}
            >
                {/* Glass Header */}
                <div className="h-16 border-b border-white/10 bg-white/10 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    {/* Updated Logo: AI Star with Modern Gradient (Purple to Blue) */}
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363 1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-400/20 blur-[80px] rounded-full pointer-events-none" />

                {/* User Message */}
                <div 
                    className={cn(
                        "flex justify-start transition-all duration-700 delay-500",
                        isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                    )}
                >
                    <div className="bg-white/60 backdrop-blur-md text-slate-700 px-5 py-3 rounded-2xl rounded-br-none shadow-sm border border-white/40 max-w-[80%]">
                    <p className="text-sm font-medium">ما هي التوصية الحالية لرفع الكفاءة؟</p>
                    </div>
                </div>

                {/* Bot Message */}
                <div className="flex justify-end w-full">
                    <div className="flex gap-3 max-w-[90%] flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs">
                        🤖
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-4 rounded-2xl rounded-bl-none shadow-lg shadow-purple-500/20">
                        <p className="text-sm leading-relaxed min-h-[40px]">
                        {typedText}
                        <span className="animate-pulse inline-block w-1.5 h-4 bg-purple-300 align-middle mr-1" />
                        </p>
                        {/* Mini Chart Mockup inside chat */}
                        <div 
                        className={cn(
                            "mt-4 bg-white/10 rounded-lg p-3 border border-white/10 transition-all duration-700 delay-1000 overflow-hidden",
                            typedText.length > 50 ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                        )}
                        >
                        <div className="flex items-end gap-2 h-16 pb-1">
                            <div className="w-full bg-white/20 rounded-t h-[40%]" />
                            <div className="w-full bg-white/40 rounded-t h-[60%]" />
                            <div className="w-full bg-white/80 rounded-t h-[85%]" />
                            <div className="w-full bg-purple-300 rounded-t h-[50%]" />
                        </div>
                        <div className="text-[10px] text-purple-100 mt-1 text-center">تحليل الفجوات المتوقع</div>
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
        const [venueIndex, setVenueIndex] = useState(0);

        useEffect(() => {
            const timer = setInterval(() => {
            setVenueIndex((prev) => (prev + 1) % VENUES.length);
            }, 2500);
            return () => clearInterval(timer);
        }, []);

        return (
            <section className="relative pt-40 pb-20 min-h-[90vh] flex flex-col justify-center overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[100px] animate-spin-slow" />
                <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] animate-reverse-spin-slow" />
            </div>

            <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
                
                {/* Content Side */}
                <div className="space-y-8 text-center lg:text-start">
                <FadeInUp delay={0}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700 mx-auto lg:mx-0 shadow-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span>01 – 05 فبراير، 2026</span>
                    </div>
                </FadeInUp>

                <FadeInUp delay={100}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight space-y-2 md:space-y-4">
                        <span className="block text-slate-900">تحديد الاحتياجات التدريبية</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
                        باستخدام الذكاء الاصطناعي
                        </span>
                        <span className="block text-slate-900">AI Assessment Center</span>
                    </h1>
                </FadeInUp>

                {/* Data Theme Quotation */}
                <FadeInUp delay={150}>
                    <div className="relative py-5 px-6 border-r-4 border-purple-600 bg-slate-50/90 backdrop-blur-md rounded-l-xl max-w-3xl mx-auto text-center mt-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="text-xs md:text-sm text-slate-800 leading-loose font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            <span className="text-purple-700 block mb-3 text-sm md:text-base opacity-100 tracking-wide">
                                ⚠️ تنبيه استراتيجي: التحوّل نحو التقييم الذكي لم يعد خيارًا
                            </span>
                            'كل مؤسسة ناجحة اليوم تسابق الزمن لتحويل بيانات موظفيها من أرقام صامتة إلى خطط تطوير شاملة تعمل بالذكاء الاصطناعي. الفجوة تتسع كل ثانية. إما أن تقفز الآن إلى عصر التقييم الذكي، أو تستعد لمشاهدة مؤسستك تتآكل ببطء أمام من تحركوا قبلك.'
                        </div>
                    </div>
                </FadeInUp>

                <FadeInUp delay={200}>
                    <div className="flex flex-col items-center gap-4 text-sm md:text-base text-slate-600 mt-8 w-full">
                        <div className="flex items-center justify-center gap-4">
                        <span className="font-bold text-slate-400">يقام في:</span>
                        <div className="relative h-10 w-32 overflow-hidden">
                            {VENUES.map((venue, idx) => (
                                <div
                                    key={venue}
                                    className={cn(
                                        "absolute inset-0 flex items-center justify-center gap-2 bg-white px-2 py-2 rounded-lg border border-slate-200 shadow-sm text-purple-700 font-bold transition-all duration-500",
                                        idx === venueIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    )}
                                >
                                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                    <span>{venue}</span>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </FadeInUp>

                <FadeInUp delay={300}>
                    <p className="text-sm text-red-500 font-medium">
                        * المقاعد محدودة جداً لضمان جودة التطبيق العملي
                    </p>
                </FadeInUp>
                </div>

                {/* Visual Side (Chat Mock) */}
                <RefeAIWidget />
            </div>
            </section>
        );
        }

        function StatCardCompact({ title, value, trend, trendColor = "text-emerald-600", icon }) {
        return (
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:border-purple-200 transition-colors">
            <div className="flex justify-between items-start mb-1">
                <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wide">{title}</span>
                <span className="text-sm opacity-50 grayscale">{icon}</span>
            </div>
            <div className="flex items-end justify-between">
                <div className="text-lg font-bold text-slate-800 font-mono leading-none">{value}</div>
                <span className={`text-[10px] font-bold ${trendColor} bg-slate-50 px-1 rounded`}>{trend}</span>
            </div>
            </div>
        )
        }

        function ChartBarCompact({ label, current, target }) {
            const { ref, isInView } = useInView();
        return (
            <div ref={ref} className="flex items-center gap-3">
            <span className="w-28 text-[10px] font-bold text-slate-600 truncate text-left pl-2">{label}</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                {/* Target Background */}
                <div 
                className={cn(
                    "absolute top-0 right-0 h-full bg-purple-100 rounded-full transition-all duration-1000 ease-out",
                    isInView ? "w-[var(--target-w)]" : "w-0"
                )}
                style={{ "--target-w": `${target}%` }}
                />
                {/* Current Value */}
                <div 
                className={cn(
                    "absolute top-0 right-0 h-full bg-purple-600 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.4)] transition-all duration-1000 ease-out delay-200",
                    isInView ? "w-[var(--current-w)]" : "w-0"
                )}
                style={{ "--current-w": `${current}%` }}
                />
            </div>
            <div className="w-8 text-right">
                <span className="text-[10px] font-mono font-bold text-slate-700">{current}%</span>
            </div>
            </div>
        )
        }

        function RecItemCompact({ title, priority }) {
        const colors = {
            "عالية": "text-red-600 bg-red-50 border-red-100",
            "متوسطة": "text-amber-600 bg-amber-50 border-amber-100",
            "منخفضة": "text-emerald-600 bg-emerald-50 border-emerald-100"
        }
        return (
            <div className="flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white transition-colors cursor-default">
            <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                <span className="text-[10px] font-bold text-slate-700 truncate">{title}</span>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded border ${colors[priority]}`}>
                {priority}
            </span>
            </div>
        )
        }

        function DashboardDemo() {
        return (
            <section className="py-16 bg-slate-50 relative z-20">
            <div className="max-w-5xl mx-auto px-4">
                
                {/* New Title */}
                <FadeInUp>
                    <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                        هكذا يُدار التدريب بالبيانات، لا بالحدس
                    </h2>
                    <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full" />
                    </div>
                </FadeInUp>

                {/* Dashboard Container - Made Compact & Dense */}
                <FadeInUp delay={100} className="w-full">
                    <div className="bg-white rounded-xl shadow-2xl shadow-purple-900/5 border border-slate-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <span className="mr-3 text-xs font-bold text-slate-700 tracking-wider">TNA-OS v4.1 PRO</span>
                        </div>
                        <div className="flex gap-4 text-[10px] font-mono text-slate-400">
                        <span className="hidden sm:inline">DATA_STREAM: ACTIVE</span>
                        <span className="text-emerald-600 font-bold">● CONNECTED</span>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="p-4 bg-slate-100/50">
                        {/* Stats Row - 4 Cols for density */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <StatCardCompact title="الموظفون" value="1,240" trend="+12%" icon="👥" />
                        <StatCardCompact title="الفجوات الحرجة" value="18%" trend="-5%" trendColor="text-red-500" icon="⚡" />
                        <StatCardCompact title="وفر الميزانية" value="$42.5k" trend="+8%" trendColor="text-emerald-600" icon="💰" />
                        <StatCardCompact title="ساعات التعلم" value="3,200h" trend="+15%" icon="⏱️" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Main Chart Area - 2 Cols - Dense Layout */}
                        <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                            <div className="flex justify-between items-center mb-5">
                            <h3 className="font-bold text-slate-800 text-xs flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-purple-600 rounded-full"/>
                                تحليل الفجوات (Live Data)
                            </h3>
                            <div className="flex gap-3">
                                <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium"><span className="w-2 h-2 rounded-sm bg-purple-100"></span>مستهدف</span>
                                <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium"><span className="w-2 h-2 rounded-sm bg-purple-600"></span>حالي</span>
                            </div>
                            </div>
                            {/* Compact Bars */}
                            <div className="space-y-4 flex-1 justify-center flex flex-col">
                            <ChartBarCompact label="المبيعات والتسويق" current={65} target={85} />
                            <ChartBarCompact label="تكنولوجيا المعلومات" current={75} target={90} />
                            <ChartBarCompact label="الموارد البشرية" current={80} target={85} />
                            <ChartBarCompact label="العمليات والتشغيل" current={60} target={88} />
                            <ChartBarCompact label="القيادة والإدارة" current={72} target={92} />
                            </div>
                        </div>

                        {/* Right Col: Recs + AI Insight */}
                        <div className="space-y-3 flex flex-col">
                            {/* Recs */}
                            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex-1">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-slate-800 text-xs">توصيات النظام</h3>
                                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">Auto</span>
                            </div>
                            <div className="space-y-2">
                                <RecItemCompact title="علم البيانات للقادة" priority="عالية" />
                                <RecItemCompact title="إدارة التغيير الرقمي" priority="متوسطة" />
                                <RecItemCompact title="تحليل الأعمال" priority="عالية" />
                                <RecItemCompact title="الذكاء العاطفي" priority="منخفضة" />
                            </div>
                            </div>

                            {/* Extra Dense Info Box - AI Insight */}
                            <div className="bg-gradient-to-br from-purple-900 to-slate-900 p-3 rounded-xl border border-slate-700 shadow-md text-white relative overflow-hidden group">
                            <div className="absolute -right-2 -top-2 text-6xl opacity-5 group-hover:opacity-10 transition-opacity">🤖</div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">AI INSIGHT</span>
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                </div>
                                <p className="text-[11px] font-light leading-relaxed text-slate-300">
                                توجيه <span className="text-white font-bold">15%</span> من الميزانية للتدريب التقني سيرفع العائد بنسبة <span className="text-white font-bold">22%</span>.
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </FadeInUp>
            </div>
            </section>
        )
        }

        function Countdown() {
        const TARGET_DATE = new Date("2026-02-01T09:00:00");
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
            <section className="py-12 border-y border-slate-200 bg-white">
            <FadeInUp>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-red-600 mb-8 text-lg md:text-xl font-bold animate-pulse leading-relaxed">
                    الوقت يمضي… والقرارات التدريبية الخاطئة تُتخذ يومياً
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8" dir="ltr">
                    <TimeBlock value={timeLeft.days} label="Days" />
                    <div className="text-4xl font-thin text-slate-300 self-center hidden md:block pt-4">:</div>
                    <TimeBlock value={timeLeft.hours} label="Hours" />
                    <div className="text-4xl font-thin text-slate-300 self-center hidden md:block pt-4">:</div>
                    <TimeBlock value={timeLeft.minutes} label="Minutes" />
                    <div className="text-4xl font-thin text-slate-300 self-center hidden md:block pt-4">:</div>
                    <TimeBlock value={timeLeft.seconds} label="Seconds" />
                    </div>
                </div>
            </FadeInUp>
            </section>
        );
        }

        function TimeBlock({ value, label }) {
        const { ref, isInView } = useInView();
        return (
            <div ref={ref} className="flex flex-col items-center group">
            <div 
                className={cn(
                "w-20 h-24 md:w-24 md:h-28 rounded-lg bg-slate-900 border border-purple-500/30 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.15)] transition-all duration-700 relative overflow-hidden",
                isInView ? "opacity-100 translate-y-0" : "opacity-50 translate-y-5"
                )}
            >
                {/* Tech decorative line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                
                {/* Value */}
                <div className="text-3xl md:text-5xl font-mono font-bold text-purple-400 tabular-nums tracking-tighter" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {String(value).padStart(2, "0")}
                </div>
                
                {/* Label */}
                <div className="text-[9px] md:text-[10px] text-purple-500/60 mt-2 uppercase tracking-widest font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {label}
                </div>

                {/* Scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />
            </div>
            </div>
        );
        }

        function ImagineSection() {
        const [index, setIndex] = useState(0);
        const { ref, isInView } = useInView();

        useEffect(() => {
            const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % IMAGINE_CARDS.length);
            }, 3000); // Change card every 3 seconds
            return () => clearInterval(timer);
        }, []);

        return (
            <section className="py-24 relative overflow-hidden bg-slate-50">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-200/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <FadeInUp>
                    <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        تخيل نظام تقييم ذكي داخل مؤسستك…
                    </h2>
                    <div className="w-16 h-1 bg-purple-600 mx-auto rounded-full" />
                    </div>
                </FadeInUp>

                {/* Carousel Container */}
                <div 
                ref={ref}
                className={cn(
                    "h-[300px] flex items-center justify-center relative transition-all duration-1000",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                >
                    {/* Using a simple key-based render for transition effect */}
                    {IMAGINE_CARDS.map((card, i) => (
                        <div
                            key={i}
                            className={cn(
                                "absolute top-0 w-full max-w-lg mx-auto bg-white border border-slate-200 p-10 rounded-3xl shadow-xl flex flex-col items-center gap-6 transition-all duration-500",
                                i === index ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
                            )}
                        >
                            <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center mb-2 shadow-lg", card.bg, card.color)}>
                                {card.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">{card.text}</h3>
                            
                            {/* Progress Indicators */}
                            <div className="flex gap-2 mt-4">
                                {IMAGINE_CARDS.map((_, dotIdx) => (
                                <div 
                                    key={dotIdx} 
                                    className={cn(
                                    "w-2 h-2 rounded-full transition-colors duration-300", 
                                    dotIdx === index ? "bg-purple-600" : "bg-slate-200"
                                    )} 
                                />
                                ))}
                            </div>
                        </div>
                    ))}
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
            }, 4000); // Slower cycle for reading
            return () => clearInterval(timer);
        }, []);

        return (
            <section className="py-24 bg-slate-900 overflow-hidden relative">
            {/* Background Masks for fade effect at edges */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* --- NEW: Floating Tech Icons & Animations --- */}
            
            {/* Binary Code Floating */}
            <div className="absolute top-10 left-10 text-purple-500/5 text-6xl font-mono font-bold animate-float pointer-events-none select-none" style={{ fontFamily: "'JetBrains Mono', monospace" }}>01</div>
            <div className="absolute bottom-20 right-10 text-blue-500/5 text-8xl font-mono font-bold animate-float-delayed pointer-events-none select-none" style={{ fontFamily: "'JetBrains Mono', monospace" }}>10</div>
            <div className="absolute top-1/3 right-1/4 text-purple-500/5 text-4xl font-mono font-bold animate-float pointer-events-none select-none" style={{ animationDuration: '8s' }}>1</div>

            {/* Rotating Network Icon */}
            <div className="absolute top-[-50px] right-[-50px] text-purple-600/5 animate-spin-slow pointer-events-none">
                <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
            </div>

            {/* Floating Circuit/Data Icon */}
            <div className="absolute bottom-10 left-20 text-blue-500/5 animate-float-delayed pointer-events-none">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            </div>

            <FadeInUp>
                <div className="max-w-4xl mx-auto px-4 mb-12 text-center relative z-20">
                    <h2 className="text-3xl font-bold text-white mb-6">حقيقة التحول الرقمي</h2>
                    <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full" />
                </div>
            </FadeInUp>

            {/* Single Loop Container */}
            <div className="h-[200px] flex items-center justify-center relative z-20">
                {QUOTES.map((quote, i) => (
                    <div
                        key={i}
                        className={cn(
                            "absolute w-full max-w-2xl px-8 text-center transition-all duration-700",
                            i === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                        )}
                    >
                        <span className="text-6xl text-purple-500/20 font-serif block mb-6">"</span>
                        <p className="text-2xl md:text-3xl font-medium text-slate-100 leading-relaxed">
                            {quote}
                        </p>
                    </div>
                ))}
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8 relative z-20">
                {QUOTES.map((_, i) => (
                <button 
                    key={i}
                    onClick={() => setIndex(i)}
                    className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    i === index ? "bg-purple-500 w-4" : "bg-slate-700 hover:bg-slate-500"
                    )}
                />
                ))}
            </div>
            </section>
        );
        }

        function Outputs() {
            return (
                <section className="py-24 bg-white relative">
                    <div className="max-w-5xl mx-auto px-4">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <FadeInUp>
                                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
                                    نتائج <span className="text-purple-600">فورية</span> ستخرج بها
                                </h2>
                                <div className="w-20 h-1 bg-purple-600 mx-auto rounded-full" />
                            </FadeInUp>
                        </div>

                        {/* Special Focused Presentation Card */}
                        <FadeInUp delay={200}>
                            <div className="relative w-full">
                                <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-purple-900/20 relative overflow-hidden group border border-purple-500/30 transition-transform duration-500 hover:scale-[1.01]">
                                    {/* Tech Background Effect */}
                                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500" />
                                    
                                    {/* Glowing Icon */}
                                    <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-purple-500/50 group-hover:scale-110 transition-transform duration-700 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
                                        <svg className="w-10 h-10 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>

                                    <h3 className="text-2xl md:text-4xl font-bold leading-relaxed relative z-10 font-tajawal">
                                        "بعد هذه الرحلة، لا يعود التدريب كما كان… <br className="hidden md:block" />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-white block mt-4 mb-2">بل يصبح أداة استراتيجية</span> 
                                        <span className="text-lg md:text-2xl font-light text-purple-100/90 block">تبني بها مؤسستك ميزة تنافسية مستدامة."</span>
                                    </h3>
                                    
                                    {/* Decorative elements */}
                                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
                                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
                                </div>
                            </div>
                        </FadeInUp>
                    </div>
                </section>
            );
        }

        function AudienceChips() {
        const [selectedId, setSelectedId] = useState(AUDIENCE_LIST[0].id);
        const selectedAudience = AUDIENCE_LIST.find((a) => a.id === selectedId);

        return (
            <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <FadeInUp>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-slate-900 tracking-tight leading-tight">
                        هل تقود؟ <span className="text-purple-600 inline-block transform hover:scale-110 transition-transform cursor-default">تطوّر؟</span> تُدرب؟
                        <span className="block mt-3 text-xl md:text-2xl font-medium text-slate-500">هذا النظام يفهمك</span>
                    </h2>
                </FadeInUp>

                {/* Chips */}
                <FadeInUp delay={100}>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {AUDIENCE_LIST.map((item) => (
                        <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={cn(
                            "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border",
                            selectedId === item.id
                            ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-200 scale-105"
                            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        )}
                        >
                        {item.label}
                        </button>
                    ))}
                    </div>
                </FadeInUp>

                {/* Dynamic Content */}
                <div className="min-h-[100px] flex items-center justify-center">
                    {AUDIENCE_LIST.map(item => (
                        <div
                            key={item.id}
                            className={cn(
                                "text-xl md:text-2xl text-slate-700 font-light max-w-2xl leading-relaxed transition-all duration-500 absolute",
                                selectedId === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                            )}
                        >
                            "{item.desc}"
                        </div>
                    ))}
                </div>
            </div>
            </section>
        );
        }

        function Item({ text, delay }) {
            return (
                <FadeInUp delay={delay}>
                    <div className="flex flex-col items-center gap-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent opacity-50" />
                    <p className="text-lg font-medium text-slate-700">{text}</p>
                    </div>
                </FadeInUp>
            )
        }

        function WhyNow() {
            const items = [
                {
                    title: "الميزانيات لم تعد تتسامح مع التخمين",
                    desc: "كل ريال يجب أن يُبرَّر… ودليل النجاح أصبح رقميًّا، لا شعوريًّا.",
                    icon: (
                        <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ),
                    colorClass: "hover:border-purple-500/30 hover:shadow-purple-900/20"
                },
                {
                    title: "الذكاء الاصطناعي تجاوز التقييم اليدوي",
                    desc: "لم يعد هناك وقت لتأخير القرار—النظام يقيّم ويقترح فورًا.",
                    icon: (
                        <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    ),
                    colorClass: "hover:border-blue-500/30 hover:shadow-blue-900/20"
                },
                {
                    title: "الموظفون لم يعودوا يقبلون التعميم",
                    desc: "يتوقعون خططًا مخصصة، تلامس احتياجاتهم، وتُشعرهم بالتقدير الحقيقي.",
                    icon: (
                        <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    ),
                    colorClass: "hover:border-indigo-500/30 hover:shadow-indigo-900/20"
                }
            ];

            return (
                <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-950 to-blue-950 relative overflow-hidden">
                    {/* Sharp Dark Background Effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-800 via-transparent to-transparent opacity-40" />
                    <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700 to-transparent" />
                    <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-purple-700 to-transparent" />

                    <div className="max-w-6xl mx-auto px-4 relative z-10">
                        <FadeInUp>
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
                                    لماذا الآن؟ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">التدريب القديم انتهى.</span>
                                </h2>
                                <div className="w-16 h-1 bg-purple-700 mx-auto" />
                            </div>
                        </FadeInUp>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            {items.map((item, idx) => (
                                <FadeInUp key={idx} delay={idx * 100}>
                                    <div className={cn(
                                        "h-full bg-slate-800/30 border border-slate-700/50 p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group backdrop-blur-sm",
                                        item.colorClass
                                    )}>
                                        <div className="w-14 h-14 bg-slate-900 rounded-lg flex items-center justify-center mb-6 shadow-lg border border-slate-700/50 group-hover:border-purple-600/50 transition-colors">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-100 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300">
                                            {item.desc}
                                        </p>
                                    </div>
                                </FadeInUp>
                            ))}
                        </div>
                    </div>
                </section>
            );
        }

        function TrainersCarousel() {
        const [activeIndex, setActiveIndex] = useState(0);
        const [isDetailOpen, setIsDetailOpen] = useState(false);

        // Auto-rotate logic
        useEffect(() => {
            const timer = setInterval(() => {
            // Pause rotation if user is viewing details
            if (!isDetailOpen) {
                setActiveIndex((prev) => (prev + 1) % TRAINERS.length);
            }
            }, 4000); // 4 seconds

            return () => clearInterval(timer);
        }, [isDetailOpen]);

        const nextTrainer = () => {
            setActiveIndex((prev) => (prev + 1) % TRAINERS.length);
            setIsDetailOpen(false); // Reset detail view on change
        };

        const prevTrainer = () => {
            setActiveIndex((prev) => (prev - 1 + TRAINERS.length) % TRAINERS.length);
            setIsDetailOpen(false);
        };

        const activeTrainer = TRAINERS[activeIndex];

        return (
            <section className="py-24 bg-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-100 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50 rounded-full blur-[60px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <FadeInUp>
                    <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        مدربونا ليسوا متحدثين؛ بل هم مهندسوا التحول
                    </h2>
                    <p className="text-slate-500 max-w-3xl mx-auto leading-relaxed text-lg">
                        من الذكاء الاصطناعي إلى تحليل البيانات الضخمة، ومن استراتيجيات الأداء إلى مراكز التقييم المتقدمة.
                    </p>
                    </div>
                </FadeInUp>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Side 1: The Carousel (Right side in RTL) */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center gap-4 w-full">
                            {/* Nav Prev */}
                            <button 
                                onClick={prevTrainer}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all flex-shrink-0 z-20 shadow-sm"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>

                            {/* Card Area */}
                            <div className="relative w-full max-w-sm h-[480px]">
                                {TRAINERS.map((trainer, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl cursor-pointer group bg-slate-200 transition-all duration-500",
                                            idx === activeIndex ? "opacity-100 translate-x-0 z-10 scale-100" : "opacity-0 translate-x-10 z-0 scale-95 pointer-events-none"
                                        )}
                                        onClick={() => setIsDetailOpen(true)}
                                    >
                                        {/* Image */}
                                        <div className="absolute inset-0">
                                        <img 
                                            src={trainer.image} 
                                            alt={trainer.name}
                                            className="w-full h-full object-cover object-top"
                                            onError={(e) => {
                                            // Fallback if image fails
                                            e.target.src = "https://placehold.co/600x800?text=Trainer+Image";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                                        </div>

                                        {/* Text Overlay (Default) */}
                                        <div 
                                            className={cn(
                                                "absolute bottom-0 left-0 right-0 p-6 text-white z-10 transition-all duration-300",
                                                isDetailOpen ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                                            )}
                                        >
                                        <h3 className="text-2xl font-bold mb-1">{trainer.name}</h3>
                                        <p className="text-white/80 font-medium text-sm border-l-4 border-blue-500 pl-3">
                                            {trainer.title}
                                        </p>
                                        </div>

                                        {/* Full Detail Overlay (On Click) */}
                                        <div 
                                            className={cn(
                                                "absolute inset-0 bg-slate-900/95 backdrop-blur-md p-6 flex flex-col justify-center text-center z-20 transition-all duration-300",
                                                isDetailOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                                            )}
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                setIsDetailOpen(false);
                                            }}
                                        >
                                        <div className="w-16 h-16 mx-auto rounded-full border-2 border-blue-500 overflow-hidden mb-4 shadow-lg shadow-blue-500/20">
                                            <img src={trainer.image} className="w-full h-full object-cover" />
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-white mb-3">{trainer.name}</h3>
                                        
                                        <div className="space-y-4 overflow-y-auto max-h-[60%] custom-scrollbar">
                                            <div>
                                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">النبذة المختصرة</p>
                                            <p className="text-xs text-slate-300 leading-relaxed">
                                                {trainer.role}
                                            </p>
                                            </div>
                                            
                                            <div>
                                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">التركيز في الورشة</p>
                                            <p className="text-sm text-white font-medium">
                                                {trainer.focus}
                                            </p>
                                            </div>
                                        </div>

                                        <button className="mt-auto text-xs text-blue-300 hover:text-white transition-colors flex items-center justify-center gap-2 pt-4">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            إغلاق
                                        </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Nav Next */}
                            <button 
                                onClick={nextTrainer}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all flex-shrink-0 z-20 shadow-sm"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                        
                        {/* Indicators */}
                        <div className="flex justify-center gap-2 mt-6">
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

                    {/* Side 2: New Content (Left side in RTL) */}
                    <div className="hidden lg:block relative">
                        <FadeInUp delay={200}>
                            <div className="relative bg-slate-900 rounded-[2rem] p-8 border border-slate-800 overflow-hidden group">
                                {/* Ambient Glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/30 transition-colors duration-1000" />
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">مصفوفة الكفاءات المتكاملة</h3>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-slate-400 text-sm mb-3 font-mono">CORE_EXPERTISE_MODULES:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {["تحليل الفجوات الرقمية", "هندسة التدريب", "علم النفس المؤسسي", "تطبيقات AI"].map((tag, i) => (
                                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs hover:border-blue-500/50 hover:text-blue-300 transition-colors cursor-default">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 relative">
                                            <div className="absolute top-4 left-4 text-blue-500/20 text-4xl font-serif">"</div>
                                            <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                                                ما يميز هذا البرنامج هو التزامن الدقيق بين <span className="text-blue-400 font-bold">الرؤية التقنية</span> للذكاء الاصطناعي و <span className="text-blue-400 font-bold">البعد الإنساني</span> لتطوير المواهب.
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                            <div className="text-xs text-slate-500">معدل رضا المشاركين</div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl font-bold text-white font-mono">4.9/5.0</span>
                                                <div className="flex text-yellow-500 text-xs">★★★★★</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInUp>
                    </div>

                </div>
            </div>
            </section>
        );
        }

        function FinalCTA() {
        const [isModalOpen, setIsModalOpen] = useState(false);

        return (
            <React.Fragment>
            <section className="py-32 relative overflow-hidden text-center bg-slate-50">
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/40 blur-[120px] rounded-full pointer-events-none" />

                <FadeInUp>
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 text-slate-900 leading-tight">
                        هل تكون أنت من يكتب الفصل التالي في قصة مؤسسته؟
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full shadow-lg shadow-purple-200 transition-all hover:scale-105 active:scale-95"
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
                </FadeInUp>
            </section>

            {/* Sticky Bottom Bar for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-slate-200 z-40 md:hidden">
                <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg"
                >
                احجز مقعدك الآن
                </button>
            </div>

            {/* Reused Modal Logic */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" dir="rtl">
                <div
                    onClick={() => setIsModalOpen(false)}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
                />
                <div
                    className="relative w-full max-w-md p-8 bg-white rounded-2xl text-center border border-slate-200 shadow-2xl scale-100 transition-all duration-300"
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

        function WhatsAppButton() {
            return (
                <a
                    href="https://wa.me/905337642450"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-24 md:bottom-6 left-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
                    aria-label="تواصل معنا عبر واتساب"
                >
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                </a>
            )
        }

        function Footer() {
        return (
            <footer className="py-8 border-t border-slate-200 text-center text-sm text-slate-500 pb-24 md:pb-8 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Updated Footer Logo Text to Gradient */}
                <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                    Reference Academy
                </div>
                <div className="flex flex-col items-center md:items-end">
                    <div dir="ltr" className="font-medium text-slate-700">info@reference-rcb.com</div>
                    <div dir="ltr" className="text-slate-500">+90 533 764 24 50</div>
                </div>
                <div>جميع الحقوق محفوظة © 2026</div>
            </div>
            </footer>
        );
        }

        function App() {
            return (
                <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden w-full font-tajawal" dir="rtl">
                    <Navbar />
                    <Hero />
                    <ImagineSection />
                    <DashboardDemo />
                    <WhyNow />
                    <TrainersCarousel />
                    <StickyQuotes />
                    <AudienceChips />
                    <Outputs />
                    <Countdown />
                    <FinalCTA />
                    <Footer />
                    <WhatsAppButton />
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
