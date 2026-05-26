export type Module = "dashboard" | "employees" | "attendance" | "payroll" | "leaves";
export type AttStatus = "present" | "absent" | "leave";
export type LeaveStatus = "pending" | "approved" | "rejected";

export interface Employee {
  id: number;
  empId: string;
  name: string;
  initials: string;
  dept: string;
  designation: string;
  salary: number;
  email: string;
  joinDate: string;
  colorClass: string;
}

export interface LeaveReq {
  id: number;
  empName: string;
  empInitials: string;
  type: string;
  dates: string;
  days: number;
  reason: string;
  status: LeaveStatus;
}
