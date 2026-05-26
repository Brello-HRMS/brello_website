"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { LeaveReq } from "../types";

export function LeavesModule({
  leaves,
  onApprove,
  onReject,
}: {
  leaves: LeaveReq[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  return (
    <div className="p-8 h-full bg-[#fcfcfd] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 leading-tight">Leave Requests</h2>
          <p className="text-[14px] text-gray-500 mt-1">Review and manage employee leave applications.</p>
        </div>
      </div>

      <div className="bg-white border border-[#eaecf0] rounded-xl shadow-[0_2px_13px_0_rgba(71,84,103,0.03)] overflow-hidden">
        <table className="w-full text-left text-[14px] text-gray-500">
          <thead className="bg-[#f9fafb] text-[12px] font-medium text-gray-500 uppercase border-b border-[#eaecf0]">
            <tr>
              <th className="px-6 py-3">Employee</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">Dates</th>
              <th className="px-6 py-3">Reason</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {leaves.map((req) => (
                <motion.tr layout key={req.id} className="border-b border-[#eaecf0] hover:bg-[#f9fafb] transition-colors bg-white last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#ede9f8] text-[#7F56D9] flex items-center justify-center font-bold text-[12px]">
                        {req.empInitials}
                      </div>
                      <p className="font-semibold text-gray-900 text-[14px]">{req.empName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{req.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{req.dates}</p>
                    <p className="text-[12px] text-gray-500">{req.days} day{req.days > 1 ? "s" : ""}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500 truncate max-w-[200px]">
                    "{req.reason}"
                  </td>
                  <td className="px-6 py-4 text-right">
                    {req.status === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => onApprove(req.id)} className="w-8 h-8 rounded border border-[#eaecf0] flex items-center justify-center text-green-600 hover:bg-green-50 hover:border-green-200 transition-colors bg-white shadow-sm">
                          <Check size={16} strokeWidth={3} />
                        </button>
                        <button onClick={() => onReject(req.id)} className="w-8 h-8 rounded border border-[#eaecf0] flex items-center justify-center text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors bg-white shadow-sm">
                          <X size={16} strokeWidth={3} />
                        </button>
                      </div>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-medium capitalize ${
                        req.status === "approved" ? "bg-[#ecfdf3] text-[#067647]" : "bg-[#fef2f2] text-[#b42318]"
                      }`}>
                        {req.status}
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {leaves.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No leave requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
