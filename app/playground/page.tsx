"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, CalendarCheck2, HandCoins, CheckCircle2, Clock, XCircle,
  LayoutDashboard, CalendarCheck, FileX, Layers, 
  FileText, Circle, Globe, Fingerprint, Receipt, Megaphone, Calendar,
  ChevronDown, ChevronUp, Search as SearchIcon, Command
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { DashboardModule } from "./modules/DashboardModule";
import { EmployeesModule } from "./modules/EmployeesModule";
import { AttendanceModule } from "./modules/AttendanceModule";
import { PayrollModule } from "./modules/PayrollModule";
import { LeavesModule } from "./modules/LeavesModule";
import { Module, AttStatus, LeaveStatus, Employee, LeaveReq } from "./types";

// ─── Sample data ──────────────────────────────────────────────────────────────
const INIT_EMPLOYEES: Employee[] = [
  { id: 1, empId: "EMP-001", name: "Priya Sharma", initials: "PS", dept: "Engineering", designation: "Senior Engineer", salary: 95000, email: "priya@acme.com", joinDate: "Jan 12, 2024", colorClass: "bg-[#7F56D9]" },
  { id: 2, empId: "EMP-002", name: "Rahul Mehta", initials: "RM", dept: "Product", designation: "Product Manager", salary: 110000, email: "rahul@acme.com", joinDate: "Mar 05, 2024", colorClass: "bg-[#2E90FA]" },
  { id: 3, empId: "EMP-003", name: "Ananya Patel", initials: "AP", dept: "Design", designation: "UI/UX Designer", salary: 78000, email: "ananya@acme.com", joinDate: "Jun 18, 2024", colorClass: "bg-[#F04438]" },
  { id: 4, empId: "EMP-004", name: "Kiran Kumar", initials: "KK", dept: "Engineering", designation: "Backend Engineer", salary: 88000, email: "kiran@acme.com", joinDate: "Feb 22, 2024", colorClass: "bg-[#12B76A]" },
  { id: 5, empId: "EMP-005", name: "Sneha Iyer", initials: "SI", dept: "Marketing", designation: "Marketing Lead", salary: 82000, email: "sneha@acme.com", joinDate: "Apr 10, 2024", colorClass: "bg-[#F79009]" },
  { id: 6, empId: "EMP-006", name: "Arjun Reddy", initials: "AR", dept: "Sales", designation: "Sales Executive", salary: 68000, email: "arjun@acme.com", joinDate: "May 01, 2024", colorClass: "bg-[#06AED4]" },
  { id: 7, empId: "EMP-007", name: "Meera Nair", initials: "MN", dept: "HR", designation: "HR Manager", salary: 80000, email: "meera@acme.com", joinDate: "Jan 20, 2024", colorClass: "bg-[#2E90FA]" },
];

const INIT_LEAVES: LeaveReq[] = [
  { id: 1, empName: "Rahul Mehta", empInitials: "RM", type: "Annual Leave", dates: "May 8 – May 10, 2026", days: 3, reason: "Family vacation planned.", status: "pending" },
  { id: 2, empName: "Ananya Patel", empInitials: "AP", type: "Sick Leave", dates: "May 6, 2026", days: 1, reason: "Not feeling well, need rest.", status: "pending" },
  { id: 3, empName: "Kiran Kumar", empInitials: "KK", type: "Casual Leave", dates: "May 14, 2026", days: 1, reason: "Personal work.", status: "approved" },
];

// ─── Toast ────────────────────────────────────────────────────────────────────
function ToastContainer({ toasts }: { toasts: Array<{ id: number; msg: string; type: "success" | "error" | "info" }> }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`px-5 py-3.5 rounded-xl shadow-[0_12px_30px_0_rgba(71,84,103,0.15)] text-sm font-medium flex items-center gap-3 bg-white border border-gray-100 ${
              t.type === "success" ? "text-green-700" : t.type === "error" ? "text-red-700" : "text-blue-700"
            }`}
          >
            {t.type === "success" ? <CheckCircle2 size={18} className="text-green-600" /> : 
             t.type === "error" ? <XCircle size={18} className="text-red-600" /> : 
             <Clock size={18} className="text-blue-600" />} 
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Main playground ──────────────────────────────────────────────────────────
export default function PlaygroundPage() {
  const [activeModule, setActiveModule] = useState<Module>("dashboard");
  const [employees, setEmployees] = useState<Employee[]>(INIT_EMPLOYEES);
  const [attendance, setAttendance] = useState<Record<number, AttStatus>>(
    Object.fromEntries(INIT_EMPLOYEES.map((e, i) => [e.id, i < 5 ? "present" : "absent"]))
  );
  const [leaves, setLeaves] = useState<LeaveReq[]>(INIT_LEAVES);
  const [toasts, setToasts] = useState<Array<{ id: number; msg: string; type: "success" | "error" | "info" }>>([]);

  const addToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const toggleAttendance = (id: number) => {
    setAttendance((prev) => {
      const next = prev[id] === "present" ? "absent" : "present";
      addToast(`${employees.find((e) => e.id === id)?.name} marked ${next}`, next === "present" ? "success" : "info");
      return { ...prev, [id]: next };
    });
  };

  const approveLeave = (id: number) => {
    const req = leaves.find((l) => l.id === id);
    setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status: "approved" } : l)));
    if (req) addToast(`${req.empName}'s leave approved`, "success");
  };

  const rejectLeave = (id: number) => {
    const req = leaves.find((l) => l.id === id);
    setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status: "rejected" } : l)));
    if (req) addToast(`${req.empName}'s leave rejected`, "error");
  };

  const addEmployee = (emp: Employee) => {
    setEmployees((prev) => [...prev, emp]);
    setAttendance((prev) => ({ ...prev, [emp.id]: "absent" }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-28 pb-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#7F56D9]/10 text-[#7F56D9] text-[13px] font-semibold px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7F56D9] animate-pulse" />
            Interactive Playground
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Experience the Brello Admin Panel
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            This is a fully interactive simulation using the exact UI from the real application. Try adding an employee, approving leaves, or running payroll below.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-[0_12px_30px_0_rgba(71,84,103,0.08)] border border-[#eaecf0] bg-white">
            
            <div className="flex" style={{ height: 680 }}>
              {/* Sidebar */}
              <div className="w-[260px] bg-white border-r border-[#eaecf0] flex flex-col shrink-0 overflow-y-auto">
                <div className="px-5 py-6">
                  {/* Logo */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-[#7F56D9] rounded-lg flex items-center justify-center text-white shadow-sm">
                      <Layers size={18} strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-[20px] text-gray-900 tracking-tight">Layers</span>
                  </div>

                  {/* Search */}
                  <div className="relative mb-6">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full h-9 pl-9 pr-10 bg-gray-50 border border-gray-100 rounded-lg text-[14px] text-gray-700 focus:outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/10 transition-all placeholder:text-gray-500"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-gray-400">
                      <Command size={12} />
                      <span className="text-[12px] font-medium">/</span>
                    </div>
                  </div>

                  {/* Nav Items */}
                  <div className="space-y-1">
                    <button onClick={() => setActiveModule("dashboard")} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <LayoutDashboard size={20} className="text-gray-500 group-hover:text-gray-700" /> Dashboard
                    </button>
                    <button onClick={() => setActiveModule("employees")} className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3"><Users size={20} className="text-gray-500 group-hover:text-gray-700" /> Employee</div>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                    <button onClick={() => setActiveModule("attendance")} className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3"><CalendarCheck size={20} className="text-gray-500 group-hover:text-gray-700" /> Attendance</div>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                    <button onClick={() => setActiveModule("leaves")} className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3"><FileX size={20} className="text-gray-500 group-hover:text-gray-700" /> Leave</div>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                    <button onClick={() => setActiveModule("payroll")} className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3"><HandCoins size={20} className="text-gray-500 group-hover:text-gray-700" /> Payroll</div>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3"><Layers size={20} className="text-gray-500 group-hover:text-gray-700" /> Project</div>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3"><FileText size={20} className="text-gray-500 group-hover:text-gray-700" /> Offer Letters</div>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <Circle size={20} className="text-gray-500 group-hover:text-gray-700" /> Reimbursement
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3"><Globe size={20} className="text-gray-500 group-hover:text-gray-700" /> Organisation</div>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                    
                    {/* Expanded Access Menu */}
                    <div className="pt-1">
                      <button className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-3"><Fingerprint size={20} className="text-gray-500 group-hover:text-gray-700" /> Access</div>
                        <ChevronUp size={16} className="text-gray-400" />
                      </button>
                      <div className="pl-[22px] mt-1 relative flex flex-col gap-1">
                        <div className="absolute left-[21px] top-0 bottom-4 w-px bg-gray-200"></div>
                        <button className="relative w-full flex items-center pl-6 pr-3 py-2 rounded-md text-[14px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[17px] border-l border-b border-gray-200 rounded-bl-md"></div>
                          Roles
                        </button>
                        <button className="relative w-full flex items-center pl-6 pr-3 py-2 rounded-md text-[14px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[17px] border-l border-b border-gray-200 rounded-bl-md"></div>
                          Permissions
                        </button>
                        <button className="relative w-full flex items-center pl-6 pr-3 py-2 rounded-md text-[14px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[17px] border-l border-b border-gray-200 rounded-bl-md"></div>
                          Users
                        </button>
                      </div>
                    </div>

                    <button className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group mt-1">
                      <div className="flex items-center gap-3"><Receipt size={20} className="text-gray-500 group-hover:text-gray-700" /> Billing</div>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <Megaphone size={20} className="text-gray-500 group-hover:text-gray-700" /> Announcements
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group">
                      <Circle size={20} className="text-gray-500 group-hover:text-gray-700" /> Leave Management
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors group mb-4">
                      <Calendar size={20} className="text-gray-500 group-hover:text-gray-700" /> Attendance
                    </button>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 bg-[#fcfcfd] overflow-hidden relative border-l border-[#eaecf0]">
                {/* Header bar */}
                <div className="h-16 bg-white border-b border-[#eaecf0] px-8 flex items-center justify-between">
                  <div className="text-[14px] text-gray-500 font-medium">Acme Technologies</div>
                  <div className="flex items-center gap-3">
                    <div className="text-[12px] bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-md font-semibold border border-yellow-200">
                      Sandbox Mode
                    </div>
                  </div>
                </div>

                {/* Module content */}
                <div className="h-[calc(680px-64px)] relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeModule}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 overflow-hidden"
                    >
                      {activeModule === "dashboard" && <DashboardModule employees={employees} attendance={attendance} leaves={leaves} onSwitch={setActiveModule} />}
                      {activeModule === "employees" && <EmployeesModule employees={employees} onAddEmployee={addEmployee} onToast={addToast} />}
                      {activeModule === "attendance" && <AttendanceModule employees={employees} attendance={attendance} onToggle={toggleAttendance} />}
                      {activeModule === "payroll" && <PayrollModule employees={employees} onToast={addToast} />}
                      {activeModule === "leaves" && <LeavesModule leaves={leaves} onApprove={approveLeave} onReject={rejectLeave} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer toasts={toasts} />
    </div>
  );
}
