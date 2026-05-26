"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, MoreHorizontal, Filter } from "lucide-react";
import { Employee } from "../types";

export function EmployeesModule({
  employees,
  onAddEmployee,
  onToast,
}: {
  employees: Employee[];
  onAddEmployee: (e: Employee) => void;
  onToast: (msg: string, t?: "success" | "error" | "info") => void;
}) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDept, setNewDept] = useState("Engineering");
  const [newDesig, setNewDesig] = useState("");

  const filtered = employees.filter(
    (e) => e.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newName.trim() || !newDesig.trim()) return;
    const emp: Employee = {
      id: Date.now(),
      empId: `EMP-00${employees.length + 1}`,
      name: newName,
      initials: newName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
      dept: newDept,
      designation: newDesig,
      salary: 70000,
      email: `${newName.toLowerCase().replace(/\s/g, ".")}@company.com`,
      joinDate: "Today",
      colorClass: "bg-[#7F56D9]",
    };
    onAddEmployee(emp);
    setShowAdd(false);
    setNewName(""); setNewDesig("");
    onToast(`${emp.name} added to ${emp.dept}`, "success");
  };

  return (
    <div className="p-8 h-full bg-[#fcfcfd] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 leading-tight">Employees</h2>
          <p className="text-[14px] text-gray-500 mt-1">Manage your team members and their details.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#7F56D9] text-white px-4 py-2.5 rounded-lg font-semibold text-[14px] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] hover:bg-[#61219b] transition-colors"
        >
          <Plus size={18} /> Add Employee
        </button>
      </div>

      <div className="bg-white border border-[#eaecf0] rounded-xl shadow-[0_2px_13px_0_rgba(71,84,103,0.03)] overflow-hidden">
        <div className="p-4 border-b border-[#eaecf0] flex gap-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employees..."
              className="w-full h-10 pl-10 pr-4 border border-[#d0d5dd] rounded-lg text-[14px] focus:outline-none focus:border-[#7F56D9] focus:ring-4 focus:ring-[#7F56D9]/10 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 border border-[#d0d5dd] rounded-lg text-[14px] font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors">
            <Filter size={18} /> Filters
          </button>
        </div>

        <table className="w-full text-left text-[14px] text-gray-500">
          <thead className="bg-[#f9fafb] text-[12px] font-medium text-gray-500 uppercase border-b border-[#eaecf0]">
            <tr>
              <th className="px-6 py-3">Employee Name</th>
              <th className="px-6 py-3">Employee ID</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Designation</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr key={emp.id} className="border-b border-[#eaecf0] hover:bg-[#f9fafb] transition-colors bg-white">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${emp.colorClass} flex items-center justify-center shrink-0`}>
                      <span className="text-white text-[13px] font-bold">{emp.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-[14px]">{emp.name}</p>
                      <p className="text-[13px] text-gray-500">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-600">{emp.empId}</td>
                <td className="px-6 py-4">{emp.dept}</td>
                <td className="px-6 py-4 text-gray-600">{emp.designation}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center bg-[#ecfdf3] text-[#067647] px-2.5 py-1 rounded-full text-[12px] font-semibold border border-[#abefc6]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#12b76a] mr-1.5" /> Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#344054]/40 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white rounded-[12px] w-full max-w-md shadow-[0_20px_24px_-4px_rgba(16,24,40,0.08)] border border-[#eaecf0] overflow-hidden">
              <div className="px-6 py-5 border-b border-[#eaecf0]">
                <h3 className="font-bold text-gray-900 text-[18px]">Add new employee</h3>
                <p className="text-[14px] text-gray-500 mt-1">Fill in the information below to add a new team member.</p>
              </div>
              <div className="p-6 space-y-4 bg-white">
                <div>
                  <label className="text-[14px] font-medium text-[#344054] mb-1.5 block">Full Name <span className="text-red-500">*</span></label>
                  <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Priya Sharma" className="w-full h-11 px-3 border border-[#d0d5dd] rounded-lg text-[14px] focus:outline-none focus:border-[#7F56D9] focus:ring-4 focus:ring-[#7F56D9]/10 shadow-sm" />
                </div>
                <div>
                  <label className="text-[14px] font-medium text-[#344054] mb-1.5 block">Designation <span className="text-red-500">*</span></label>
                  <input value={newDesig} onChange={(e) => setNewDesig(e.target.value)} placeholder="e.g. Senior Engineer" className="w-full h-11 px-3 border border-[#d0d5dd] rounded-lg text-[14px] focus:outline-none focus:border-[#7F56D9] focus:ring-4 focus:ring-[#7F56D9]/10 shadow-sm" />
                </div>
                <div>
                  <label className="text-[14px] font-medium text-[#344054] mb-1.5 block">Department</label>
                  <select value={newDept} onChange={(e) => setNewDept(e.target.value)} className="w-full h-11 px-3 border border-[#d0d5dd] rounded-lg text-[14px] focus:outline-none focus:border-[#7F56D9] focus:ring-4 focus:ring-[#7F56D9]/10 shadow-sm bg-white">
                    {["Engineering", "Product", "Design", "Marketing", "Sales", "HR"].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-[#eaecf0] bg-[#f9fafb] flex gap-3 justify-end">
                <button onClick={() => setShowAdd(false)} className="px-4 py-2.5 border border-[#d0d5dd] bg-white rounded-lg text-[14px] font-medium text-[#344054] hover:bg-gray-50 shadow-sm">Cancel</button>
                <button onClick={handleAdd} className="px-4 py-2.5 bg-[#7F56D9] text-white rounded-lg text-[14px] font-semibold hover:bg-[#61219b] shadow-sm">Add Employee</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
