import React, { useState } from 'react';
import './calculator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faQuestionCircle, faSpinner, faSearch, faRedo, faFlask, faMicroscope } from '@fortawesome/free-solid-svg-icons';

type TestResult = '+' | '-' | 'V' | '';
type TestImportance = 'green' | 'pink' | 'supportive';

interface BacteriaProfile {
  [key: string]: TestResult;
}

interface BacteriaProfiles {
  [key: string]: BacteriaProfile;
}

interface Test {
  id: string;
  label: string;
}

interface TestCategory {
  title: string;
  tests: Test[];
}

interface Result {
  bacteria: string;
  matchPercentage: string;
  totalRelevantTests: number;
}

interface TestImportanceProfile {
  [key: string]: TestImportance;
}

interface BacteriaData {
  profiles: BacteriaProfiles;
  importance: Record<string, TestImportanceProfile>;
}

const bacteriaProfiles: BacteriaProfiles = {
  "Escherichia coli": {
    indole: "+",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "-",
    h2s: "-",
    urea: "-",
    motility: "V",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "+",
    sucrose: "V",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "V",
    lRhamnose: "-",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},
"Ewingella americana": {
    indole: "-",
    methylRed: "+",
    vogesProskauer: "+",
    citrate: "+",
    h2s: "-",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "-",
    lactose: "+",
    sucrose: "-",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "-",
    lArabinose: "-",
    raffinose: "-",
    lRhamnose: "-",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},
"Hafnia alvei": {
    indole: "-",
    methylRed: "-",
    vogesProskauer: "+",
    citrate: "+",
    h2s: "-",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "-",
    sucrose: "-",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "-",
    lArabinose: "+",
    raffinose: "-",
    lRhamnose: "+",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Plesiomonas shigelloides": {
    indole: "+",
    methylRed: "V",
    vogesProskauer: "-",
    citrate: "-",
    h2s: "-",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "+",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "-",
    lactose: "V",
    sucrose: "-",
    dMannitol: "-",
    adonitol: "-",
    inositol: "+",
    dSorbitol: "-",
    lArabinose: "-",
    raffinose: "-",
    lRhamnose: "-",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},
"Shigella sonnei": {
    indole: "-",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "-",
    h2s: "-",
    urea: "-",
    motility: "-",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "+",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "-",
    lactose: "-",
    sucrose: "-",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "-",
    lArabinose: "+",
    raffinose: "-",
    lRhamnose: "+",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},
"Shigella except sonnei": {
    indole: "V",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "-",
    h2s: "-",
    urea: "-",
    motility: "-",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "V",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "-",
    lactose: "-",
    sucrose: "-",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "V",
    lArabinose: "V",
    raffinose: "V",
    lRhamnose: "-",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},
"Salmonella enteritidis": {
    indole: "-",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "+",
    h2s: "+",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "+",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "-",
    sucrose: "-",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "-",
    lRhamnose: "+",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},
"Salmonella typhi": {
    indole: "-",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "-",
    h2s: "+",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "-",
    lactose: "-",
    sucrose: "-",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "+",
    lArabinose: "-",
    raffinose: "-",
    lRhamnose: "-",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},
"Edwardsiella tarda": {
    indole: "+",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "-",
    h2s: "+",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "-",
    sucrose: "-",
    dMannitol: "-",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "-",
    lArabinose: "-",
    raffinose: "-",
    lRhamnose: "-",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},
"Citrobacter freundii": {
    indole: "-",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "+",
    h2s: "+",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "+",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "+",
    sucrose: "+",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "-",
    lRhamnose: "+",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Citrobacter braakii": {
    indole: "-",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "+",
    h2s: "+",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "+",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "+",
    sucrose: "-",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "-",
    lRhamnose: "+",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Citrobacter koseri": {
    indole: "+",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "+",
    h2s: "-",
    urea: "+",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "+",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "+",
    sucrose: "-",
    dMannitol: "+",
    adonitol: "+",
    inositol: "-",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "-",
    lRhamnose: "+",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},
"Klebsiella pneumoniae": {
    indole: "-",
    methylRed: "V",
    vogesProskauer: "+",
    citrate: "+",
    h2s: "-",
    urea: "+",
    motility: "-",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "+",
    sucrose: "+",
    dMannitol: "+",
    adonitol: "+",
    inositol: "+",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "+",
    lRhamnose: "+",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Klebsiella oxytoca": {
    indole: "+",
    methylRed: "-",
    vogesProskauer: "+",
    citrate: "+",
    h2s: "-",
    urea: "+",
    motility: "-",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "+",
    sucrose: "+",
    dMannitol: "+",
    adonitol: "+",
    inositol: "+",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "+",
    lRhamnose: "+",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Enterobacter cloacae": {
    indole: "-",
    methylRed: "-",
    vogesProskauer: "+",
    citrate: "+",
    h2s: "-",
    urea: "+",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "+",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "+",
    sucrose: "+",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "+",
    lRhamnose: "+",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Enterobacter aerogenes": {
    indole: "-",
    methylRed: "-",
    vogesProskauer: "+",
    citrate: "+",
    h2s: "-",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "+",
    lactose: "+",
    sucrose: "+",
    dMannitol: "+",
    adonitol: "+",
    inositol: "+",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "+",
    lRhamnose: "+",
    KCN: "+",
    Gelatin: "+",
    DNAse: "-"
},
"Cronobacter sakazakii": {
    indole: "-",
    methylRed: "-",
    vogesProskauer: "+",
    citrate: "+",
    h2s: "-",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "+",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "+",
    gasFromDGlucose: "+",
    lactose: "+",
    sucrose: "+",
    dMannitol: "+",
    adonitol: "-",
    inositol: "+",
    dSorbitol: "-",
    lArabinose: "+",
    raffinose: "+",
    lRhamnose: "+",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Pantoea agglomerans": {
    indole: "-",
    methylRed: "V",
    vogesProskauer: "+",
    citrate: "V",
    h2s: "-",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "-",
    lactose: "-",
    sucrose: "+",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "-",
    lArabinose: "+",
    raffinose: "-",
    lRhamnose: "+",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},
"Serratia marcescens": {
    indole: "-",
    methylRed: "V",
    vogesProskauer: "+",
    citrate: "+",
    h2s: "-",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "-",
    lactose: "-",
    sucrose: "+",
    dMannitol: "+",
    adonitol: "-",
    inositol: "V",
    dSorbitol: "+",
    lArabinose: "-",
    raffinose: "-",
    lRhamnose: "-",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Serratia odorifera": {
    indole: "+",
    methylRed: "+",
    vogesProskauer: "+",
    citrate: "+",
    h2s: "-",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "+",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "-",
    lactose: "+",
    sucrose: "-",
    dMannitol: "+",
    adonitol: "+",
    inositol: "+",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "-",
    lRhamnose: "+",
    KCN: "-",
    Gelatin: "+",
    DNAse: "-"
},
"Proteus vulgaris": {
    indole: "+",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "-",
    h2s: "+",
    urea: "+",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "+",
    gasFromDGlucose: "+",
    lactose: "-",
    sucrose: "+",
    dMannitol: "-",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "-",
    lArabinose: "-",
    raffinose: "-",
    lRhamnose: "-",
    KCN: "+",
    Gelatin: "+",
    DNAse: "-"
},
"Proteus mirabilis": {
    indole: "-",
    methylRed: "+",
    vogesProskauer: "V",
    citrate: "+",
    h2s: "+",
    urea: "+",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "+",
    gasFromDGlucose: "+",
    lactose: "-",
    sucrose: "-",
    dMannitol: "-",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "-",
    lArabinose: "-",
    raffinose: "-",
    lRhamnose: "-",
    KCN: "+",
    Gelatin: "+",
    DNAse: "-"
},
"Morganella morganii": {
    indole: "+",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "-",
    h2s: "-",
    urea: "+",
    motility: "V",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "+",
    gasFromDGlucose: "-",
    lactose: "-",
    sucrose: "-",
    dMannitol: "-",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "-",
    lArabinose: "-",
    raffinose: "-",
    lRhamnose: "-",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Providencia rettgeri": {
    indole: "+",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "+",
    h2s: "-",
    urea: "+",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "+",
    gasFromDGlucose: "-",
    lactose: "-",
    sucrose: "-",
    dMannitol: "+",
    adonitol: "+",
    inositol: "+",
    dSorbitol: "-",
    lArabinose: "-",
    raffinose: "-",
    lRhamnose: "+",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Providencia stuartii": {
    indole: "+",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "+",
    h2s: "-",
    urea: "-",
    motility: "+",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "-",
    phenylalanineDeaminase: "+",
    gasFromDGlucose: "-",
    lactose: "-",
    sucrose: "V",
    dMannitol: "-",
    adonitol: "-",
    inositol: "+",
    dSorbitol: "-",
    lArabinose: "-",
    raffinose: "-",
    lRhamnose: "-",
    KCN: "+",
    Gelatin: "-",
    DNAse: "-"
},
"Yersinia enterocolitica": {
    indole: "V",
    methylRed: "+",
    vogesProskauer: "-",
    citrate: "-",
    h2s: "-",
    urea: "+",
    motility: "-",
    lysineDecarboxylase: "-",
    arginineDihydrolase: "-",
    ornithineDecarboxylase: "+",
    phenylalanineDeaminase: "-",
    gasFromDGlucose: "-",
    lactose: "-",
    sucrose: "+",
    dMannitol: "+",
    adonitol: "-",
    inositol: "-",
    dSorbitol: "+",
    lArabinose: "+",
    raffinose: "-",
    lRhamnose: "-",
    KCN: "-",
    Gelatin: "-",
    DNAse: "-"
},

};

const testImportance: Record<string, TestImportanceProfile> = {
  "Escherichia coli": {
      "indole": "green",
      "gasFromDGlucose": "green"
  },
  "Plesiomonas shigelloides": {
      "indole": "green"
  },
  "Shigella sonnei": {
      "ornithineDecarboxylase": "green"
  },
  "Shigella except sonnei": {
      "ornithineDecarboxylase": "green"
  },
  "Salmonella enteritidis": {
      "indole": "green",
      "lysineDecarboxylase": "green",
      "gasFromDGlucose": "green"
  },
  "Salmonella typhi": {
      "lysineDecarboxylase": "green"
  },
  "Edwardsiella tarda": {
      "indole": "green",
      "h2s": "green"
  },
  "Citrobacter freundii": {
      "methylRed": "pink"
  },
  "Citrobacter braakii": {
      "vogesProskauer": "pink"
  },
  "Citrobacter koseri": {
      "methylRed": "pink",
      "h2s": "green"
  },
  "Klebsiella pneumoniae": {
      "indole": "green",
      "motility": "pink"  // Fixed typo
  },
  "Klebsiella oxytoca": {
      "indole": "green",
      "motility": "pink"
  },
  "Enterobacter cloacae": {
      "methylRed": "pink",
      "arginineDihydrolase": "green",
      "ornithineDecarboxylase": "green"
  },
  "Serratia marcescens": {
      "DNAse": "green"
  },
  "Serratia odorifera": {
      "Gelatin": "green"
  },
  "Proteus vulgaris": {
      "indole": "green",
      "h2s": "pink",
      "phenylalanineDeaminase": "pink",
      "Gelatin": "pink"
  },
  "Proteus mirabilis": {
      "indole": "green",
      "h2s": "pink",
      "phenylalanineDeaminase": "pink",
      "Gelatin": "pink"
  },
  "Morganella morganii": {
      "citrate": "green",
      "h2s": "green",
      "phenylalanineDeaminase": "pink"
  },
  "Providencia rettgeri": {
      "citrate": "green",
      "phenylalanineDeaminase": "pink",
      "dMannitol": "green",
      "adonitol": "green",
      "inositol": "green"
  },
  "Providencia stuartii": {
      "citrate": "green",
      "dMannitol": "green",
      "adonitol": "green",
      "inositol": "green"
  }
};

const BioCalculator = () => {
  const [mode, setMode] = useState<'calculator' | 'quiz'>('calculator');
  const [testResults, setTestResults] = useState<Record<string, string>>({});
  const [resultText, setResultText] = useState('Select positive tests above to identify the bacteria.');
  const [educationalNotes, setEducationalNotes] = useState('');
  const [quizBacteria, setQuizBacteria] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');
  const [userGuess, setUserGuess] = useState('');

  const handleTestChange = (testName: string, value: string) => {
    setTestResults(prev => ({
      ...prev,
      [testName]: value
    }));
  };

  const resetTests = () => {
    setTestResults({});
    setResultText('Select positive tests above to identify the bacteria.');
    setEducationalNotes('');
  };

  const formatTestName = (test: string) => {
    return test
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace('D Glucose', 'D-Glucose');
  };

  const identifyBacteria = () => {
    try {
      const testNames = [
        'indole', 'methylRed', 'vogesProskauer', 'citrate', 'h2s', 'urea', 
        'motility', 'lysineDecarboxylase', 'arginineDihydrolase', 
        'ornithineDecarboxylase', 'phenylalanineDeaminase', 'gasFromDGlucose',
        'lactose', 'sucrose', 'dMannitol', 'adonitol', 'inositol', 'dSorbitol',
        'lArabinose', 'raffinose', 'lRhamnose', 'KCN', 'Gelatin', 'DNAse'
      ];
      
  
      const results: Array<{
        bacteria: string;
        matchPercentage: string;
        testsConsidered: number;
        criticalMismatches: string[];
      }> = [];
  
      for (const [bacteria, profile] of Object.entries(bacteriaProfiles)) {
        let score = 0;
        let testsConsidered = 0;
        const criticalMismatches: string[] = [];
  
        testNames.forEach(test => {
          const userValue = testResults[test] as string | undefined;
          let expected = profile[test];

          function normalizeTestResult(result: string): TestResult {
            const cleaned = result
              .replace(/\(v\)/gi, '')  // Remove (v) notation
              .trim()                  // Remove whitespace
              .toUpperCase();          // Standardize case
            
            // Ensure it's one of the valid result types
            if (cleaned === '+' || cleaned === '-' || cleaned === 'V') {
              return cleaned;
            }
            return ''; // default for empty/invalid
          }
          
          // Normalize expected values
          if (typeof expected === 'string') {
            expected = normalizeTestResult(expected);
            if (expected === '') expected = 'V';
          }
  
          if (!userValue) return;
  
          testsConsidered++;
          const importance = testImportance[bacteria]?.[test] || 'supportive';
          const isKeyTest = importance === 'green';
          const isSupportive = importance === 'pink';
  
          if (userValue === "V") {
            if (expected === "V") score += isKeyTest ? 0.5 : 0.3;
          } else {
            if (expected === userValue) {
              score += isKeyTest ? 2 : isSupportive ? 1.5 : 1;
            } else {
              if (['+', '-'].includes(expected)) {
                score -= isKeyTest ? 3 : isSupportive ? 2 : 1;
                if (isKeyTest) criticalMismatches.push(test);
              } else if (expected === "V") {
                score += 0.5;
              }
            }
          }
        });
  
        results.push({
          bacteria,
          matchPercentage: testsConsidered > 0 
            ? ((score / testsConsidered) * 100).toFixed(2)
            : "0.00",
          testsConsidered,
          criticalMismatches
        });
      }
  
      results.sort((a, b) => parseFloat(b.matchPercentage) - parseFloat(a.matchPercentage));
  
      let resultText = "";
      if (results.length === 0 || results[0].matchPercentage === "0.00") {
        resultText = "No matches found. Please check your test selections.";
      } else {
        resultText = "<h3>Top Matches:</h3><ul>";
        const topResults = results.slice(0, 5);
        
        topResults.forEach((result) => {
          resultText += `
            <li>
              ${result.bacteria}: 
              <strong>${result.matchPercentage}% match</strong>
              ${result.criticalMismatches.length > 0 ? 
                `<div class="warning">⚠️ Critical mismatch in: 
                ${result.criticalMismatches.map(t => formatTestName(t)).join(', ')}
                </div>` : ''}
            </li>
          `;
        });
        resultText += "</ul>";
      }
      
      setResultText(resultText);
      
      if (results.length > 0 && results[0].matchPercentage !== "0.00") {
        displayEducationalNotes(results[0].bacteria);
      }
    } catch (error) {
      console.error("Identification error:", error);
      setResultText("Error in calculation. Please check console.");
    }
  };

  const displayEducationalNotes = (bacteria: string) => {
    const profile = bacteriaProfiles[bacteria];
    const importance = testImportance[bacteria] as TestImportanceProfile || {};
    
    let html = `<div class="educational-notes">
      <h4>Key Identification Features for ${bacteria}:</h4>
      <ul>`;

    // Key Characteristics (Green)
    Object.entries(importance).forEach(([test, color]) => {
      if(color !== 'green') return;
      
      const expected = profile[test].replace(/\(v\)/gi, '').trim();
      const userValue = testResults[test] as TestResult || '' as TestResult;
      const testName = formatTestName(test);

      html += `<li>
        <strong>${testName}:</strong> 
        ${userValue === expected ? 
          `A key characteristic for identification` :
          `⚠️ Expected result: ${expected} (Critical diagnostic test)`
        }
      </li>`;
    });

    // Supportive Tests (Pink)
    Object.entries(importance).forEach(([test, color]) => {
      if(color !== 'pink') return;
      
      const expected = profile[test].replace(/\(v\)/gi, '').trim();
      const userValue = testResults[test] as TestResult;
      const testName = formatTestName(test);

      if(userValue) {
        html += `<li>
          <strong>${testName}:</strong>
          ${userValue === expected ? 
            `Useful for preliminary recognition` :
            `⚠️ Expected ${expected} (Supportive test)`
          }
        </li>`;
      }
    });

    html += `</ul></div>`;
    setEducationalNotes(html);
  };

  const generateQuizQuestion = () => {
    const bacteriaList = Object.keys(bacteriaProfiles);
    const randomBacteria = bacteriaList[Math.floor(Math.random() * bacteriaList.length)];
    setQuizBacteria(randomBacteria);
    setQuizFeedback('');
    setUserGuess('');
  };

  const checkGuess = () => {
    if (userGuess.toLowerCase() === quizBacteria.toLowerCase()) {
      setQuizFeedback(`
        <p style="color: var(--success-color);">✅ Correct! It's ${quizBacteria}.</p>
        <div class="bacteria-info">
          <p><strong>Characteristics:</strong></p>
          <ul>
            ${getBacteriaCharacteristics(quizBacteria)}
          </ul>
        </div>
      `);
    } else {
      setQuizFeedback(`
        <p style="color: var(--error-color);">❌ Incorrect. Your guess: ${userGuess || '[blank]'}</p>
        <p><strong>Hint:</strong> ${getBacteriaHint(quizBacteria)}</p>
      `);
    }
  };

  const getBacteriaCharacteristics = (name: string) => {
    const profile = bacteriaProfiles[name];
    if (!profile) return "";
    
    const positives: string[] = [];
    const negatives: string[] = [];
    
    for (const [test, result] of Object.entries(profile)) {
      if (result === "+") positives.push(formatTestName(test));
      else if (result === "-") negatives.push(formatTestName(test));
    }
    
    let html = "";
    if (positives.length > 0) {
      html += `<li><strong>Positive for:</strong> ${positives.join(', ')}</li>`;
    }
    if (negatives.length > 0) {
      html += `<li><strong>Negative for:</strong> ${negatives.join(', ')}</li>`;
    }
    
    return html;
  };

  const getBacteriaHint = (name: string) => {
    const hints: Record<string, string> = {
      "Escherichia coli": "This bacteria is commonly found in the intestines of humans and animals, and is a key indicator of fecal contamination.",
      "Klebsiella pneumoniae": "This bacteria is known for its thick capsule and is a common cause of hospital-acquired infections.",
      "Salmonella enteritidis": "This bacteria is a common cause of food poisoning, especially from poultry products.",
      "Proteus mirabilis": "This bacteria is known for its swarming motility and is often associated with urinary tract infections.",
      "Serratia marcescens": "This bacteria produces a distinctive red pigment and can be found in bathrooms and damp areas."
    };
    
    return hints[name] || `This is ${name}, commonly found in environmental or clinical samples.`;
  };

  const renderTestField = (testName: string, legend: string) => {
    return (
      <fieldset>
        <legend>{legend}</legend>
        <label className="test-option">
          <input 
            type="radio" 
            name={testName} 
            value="+" 
            checked={testResults[testName] === '+'}
            onChange={() => handleTestChange(testName, '+')}
          />
          <span className="test-btn positive">+</span>
        </label>
        <label className="test-option">
          <input 
            type="radio" 
            name={testName} 
            value="-" 
            checked={testResults[testName] === '-'}
            onChange={() => handleTestChange(testName, '-')}
          />
          <span className="test-btn negative">-</span>
        </label>
        <label className="test-option">
          <input 
            type="radio" 
            name={testName} 
            value="V" 
            checked={testResults[testName] === 'V'}
            onChange={() => handleTestChange(testName, 'V')}
          />
          <span className="test-btn variable">V</span>
        </label>
      </fieldset>
    );
  };

  return (
    <div className="bio-calculator">
      <header>
        <div className="header-content">
          <h1>Enterobacteriaceae Identification Calculator</h1>
          <p className="subtitle">A quick reference tool for microbiology students</p>
        </div>
      </header>

      <main>
        <div className="mode-selector">
          <button 
            className={`mode-btn ${mode === 'calculator' ? 'active' : ''}`} 
            onClick={() => setMode('calculator')}
          >
            Basic Identification Calculator
          </button>
          <button 
            className={`mode-btn ${mode === 'quiz' ? 'active' : ''}`} 
            onClick={() => {
              setMode('quiz');
              generateQuizQuestion();
            }}
          >
            Test Yourself
          </button>
        </div>

        {mode === 'calculator' ? (
          <>
            <div className="test-instructions">
              <p>🔍 How to use:</p>
              <ul>
                <li>Select <span className="positive">+</span> or <span className="negative">-</span> for definitive results</li>
                <li>Mark <span className="variable">V</span> only if the test result was ambiguous/unclear</li>
                <li>Leave unselected if test was not performed</li>
              </ul>
            </div>

            <section id="calculator">
              <h2><i className="fas fa-flask"></i> Select Biochemical Test Results</h2>
              <div id="biochemical-form">
                {/* Common Tests */}
                <div className="test-category">
                  <h3>Common Tests</h3>
                  <div className="test-group">
                    {renderTestField('indole', 'Indole Test')}
                    {renderTestField('methylRed', 'Methyl Red Test')}
                    {renderTestField('vogesProskauer', 'Voges Proskauer Test')}
                    {renderTestField('citrate', 'Simmons\' Citrate Test')}
                    {renderTestField('h2s', 'Hydrogen Sulfide (H2S) Test')}
                    {renderTestField('urea', 'Urea Test')}
                    {renderTestField('motility', 'Motility Test')}
                  </div>
                </div>

                {/* Decarboxylase Tests */}
                <div className="test-category">
                  <h3>Decarboxylase Tests</h3>
                  <div className="test-group">
                    {renderTestField('lysineDecarboxylase', 'Lysine Decarboxylase')}
                    {renderTestField('arginineDihydrolase', 'Arginine Dihydrolase')}
                    {renderTestField('ornithineDecarboxylase', 'Ornithine Decarboxylase')}
                    {renderTestField('phenylalanineDeaminase', 'Phenylalanine Deaminase')}
                  </div>
                </div>

                {/* Carbohydrate Tests */}
                <div className="test-category">
                  <h3>Carbohydrate Fermentation</h3>
                  <div className="test-group">
                    {renderTestField('gasFromDGlucose', 'Gas from D-Glucose')}
                    {renderTestField('lactose', 'Lactose Fermentation')}
                    {renderTestField('sucrose', 'Sucrose Fermentation')}
                    {renderTestField('dMannitol', 'D-Mannitol Fermentation')}
                    {renderTestField('adonitol', 'Adonitol Fermentation')}
                    {renderTestField('inositol', 'Inositol Fermentation')}
                    {renderTestField('dSorbitol', 'D-Sorbitol Fermentation')}
                    {renderTestField('lArabinose', 'L-Arabinose Fermentation')}
                    {renderTestField('raffinose', 'Raffinose Fermentation')}
                    {renderTestField('lRhamnose', 'L-Rhamnose')}
                  </div>
                </div>

                {/* Other Tests */}
                <div className="test-category">
                  <h3>Other Tests</h3>
                  <div className="test-group">
                    {renderTestField('KCN', 'Growth in KCN')}
                    {renderTestField('Gelatin', 'Gelatin Hydrolysis')}
                    {renderTestField('DNAse', 'DNAse Test')}
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button type="button" className="identify-btn" onClick={identifyBacteria}>
                  <i className="fas fa-search"></i> Identify Bacteria
                </button>
                <button type="button" className="reset-btn" onClick={resetTests}>
                  <i className="fas fa-redo"></i> Reset All Tests
                </button>
              </div>
            </section>

            <section id="result">
              <h2><i className="fas fa-microscope"></i> Identification Result</h2>
              <div className="result-container">
                <p id="result-text" dangerouslySetInnerHTML={{ __html: resultText }}></p>
              </div>
            </section>

            <div id="educational-notes" dangerouslySetInnerHTML={{ __html: educationalNotes }}></div>
          </>
        ) : (
          <div id="quiz-mode">
            <div className="quiz-container">
              <h3>Guess the Bacteria</h3>
              <div id="quiz-tests">
                {quizBacteria && (
                  <>
                    <p><strong>Positive Tests:</strong></p>
                    <div>
                      {Object.entries(bacteriaProfiles[quizBacteria])
                        .filter(([_, result]) => result === "+")
                        .map(([test]) => (
                          <span key={test}>{formatTestName(test)}</span>
                        ))}
                    </div>
                  </>
                )}
              </div>
              <input 
                type="text" 
                id="guess-input" 
                placeholder="Enter organism name..." 
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
              />
              <button id="submit-guess" onClick={checkGuess}>Submit Guess</button>
              <div id="quiz-feedback" dangerouslySetInnerHTML={{ __html: quizFeedback }}></div>
            </div>
            <button id="new-quiz" onClick={generateQuizQuestion}>New Question</button>
          </div>
        )}
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-about">
              <h3>About This Project</h3>
              <p>This free tool was created by a microbiology lab technologist to help students and professionals with bacterial identification. It's based on standard biochemical test patterns used in clinical laboratories.</p>
            </div>
            
            <div className="footer-socials">
              <h3>Connect</h3>
              <div className="social-icons">
                <a href="https://instagram.com/franzescuzar" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
                <a href="mailto:learnmicrobes@outlook.com?subject=Question%20About%20LearnMicrobes" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-envelope"></i> Email Us
                </a>
              </div>
            </div>
            
            <div className="footer-roadmap">
              <h3>What's Coming Next</h3>
              <ul>
                <li>✓ Current: Enterobacteriaceae ID</li>
                <li>→ Next: Gram-positive ID Tool</li>
                <li>→ Future: Gram-negative ID Tool</li>
                <li>→ Future: Mobile App Version</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-copyright">
            <p>&copy; 2025 LearnMicrobes.com | Made for educational purposes</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BioCalculator;
