"use client";

import { Employee, AttStatus } from "../types";

export function AttendanceModule({
  employees,
  attendance,
  onToggle,
}: {
  employees: Employee[];
  attendance: Record<number, AttStatus>;
  onToggle: (id: number) => void;
}) {
  return (
    <div className="p-8 h-full bg-[#fcfcfd] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 leading-tight">Daily Attendance</h2>
          <p className="text-[14px] text-gray-500 mt-1">Friday, May 2, 2026</p>
        </div>
      </div>

      <div className="bg-white border border-[#eaecf0] rounded-xl shadow-[0_2px_13px_0_rgba(71,84,103,0.03)] overflow-hidden">
        <table className="w-full text-left text-[14px] text-gray-500">
          <thead className="bg-[#f9fafb] text-[12px] font-medium text-gray-500 uppercase border-b border-[#eaecf0]">
            <tr>
              <th className="px-6 py-3">Employee</th>
              <th className="px-6 py-3">Shift</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const status = attendance[emp.id] ?? "present";
              return (
                <tr key={emp.id} className="border-b border-[#eaecf0] hover:bg-[#f9fafb] transition-colors bg-white last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${emp.colorClass} flex items-center justify-center shrink-0`}>
                        <span className="text-white text-[12px] font-bold">{emp.initials}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-[14px]">{emp.name}</p>
                        <p className="text-[13px] text-gray-500">{emp.empId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">Regular (9 AM - 6 PM)</td>
                  <td className="px-6 py-4">
                    {status === "present" ? (
                      <span className="inline-flex items-center bg-[#ecfdf3] text-[#067647] px-2.5 py-1 rounded-md text-[12px] font-medium">Present</span>
                    ) : status === "absent" ? (
                      <span className="inline-flex items-center bg-[#fef2f2] text-[#b42318] px-2.5 py-1 rounded-md text-[12px] font-medium">Absent</span>
                    ) : (
                      <span className="inline-flex items-center bg-[#eff8ff] text-[#175cd3] px-2.5 py-1 rounded-md text-[12px] font-medium">On Leave</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {status !== "leave" && (
                      <button
                        onClick={() => onToggle(emp.id)}
                        className={`text-[13px] px-3 py-1.5 rounded-lg font-semibold transition-all border shadow-sm ${
                          status === "present"
                            ? "bg-white border-[#d0d5dd] text-gray-700 hover:bg-gray-50"
                            : "bg-[#7F56D9] border-[#7F56D9] text-white hover:bg-[#61219b]"
                        }`}
                      >
                        {status === "present" ? "Mark Absent" : "Mark Present"}
                      </button>
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
