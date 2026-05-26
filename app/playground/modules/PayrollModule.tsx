"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Employee } from "../types";

export function PayrollModule({
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
          onToast("Payroll processed! Payslips have been generated.", "success");
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  const totalGross = employees.reduce((s, e) => s + e.salary, 0);
  const totalNet = Math.round(totalGross * 0.81);

  return (
    <div className="p-8 h-full bg-[#fcfcfd] overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 leading-tight">Run Payroll</h2>
          <p className="text-[14px] text-gray-500 mt-1">May 2026 Cycle</p>
        </div>
        {state === "done" ? (
          <button className="flex items-center gap-2 bg-white border border-[#d0d5dd] text-[#344054] px-4 py-2.5 rounded-lg font-semibold text-[14px] shadow-sm hover:bg-gray-50 transition-colors">
            <Download size={18} /> Download Payslips
          </button>
        ) : (
          <button
            onClick={runPayroll}
            disabled={state === "running"}
            className="flex items-center gap-2 bg-[#7F56D9] text-white px-5 py-2.5 rounded-lg font-semibold text-[14px] shadow-sm hover:bg-[#61219b] transition-colors disabled:opacity-70"
          >
            {state === "running" ? `Processing (${progress}%)` : "Run Payroll"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { l: "Gross Pay", v: `₹${(totalGross / 100000).toFixed(2)}L` },
          { l: "Total Deductions", v: `₹${((totalGross - totalNet) / 100000).toFixed(2)}L` },
          { l: "Net Payable", v: `₹${(totalNet / 100000).toFixed(2)}L`, highlight: true },
        ].map((s) => (
          <div key={s.l} className="bg-white border border-[#eaecf0] rounded-[12px] p-5 shadow-[0_2px_13px_0_rgba(71,84,103,0.03)] flex flex-col justify-center">
            <p className="text-[13px] font-medium text-gray-500 mb-2">{s.l}</p>
            <p className={`text-[32px] font-bold leading-none tracking-tight ${s.highlight ? "text-[#7F56D9]" : "text-gray-900"}`}>{s.v}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#eaecf0] rounded-xl shadow-[0_2px_13px_0_rgba(71,84,103,0.03)] overflow-hidden">
        <table className="w-full text-left text-[14px] text-gray-500">
          <thead className="bg-[#f9fafb] text-[12px] font-medium text-gray-500 uppercase border-b border-[#eaecf0]">
            <tr>
              <th className="px-6 py-3">Employee</th>
              <th className="px-6 py-3">Gross Salary</th>
              <th className="px-6 py-3">Deductions</th>
              <th className="px-6 py-3">Net Pay</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const net = Math.round(emp.salary * 0.81);
              return (
                <tr key={emp.id} className="border-b border-[#eaecf0] hover:bg-[#f9fafb] transition-colors bg-white last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${emp.colorClass} flex items-center justify-center shrink-0`}>
                        <span className="text-white text-[12px] font-bold">{emp.initials}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-[14px]">{emp.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">₹{emp.salary.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 text-[#b42318]">-₹{(emp.salary - net).toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">₹{net.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">
                    {state === "done" ? (
                      <span className="inline-flex items-center bg-[#ecfdf3] text-[#067647] px-2.5 py-1 rounded-md text-[12px] font-medium">Processed</span>
                    ) : (
                      <span className="inline-flex items-center bg-[#f2f4f7] text-[#344054] px-2.5 py-1 rounded-md text-[12px] font-medium">Draft</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
