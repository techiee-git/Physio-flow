import { useState } from "react";
import { motion } from "motion/react";
import { Eye, CheckCircle, XCircle, Search } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  status: "Active" | "Pending" | "Blocked";
  patients: number;
  email: string;
  experience: string;
}

export default function DoctorManagement() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Arjun Sharma",
      specialization: "Orthopedic",
      status: "Active",
      patients: 23,
      email: "arjun.sharma@physioflow.com",
      experience: "8 years",
    },
    {
      id: 2,
      name: "Dr. Priya Patel",
      specialization: "Sports Medicine",
      status: "Active",
      patients: 18,
      email: "priya.patel@physioflow.com",
      experience: "6 years",
    },
    {
      id: 3,
      name: "Dr. Rahul Verma",
      specialization: "Physiotherapy",
      status: "Active",
      patients: 21,
      email: "rahul.verma@physioflow.com",
      experience: "10 years",
    },
    {
      id: 4,
      name: "Dr. Sneha Reddy",
      specialization: "Rehabilitation",
      status: "Pending",
      patients: 0,
      email: "sneha.reddy@physioflow.com",
      experience: "4 years",
    },
    {
      id: 5,
      name: "Dr. Vikram Singh",
      specialization: "Orthopedic",
      status: "Active",
      patients: 19,
      email: "vikram.singh@physioflow.com",
      experience: "12 years",
    },
    {
      id: 6,
      name: "Dr. Anjali Desai",
      specialization: "Sports Medicine",
      status: "Active",
      patients: 16,
      email: "anjali.desai@physioflow.com",
      experience: "7 years",
    },
  ];

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Blocked":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Doctor Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and approve doctor registrations
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Doctor Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Specialization
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Patients
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDoctors.map((doctor) => (
                <motion.tr
                  key={doctor.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3FA9F5] to-[#4ED1C5] flex items-center justify-center text-white font-semibold">
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {doctor.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {doctor.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {doctor.specialization}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        doctor.status
                      )}`}
                    >
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {doctor.patients}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedDoctor(doctor)}
                        className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {doctor.status === "Pending" && (
                        <>
                          <button className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDoctor(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8"
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3FA9F5] to-[#4ED1C5] flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {selectedDoctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {selectedDoctor.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedDoctor.specialization}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                <span className="text-gray-800 dark:text-white font-medium">
                  {selectedDoctor.email}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">
                  Experience:
                </span>
                <span className="text-gray-800 dark:text-white font-medium">
                  {selectedDoctor.experience}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">
                  Patients:
                </span>
                <span className="text-gray-800 dark:text-white font-medium">
                  {selectedDoctor.patients}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">
                  Status:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    selectedDoctor.status
                  )}`}
                >
                  {selectedDoctor.status}
                </span>
              </div>
            </div>

            {selectedDoctor.status === "Pending" && (
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold hover:shadow-lg transition-all">
                  Approve
                </button>
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold hover:shadow-lg transition-all">
                  Reject
                </button>
              </div>
            )}

            <button
              onClick={() => setSelectedDoctor(null)}
              className="w-full mt-3 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
