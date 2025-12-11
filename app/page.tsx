"use client";

import React, { useState } from 'react';
import { AlertCircle, X, Sparkles, User, Map, Brain, TreeDeciduous, Shield } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // The Logic to call your Brain (works with both Real AI and Mock Mode)
  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          childAge: 7, // Default age
          userId: '00000000-0000-0000-0000-000000000000' // Matches the Test User we created
        })
      });

      const data = await res.json();
      
      if (res.status === 403) {
        alert("Limit reached! Please upgrade.");
      } else if (data.ai_response) {
        setResponse(data.ai_response);
      } else {
        setResponse("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setResponse("Failed to connect. Make sure your server is running.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans p-6">
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">STURDY</h1>
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">
          <User className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium">Liam (7)</span>
        </div>
      </header>

      {/* --- SOS HERO BUTTON (The Main Feature) --- */}
      <div className="max-w-md mx-auto mb-10">
        <div 
          onClick={() => setIsModalOpen(true)}
          className="relative group cursor-pointer w-full"
        >
          {/* Pulse Animation Layer */}
          <div className="absolute -inset-1 bg-[#CA8A04] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
          
          {/* Button Body */}
          <div className="relative bg-[#CA8A04] rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg transform transition group-hover:scale-[1.02] active:scale-95">
            <div className="bg-white/20 p-3 rounded-full mb-3">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide">I NEED HELP NOW</h2>
            <p className="text-white/80 text-sm mt-2 font-medium">Get a script for the turbulence</p>
          </div>
        </div>
      </div>

      {/* --- MODULES GRID (Visual Only for MVP) --- */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 h-32 flex flex-col justify-end hover:shadow-md transition cursor-pointer">
          <Map className="w-6 h-6 text-slate-400 mb-2" />
          <span className="font-semibold text-sm">Sturdy Leader</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 h-32 flex flex-col justify-end hover:shadow-md transition cursor-pointer">
          <Brain className="w-6 h-6 text-slate-400 mb-2" />
          <span className="font-semibold text-sm">Exec. Function</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 h-32 flex flex-col justify-end hover:shadow-md transition cursor-pointer">
          <TreeDeciduous className="w-6 h-6 text-slate-400 mb-2" />
          <span className="font-semibold text-sm">Resilience</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 h-32 flex flex-col justify-end hover:shadow-md transition cursor-pointer">
          <Shield className="w-6 h-6 text-slate-400 mb-2" />
          <span className="font-semibold text-sm">Social Wiring</span>
        </div>
      </div>

      {/* --- INTERACTION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">What is happening?</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <textarea
              className="w-full h-32 bg-slate-50 rounded-xl p-4 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CA8A04]/20 resize-none mb-4 placeholder:text-slate-400"
              placeholder="e.g. He lied about his homework..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !input}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all
                ${loading ? 'bg-slate-100 text-slate-400' : 'bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-lg'}
              `}
            >
              {loading ? (
                <span className="animate-pulse">Connecting to Sturdy...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Script</span>
                </>
              )}
            </button>

            {/* AI RESPONSE AREA */}
            {response && (
              <div className="mt-6 bg-[#F1F5F9] p-5 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#CA8A04] tracking-wider uppercase">
                  <Sparkles className="w-3 h-3" /> Sturdy Says:
                </div>
                <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-[15px]">
                  {response}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}