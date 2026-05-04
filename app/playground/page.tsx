"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────
type Module = "dashboard" | "employees" | "attendance" | "payroll" | "leaves";
type AttStatus = "present" | "absent" | "leave";
type LeaveStatus = "pending" | "approved" | "rejected";

interface Employee {
  id: number;
  name: string;
  initials: string;
  dept: string;
  designation: string;
  salary: number;
  email: string;
  joinDate: string;
  gradFrom: string;
  gradTo: string;
}

interface LeaveReq {
  id: number;
  empName: string;
  empInitials: string;
  type: string;
  dates: string;
  days: number;
  reason: string;
  status: LeaveStatus;
}

// ─── Sample data ──────────────────────────────────────────────────────────────
const INIT_EMPLOYEES: Employee[] = [
  { id: 1, name: "Priya Sharma", initials: "PS", dept: "Engineering", designation: "Senior Engineer", salary: 95000, email: "priya@acme.com", joinDate: "Jan 2024", gradFrom: "from-purple-500", gradTo: "to-violet-600" },
  { id: 2, name: "Rahul Mehta", initials: "RM", dept: "Product", designation: "Product Manager", salary: 110000, email: "rahul@acme.com", joinDate: "Mar 2024", gradFrom: "from-blue-500", gradTo: "to-indigo-600" },
  { id: 3, name: "Ananya Patel", initials: "AP", dept: "Design", designation: "UI/UX Designer", salary: 78000, email: "ananya@acme.com", joinDate: "Jun 2024", gradFrom: "from-pink-500", gradTo: "to-rose-600" },
  { id: 4, name: "Kiran Kumar", initials: "KK", dept: "Engineering", designation: "Backend Engineer", salary: 88000, email: "kiran@acme.com", joinDate: "Feb 2024", gradFrom: "from-green-500", gradTo: "to-emerald-600" },
  { id: 5, name: "Sneha Iyer", initials: "SI", dept: "Marketing", designation: "Marketing Lead", salary: 82000, email: "sneha@acme.com", joinDate: "Apr 2024", gradFrom: "from-orange-500", gradTo: "to-amber-600" },
  { id: 6, name: "Arjun Reddy", initials: "AR", dept: "Sales", designation: "Sales Executive", salary: 68000, email: "arjun@acme.com", joinDate: "May 2024", gradFrom: "from-teal-500", gradTo: "to-cyan-600" },
  { id: 7, name: "Meera Nair", initials: "MN", dept: "HR", designation: "HR Manager", salary: 80000, email: "meera@acme.com", joinDate: "Jan 2024", gradFrom: "from-indigo-500", gradTo: "to-blue-600" },
  { id: 8, name: "Vikram Singh", initials: "VS", dept: "Engineering", designation: "DevOps Engineer", salary: 92000, email: "vikram@acme.com", joinDate: "Jul 2024", gradFrom: "from-rose-500", gradTo: "to-pink-600" },
];

const INIT_LEAVES: LeaveReq[] = [
  { id: 1, empName: "Rahul Mehta", empInitials: "RM", type: "Annual Leave", dates: "May 8–10", days: 3, reason: "Family vacation planned.", status: "pending" },
  { id: 2, empName: "Ananya Patel", empInitials: "AP", type: "Sick Leave", dates: "May 6", days: 1, reason: "Not feeling well, need rest.", status: "pending" },
  { id: 3, empName: "Kiran Kumar", empInitials: "KK", type: "Casual Leave", dates: "May 14", days: 1, reason: "Personal work.", status: "approved" },
  { id: 4, empName: "Sneha Iyer", empInitials: "SI", type: "Annual Leave", dates: "May 20–23", days: 4, reason: "Pre-planned trip.", status: "approved" },
  { id: 5, empName: "Arjun Reddy", empInitials: "AR", type: "Sick Leave", dates: "May 3", days: 1, reason: "Fever.", status: "rejected" },
];

// ─── Toast ────────────────────────────────────────────────────────────────────
function ToastContainer({ toasts }: { toasts: Array<{ id: number; msg: string; type: "success" | "error" | "info" }> }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`px-4 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 ${
              t.type === "success" ? "bg-green-600 text-white" : t.type === "error" ? "bg-red-600 text-white" : "bg-gray-900 text-white"
            }`}
          >
            {t.type === "success" ? "✓" : t.type === "error" ? "✗" : "ℹ"} {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Dashboard module ─────────────────────────────────────────────────────────
function DashboardModule({
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
  const absent = Object.values(attendance).filter((s) => s === "absent").length;
  const pending = leaves.filter((l) => l.status === "pending").length;

  const recent = [
    { icon: "✓", text: "Alice Johnson joined Engineering", time: "2h ago", color: "text-green-600" },
    { icon: "📋", text: "Payroll processed for April 2026", time: "Yesterday", color: "text-blue-600" },
    { icon: "🏖", text: `${pending} leave request${pending !== 1 ? "s" : ""} pending approval`, time: "Today", color: "text-orange-500" },
    { icon: "📍", text: "Geofencing zone updated — HQ Bangalore", time: "2 days ago", color: "text-purple-600" },
  ];

  return (
    <div className="p-5 h-full overflow-y-auto">
      <div className="mb-5">
        <p className="text-sm font-bold text-gray-800">Good morning, Sarah 👋</p>
        <p className="text-xs text-gray-400">Friday, May 2, 2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        {[
          { label: "Employees", value: employees.length, color: "bg-[#EDE9F8] text-[#7F56D9]", onClick: () => onSwitch("employees") },
          { label: "Present", value: present, color: "bg-green-50 text-green-700", onClick: () => onSwitch("attendance") },
          { label: "Absent", value: absent, color: "bg-red-50 text-red-600", onClick: () => onSwitch("attendance") },
          { label: "Pending Leaves", value: pending, color: "bg-yellow-50 text-yellow-700", onClick: () => onSwitch("leaves") },
        ].map((s) => (
          <button
            key={s.label}
            onClick={s.onClick}
            className={`${s.color} rounded-xl p-3 text-left hover:opacity-80 transition-opacity`}
          >
            <p className="text-xl font-black">{s.value}</p>
            <p className="text-xs mt-0.5 opacity-75">{s.label}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Activity feed */}
        <div className="col-span-3 bg-gray-50 rounded-xl overflow-hidden">
          <p className="text-xs font-semibold text-gray-500 px-4 py-3 border-b border-gray-100">Recent Activity</p>
          {recent.map((item, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-white transition-colors">
              <span className="text-lg shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-700 font-medium">{item.text}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="col-span-2 space-y-2.5">
          <p className="text-xs font-semibold text-gray-500 mb-3">Quick Actions</p>
          {[
            { label: "View Attendance", icon: "⏱", mod: "attendance" as Module },
            { label: "Run Payroll", icon: "💰", mod: "payroll" as Module },
            { label: "Approve Leaves", icon: "✅", mod: "leaves" as Module },
            { label: "Employee Directory", icon: "👥", mod: "employees" as Module },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => onSwitch(a.mod)}
              className="w-full flex items-center gap-2.5 bg-white border border-gray-100 hover:border-[#7F56D9]/30 hover:bg-[#faf9ff] rounded-xl px-3 py-2.5 text-xs font-medium text-gray-700 transition-all text-left"
            >
              <span className="text-base">{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Employees module ─────────────────────────────────────────────────────────
function EmployeesModule({
  employees,
  onAddEmployee,
  onToast,
}: {
  employees: Employee[];
  onAddEmployee: (e: Employee) => void;
  onToast: (msg: string, t?: "success" | "error" | "info") => void;
}) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [selected, setSelected] = useState<Employee | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDept, setNewDept] = useState("Engineering");
  const [newDesig, setNewDesig] = useState("");

  const depts = ["All", ...Array.from(new Set(employees.map((e) => e.dept)))];
  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) &&
      (dept === "All" || e.dept === dept)
  );

  const handleAdd = () => {
    if (!newName.trim() || !newDesig.trim()) return;
    const emp: Employee = {
      id: Date.now(),
      name: newName,
      initials: newName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
      dept: newDept,
      designation: newDesig,
      salary: 70000,
      email: `${newName.toLowerCase().replace(/\s/g, ".")}@company.com`,
      joinDate: "May 2026",
      gradFrom: "from-gray-500",
      gradTo: "to-gray-600",
    };
    onAddEmployee(emp);
    setShowAdd(false);
    setNewName(""); setNewDesig("");
    onToast(`${emp.name} added to ${emp.dept}`, "success");
  };

  return (
    <div className="flex h-full">
      {/* List */}
      <div className={`flex-1 overflow-y-auto p-4 ${selected ? "hidden sm:block sm:w-1/2" : ""}`}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-gray-800">Employee Directory ({filtered.length})</p>
          <button
            onClick={() => setShowAdd(true)}
            className="text-xs bg-[#7F56D9] text-white px-3 py-1.5 rounded-xl font-semibold hover:bg-[#6d47c4] transition-colors"
          >
            + Add Employee
          </button>
        </div>

        {/* Search + filter */}
        <div className="flex gap-2 mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employees..."
            className="flex-1 h-9 px-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9]/20"
          />
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="h-9 px-3 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:border-[#7F56D9]"
          >
            {depts.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          {filtered.map((emp) => (
            <button
              key={emp.id}
              onClick={() => setSelected(selected?.id === emp.id ? null : emp)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                selected?.id === emp.id
                  ? "bg-[#EDE9F8] border-2 border-[#7F56D9]/30"
                  : "bg-gray-50 hover:bg-[#faf9ff] border-2 border-transparent"
              }`}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${emp.gradFrom} ${emp.gradTo} flex items-center justify-center shrink-0 shadow-sm`}>
                <span className="text-white text-xs font-bold">{emp.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{emp.name}</p>
                <p className="text-[10px] text-gray-400">{emp.designation}</p>
              </div>
              <span className="text-[10px] text-gray-400 shrink-0">{emp.dept}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full sm:w-1/2 border-l border-gray-100 overflow-y-auto p-5 bg-white"
          >
            <button onClick={() => setSelected(null)} className="text-xs text-gray-400 hover:text-gray-700 mb-4 flex items-center gap-1">
              ← Back
            </button>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selected.gradFrom} ${selected.gradTo} flex items-center justify-center mb-4 shadow-lg`}>
              <span className="text-white font-black text-xl">{selected.initials}</span>
            </div>
            <h3 className="text-base font-black text-gray-900">{selected.name}</h3>
            <p className="text-sm text-[#7F56D9] font-semibold mb-4">{selected.designation}</p>

            {[
              { label: "Department", value: selected.dept },
              { label: "Email", value: selected.email },
              { label: "Joined", value: selected.joinDate },
              { label: "Monthly Salary", value: `₹${selected.salary.toLocaleString("en-IN")}` },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400">{row.label}</span>
                <span className="text-xs font-semibold text-gray-700">{row.value}</span>
              </div>
            ))}

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onToast("Edit employee — coming soon!", "info")}
                className="flex-1 text-xs bg-[#EDE9F8] text-[#7F56D9] py-2 rounded-xl font-semibold hover:bg-[#ddd0f7] transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={() => onToast("Payslip opened", "info")}
                className="flex-1 text-xs bg-gray-100 text-gray-700 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                View Payslip
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center p-6"
            onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <h3 className="font-bold text-gray-900 mb-4">Add Employee</h3>
              <div className="space-y-3">
                {[
                  { label: "Full Name *", val: newName, set: setNewName, placeholder: "Priya Sharma" },
                  { label: "Designation *", val: newDesig, set: setNewDesig, placeholder: "Senior Engineer" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">{f.label}</label>
                    <input
                      value={f.val}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7F56D9]"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#7F56D9]"
                  >
                    {["Engineering", "Product", "Design", "Marketing", "Sales", "HR"].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="flex-1 py-2.5 bg-[#7F56D9] text-white rounded-xl text-sm font-semibold hover:bg-[#6d47c4]"
                >
                  Add Employee
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Attendance module ────────────────────────────────────────────────────────
function AttendanceModule({
  employees,
  attendance,
  onToggle,
}: {
  employees: Employee[];
  attendance: Record<number, AttStatus>;
  onToggle: (id: number) => void;
}) {
  const present = Object.values(attendance).filter((s) => s === "present").length;
  const absent = Object.values(attendance).filter((s) => s === "absent").length;

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-bold text-gray-800">Today's Attendance</p>
          <p className="text-xs text-gray-400">Friday, May 2, 2026</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-semibold">{present} Present</span>
          <span className="bg-red-100 text-red-600 px-3 py-1.5 rounded-full font-semibold">{absent} Absent</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7F56D9] to-green-500 rounded-full"
            animate={{ width: `${(present / employees.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-right">{Math.round((present / employees.length) * 100)}% attendance today</p>
      </div>

      <div className="space-y-2">
        {employees.map((emp) => {
          const status = attendance[emp.id] ?? "present";
          return (
            <div key={emp.id} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${emp.gradFrom} ${emp.gradTo} flex items-center justify-center shrink-0`}>
                <span className="text-white text-xs font-bold">{emp.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{emp.name}</p>
                <p className="text-[10px] text-gray-400">{emp.dept}</p>
              </div>
              {status === "leave" ? (
                <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">On Leave</span>
              ) : (
                <button
                  onClick={() => onToggle(emp.id)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                    status === "present"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-red-100 text-red-600 hover:bg-red-200"
                  }`}
                >
                  {status === "present" ? "✓ Present" : "✗ Absent"}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-center text-gray-300 mt-4">Click a status button to toggle attendance</p>
    </div>
  );
}

// ─── Payroll module ───────────────────────────────────────────────────────────
function PayrollModule({
  employees,
  onToast,
}: {
  employees: Employee[];
  onToast: (msg: string, t?: "success" | "error" | "info") => void;
}) {
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const runPayroll = () => {
    setState("running");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setState("done");
          onToast("Payroll processed! ₹34.6L disbursed to 8 employees", "success");
          return 100;
        }
        return p + 4;
      });
    }, 80);
  };

  const totalGross = employees.reduce((s, e) => s + e.salary, 0);
  const totalNet = Math.round(totalGross * 0.81);

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-bold text-gray-800">Payroll — May 2026</p>
          <p className="text-xs text-gray-400">{employees.length} employees</p>
        </div>
        <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
          state === "done" ? "bg-green-100 text-green-700" : "bg-[#EDE9F8] text-[#7F56D9]"
        }`}>
          {state === "done" ? "✓ Processed" : "Dry Run"}
        </span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {[
          { l: "Gross Pay", v: `₹${(totalGross / 100000).toFixed(1)}L`, c: "text-gray-800" },
          { l: "Deductions", v: `₹${((totalGross - totalNet) / 100000).toFixed(1)}L`, c: "text-red-600" },
          { l: "Net Pay", v: `₹${(totalNet / 100000).toFixed(1)}L`, c: "text-green-700" },
        ].map((s) => (
          <div key={s.l} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
            <p className="text-[10px] text-gray-400 mb-1">{s.l}</p>
            <p className={`text-sm font-black ${s.c}`}>{s.v}</p>
          </div>
        ))}
      </div>

      {/* Employee rows */}
      <div className="space-y-1.5 mb-5">
        {employees.slice(0, 5).map((emp) => {
          const net = Math.round(emp.salary * 0.81);
          return (
            <div key={emp.id} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${emp.gradFrom} ${emp.gradTo} flex items-center justify-center shrink-0`}>
                <span className="text-white text-[10px] font-bold">{emp.initials}</span>
              </div>
              <span className="flex-1 text-xs font-medium text-gray-700 truncate">{emp.name}</span>
              <span className="text-xs text-gray-400 shrink-0">₹{emp.salary.toLocaleString("en-IN")}</span>
              <span className="text-xs font-semibold text-gray-800 shrink-0">₹{net.toLocaleString("en-IN")}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                state === "done" ? "bg-green-100 text-green-700" : "bg-[#EDE9F8] text-[#7F56D9]"
              }`}>
                {state === "done" ? "Paid" : "Ready"}
              </span>
            </div>
          );
        })}
        {employees.length > 5 && (
          <p className="text-xs text-center text-gray-400 py-1">+{employees.length - 5} more employees</p>
        )}
      </div>

      {/* Progress bar */}
      {state === "running" && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Processing payroll...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#7F56D9] rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      )}

      {state === "done" ? (
        <div className="flex gap-2">
          <button
            onClick={() => onToast("Payslips sent to all employees!", "success")}
            className="flex-1 py-3 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
          >
            ✓ Payroll Processed
          </button>
          <button
            onClick={() => onToast("Downloading payslips...", "info")}
            className="py-3 px-4 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            ↓
          </button>
        </div>
      ) : (
        <button
          onClick={runPayroll}
          disabled={state === "running"}
          className="w-full py-3 bg-[#7F56D9] text-white text-sm font-semibold rounded-xl hover:bg-[#6d47c4] transition-colors disabled:opacity-70 shadow-lg shadow-[#7F56D9]/25"
        >
          {state === "running" ? "Processing..." : "Run Payroll →"}
        </button>
      )}
    </div>
  );
}

// ─── Leaves module ────────────────────────────────────────────────────────────
function LeavesModule({
  leaves,
  onApprove,
  onReject,
}: {
  leaves: LeaveReq[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  const [tab, setTab] = useState<"pending" | "all">("pending");
  const filtered = tab === "pending" ? leaves.filter((l) => l.status === "pending") : leaves;

  const statusStyle: Record<LeaveStatus, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-600",
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-gray-800">Leave Requests</p>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-0.5">
          {(["pending", "all"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                tab === t ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"
              }`}
            >
              {t === "pending" ? `Pending (${leaves.filter((l) => l.status === "pending").length})` : "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <AnimatePresence>
          {filtered.map((req) => (
            <motion.div
              key={req.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className={`rounded-xl border p-4 transition-colors ${
                req.status === "approved"
                  ? "border-green-100 bg-green-50/50"
                  : req.status === "rejected"
                  ? "border-red-100 bg-red-50/50"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EDE9F8] flex items-center justify-center shrink-0 text-[#7F56D9] font-bold text-xs">
                  {req.empInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-xs font-semibold text-gray-800">{req.empName}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${statusStyle[req.status]}`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#7F56D9] font-medium">
                    {req.type} · {req.dates} ({req.days}d)
                  </p>
                  <p className="text-xs text-gray-500 mt-1 italic">"{req.reason}"</p>
                </div>
              </div>

              {req.status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onApprove(req.id)}
                    className="flex-1 py-1.5 bg-green-100 text-green-700 text-xs font-semibold rounded-xl hover:bg-green-200 transition-colors"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => onReject(req.id)}
                    className="flex-1 py-1.5 bg-red-100 text-red-600 text-xs font-semibold rounded-xl hover:bg-red-200 transition-colors"
                  >
                    ✗ Reject
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p className="text-2xl mb-2">✅</p>
            <p className="text-sm font-medium">No pending leave requests</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const SIDEBAR_ITEMS: Array<{ id: Module; label: string; icon: string }> = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "employees", label: "Employees", icon: "👥" },
  { id: "attendance", label: "Attendance", icon: "⏱" },
  { id: "payroll", label: "Payroll", icon: "💰" },
  { id: "leaves", label: "Leaves", icon: "🏖" },
];

// ─── Main playground ──────────────────────────────────────────────────────────
export default function PlaygroundPage() {
  const [activeModule, setActiveModule] = useState<Module>("dashboard");
  const [employees, setEmployees] = useState<Employee[]>(INIT_EMPLOYEES);
  const [attendance, setAttendance] = useState<Record<number, AttStatus>>(
    Object.fromEntries(INIT_EMPLOYEES.map((e, i) => [e.id, i < 6 ? "present" : "absent"]))
  );
  const [leaves, setLeaves] = useState<LeaveReq[]>(INIT_LEAVES);
  const [toasts, setToasts] = useState<Array<{ id: number; msg: string; type: "success" | "error" | "info" }>>([]);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const addToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
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
    if (req) addToast(`${req.empName}'s leave approved ✓`, "success");
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

  const MODULE_LABELS: Record<Module, string> = {
    dashboard: "Dashboard",
    employees: "Employees",
    attendance: "Attendance",
    payroll: "Payroll",
    leaves: "Leave Requests",
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-[#faf9ff] to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#7F56D9]/10 border border-[#7F56D9]/20 text-[#7F56D9] text-xs font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-[#7F56D9] animate-pulse" />
            Interactive Demo — No signup required
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
            Experience Brello right here
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Click around the simulated app below. Add employees, toggle attendance, approve leaves, and run payroll — all without signing up.
          </p>
        </div>
      </section>

      {/* App shell */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/50 border border-gray-200">
            {/* Browser chrome */}
            <div className="bg-[#1e1e2e] px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 bg-[#2a2a3e] rounded-md text-xs text-gray-500 px-3 py-1 text-center">
                app.brello.in — Demo Mode
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full font-semibold">
                🎮 Demo
              </div>
            </div>

            <div className="flex" style={{ height: 560 }}>
              {/* Sidebar */}
              <div className="w-44 bg-[#1a0d2e] flex flex-col shrink-0">
                <div className="flex items-center gap-2 px-4 py-4 border-b border-white/5">
                  <div className="w-7 h-7 bg-[#7F56D9] rounded-lg flex items-center justify-center shadow-md shadow-[#7F56D9]/40">
                    <span className="text-white font-black text-xs">B</span>
                  </div>
                  <span className="text-white font-bold text-sm">Brello</span>
                </div>

                <div className="flex-1 p-2.5 space-y-0.5">
                  {SIDEBAR_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveModule(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-all text-left ${
                        activeModule === item.id
                          ? "bg-[#7F56D9] text-white font-semibold shadow-md shadow-[#7F56D9]/30"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="text-base leading-none">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="p-3 border-t border-white/5">
                  <div className="flex items-center gap-2 px-2">
                    <div className="w-7 h-7 rounded-full bg-[#7F56D9] flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">SA</span>
                    </div>
                    <div>
                      <p className="text-xs text-white font-semibold">Sarah Admin</p>
                      <p className="text-[10px] text-gray-500">HR Manager</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 bg-[#f9fafb] overflow-hidden relative">
                {/* Header */}
                <div className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Acme Technologies</p>
                    <p className="text-sm font-bold text-gray-900">{MODULE_LABELS[activeModule]}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full font-semibold">
                      Demo Mode
                    </div>
                  </div>
                </div>

                {/* Hint tooltip */}
                <AnimatePresence>
                  {hint && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-14 left-1/2 -translate-x-1/2 z-20 bg-gray-900 text-white text-xs px-4 py-2 rounded-full shadow-xl pointer-events-none"
                    >
                      👈 Click the sidebar to switch modules
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Module content */}
                <div className="h-full overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeModule}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute inset-0 overflow-hidden"
                      style={{ paddingBottom: "60px" }}
                    >
                      {activeModule === "dashboard" && (
                        <DashboardModule
                          employees={employees}
                          attendance={attendance}
                          leaves={leaves}
                          onSwitch={setActiveModule}
                        />
                      )}
                      {activeModule === "employees" && (
                        <EmployeesModule
                          employees={employees}
                          onAddEmployee={addEmployee}
                          onToast={addToast}
                        />
                      )}
                      {activeModule === "attendance" && (
                        <AttendanceModule
                          employees={employees}
                          attendance={attendance}
                          onToggle={toggleAttendance}
                        />
                      )}
                      {activeModule === "payroll" && (
                        <PayrollModule employees={employees} onToast={addToast} />
                      )}
                      {activeModule === "leaves" && (
                        <LeavesModule
                          leaves={leaves}
                          onApprove={approveLeave}
                          onReject={rejectLeave}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-gray-400 mt-4">
            This is a simulated demo. All data is local and resets on page refresh.
          </p>
        </div>
      </section>

      {/* CTA below */}
      <section className="py-20 bg-[#1a0d2e]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready for the real thing?</h2>
          <p className="text-gray-400 mb-8">
            Sign up and have your company live on Brello in under an hour. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-[#7F56D9] hover:bg-[#6d47c4] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-[#7F56D9]/30"
            >
              Start Free Trial →
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/15 transition-colors"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ToastContainer toasts={toasts} />
    </div>
  );
}
