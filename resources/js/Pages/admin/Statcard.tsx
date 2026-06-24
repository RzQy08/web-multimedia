// src/app/admin/StatCard.tsx
import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: any;
  color: string;
}

export function StatCard({ label, value, sub, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{label}</p>
        <div className={`p-2 rounded-lg ${color}`}><Icon size={14} className="text-white" /></div>
      </div>
      <p className="text-2xl font-800 text-gray-900 mb-0.5" style={{ fontWeight: 800 }}>{value}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}