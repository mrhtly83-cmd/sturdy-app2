'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';

export default function Home() {
  const [childAge, setChildAge] = useState('5');
  
  // This hook handles the streaming automatically
  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
    api: '/api/generate-script',
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      
      {/* HEADER */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">STURDY</h1>
        <p className="text-slate-500 mt-2">Parenting Scripts for Tough Moments</p>
      </header>

      {/* MAIN CARD */}
      <main className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
        
        <div className="p-6 space-y-6">
          
          {/* Age Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Child's Age</label>
            <select 
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="2">Toddler (2-3)</option>
              <option value="5">Young Child (4-6)</option>
              <option value="8">Big Kid (7-9)</option>
              <option value="12">Pre-Teen (10-12)</option>
            </select>
          </div>

          {/* Problem Input */}
          <form onSubmit={(e) => {
             // Pass extra data (childAge) along with the prompt
             handleSubmit(e, { body: { childAge } });
          }}>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">What is happening?</label>
              <textarea 
                value={input}
                onChange={handleInputChange}
                className="w-full p-3 h-32 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="e.g. He refused to put on his shoes..."
              />
            </div>

            {/* BUTTON */}
            <button 
              disabled={isLoading || !input}
              type="submit"
              className="w-full mt-6 bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <span>Thinking...</span> 
              ) : (
                <>
                  <span>✨ Generate Script</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* OUTPUT AREA - This updates in real-time now */}
        {(completion || isLoading) && (
          <div className="bg-blue-50 p-6 border-t border-blue-100">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              ✨ Sturdy Says:
            </h3>
            <div className="prose text-slate-800 leading-relaxed whitespace-pre-wrap">
              {completion}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}