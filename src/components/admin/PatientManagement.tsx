import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, UserPlus, X } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  doctor: string;
  treatment: string;
  progress: number;
  status: 'Active' | 'Inactive';
}

interface Doctor {
  id: number;
  name: string;
}

export default function PatientManagement() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    condition: '',
    doctorId: '',
  });

  const availableDoctors: Doctor[] = [
    { id: 1, name: 'Dr. Arjun Sharma' },
    { id: 2, name: 'Dr. Priya Patel' },
    { id: 3, name: 'Dr. Rahul Verma' },
    { id: 4, name: 'Dr. Vikram Singh' },
    { id: 5, name: 'Dr. Anjali Desai' },
  ];

  const patients: Patient[] = [
    { id: 1, name: 'Amit Kumar', doctor: 'Dr. Arjun Sharma', treatment: 'Knee Rehabilitation', progress: 75, status: 'Active' },
    { id: 2, name: 'Neha Singh', doctor: 'Dr. Priya Patel', treatment: 'Shoulder Recovery', progress: 60, status: 'Active' },
    { id: 3, name: 'Rajesh Gupta', doctor: 'Dr. Rahul Verma', treatment: 'Back Pain Therapy', progress: 45, status: 'Active' },
    { id: 4, name: 'Kavita Reddy', doctor: 'Dr. Arjun Sharma', treatment: 'Sports Injury', progress: 85, status: 'Active' },
    { id: 5, name: 'Suresh Patel', doctor: 'Dr. Vikram Singh', treatment: 'Hip Replacement Recovery', progress: 30, status: 'Active' },
    { id: 6, name: 'Deepa Nair', doctor: 'Dr. Anjali Desai', treatment: 'Ankle Sprain', progress: 90, status: 'Active' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowAddModal(false);
    setFormData({ name: '', age: '', gender: '', condition: '', doctorId: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Patient Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage patient records</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <UserPlus className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      {/* Patients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{patient.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{patient.treatment}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-gray-800 dark:text-white font-semibold">{patient.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${patient.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Assigned Doctor</p>
                <p className="font-medium text-gray-800 dark:text-white">{patient.doctor}</p>
              </div>

              <button
                onClick={() => setSelectedPatient(patient)}
                className="w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Patient</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white"
                  placeholder="Enter patient name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white"
                    placeholder="Age"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medical Condition
                </label>
                <input
                  type="text"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white"
                  placeholder="e.g., Knee injury"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assign Doctor
                </label>
                <select
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white"
                  required
                >
                  <option value="">Select Doctor</option>
                  {availableDoctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Add Patient
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPatient(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8"
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {selectedPatient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{selectedPatient.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{selectedPatient.treatment}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Assigned Doctor:</span>
                <span className="text-gray-800 dark:text-white font-medium">{selectedPatient.doctor}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Progress:</span>
                <span className="text-gray-800 dark:text-white font-medium">{selectedPatient.progress}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {selectedPatient.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPatient(null)}
              className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
