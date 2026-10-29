// GAPMAP — rule-based learning diagnostic
// Languages: English, Telugu and Hindi
// No external API required.

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const concepts = [{
        id: "fractions",
        icon: "½",
        names: {
            en: "Fractions",
            te: "భిన్నాలు",
            hi: "भिन्न"
        },
        detail: {
            en: "Parts of a whole",
            te: "మొత్తంలోని భాగాలు",
            hi: "पूरे के भाग"
        }
    },
    {
        id: "integers",
        icon: "±",
        names: {
            en: "Integer operations",
            te: "పూర్ణాంకాల క్రియలు",
            hi: "पूर्णांक संक्रियाएँ"
        },
        detail: {
            en: "Positive and negative numbers",
            te: "ధన, ఋణ సంఖ్యలు",
            hi: "धनात्मक और ऋणात्मक संख्याएँ"
        }
    },
    {
        id: "expressions",
        icon: "x",
        names: {
            en: "Algebraic expressions",
            te: "బీజగణిత వ్యక్తీకరణలు",
            hi: "बीजीय व्यंजक"
        },
        detail: {
            en: "Combine like terms",
            te: "సమాన పదాలను కలపడం",
            hi: "समान पदों को जोड़ना"
        }
    },
    {
        id: "linear",
        icon: "=",
        names: {
            en: "Linear equations",
            te: "సరళ సమీకరణాలు",
            hi: "रैखिक समीकरण"
        },
        detail: {
            en: "Solve for the unknown",
            te: "తెలియని విలువను కనుగొనడం",
            hi: "अज्ञात मान ज्ञात करना"
        }
    }
];

const questions = [{
        id: "q1",
        concept: "fractions",
        prompt: {
            en: "What is 1/2 + 1/3?",
            te: "1/2 + 1/3 విలువ ఎంత?",
            hi: "1/2 + 1/3 का मान क्या है?"
        },
        hint: {
            en: "Choose the sum of these two fractions.",
            te: "ఈ రెండు భిన్నాల మొత్తాన్ని ఎంచుకోండి.",
            hi: "इन दोनों भिन्नों का योग चुनें।"
        },
        options: ["2/5", "5/6", "1/6", "2/6"],
        correct: 1,
        misconception: {
            en: "You added the numerators and denominators separately. Make the denominators equal first.",
            te: "మీరు లవాలను, హారాలను విడిగా కలిపారు. ముందుగా హారాలను సమానం చేయండి.",
            hi: "आपने अंश और हर अलग-अलग जोड़ दिए। पहले हरों को समान करें।"
        }
    },
    {
        id: "q2",
        concept: "fractions",
        prompt: {
            en: "What is 3/4 − 1/4?",
            te: "3/4 − 1/4 విలువ ఎంత?",
            hi: "3/4 − 1/4 का मान क्या है?"
        },
        hint: {
            en: "The denominators are already the same.",
            te: "హారాలు ఇప్పటికే సమానంగా ఉన్నాయి.",
            hi: "हर पहले से समान हैं।"
        },
        options: ["2/0", "1/4", "1/2", "2/8"],
        correct: 2,
        misconception: {
            en: "Keep the common denominator and subtract only the numerators.",
            te: "సామాన్య హారాన్ని అలాగే ఉంచి లవాలను మాత్రమే తీసివేయండి.",
            hi: "समान हर बनाए रखें और केवल अंश घटाएँ।"
        }
    },
    {
        id: "q3",
        concept: "integers",
        prompt: {
            en: "What is −3 + 7?",
            te: "−3 + 7 విలువ ఎంత?",
            hi: "−3 + 7 का मान क्या है?"
        },
        hint: {
            en: "The signs differ, so compare their sizes.",
            te: "గుర్తులు వేర్వేరుగా ఉన్నాయి; వాటి పరిమాణాలను పోల్చండి.",
            hi: "चिह्न अलग हैं, इसलिए उनके परिमाण की तुलना करें।"
        },
        options: ["−10", "10", "4", "−4"],
        correct: 2,
        misconception: {
            en: "Subtract the smaller absolute value from the larger one. The larger number is positive.",
            te: "చిన్న పరిమాణాన్ని పెద్దదాని నుంచి తీసివేసి, పెద్ద సంఖ్య గుర్తును ఉంచండి.",
            hi: "छोटे परिमाण को बड़े से घटाएँ और बड़े परिमाण का चिह्न रखें।"
        }
    },
    {
        id: "q4",
        concept: "expressions",
        prompt: {
            en: "Simplify: 3x + 2x − 4",
            te: "సరళీకరించండి: 3x + 2x − 4",
            hi: "सरल करें: 3x + 2x − 4"
        },
        hint: {
            en: "Combine terms with the same variable.",
            te: "ఒకే చరరాశి ఉన్న పదాలను కలపండి.",
            hi: "एक ही चर वाले पदों को जोड़ें।"
        },
        options: ["5x − 4", "x", "6x² − 4", "5x² − 4"],
        correct: 0,
        misconception: {
            en: "Add the coefficients of like x-terms. Addition does not change the power.",
            te: "సమాన x పదాల గుణాంకాలను కలపండి. కూడికతో ఘాతం మారదు.",
            hi: "समान x पदों के गुणांक जोड़ें। जोड़ने से घात नहीं बदलती।"
        }
    },
    {
        id: "q5",
        concept: "linear",
        prompt: {
            en: "Solve: 2x + 3 = 11",
            te: "పరిష్కరించండి: 2x + 3 = 11",
            hi: "हल करें: 2x + 3 = 11"
        },
        hint: {
            en: "Undo addition first, then undo multiplication.",
            te: "ముందుగా కూడికను, తర్వాత గుణకారాన్ని రద్దు చేయండి.",
            hi: "पहले जोड़ हटाएँ, फिर गुणा हटाएँ।"
        },
        options: ["x = 7", "x = 4", "x = 8", "x = 5.5"],
        correct: 1,
        misconception: {
            en: "Subtract 3 from both sides first, then divide both sides by 2.",
            te: "ముందుగా రెండు వైపుల నుంచి 3 తీసివేసి, తర్వాత 2తో భాగించండి.",
            hi: "पहले दोनों तरफ़ से 3 घटाएँ, फिर दोनों तरफ़ 2 से भाग दें।"
        }
    }
];

const lessons = {
    fractions: {
        title: {
            en: "Adding fractions with different denominators",
            te: "వేర్వేరు హారాలున్న భిన్నాలను కూడడం",
            hi: "अलग-अलग हर वाली भिन्नों को जोड़ना"
        },
        explain: {
            en: "Make the denominators equal first. Then add only the numerators. Never add the denominators.",
            te: "ముందుగా హారాలను సమానం చేయండి. తర్వాత లవాలను మాత్రమే కలపండి. హారాలను కలపకండి.",
            hi: "पहले हर समान करें। फिर केवल अंश जोड़ें। हरों को न जोड़ें।"
        },
        steps: {
            en: [
                "1/2 + 1/3",
                "The common denominator is 6",
                "1/2 = 3/6 and 1/3 = 2/6",
                "3/6 + 2/6 = 5/6"
            ],
            te: [
                "1/2 + 1/3",
                "సామాన్య హారం 6",
                "1/2 = 3/6 మరియు 1/3 = 2/6",
                "3/6 + 2/6 = 5/6"
            ],
            hi: [
                "1/2 + 1/3",
                "समान हर 6 है",
                "1/2 = 3/6 और 1/3 = 2/6",
                "3/6 + 2/6 = 5/6"
            ]
        },
        practice: {
            prompt: {
                en: "What is 1/3 + 1/4?",
                te: "1/3 + 1/4 విలువ ఎంత?",
                hi: "1/3 + 1/4 का मान क्या है?"
            },
            options: ["2/7", "7/12", "1/12", "2/12"],
            correct: 1,
            feedback: {
                en: "Make both denominators 12: 4/12 + 3/12 = 7/12.",
                te: "రెండు హారాలను 12గా మార్చండి: 4/12 + 3/12 = 7/12.",
                hi: "दोनों हर 12 करें: 4/12 + 3/12 = 7/12."
            }
        }
    },

    integers: {
        title: {
            en: "Adding positive and negative numbers",
            te: "ధన, ఋణ సంఖ్యలను కూడడం",
            hi: "धनात्मक और ऋणात्मक संख्याएँ जोड़ना"
        },
        explain: {
            en: "When signs differ, subtract the smaller absolute value from the larger one. Keep the sign of the number with the larger absolute value.",
            te: "గుర్తులు వేర్వేరుగా ఉంటే చిన్న పరిమాణాన్ని పెద్దదాని నుంచి తీసివేయండి. పెద్ద పరిమాణం ఉన్న సంఖ్య గుర్తును ఉంచండి.",
            hi: "चिह्न अलग हों तो छोटे परिमाण को बड़े से घटाएँ। बड़े परिमाण वाली संख्या का चिह्न रखें।"
        },
        steps: {
            en: ["−3 + 7", "Compare 7 and 3", "7 − 3 = 4", "The answer is +4"],
            te: ["−3 + 7", "7 మరియు 3ను పోల్చండి", "7 − 3 = 4", "జవాబు +4"],
            hi: ["−3 + 7", "7 और 3 की तुलना करें", "7 − 3 = 4", "उत्तर +4"]
        },
        practice: {
            prompt: {
                en: "What is −5 + 8?",
                te: "−5 + 8 విలువ ఎంత?",
                hi: "−5 + 8 का मान क्या है?"
            },
            options: ["−13", "3", "−3", "13"],
            correct: 1,
            feedback: {
                en: "8 − 5 = 3. The larger absolute value is positive.",
                te: "8 − 5 = 3. పెద్ద పరిమాణం ధనాత్మకం.",
                hi: "8 − 5 = 3। बड़ा परिमाण धनात्मक है।"
            }
        }
    },

    expressions: {
        title: {
            en: "Combining like terms",
            te: "సమాన పదాలను కలపడం",
            hi: "समान पदों को जोड़ना"
        },
        explain: {
            en: "Only terms with the same variable can be combined. Add their coefficients; the variable and power stay the same.",
            te: "ఒకే చరరాశి ఉన్న పదాలను మాత్రమే కలపాలి. గుణాంకాలను కలపండి; చరరాశి, ఘాతం మారవు.",
            hi: "केवल समान चर वाले पद जोड़ें। गुणांक जोड़ें; चर और घात समान रहते हैं।"
        },
        steps: {
            en: ["3x + 2x − 4", "3x and 2x are like terms", "3 + 2 = 5, so they become 5x", "The answer is 5x − 4"],
            te: ["3x + 2x − 4", "3x, 2x సమాన పదాలు", "3 + 2 = 5, కాబట్టి 5x", "జవాబు 5x − 4"],
            hi: ["3x + 2x − 4", "3x और 2x समान पद हैं", "3 + 2 = 5, इसलिए 5x", "उत्तर 5x − 4"]
        },
        practice: {
            prompt: {
                en: "Simplify: 4a + 3a − 2",
                te: "సరళీకరించండి: 4a + 3a − 2",
                hi: "सरल करें: 4a + 3a − 2"
            },
            options: ["5a", "7a² − 2", "7a − 2", "12a − 2"],
            correct: 2,
            feedback: {
                en: "4a + 3a = 7a. The constant −2 stays separate.",
                te: "4a + 3a = 7a. స్థిర పదం −2 విడిగా ఉంటుంది.",
                hi: "4a + 3a = 7a। स्थिर पद −2 अलग रहेगा।"
            }
        }
    },

    linear: {
        title: {
            en: "Solving linear equations",
            te: "సరళ సమీకరణాలను పరిష్కరించడం",
            hi: "रैखिक समीकरण हल करना"
        },
        explain: {
            en: "Do the opposite operation on both sides. First undo addition or subtraction, then undo multiplication or division.",
            te: "రెండు వైపులా విరుద్ధ క్రియ చేయండి. ముందుగా కూడిక లేదా తీసివేతను, తర్వాత గుణకారం లేదా భాగహారాన్ని రద్దు చేయండి.",
            hi: "दोनों तरफ उलटी संक्रिया करें। पहले जोड़ या घटाव हटाएँ, फिर गुणा या भाग।"
        },
        steps: {
            en: ["2x + 3 = 11", "Subtract 3: 2x = 8", "Divide both sides by 2", "x = 4"],
            te: ["2x + 3 = 11", "3 తీసివేస్తే: 2x = 8", "రెండు వైపులా 2తో భాగించండి", "x = 4"],
            hi: ["2x + 3 = 11", "3 घटाएँ: 2x = 8", "दोनों तरफ़ 2 से भाग दें", "x = 4"]
        },
        practice: {
            prompt: {
                en: "Solve: 3x + 2 = 14",
                te: "పరిష్కరించండి: 3x + 2 = 14",
                hi: "हल करें: 3x + 2 = 14"
            },
            options: ["x = 4", "x = 12", "x = 16/3", "x = 6"],
            correct: 0,
            feedback: {
                en: "Subtract 2 to get 3x = 12, then divide by 3. x = 4.",
                te: "2 తీసివేస్తే 3x = 12. తర్వాత 3తో భాగిస్తే x = 4.",
                hi: "2 घटाने पर 3x = 12। फिर 3 से भाग दें: x = 4।"
            }
        }
    }
};

const text = {
    en: {
        navHome: "Student dashboard",
        navDiagnose: "Diagnostic quiz",
        navTeacher: "Teacher insights",
        navAbout: "How it works",
        workspace: "Workspace",
        yourClass: "YOUR CLASS",
        mathSubject: "Mathematics",
        startDiagnostic: "Start diagnostic",
        yourProgress: "Your learning progress",
        progressSub: "Small steps create strong foundations.",
        viewDiagnostic: "Take diagnostic",
        overallMastery: "Overall mastery",
        startToMeasure: "Start a quiz to measure",
        recommendedNext: "RECOMMENDED NEXT",
        nextTitle: "Discover your learning gap",
        nextDesc: "Answer a few questions so GapMap can find which concept needs attention first.",
        beginQuiz: "Begin quiz",
        noPressure: "No grades. Just progress.",
        diagnosticLabel: "DIAGNOSTIC SESSION",
        quizTitle: "Let's find your gap.",
        quizSub: "Choose the answer you think is right. Mistakes help us understand what to teach next.",
        back: "Back",
        nextQuestion: "Next question",
        resetQuiz: "Reset quiz",
        question: "QUESTION",
        of: "OF",
        answerFirst: "Please select an answer first.",
        score: "Your score",
        likelyGap: "LIKELY LEARNING GAP",
        whyGap: "Why this may be happening",
        masteryByConcept: "Mastery by concept",
        continueLesson: "Learn this concept",
        reviewAnswers: "Review answers",
        strongStart: "Strong start!",
        noGap: "No clear gap detected",
        noGapDesc: "You answered all diagnostic questions correctly. Try another concept.",
        lessonFor: "YOUR FOCUSED LESSON",
        workedExample: "Worked example",
        practiceTitle: "Now try one yourself",
        practiceSub: "Choose an answer, then check it. You can retry as often as you need.",
        checkAnswer: "Check answer",
        correctFeedback: "Correct! Great work. Your concept mastery has improved.",
        wrongFeedback: "Not quite. Review the explanation and try again.",
        tryAgain: "Try again",
        goOriginal: "Try the original question",
        mastery: "Mastery",
        originalQuestion: "Original demo question",
        originalSub: "Solve the same equation from your diagnostic.",
        solveEquation: "Check answer",
        solvedTitle: "You solved it!",
        solvedDesc: "The learning loop is complete: diagnostic → gap → lesson → practice → original question.",
        studentsNeedHelp: "Students needing support",
        strongestConcept: "Strongest concept",
        classAverage: "Class average",
        priorityReteach: "Priority reteach",
        heatmapTitle: "Student mastery heatmap",
        heatmapSub: "Select a concept heading to sort by its mastery score.",
        student: "Student",
        masteredLegend: "75%+ Strong",
        practiceLegend: "50–74% Practice",
        gapLegend: "Below 50% Needs support",
        classInsights: "Class insights",
        demoWarning: "All student names and scores are fictional sample data.",
        startOver: "Start a fresh diagnostic",
        resetConfirm: "Reset your demo progress?",
        progressReset: "Demo progress reset.",
        completeDiagnostic: "Complete the diagnostic first.",
        lessonTip: "Remember: make the denominators the same before adding fractions.",
        prototypeNote: "This demo uses predefined diagnostic rules, not a live AI model."
    },
    te: {
        navHome: "విద్యార్థి డాష్‌బోర్డ్",
        navDiagnose: "నైపుణ్య పరీక్ష",
        navTeacher: "ఉపాధ్యాయ విశ్లేషణ",
        navAbout: "ఇది ఎలా పనిచేస్తుంది",
        workspace: "వర్క్‌స్పేస్",
        yourClass: "మీ తరగతి",
        mathSubject: "గణితం",
        startDiagnostic: "పరీక్ష ప్రారంభించండి",
        yourProgress: "మీ అభ్యాస పురోగతి",
        progressSub: "చిన్న అడుగులు బలమైన పునాదిని నిర్మిస్తాయి.",
        viewDiagnostic: "పరీక్ష తీసుకోండి",
        overallMastery: "మొత్తం నైపుణ్యం",
        startToMeasure: "కొలవడానికి పరీక్ష ప్రారంభించండి",
        recommendedNext: "తదుపరి సూచన",
        nextTitle: "మీ అభ్యాస లోపాన్ని కనుగొనండి",
        nextDesc: "ఏ భావనపై ముందుగా దృష్టి పెట్టాలో తెలుసుకోవడానికి ప్రశ్నలకు సమాధానం ఇవ్వండి.",
        beginQuiz: "పరీక్ష మొదలుపెట్టండి",
        noPressure: "గ్రేడ్‌లు కాదు. పురోగతి ముఖ్యం.",
        diagnosticLabel: "నైపుణ్య పరీక్ష",
        quizTitle: "మీ లోపాన్ని కనుగొందాం.",
        quizSub: "మీకు సరైనదని అనిపించిన జవాబును ఎంచుకోండి.",
        back: "వెనక్కి",
        nextQuestion: "తదుపరి ప్రశ్న",
        resetQuiz: "పరీక్షను మళ్లీ ప్రారంభించండి",
        question: "ప్రశ్న",
        of: "లో",
        answerFirst: "ముందుగా ఒక జవాబును ఎంచుకోండి.",
        score: "మీ స్కోరు",
        likelyGap: "సాధ్యమైన అభ్యాస లోపం",
        whyGap: "ఇలా ఎందుకు జరిగి ఉండవచ్చు",
        masteryByConcept: "భావనల వారీ నైపుణ్యం",
        continueLesson: "ఈ భావన నేర్చుకోండి",
        reviewAnswers: "జవాబులను చూడండి",
        strongStart: "చక్కని ప్రారంభం!",
        noGap: "స్పష్టమైన లోపం కనిపించలేదు",
        noGapDesc: "అన్ని ప్రశ్నలకు సరైన జవాబులు ఇచ్చారు. మరో భావనను ప్రయత్నించండి.",
        lessonFor: "మీ కోసం ప్రత్యేక పాఠం",
        workedExample: "వివరించిన ఉదాహరణ",
        practiceTitle: "ఇప్పుడు మీరే ప్రయత్నించండి",
        practiceSub: "జవాబును ఎంచుకుని తనిఖీ చేయండి.",
        checkAnswer: "జవాబు తనిఖీ",
        correctFeedback: "సరైనది! మీ నైపుణ్యం మెరుగైంది.",
        wrongFeedback: "ఇంకా సరైంది కాదు. వివరణను చూసి మళ్లీ ప్రయత్నించండి.",
        tryAgain: "మళ్లీ ప్రయత్నించండి",
        goOriginal: "అసలు ప్రశ్నను ప్రయత్నించండి",
        mastery: "నైపుణ్యం",
        originalQuestion: "అసలు డెమో ప్రశ్న",
        originalSub: "పరీక్షలోని అదే సమీకరణాన్ని పరిష్కరించండి.",
        solveEquation: "జవాబు తనిఖీ",
        solvedTitle: "మీరు పరిష్కరించారు!",
        solvedDesc: "అభ్యాస చక్రం పూర్తయింది: పరీక్ష → లోపం → పాఠం → అభ్యాసం → అసలు ప్రశ్న.",
        studentsNeedHelp: "సహాయం అవసరమైన విద్యార్థులు",
        strongestConcept: "బలమైన భావన",
        classAverage: "తరగతి సగటు",
        priorityReteach: "మళ్లీ బోధించాల్సిన అంశం",
        heatmapTitle: "విద్యార్థుల నైపుణ్య హీట్‌మ్యాప్",
        heatmapSub: "నైపుణ్యం ఆధారంగా క్రమబద్ధీకరించడానికి భావన శీర్షికను ఎంచుకోండి.",
        student: "విద్యార్థి",
        masteredLegend: "75%+ బలంగా ఉంది",
        practiceLegend: "50–74% అభ్యాసం",
        gapLegend: "50% కంటే తక్కువ — సహాయం అవసరం",
        classInsights: "తరగతి విశ్లేషణ",
        demoWarning: "విద్యార్థుల పేర్లు, స్కోర్లు కల్పిత నమూనా సమాచారం.",
        startOver: "కొత్త పరీక్ష ప్రారంభించండి",
        resetConfirm: "డెమో పురోగతిని రీసెట్ చేయాలా?",
        progressReset: "డెమో పురోగతి రీసెట్ అయింది.",
        completeDiagnostic: "ముందుగా పరీక్షను పూర్తి చేయండి.",
        lessonTip: "భిన్నాలను కూడే ముందు హారాలను సమానం చేయండి.",
        prototypeNote: "ఈ డెమో నియమాల ఆధారిత పరీక్షను ఉపయోగిస్తుంది; నిజమైన AI మోడల్ లేదు."
    },
    hi: {
        navHome: "विद्यार्थी डैशबोर्ड",
        navDiagnose: "डायग्नोस्टिक क्विज़",
        navTeacher: "शिक्षक जानकारी",
        navAbout: "यह कैसे काम करता है",
        workspace: "कार्यक्षेत्र",
        yourClass: "आपकी कक्षा",
        mathSubject: "गणित",
        startDiagnostic: "जाँच शुरू करें",
        yourProgress: "आपकी सीखने की प्रगति",
        progressSub: "छोटे कदम मज़बूत नींव बनाते हैं।",
        viewDiagnostic: "क्विज़ दें",
        overallMastery: "कुल दक्षता",
        startToMeasure: "मापने के लिए क्विज़ शुरू करें",
        recommendedNext: "अगला सुझाव",
        nextTitle: "अपनी सीखने की कमी खोजें",
        nextDesc: "पहले किस अवधारणा पर ध्यान देना है, यह जानने के लिए कुछ सवालों के जवाब दें।",
        beginQuiz: "क्विज़ शुरू करें",
        noPressure: "ग्रेड नहीं, सिर्फ़ प्रगति।",
        diagnosticLabel: "डायग्नोस्टिक सत्र",
        quizTitle: "आइए आपकी कमी खोजें।",
        quizSub: "जो उत्तर सही लगता है उसे चुनें।",
        back: "वापस",
        nextQuestion: "अगला सवाल",
        resetQuiz: "क्विज़ रीसेट करें",
        question: "सवाल",
        of: "में से",
        answerFirst: "पहले एक उत्तर चुनें।",
        score: "आपका स्कोर",
        likelyGap: "संभावित सीखने की कमी",
        whyGap: "ऐसा क्यों हो सकता है",
        masteryByConcept: "अवधारणा के अनुसार दक्षता",
        continueLesson: "यह अवधारणा सीखें",
        reviewAnswers: "उत्तर देखें",
        strongStart: "शानदार शुरुआत!",
        noGap: "कोई स्पष्ट कमी नहीं मिली",
        noGapDesc: "आपने सभी सवाल सही किए। दूसरी अवधारणा आज़माएँ।",
        lessonFor: "आपके लिए लक्षित पाठ",
        workedExample: "हल किया गया उदाहरण",
        practiceTitle: "अब खुद कोशिश करें",
        practiceSub: "उत्तर चुनें और जाँचें।",
        checkAnswer: "उत्तर जाँचें",
        correctFeedback: "सही! आपकी दक्षता बढ़ी है।",
        wrongFeedback: "अभी सही नहीं। व्याख्या देखें और फिर कोशिश करें।",
        tryAgain: "फिर कोशिश करें",
        goOriginal: "मूल सवाल हल करें",
        mastery: "दक्षता",
        originalQuestion: "मूल डेमो सवाल",
        originalSub: "डायग्नोस्टिक वाला वही समीकरण हल करें।",
        solveEquation: "उत्तर जाँचें",
        solvedTitle: "आपने हल कर लिया!",
        solvedDesc: "सीखने का चक्र पूरा: जाँच → कमी → पाठ → अभ्यास → मूल सवाल।",
        studentsNeedHelp: "सहायता की ज़रूरत वाले विद्यार्थी",
        strongestConcept: "सबसे मज़बूत अवधारणा",
        classAverage: "कक्षा औसत",
        priorityReteach: "दोबारा पढ़ाने की प्राथमिकता",
        heatmapTitle: "विद्यार्थी दक्षता हीटमैप",
        heatmapSub: "दक्षता के अनुसार क्रम लगाने के लिए अवधारणा शीर्षक चुनें।",
        student: "विद्यार्थी",
        masteredLegend: "75%+ मज़बूत",
        practiceLegend: "50–74% अभ्यास",
        gapLegend: "50% से कम — सहायता",
        classInsights: "कक्षा की जानकारी",
        demoWarning: "सभी विद्यार्थी नाम और अंक काल्पनिक नमूना डेटा हैं।",
        startOver: "नई जाँच शुरू करें",
        resetConfirm: "डेमो प्रगति रीसेट करें?",
        progressReset: "डेमो प्रगति रीसेट हुई।",
        completeDiagnostic: "पहले जाँच पूरी करें।",
        lessonTip: "भिन्न जोड़ने से पहले हर समान करें।",
        prototypeNote: "यह डेमो नियम-आधारित जाँच उपयोग करता है, लाइव AI मॉडल नहीं।"
    }
};

const defaults = {
    lang: "en",
    answers: {},
    qIndex: 0,
    completed: false,
    practiceDone: false,
    practiceChoice: null,
    practiceChecked: false,
    practiceAttempts: 0
};

let state = { ...defaults };

function t(key) {
    return text[state.lang]?.[key] || text.en[key] || key;
}

function localize(value) {
    if (typeof value === "string") return value;
    return value?.[state.lang] || value?.en || "";
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function conceptName(id) {
    const concept = concepts.find(item => item.id === id);
    return concept ? localize(concept.names) : id;
}

function save() {
    try {
        localStorage.setItem("gapmap-static-v1", JSON.stringify(state));
    } catch (error) {
        console.warn("Could not save GapMap progress.", error);
    }
}

function diagnose(answers) {
    let score = 0;
    const perConcept = {};
    const wrong = [];

    questions.forEach(question => {
        const result = perConcept[question.concept] || { correct: 0, total: 0 };
        result.total++;

        if (answers[question.id] === question.correct) {
            score++;
            result.correct++;
        } else if (Number.isInteger(answers[question.id])) {
            wrong.push({ question, chosen: answers[question.id] });
        }
        perConcept[question.concept] = result;
    });

    const gapConcept = concepts.find(concept => {
        const result = perConcept[concept.id];
        return result && result.correct < result.total;
    });
    const mastery = {};

    concepts.forEach(concept => {
        const result = perConcept[concept.id];
        mastery[concept.id] = result
            ? Math.round(30 + 55 * result.correct / result.total)
            : 30;
    });

    return {
        score,
        total: questions.length,
        gap: gapConcept ? gapConcept.id : null,
        mastery,
        wrong,
        perConcept
    };
}

function getMastery() {
    const result = diagnose(state.answers);
    const mastery = { ...result.mastery };

    if (state.practiceDone && result.gap) {
        mastery[result.gap] = Math.max(mastery[result.gap], 82);
    }

    return mastery;
}

function setScreen(screen) {
    const screens = {
        dashboard: "dashboardScreen",
        diagnostic: "diagnosticScreen",
        results: "resultsScreen",
        lesson: "lessonScreen",
        practice: "practiceScreen"
    };

    if (!screens[screen]) screen = "dashboard";
    if (["results", "lesson", "practice"].includes(screen) && !state.completed) {
        screen = "diagnostic";
    }

    Object.entries(screens).forEach(([name, id]) => {
        const element = document.getElementById(id);
        element.classList.toggle("active", name === screen);
        element.classList.toggle("hidden", name !== screen);
    });

    const navTargets = {
        dashboardNav: "dashboard",
        diagnosticNav: "diagnostic",
        lessonNav: "lesson",
        practiceNav: "practice"
    };
    Object.entries(navTargets).forEach(([id, target]) => {
        document.getElementById(id).classList.toggle("active", target === screen);
    });

    const headings = {
        dashboard: "Welcome to your learning map",
        diagnostic: t("quizTitle"),
        results: t("score"),
        lesson: t("lessonFor"),
        practice: t("practiceTitle")
    };
    document.getElementById("appHeading").textContent = headings[screen];

    if (screen === "dashboard") renderDashboard();
    if (screen === "diagnostic") renderQuestion();
    if (screen === "results") renderResults();
    if (screen === "lesson") renderLesson();
    if (screen === "practice") renderPractice();
}

function renderDashboard() {
    document.getElementById("conceptCount").textContent = concepts.length;
    document.getElementById("assessmentCount").textContent = state.completed ? 1 : 0;
    document.getElementById("practiceCount").textContent = state.practiceAttempts;
}

function renderQuestion() {
    state.qIndex = Math.max(0, Math.min(state.qIndex, questions.length - 1));
    const question = questions[state.qIndex];
    const selected = state.answers[question.id];
    const answered = Number.isInteger(selected);

    document.getElementById("questionCounter").textContent =
        `${t("question")} ${state.qIndex + 1} ${t("of")} ${questions.length}`;
    document.getElementById("diagnosticProgressBar").style.width =
        `${(state.qIndex + 1) / questions.length * 100}%`;
    document.getElementById("questionContainer").innerHTML = `
      <div class="quiz-category">${escapeHTML(conceptName(question.concept))}</div>
      <h3 class="question-title">${escapeHTML(localize(question.prompt))}</h3>
      <p class="question-hint">${escapeHTML(localize(question.hint))}</p>
      <div class="options-list">
        ${question.options.map((option, index) => `
          <button class="option-button ${selected === index ? "selected" : ""}" data-answer="${index}" type="button">
            <span class="option-key">${String.fromCharCode(65 + index)}</span>
            <span class="option-label">${escapeHTML(option)}</span>
          </button>
        `).join("")}
      </div>`;

    document.querySelectorAll("#questionContainer [data-answer]").forEach(button => {
        button.addEventListener("click", () => {
            const answer = Number(button.dataset.answer);
            if (state.answers[question.id] !== answer) {
                state.completed = false;
                state.practiceDone = false;
                state.practiceChoice = null;
                state.practiceChecked = false;
            }
            state.answers[question.id] = answer;
            document.getElementById("diagnosticFeedback").textContent = "";
            save();
            renderQuestion();
        });
    });

    document.getElementById("previousQuestionBtn").disabled = state.qIndex === 0;
    document.getElementById("nextQuestionBtn").textContent =
        state.qIndex === questions.length - 1 ? t("score") : t("nextQuestion");
    document.getElementById("nextQuestionBtn").disabled = !answered;
    document.getElementById("diagnosticFeedback").textContent = "";
}

function submitQuiz() {
    if (questions.some(question => !Number.isInteger(state.answers[question.id]))) {
        document.getElementById("diagnosticFeedback").textContent = t("answerFirst");
        return;
    }

    state.completed = true;
    state.practiceDone = false;
    state.practiceChoice = null;
    state.practiceChecked = false;
    save();
    renderDashboard();
    setScreen("results");
}

function renderResults() {
    const result = diagnose(state.answers);
    const mastery = getMastery();
    const wrong = result.wrong[0];
    const gap = result.gap ? conceptName(result.gap) : t("strongStart");

    document.getElementById("resultsScore").textContent =
        `${Math.round(result.score / result.total * 100)}%`;
    document.getElementById("resultsTitle").textContent = result.gap
        ? `${t("likelyGap")}: ${gap}`
        : t("strongStart");
    document.getElementById("resultsDescription").textContent = result.gap
        ? t("whyGap")
        : t("noGapDesc");
    document.getElementById("resultsContainer").innerHTML = `
      <div class="results-grid">
        <section class="result-summary">
          <h3>${escapeHTML(result.gap ? gap : t("noGap"))}</h3>
          <p>${escapeHTML(wrong ? localize(wrong.question.misconception) : t("noGapDesc"))}</p>
        </section>
        <section class="concept-result-list" aria-label="${escapeHTML(t("masteryByConcept"))}">
          ${concepts.map(concept => `
            <div class="concept-result-row">
              <span>${escapeHTML(conceptName(concept.id))}</span>
              <strong>${mastery[concept.id]}%</strong>
              <div class="mini-track"><span style="width:${mastery[concept.id]}%"></span></div>
            </div>
          `).join("")}
        </section>
      </div>`;
}

function selectedLesson() {
    const result = diagnose(state.answers);
    return result.gap || "fractions";
}

function renderLesson() {
    const id = selectedLesson();
    const lesson = lessons[id];
    const mastery = getMastery();

    document.getElementById("lessonTitle").textContent = localize(lesson.title);
    document.getElementById("lessonDescription").textContent = localize(lesson.explain);
    document.getElementById("lessonContainer").innerHTML = `
      <article class="lesson-content">
        <h3>${escapeHTML(t("workedExample"))}</h3>
        <ol class="example-steps">
          ${lesson.steps[state.lang].map(step => `<li>${escapeHTML(step)}</li>`).join("")}
        </ol>
        ${state.practiceDone ? `<p class="success-message">${escapeHTML(t("correctFeedback"))} ${escapeHTML(t("mastery"))}: ${mastery[id]}%</p>` : ""}
      </article>`;
}

function renderPractice() {
    const lesson = lessons[selectedLesson()];
    const selected = state.practiceChoice;
    const correct = state.practiceChecked && selected === lesson.practice.correct;

    document.getElementById("practiceTitle").textContent = localize(lesson.title);
    document.getElementById("practiceDescription").textContent = localize(lesson.practice.prompt);
    document.getElementById("practiceContainer").innerHTML = `
      <h3 class="question-title">${escapeHTML(localize(lesson.practice.prompt))}</h3>
      <div class="options-list">
        ${lesson.practice.options.map((option, index) => `
          <button class="option-button ${selected === index ? "selected" : ""}" data-practice="${index}" type="button">
            <span class="option-key">${String.fromCharCode(65 + index)}</span>
            <span class="option-label">${escapeHTML(option)}</span>
          </button>
        `).join("")}
      </div>`;

    document.querySelectorAll("#practiceContainer [data-practice]").forEach(button => {
        button.disabled = state.practiceDone;
        button.addEventListener("click", () => {
            state.practiceChoice = Number(button.dataset.practice);
            state.practiceChecked = false;
            document.getElementById("practiceFeedback").textContent = "";
            save();
            renderPractice();
        });
    });

    document.getElementById("practiceFeedback").textContent = state.practiceChecked
        ? (correct ? t("correctFeedback") : `${t("wrongFeedback")} ${localize(lesson.practice.feedback)}`)
        : "";
    document.getElementById("checkPracticeBtn").textContent = state.practiceDone
        ? t("correctFeedback")
        : t("checkAnswer");
    document.getElementById("checkPracticeBtn").disabled = state.practiceDone;
}

function startFreshAssessment() {
    state.answers = {};
    state.qIndex = 0;
    state.completed = false;
    state.practiceDone = false;
    state.practiceChoice = null;
    state.practiceChecked = false;
    save();
    renderDashboard();
    setScreen("diagnostic");
}

function wireNavigation() {
    document.getElementById("dashboardNav").addEventListener("click", () => setScreen("dashboard"));
    document.getElementById("diagnosticNav").addEventListener("click", () => setScreen("diagnostic"));
    document.getElementById("lessonNav").addEventListener("click", () => setScreen("lesson"));
    document.getElementById("practiceNav").addEventListener("click", () => setScreen("practice"));

    ["startBtn", "heroStartBtn", "beginAssessmentBtn", "finalStartBtn"].forEach(id => {
        document.getElementById(id).addEventListener("click", () => {
            setScreen("diagnostic");
            document.getElementById("student-app").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    document.getElementById("previousQuestionBtn").addEventListener("click", () => {
        state.qIndex = Math.max(0, state.qIndex - 1);
        save();
        renderQuestion();
    });
    document.getElementById("nextQuestionBtn").addEventListener("click", () => {
        if (!Number.isInteger(state.answers[questions[state.qIndex].id])) {
            document.getElementById("diagnosticFeedback").textContent = t("answerFirst");
            return;
        }
        if (state.qIndex === questions.length - 1) {
            submitQuiz();
        } else {
            state.qIndex++;
            save();
            renderQuestion();
        }
    });

    document.getElementById("continueLearningBtn").addEventListener("click", () => setScreen("lesson"));
    document.getElementById("retryAssessmentBtn").addEventListener("click", startFreshAssessment);
    document.getElementById("backToResultsBtn").addEventListener("click", () => setScreen("results"));
    document.getElementById("startPracticeBtn").addEventListener("click", () => setScreen("practice"));
    document.getElementById("backToLessonBtn").addEventListener("click", () => setScreen("lesson"));
    document.getElementById("checkPracticeBtn").addEventListener("click", () => {
        if (!Number.isInteger(state.practiceChoice)) {
            document.getElementById("practiceFeedback").textContent = t("answerFirst");
            return;
        }
        state.practiceChecked = true;
        state.practiceAttempts++;
        if (state.practiceChoice === lessons[selectedLesson()].practice.correct) {
            state.practiceDone = true;
        }
        save();
        renderDashboard();
        renderPractice();
    });

    document.getElementById("languageSelect").addEventListener("change", event => {
        state.lang = ["en", "te", "hi"].includes(event.target.value) ? event.target.value : "en";
        document.documentElement.lang = state.lang;
        save();
        setScreen(currentScreen());
    });
}

function currentScreen() {
    const active = document.querySelector(".app-screen.active");
    const mapping = {
        dashboardScreen: "dashboard",
        diagnosticScreen: "diagnostic",
        resultsScreen: "results",
        lessonScreen: "lesson",
        practiceScreen: "practice"
    };
    return active ? mapping[active.id] || "dashboard" : "dashboard";
}

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem("gapmap-static-v1") || "{}");
        if (saved && typeof saved === "object" && !Array.isArray(saved)) {
            state = { ...state, ...saved };
        }
    } catch (error) {
        console.warn("Could not load saved GapMap progress.", error);
    }

    if (!state.answers || typeof state.answers !== "object" || Array.isArray(state.answers)) {
        state.answers = {};
    }
    questions.forEach(question => {
        const answer = state.answers[question.id];
        if (!Number.isInteger(answer) || answer < 0 || answer >= question.options.length) {
            delete state.answers[question.id];
        }
    });
    state.lang = ["en", "te", "hi"].includes(state.lang) ? state.lang : "en";
    state.qIndex = Number.isInteger(state.qIndex)
        ? Math.max(0, Math.min(state.qIndex, questions.length - 1))
        : 0;
    state.practiceAttempts = Number.isInteger(state.practiceAttempts)
        ? Math.max(0, state.practiceAttempts)
        : 0;
    state.completed = Boolean(state.completed) &&
        questions.every(question => Number.isInteger(state.answers[question.id]));
    const practiceOptions = lessons[selectedLesson()].practice.options;
    state.practiceChoice = Number.isInteger(state.practiceChoice) &&
        state.practiceChoice >= 0 && state.practiceChoice < practiceOptions.length
        ? state.practiceChoice
        : null;
    state.practiceDone = Boolean(state.practiceDone) &&
        state.practiceChoice === lessons[selectedLesson()].practice.correct;
    state.practiceChecked = Boolean(state.practiceChecked) &&
        Number.isInteger(state.practiceChoice);
    document.getElementById("languageSelect").value = state.lang;
    document.documentElement.lang = state.lang;
}

wireNavigation();
loadState();
renderDashboard();
setScreen(state.completed ? "results" : "dashboard");