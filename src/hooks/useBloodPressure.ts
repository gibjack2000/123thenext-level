import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface BloodPressureLog {
  id?: string;
  user_id: string;
  systolic_mmhg: number;
  diastolic_mmhg: number;
  pulse_bpm: number;
  sleep_hours?: number;
  hrv_ms?: number;
  logged_at?: string;
  notes?: string;
}

export type BloodPressureStatus = 'Optimal' | 'Elevated' | 'Stage 1 Hypertension' | 'Stage 2 Hypertension';

export function useBloodPressure() {
  const [logs, setLogs] = useState<BloodPressureLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBPLogs = async () => {
    setLoading(true);
    setError(null);
    
    if (!supabase) {
      const local = localStorage.getItem('blood_pressure_logs_cache');
      if (local) {
        try {
          setLogs(JSON.parse(local));
        } catch (e) {
          console.error('Failed to parse cached blood pressure logs:', e);
        }
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('blood_pressure_logs')
        .select('*')
        .order('logged_at', { ascending: false });

      if (fetchError) throw fetchError;
      setLogs(data || []);
      
      // Sync cache
      localStorage.setItem('blood_pressure_logs_cache', JSON.stringify(data || []));
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve blood pressure logs.');
      // Load fallback on error
      const local = localStorage.getItem('blood_pressure_logs_cache');
      if (local) {
        try { setLogs(JSON.parse(local)); } catch {}
      }
    } finally {
      setLoading(false);
    }
  };

  const saveBPLog = async (systolic: number, diastolic: number, pulse: number, sleepHours: number, hrvMs: number, notes?: string) => {
    setLoading(true);
    setError(null);

    // Dynamic session/user ID fallback
    let userId = 'anonymous-user';
    try {
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) userId = user.id;
      }
    } catch (authErr) {
      console.warn('Auth check skipped:', authErr);
    }

    if (userId === 'anonymous-user') {
      userId = localStorage.getItem('urinalysis_session_id') || 'anonymous-user';
    }

    const newLog: BloodPressureLog = {
      user_id: userId,
      systolic_mmhg: systolic,
      diastolic_mmhg: diastolic,
      pulse_bpm: pulse,
      sleep_hours: sleepHours,
      hrv_ms: hrvMs,
      notes: notes || ''
    };

    if (!supabase) {
      // Local storage fallback for unconfigured environments
      const localLog: BloodPressureLog = {
        ...newLog,
        id: Math.random().toString(36).substring(2, 11).toUpperCase(),
        logged_at: new Date().toISOString()
      };
      const updatedLogs = [localLog, ...logs];
      setLogs(updatedLogs);
      localStorage.setItem('blood_pressure_logs_cache', JSON.stringify(updatedLogs));
      setLoading(false);
      return localLog;
    }

    try {
      const { data, error: insertError } = await supabase
        .from('blood_pressure_logs')
        .insert([newLog])
        .select()
        .single();

      if (insertError) throw insertError;
      setLogs((prev) => [data, ...prev]);
      
      // Update cache
      const currentCache = JSON.parse(localStorage.getItem('blood_pressure_logs_cache') || '[]');
      localStorage.setItem('blood_pressure_logs_cache', JSON.stringify([data, ...currentCache]));
      
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to save biometric reading.');
      // Add local save fallback on network insert failure
      const localLog: BloodPressureLog = {
        ...newLog,
        id: 'LOC-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        logged_at: new Date().toISOString(),
        notes: (notes || '') + ' (Offline Cache)'
      };
      const updatedLogs = [localLog, ...logs];
      setLogs(updatedLogs);
      localStorage.setItem('blood_pressure_logs_cache', JSON.stringify(updatedLogs));
      return localLog;
    } finally {
      setLoading(false);
    }
  };

  const classifyBloodPressure = (systolic: number, diastolic: number): { status: BloodPressureStatus; colorClass: string; description: string } => {
    if (systolic < 120 && diastolic < 80) {
      return {
        status: 'Optimal',
        colorClass: 'text-green-400 border-green-500/20 bg-green-500/5',
        description: 'Optimal Arterial Tension • Low Vascular Load'
      };
    } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
      return {
        status: 'Elevated',
        colorClass: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5',
        description: 'Elevated • Monitor Hydration & Autonomic Vagal Tone'
      };
    } else if ((systolic >= 130 && systolic <= 139) || (diastolic >= 80 && diastolic <= 89)) {
      return {
        status: 'Stage 1 Hypertension',
        colorClass: 'text-orange-400 border-orange-500/30 bg-orange-500/5',
        description: 'Vascular Warning (Stage I) • Track closely and review with your GP'
      };
    } else {
      return {
        status: 'Stage 2 Hypertension',
        colorClass: 'text-red-400 border-red-500/40 bg-red-500/5 pulse-subtle',
        description: 'High Vascular Load Flagged • Mandatory Physician Review Advised'
      };
    }
  };

  useEffect(() => {
    fetchBPLogs();
  }, []);

  return { logs, loading, error, saveBPLog, fetchBPLogs, classifyBloodPressure };
}
