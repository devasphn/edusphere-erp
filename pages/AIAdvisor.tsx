import React, { useState, useRef, useEffect } from 'react';
import { generateStrategicAdvice } from '../services/geminiService';
import { useData } from '../context/DataContext';
import { BrainCircuit, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SUGGESTIONS = [
  "Analyze the current budget efficiency and propose cuts.",
  "Draft a strategy to improve student attendance in Grade 11.",
  "Evaluate the feasibility of adding a new Robotics lab.",
  "Write a circular for parents about the new fee structure.",
];

export const AIAdvisor: React.FC = () => {
  const { stats, financials } = useData();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0); 
  const responseEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 4);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (response) {
      responseEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse(null);
    setLoadingStep(0);

    // Use dynamic data from context
    const contextData = `
      Current Stats: ${JSON.stringify(stats)}
      Financials (Last 6 Months): ${JSON.stringify(financials)}
    `;

    try {
      const result = await generateStrategicAdvice(query, contextData);
      setResponse(result);
    } catch (err) {
      setResponse("I encountered an issue while processing your strategic request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const thinkingMessages = [
    "Analyzing institutional data...",
    "Formulating strategic scenarios...",
    "Evaluating risk factors...",
    "Synthesizing final recommendations...",
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium border border-red-200">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Gemini 3 Pro • Deep Thinking Mode Enabled</span>
        </div>
        <h2 className="text-4xl font-bold text-red-900">Strategic AI Advisor</h2>
        <p className="text-red-600 max-w-2xl mx-auto">
          Leverage advanced AI reasoning to solve complex institutional challenges. 
          The model uses an extended thinking budget to provide deep, actionable insights.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-xl shadow-red-100/50 border border-red-100 p-2">
        <div className="relative">
          <textarea 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a complex strategic question (e.g., 'Analyze our financial trend and suggest 3 ways to optimize teacher allocation for next semester')..."
            className="w-full min-h-[120px] p-6 pr-32 text-lg text-red-900 placeholder:text-red-300 border-none outline-none resize-none rounded-xl"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button 
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                loading || !query.trim()
                  ? 'bg-red-50 text-red-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/30 hover:scale-105'
              }`}
            >
              {loading ? (
                <>
                  <BrainCircuit className="w-5 h-5 animate-pulse" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Quick Suggestions */}
        {!response && !loading && (
          <div className="px-6 pb-6 pt-2">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">Suggested Strategic Queries</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => setQuery(s)}
                  className="text-sm px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 rounded-lg border border-red-200 hover:border-red-300 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading State - Thinking Visualization */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
            <BrainCircuit className="absolute inset-0 m-auto w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold text-red-900">{thinkingMessages[loadingStep]}</h3>
            <p className="text-red-500 text-sm">This deep analysis may take up to 30 seconds.</p>
          </div>
        </div>
      )}

      {/* Result Section */}
      {response && (
        <div className="animate-fade-in-up bg-white rounded-2xl shadow-sm border border-red-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-50 to-white px-8 py-4 border-b border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-red-900">Strategic Analysis Report</h3>
            </div>
            <span className="text-xs font-medium text-red-500 bg-white px-3 py-1 rounded-full border border-red-200">
              Generated by Gemini 3 Pro
            </span>
          </div>
          
          <div className="p-8 prose prose-red max-w-none prose-headings:font-bold prose-headings:text-red-900 prose-p:text-red-700 prose-a:text-red-600 hover:prose-a:text-red-500 prose-strong:text-red-900 prose-ul:list-disc prose-li:marker:text-red-400">
             <ReactMarkdown>{response}</ReactMarkdown>
          </div>

          <div className="bg-red-50 px-8 py-4 border-t border-red-100 flex justify-between items-center">
             <div className="flex items-center gap-2 text-sm text-red-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Analysis Complete</span>
             </div>
             <button 
               onClick={() => { setResponse(null); setQuery(''); }}
               className="text-sm font-medium text-red-600 hover:text-red-800"
             >
               Start New Analysis
             </button>
          </div>
          <div ref={responseEndRef} />
        </div>
      )}
    </div>
  );
};