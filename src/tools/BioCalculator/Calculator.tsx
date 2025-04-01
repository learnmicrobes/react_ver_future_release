import React, { useState } from 'react';
import './calculator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faQuestionCircle, faSpinner, faSearch, faRedo, faFlask, faMicroscope 
 } from '@fortawesome/free-solid-svg-icons';

type TestResult = '+' | '-' | '';
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

const bacteriaProfiles: BacteriaProfiles = {
  "Escherichia coli": {
      indole: "+",
      methylRed: "+",
      vogesProskauer: "-",
      citrate: "-",
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
      adonitol: "-",
      inositol: "-",
      dSorbitol: "+",
      lArabinose: "+",
      raffinose: "+",
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
      methylRed: "+",
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
      lactose: "+",
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
      indole: "+",
      methylRed: "+",
      vogesProskauer: "-",
      citrate: "-",
      h2s: "-",
      urea: "-",
      motility: "-",
      lysineDecarboxylase: "-",
      arginineDihydrolase: "+",
      ornithineDecarboxylase: "-",
      phenylalanineDeaminase: "-",
      gasFromDGlucose: "-",
      lactose: "-",
      sucrose: "-",
      dMannitol: "+",
      adonitol: "-",
      inositol: "-",
      dSorbitol: "+",
      lArabinose: "+",
      raffinose: "+",
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
      methylRed: "+",
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
      phenylalanineDeaminase: "-",
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
      methylRed: "+",
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
      inositol: "+",
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
      vogesProskauer: "+",
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
      motility: "+",
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
      sucrose: "+",
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
      indole: "+",
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

const TestCategoryComponent: React.FC<{
  title: string;
  tests: Test[];
  selectedTests: Record<string, boolean>;
  onTestChange: (testId: string) => void;
}> = ({ title, tests, selectedTests, onTestChange }) => (
  <div className="test-category">
    <h3>{title}</h3>
    {tests.map(test => (
      <label key={test.id}>
        <input
          type="checkbox"
          id={test.id}
          checked={selectedTests[test.id] || false}
          onChange={() => onTestChange(test.id)}
        />
        {test.label}
      </label>
    ))}
  </div>
);

const ResultItem: React.FC<{
  bacteria: string;
  matchPercentage: string;
  totalRelevantTests: number;
}> = ({ bacteria, matchPercentage, totalRelevantTests }) => {
  const percentage = parseFloat(matchPercentage);
  let colorClass = "";
  
  if (percentage > 80) {
    colorClass = "high-match";
  } else if (percentage > 50) {
    colorClass = "medium-match";
  } else {
    colorClass = "low-match";
  }
  
  return (
    <li className={colorClass}>
      {bacteria}: <strong>{matchPercentage}%</strong> match ({totalRelevantTests} tests considered)
    </li>
  );
};

const Calculator: React.FC = () => {
  const [mode, setMode] = useState<'calculator' | 'quiz'>('calculator');
  const [selectedTests, setSelectedTests] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<Result[]>([]);
  const [quizBacteria, setQuizBacteria] = useState<string | null>(null);
  const [userGuess, setUserGuess] = useState('');
  const [quizFeedback, setQuizFeedback] = useState<React.ReactNode>('');

  const testCategories: TestCategory[] = [
    {
      title: "Common Tests",
      tests: [
        { id: "indole", label: "Indole Test" },
        { id: "methylRed", label: "Methyl Red Test" },
        { id: "vogesProskauer", label: "Voges Proskauer Test" },
        { id: "citrate", label: "Simmons' Citrate Test" },
        { id: "h2s", label: "Hydrogen Sulfide (H2S) Test" },
        { id: "urea", label: "Urea Test" },
        { id: "motility", label: "Motility Test" }
      ]
    },
    {
      title: "Decarboxylase Tests",
      tests: [
        { id: "lysineDecarboxylase", label: "Lysine Decarboxylase" },
        { id: "arginineDihydrolase", label: "Arginine Dihydrolase" },
        { id: "ornithineDecarboxylase", label: "Ornithine Decarboxylase" },
        { id: "phenylalanineDeaminase", label: "Phenylalanine Deaminase" }
      ]
    },
    {
      title: "Carbohydrate Fermentation",
      tests: [
        { id: "gasFromDGlucose", label: "Gas from D-Glucose" },
        { id: "lactose", label: "Lactose Fermentation" },
        { id: "sucrose", label: "Sucrose Fermentation" },
        { id: "dMannitol", label: "D-Mannitol Fermentation" },
        { id: "adonitol", label: "Adonitol Fermentation" },
        { id: "inositol", label: "Inositol Fermentation" },
        { id: "dSorbitol", label: "D-Sorbitol Fermentation" },
        { id: "lArabinose", label: "L-Arabinose Fermentation" },
        { id: "raffinose", label: "Raffinose Fermentation" },
        { id: "lRhamnose", label: "L-Rhamnose" }
      ]
    },
    {
      title: "Other Tests",
      tests: [
        { id: "KCN", label: "Growth in KCN" },
        { id: "Gelatin", label: "Gelatin Hydrolysis" },
        { id: "DNAse", label: "DNAse Test" }
      ]
    }
  ];

  const formatTestName = (test: string): string => {
    return test
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace('D Glucose', 'D-Glucose');
  };

  const handleTestChange = (testId: string) => {
    setSelectedTests(prev => ({
      ...prev,
      [testId]: !prev[testId]
    }));
  };

  const identifyBacteria = () => {
    const selectedCount = Object.values(selectedTests).filter(Boolean).length;
    
    if (selectedCount === 0) {
      setResults([]);
      return;
    }

    let results: Result[] = [];
    for (const [bacteria, profile] of Object.entries(bacteriaProfiles)) {
      let matchScore = 0;
      let totalRelevantTests = 0;

      for (const [test, userResult] of Object.entries(selectedTests)) {
        if (profile[test] === "") continue;
        
        totalRelevantTests++;
        
        if ((profile[test] === "+" && userResult) || (profile[test] === "-" && !userResult)) {
          matchScore++;
        }
      }

      if (totalRelevantTests > 0) {
        const matchPercentage = ((matchScore / totalRelevantTests) * 100).toFixed(2);
        results.push({ bacteria, matchPercentage, totalRelevantTests });
      }
    }

    results.sort((a, b) => {
      if (b.matchPercentage !== a.matchPercentage) {
        return parseFloat(b.matchPercentage) - parseFloat(a.matchPercentage);
      }
      return b.totalRelevantTests - a.totalRelevantTests;
    });

    setResults(results);
  };

  const resetTests = () => {
    setSelectedTests({});
    setResults([]);
  };

  const generateQuizQuestion = () => {
    const bacteriaList = Object.keys(bacteriaProfiles);
    const randomBacteria = bacteriaList[Math.floor(Math.random() * bacteriaList.length)];
    setQuizBacteria(randomBacteria);
    setUserGuess('');
    setQuizFeedback('');
  };

  const getBacteriaCharacteristics = (name: string) => {
    const profile = bacteriaProfiles[name];
    if (!profile) return { positives: [], negatives: [] };
    
    const positives: string[] = [];
    const negatives: string[] = [];
    
    for (const [test, result] of Object.entries(profile)) {
      if (result === "+") positives.push(formatTestName(test));
      else if (result === "-") negatives.push(formatTestName(test));
    }
    
    return { positives, negatives };
  };

  const checkGuess = () => {
    if (!quizBacteria) return;
    
    if (userGuess.toLowerCase() === quizBacteria.toLowerCase()) {
      const { positives, negatives } = getBacteriaCharacteristics(quizBacteria);
      setQuizFeedback(
        <div>
          <p style={{ color: 'var(--success-color)' }}>✅ Correct! It's {quizBacteria}.</p>
          <div className="bacteria-info">
            <p><strong>Characteristics:</strong></p>
            <ul>
              {positives.length > 0 && <li><strong>Positive for:</strong> {positives.join(', ')}</li>}
              {negatives.length > 0 && <li><strong>Negative for:</strong> {negatives.join(', ')}</li>}
            </ul>
          </div>
        </div>
      );
    } else {
      setQuizFeedback(
        <div>
          <p style={{ color: 'var(--error-color)' }}>❌ Incorrect. Your guess: {userGuess || '[blank]'}</p>
          <button 
            className="btn small" 
            onClick={() => setQuizFeedback(
              <div>
                <p><strong>Correct answer:</strong> {quizBacteria}</p>
              </div>
            )}
          >
            Reveal Answer
          </button>
        </div>
      );
    }
  };

  return (
    <div className="app">
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
    <FontAwesomeIcon icon={faCalculator} /> Calculator
  </button>
  <button 
    className={`mode-btn ${mode === 'quiz' ? 'active' : ''}`}
    onClick={() => {
      setMode('quiz');
      generateQuizQuestion();
    }}
  >
    <FontAwesomeIcon icon={faQuestionCircle} /> Quiz Mode
  </button>
</div>

        {mode === 'calculator' ? (
          <div id="calculator-mode">
            <section id="calculator">
              <h2><FontAwesomeIcon icon={faFlask} /> Select Positive Biochemical Tests</h2>
              <form id="biochemical-form">
                {testCategories.map(category => (
                  <TestCategoryComponent
                    key={category.title}
                    title={category.title}
                    tests={category.tests}
                    selectedTests={selectedTests}
                    onTestChange={handleTestChange}
                  />
                ))}

                <div className="button-group">
                  <button type="button" className="identify-btn" onClick={identifyBacteria}>
                    <FontAwesomeIcon icon={faSearch} /> Identify Bacteria
                  </button>
                  <button type="button" className="reset-btn" onClick={resetTests}>
                    <FontAwesomeIcon icon={faRedo} /> Reset
                  </button>
                </div>
              </form>
            </section>

            <section id="result">
              <h2><FontAwesomeIcon icon={faMicroscope} /> Identification Result</h2>
              <div className="result-container">
                {results.length === 0 ? (
                  <p id="result-text">Select positive tests above to identify the bacteria.</p>
                ) : (
                  <>
                    <h3>Top Matches:</h3>
                    <ul>
                      {results.slice(0, 5).map((result, index) => (
                        <ResultItem key={index} {...result} />
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </section>
          </div>
        ) : (
          <div id="quiz-mode">
            <div className="quiz-container">
              <h3>Guess the Bacteria</h3>
              {quizBacteria && (
                <>
                  <div id="quiz-tests">
                    <p><strong>Positive Tests:</strong></p>
                    <div>
                      {Object.entries(bacteriaProfiles[quizBacteria])
                        .filter(([_, result]) => result === "+")
                        .map(([test]) => (
                          <span key={test}>{formatTestName(test)}</span>
                        ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    id="guess-input"
                    placeholder="Enter organism name..."
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                  />
                  <button id="submit-guess" onClick={checkGuess}>
                    Submit Guess
                  </button>
                  <div id="quiz-feedback">{quizFeedback}</div>
                </>
              )}
            </div>
            <button id="new-quiz" onClick={generateQuizQuestion}>
              New Question
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Calculator;