import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  Leaf, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  FileSpreadsheet, 
  CheckCircle2, 
  XCircle, 
  PlusCircle, 
  HeartHandshake, 
  AlertCircle,
  Download,
  Award,
  Sparkles
} from 'lucide-react';
import { MOCK_ADMIN_METRICS } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    donationDrives, 
    showToast, 
    marketplaceItems 
  } = useApp();

  const [verificationRequests, setVerificationRequests] = useState([
    { id: 'req-1', name: 'Kavita Singh', rollNo: '23CS1088', dept: 'CSE 3rd Sem', idCardUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80', date: '10 mins ago', status: 'pending' },
    { id: 'req-2', name: 'Tanmay Verma', rollNo: '24EC0452', dept: 'ECE 2nd Sem', idCardUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80', date: '25 mins ago', status: 'pending' },
    { id: 'req-3', name: 'Divya Iyer', rollNo: '22ME0119', dept: 'Mech 6th Sem', idCardUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80', date: '1 hour ago', status: 'pending' }
  ]);

  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [newDriveTitle, setNewDriveTitle] = useState('');
  const [newDriveTarget, setNewDriveTarget] = useState(100);

  const handleApproveStudent = (id: string, name: string) => {
    setVerificationRequests(prev => prev.filter(r => r.id !== id));
    showToast('Student ID Verified', `${name} is now approved with the Campus Verified badge.`, 'success');
  };

  const handleExportAuditReport = () => {
    showToast('Generating Green Audit Report', 'Compiling NIET 2026 NAAC / AICTE Circular Sustainability Report…', 'info');
    setTimeout(() => {
      showToast('Report Downloaded 📄', 'CampusCycle_Sustainability_Audit_2026.pdf ready.', 'success');
    }, 1200);
  };

  return (
    <div id="campus-admin-dashboard" className="space-y-8 pb-20 max-w-6xl mx-auto">
      
      {/* 1. ADMIN HEADER */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-lime-300 text-xs font-bold border border-emerald-700">
            <Building2 className="w-3.5 h-3.5" />
            <span>NIET Campus Administration & Green Committee</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif]">
            Campus Circular Economy Console
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl">
            Real-time environmental compliance, student ID verification, and circular exchange audits for NAAC Criterion VII certification.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportAuditReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export NAAC Audit Report</span>
          </button>
        </div>
      </div>

      {/* 2. CAMPUS-WIDE MACRO KPI TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Active Students</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
            {MOCK_ADMIN_METRICS.totalStudentsRegistered.toLocaleString()}
          </p>
          <p className="text-[10px] text-emerald-700 font-semibold">{MOCK_ADMIN_METRICS.verifiedStudentsPercent}% Verified Student IDs</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Items Circulated</span>
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
            {MOCK_ADMIN_METRICS.totalItemsReused.toLocaleString()}
          </p>
          <p className="text-[10px] text-emerald-700 font-semibold">{marketplaceItems.length} Live listings today</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Landfill Diverted</span>
            <Leaf className="w-4 h-4 text-lime-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
            {MOCK_ADMIN_METRICS.totalLandfillPreventedKg.toLocaleString()} kg
          </p>
          <p className="text-[10px] text-emerald-700 font-semibold">≈ 42,000 kg CO₂ Equivalent</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Student Savings</span>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
            ₹{MOCK_ADMIN_METRICS.totalMoneySavedRs.toLocaleString()}
          </p>
          <p className="text-[10px] text-emerald-700 font-semibold">Circulated within student body</p>
        </div>

      </div>

      {/* 3. CATEGORY COMPOSITION & IMPACT HEATMAP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Circular Category Volume Breakdown */}
        <div className="lg:col-span-6 bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
            Circular Item Flow by Category
          </h3>
          
          <div className="space-y-3 pt-2">
            {[
              { label: 'Books & Textbooks', count: 1240, percent: 36, color: 'bg-emerald-600' },
              { label: 'Electronics & Calculators', count: 850, percent: 25, color: 'bg-teal-600' },
              { label: 'Engineering Supplies & Drafters', count: 620, percent: 18, color: 'bg-amber-600' },
              { label: 'Campus Cycles & Mobility', count: 480, percent: 14, color: 'bg-lime-600' },
              { label: 'Hostel Furniture & Misc', count: 240, percent: 7, color: 'bg-emerald-800' }
            ].map(cat => (
              <div key={cat.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                  <span>{cat.label}</span>
                  <span className="text-emerald-700">{cat.count} items ({cat.percent}%)</span>
                </div>
                <div className="w-full bg-emerald-50 rounded-full h-2 overflow-hidden border border-emerald-100">
                  <div className={`${cat.color} h-full rounded-full transition-all`} style={{ width: `${cat.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Student ID Verification Queue */}
        <div className="lg:col-span-6 bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Pending Student ID Approvals
            </h3>
            <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
              {verificationRequests.length} Pending
            </span>
          </div>

          <div className="divide-y divide-emerald-50 max-h-72 overflow-y-auto">
            {verificationRequests.length === 0 ? (
              <p className="text-xs text-emerald-700 py-6 text-center">All campus student ID verification requests resolved.</p>
            ) : (
              verificationRequests.map(req => (
                <div key={req.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={req.idCardUrl} alt="" className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-200" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-950">{req.name}</h4>
                      <p className="text-[10px] text-emerald-700">{req.rollNo} • {req.dept}</p>
                      <span className="text-[9px] text-emerald-600">{req.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleApproveStudent(req.id, req.name)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 4. ACTIVE DRIVES MANAGEMENT */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Campus Donation Drives Management
            </h3>
            <p className="text-xs text-emerald-700">Official drives sanctioned by Dean Student Welfare</p>
          </div>

          <button
            onClick={() => setIsDriveModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch New Campus Drive</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {donationDrives.map(drive => (
            <div key={drive.id} className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/70 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">{drive.organizer}</span>
              <h4 className="text-xs font-bold text-emerald-950 line-clamp-1">{drive.title}</h4>
              <div className="text-xs text-emerald-850 font-medium">
                Collected: <strong>{drive.currentCount}</strong> / {drive.targetCount} items
              </div>
              <div className="w-full bg-white rounded-full h-1.5 overflow-hidden border border-emerald-200">
                <div className="bg-amber-600 h-full" style={{ width: `${(drive.currentCount / drive.targetCount) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LAUNCH DRIVE MODAL */}
      {isDriveModalOpen && (
        <div className="fixed inset-0 z-50 bg-emerald-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-100 space-y-4">
            <h3 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Launch Official Campus Donation Drive
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">Drive Name</label>
                <input
                  type="text"
                  value={newDriveTitle}
                  onChange={e => setNewDriveTitle(e.target.value)}
                  placeholder="e.g. End-of-Semester Textbook Pass-on Drive"
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">Target Item Goal</label>
                <input
                  type="number"
                  value={newDriveTarget}
                  onChange={e => setNewDriveTarget(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsDriveModalOpen(false)}
                className="flex-1 py-2.5 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Campus Drive Sanctioned! 📢', `"${newDriveTitle || 'New Drive'}" is now live for student drop-offs.`, 'success');
                  setIsDriveModalOpen(false);
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                Publish Campus Drive
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
