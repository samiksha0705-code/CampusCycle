import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  Medal, 
  Flame, 
  Leaf, 
  Building, 
  GraduationCap, 
  User, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { MOCK_LEADERBOARD_STUDENTS } from '../data/mockData';

export const LeaderboardView: React.FC = () => {
  const { currentUser } = useApp();
  const [activeLeaderboardType, setActiveLeaderboardType] = useState<'students' | 'hostels' | 'departments'>('students');

  const hostelRankings = [
    { rank: 1, name: 'Aryabhatta Hostel (Boys Block B)', points: 14250, co2: 380, students: 240, items: 310 },
    { rank: 2, name: 'Kalpana Chawla Hall (Girls Block A)', points: 12890, co2: 345, students: 215, items: 285 },
    { rank: 3, name: 'Ramanujan Hostel (Boys Block C)', points: 9400, co2: 260, students: 180, items: 195 },
    { rank: 4, name: 'Gargi Hostel (Girls Block B)', points: 8150, co2: 210, students: 150, items: 160 }
  ];

  const deptRankings = [
    { rank: 1, name: 'Computer Science & Engineering', points: 28400, co2: 780, students: 520, items: 640 },
    { rank: 2, name: 'Mechanical Engineering (Makerspace)', points: 22100, co2: 610, students: 380, items: 490 },
    { rank: 3, name: 'Electronics & Communication', points: 18500, co2: 490, students: 310, items: 390 },
    { rank: 4, name: 'Civil & Environmental Studies', points: 14300, co2: 410, students: 240, items: 320 }
  ];

  return (
    <div id="campus-leaderboard-view" className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* 1. HEADER & PODIUM INTRO */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 text-xs font-bold border border-lime-400/30">
          <Trophy className="w-4 h-4 text-lime-400" />
          <span>NIET Campus Eco Champions (Spring 2026)</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight">
          Campus Circular Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl mx-auto leading-relaxed">
          Celebrating the students, hostel wings, and departments preventing the most campus landfill waste and leading circular sustainability.
        </p>

        {/* Toggle Pills */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {[
            { id: 'students', label: 'Top Students', icon: User },
            { id: 'hostels', label: 'Hostel Wings', icon: Building },
            { id: 'departments', label: 'Departments', icon: GraduationCap }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeLeaderboardType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLeaderboardType(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-lime-400 text-emerald-950 shadow-md font-extrabold' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. STUDENTS TOP 3 PODIUM */}
      {activeLeaderboardType === 'students' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
          {/* #2 Priya */}
          <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs text-center space-y-3 order-2 md:order-1">
            <div className="relative inline-block">
              <img src={MOCK_LEADERBOARD_STUDENTS[1].avatar} alt="" className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-300 mx-auto" />
              <span className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full bg-slate-400 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                2
              </span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-emerald-950">{MOCK_LEADERBOARD_STUDENTS[1].name}</h3>
              <p className="text-[11px] text-emerald-700">{MOCK_LEADERBOARD_STUDENTS[1].department}</p>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-2xl">
              <span className="text-sm font-extrabold text-emerald-950">{MOCK_LEADERBOARD_STUDENTS[1].points} pts</span>
              <span className="text-[10px] text-emerald-700 block">{MOCK_LEADERBOARD_STUDENTS[1].co2SavedKg}kg CO₂ Avoided</span>
            </div>
          </div>

          {/* #1 Rahul (Gold Center) */}
          <div className="bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 rounded-3xl p-8 shadow-md text-center space-y-3 order-1 md:order-2 scale-102">
            <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-extrabold uppercase">
              👑 Campus Circular Champion
            </div>
            <div className="relative inline-block">
              <img src={MOCK_LEADERBOARD_STUDENTS[0].avatar} alt="" className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-400 mx-auto" />
              <span className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-sm flex items-center justify-center shadow-sm">
                1
              </span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-emerald-950">{MOCK_LEADERBOARD_STUDENTS[0].name}</h3>
              <p className="text-xs text-emerald-700 font-semibold">{MOCK_LEADERBOARD_STUDENTS[0].department}</p>
            </div>
            <div className="p-3 bg-amber-100/60 rounded-2xl border border-amber-200">
              <span className="text-lg font-extrabold text-emerald-950">{MOCK_LEADERBOARD_STUDENTS[0].points} Eco Points</span>
              <span className="text-xs text-amber-900 font-bold block">{MOCK_LEADERBOARD_STUDENTS[0].itemsReused} Items Kept in Second Life</span>
            </div>
          </div>

          {/* #3 Alex (Current User / Bronze) */}
          <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs text-center space-y-3 order-3">
            <div className="relative inline-block">
              <img src={currentUser.avatar} alt="" className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-700 mx-auto" />
              <span className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full bg-amber-700 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                3
              </span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-emerald-950">{currentUser.name} (You)</h3>
              <p className="text-[11px] text-emerald-700">{currentUser.department}</p>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-2xl">
              <span className="text-sm font-extrabold text-emerald-950">{currentUser.ecoPoints} pts</span>
              <span className="text-[10px] text-emerald-700 block">{currentUser.co2SavedKg}kg CO₂ Avoided</span>
            </div>
          </div>

        </div>
      )}

      {/* 3. DETAILED TABLE RANKINGS */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
          Full Campus Standing
        </h2>

        {activeLeaderboardType === 'students' && (
          <div className="divide-y divide-emerald-50">
            {MOCK_LEADERBOARD_STUDENTS.map(student => {
              const isMe = student.id === currentUser.id;
              return (
                <div
                  key={student.id}
                  className={`p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-3 transition-colors ${
                    isMe ? 'bg-emerald-50/80 border border-emerald-300' : 'hover:bg-emerald-50/30'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold ${
                      student.rank === 1 ? 'bg-amber-400 text-emerald-950' : student.rank === 2 ? 'bg-slate-300 text-emerald-950' : student.rank === 3 ? 'bg-amber-700 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      #{student.rank}
                    </span>

                    <img src={student.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-1 ring-emerald-200" />

                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-emerald-950 flex items-center gap-1.5">
                        <span>{student.name}</span>
                        {isMe && <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.2 rounded-full font-bold">You</span>}
                      </h4>
                      <p className="text-[11px] text-emerald-700">{student.department}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-emerald-950">{student.points} Pts</span>
                    <span className="text-[10px] text-emerald-700 block">{student.itemsReused} items • {student.co2SavedKg}kg CO₂</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeLeaderboardType === 'hostels' && (
          <div className="divide-y divide-emerald-50">
            {hostelRankings.map(hostel => (
              <div key={hostel.name} className="p-4 flex items-center justify-between hover:bg-emerald-50/30 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                    #{hostel.rank}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950">{hostel.name}</h4>
                    <p className="text-[11px] text-emerald-700">{hostel.students} Active Residents • {hostel.items} Items Circulated</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-emerald-950">{hostel.points.toLocaleString()} Pts</span>
                  <span className="text-[10px] text-emerald-700 block">{hostel.co2}kg CO₂ Offset</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeLeaderboardType === 'departments' && (
          <div className="divide-y divide-emerald-50">
            {deptRankings.map(dept => (
              <div key={dept.name} className="p-4 flex items-center justify-between hover:bg-emerald-50/30 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                    #{dept.rank}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950">{dept.name}</h4>
                    <p className="text-[11px] text-emerald-700">{dept.students} Students • {dept.items} Items Circulated</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-emerald-950">{dept.points.toLocaleString()} Pts</span>
                  <span className="text-[10px] text-emerald-700 block">{dept.co2}kg CO₂ Offset</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
