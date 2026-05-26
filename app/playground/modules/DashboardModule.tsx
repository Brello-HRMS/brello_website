"use client";

import { motion } from "framer-motion";
import { Users, CalendarCheck2, HandCoins, TrendingUp, ChevronRight, CheckCircle2 } from "lucide-react";
import { Employee, AttStatus, LeaveReq, Module } from "../types";

export function DashboardModule({
  employees,
  attendance,
  leaves,
  onSwitch,
}: {
  employees: Employee[];
  attendance: Record<number, AttStatus>;
  leaves: LeaveReq[];
  onSwitch: (m: Module) => void;
}) {
  const present = Object.values(attendance).filter((s) => s === "present").length;
  const pending = leaves.filter((l) => l.status === "pending").length;

  return (
    <div className="p-8 h-full overflow-y-auto bg-[#fcfcfd]">
      <div className="mb-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Greeting */}
        <div className="flex-1">
          <h1 className="text-[28px] font-bold text-gray-900 leading-tight">Good morning, Sarah!</h1>
          <p className="text-[15px] text-gray-500 mt-1.5">Here is your monthly overview.</p>
        </div>
        {/* Stats */}
        <div className="flex gap-4">
          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 flex flex-col gap-3 w-52 shadow-[0_2px_13px_0_rgba(71,84,103,0.05)] cursor-pointer hover:border-[#d0d5dd] transition-colors" onClick={() => onSwitch("employees")}>
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-medium text-gray-500">Total Employees</span>
              <Users className="text-gray-400" size={20} strokeWidth={2} />
            </div>
            <div className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">{employees.length}</div>
            <div className="flex items-center gap-1 text-[13px] font-medium text-green-700 mt-1">
              <TrendingUp size={16} strokeWidth={2.5} />
              <span>+2 vs last month</span>
            </div>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 flex flex-col gap-3 w-52 shadow-[0_2px_13px_0_rgba(71,84,103,0.05)] cursor-pointer hover:border-[#d0d5dd] transition-colors" onClick={() => onSwitch("attendance")}>
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-medium text-gray-500">Attendance</span>
              <CalendarCheck2 className="text-gray-400" size={20} strokeWidth={2} />
            </div>
            <div className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">{Math.round((present / employees.length) * 100)}%</div>
            <div className="text-[13px] font-medium text-gray-500 mt-1">{present} present today</div>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 flex flex-col gap-3 w-52 shadow-[0_2px_13px_0_rgba(71,84,103,0.05)] cursor-pointer hover:border-[#d0d5dd] transition-colors" onClick={() => onSwitch("payroll")}>
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-medium text-gray-500">Payroll</span>
              <HandCoins className="text-gray-400" size={20} strokeWidth={2} />
            </div>
            <div className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">₹4.2L</div>
            <div className="text-[13px] font-medium text-gray-500 mt-1">Disbursed this month</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Approvals */}
        <div className="col-span-3 bg-white border border-[#e5e7eb] rounded-[12px] overflow-hidden shadow-[0_2px_13px_0_rgba(71,84,103,0.05)] flex flex-col">
           <div className="px-5 py-4 border-b border-[#eaecf0] flex justify-between items-center bg-white">
             <h3 className="font-semibold text-gray-900 text-[15px]">Pending Approvals</h3>
             <span className="bg-[#fffbe6] text-[#d48806] px-2.5 py-1 rounded-md text-[13px] font-medium border border-[#ffe58f]">{pending} pending</span>
           </div>
           <div className="flex-1 bg-white">
             {leaves.filter(l => l.status === "pending").map(l => (
               <div key={l.id} className="px-5 py-4 border-b border-[#eaecf0] last:border-0 flex justify-between items-center cursor-pointer hover:bg-[#f9fafb] transition-colors group" onClick={() => onSwitch("leaves")}>
                 <div className="flex gap-4 items-center">
                   <div className="w-10 h-10 rounded-full bg-[#ede9f8] text-[#7F56D9] flex items-center justify-center font-bold text-sm">{l.empInitials}</div>
                   <div>
                     <p className="text-[14px] font-semibold text-gray-900 leading-tight">{l.type}</p>
                     <p className="text-[13px] text-gray-500 mt-0.5">{l.empName} • {l.dates}</p>
                   </div>
                 </div>
                 <button className="text-[#7F56D9] text-[13px] font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                   Review <ChevronRight size={16} />
                 </button>
               </div>
             ))}
             {pending === 0 && <div className="p-10 text-center text-gray-500 text-[14px]">No pending approvals 🎉</div>}
           </div>
        </div>
        
        {/* Quick Actions & Recent */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 shadow-[0_2px_13px_0_rgba(71,84,103,0.05)]">
            <h3 className="font-semibold text-gray-900 text-[15px] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "View Attendance", icon: <CalendarCheck2 size={24} className="text-gray-500" />, mod: "attendance" },
                { label: "Run Payroll", icon: <HandCoins size={24} className="text-gray-500" />, mod: "payroll" },
                { label: "Approve Leaves", icon: <CheckCircle2 size={24} className="text-gray-500" />, mod: "leaves" },
                { label: "Directory", icon: <Users size={24} className="text-gray-500" />, mod: "employees" },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={() => onSwitch(a.mod as any)}
                  className="w-full flex flex-col items-center justify-center gap-2.5 bg-[#fcfcfd] border border-[#eaecf0] hover:border-[#7F56D9]/40 hover:bg-[#faf9ff] rounded-lg p-4 text-[13px] font-semibold text-gray-700 transition-all"
                >
                  {a.icon}
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
