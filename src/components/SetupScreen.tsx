import React from 'react';
import { Database, Key, Settings } from 'lucide-react';

export default function SetupScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <Database size={32} />
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Supabase Setup Required</h1>
        <p className="text-slate-600 text-center mb-8">
          To run this affiliate site, you need to connect it to your Supabase project.
        </p>

        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="bg-slate-100 p-2 rounded-lg mt-1"><Settings size={20} className="text-slate-600" /></div>
            <div>
              <h3 className="font-semibold text-slate-900">1. Open Settings</h3>
              <p className="text-sm text-slate-600">Click the gear icon in the top right corner of AI Studio.</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="bg-slate-100 p-2 rounded-lg mt-1"><Key size={20} className="text-slate-600" /></div>
            <div>
              <h3 className="font-semibold text-slate-900">2. Add Secrets</h3>
              <p className="text-sm text-slate-600">Add the following environment variables:</p>
              <ul className="mt-2 space-y-2 text-sm font-mono text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <li>VITE_SUPABASE_URL</li>
                <li>VITE_SUPABASE_ANON_KEY</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 text-blue-800 text-sm rounded-lg border border-blue-100">
          <strong>Note:</strong> The app will automatically rebuild and connect once you add these secrets.
        </div>
      </div>
    </div>
  );
}
