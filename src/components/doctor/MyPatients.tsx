import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, X } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  progress: number;
  sessions: number;
  lastVisit: string;
}

interface MyPatientsProps {
  onPatientSelect: (patientId: number) => void;
}

export default function MyPatients({ onPatientSelect }: MyPatientsProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const patients: Patient[] = [
    { id: 1, name: 'Amit Kumar', age: 45, condition: 'Knee Rehabilitation', progress: 75, sessions: 12, lastVisit: '2 hours ago' },
    { id: 2, name: 'Neha Singh', age: 32, condition: 'Shoulder Recovery', progress: 60, sessions: 8, lastVisit: '1 day ago' },
    { id: 3, name: 'Rajesh Gupta', age: 58, condition: 'Back Pain Therapy', progress: 45, sessions: 15, lastVisit: '2 days ago' },
    { id: 4, name: 'Kavita Reddy', age: 28, condition: 'Sports Injury', progress: 85, sessions: 10, lastVisit: '5 hours ago' },
    { id: 5, name: 'Suresh Patel', age: 62, condition: 'Hip Replacement Recovery', progress: 30, sessions: 6, lastVisit: '3 days ago' },
    { id: 6, name: 'Deepa Nair', age: 35, condition: 'Ankle Sprain', progress: 90, sessions: 7, lastVisit: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">My Patients</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor and manage your patients</p>
      </div>

      {/* Patients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 dark:text-white mb-1 truncate">{patient.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{patient.age} years</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Condition</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{patient.condition}</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-gray-800 dark:text-white font-semibold">{patient.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${patient.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5]"
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Sessions: {patient.sessions}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">{patient.lastVisit}</span>
              </div>

              <button
                onClick={() => setSelectedPatient(patient)}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5] text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Patient Profile Modal */}
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
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Patient Profile</h3>
              <button
                onClick={() => setSelectedPatient(null)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {selectedPatient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{selectedPatient.name}</h4>
              <p className="text-gray-600 dark:text-gray-400">{selectedPatient.age} years old</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Condition</p>
                <p className="font-semibold text-gray-800 dark:text-white">{selectedPatient.condition}</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Recovery Progress</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5]"
                      style={{ width: `${selectedPatient.progress}%` }}
                    />
                  </div>
                  <span className="font-bold text-gray-800 dark:text-white">{selectedPatient.progress}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{selectedPatient.sessions}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Visit</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{selectedPatient.lastVisit}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Medical Notes</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Patient showing steady improvement. Continue current exercise regimen. 
                  Monitor for any signs of discomfort during knee flexion exercises.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onPatientSelect(selectedPatient.id);
                  setSelectedPatient(null);
                }}
                className="py-3 rounded-xl bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5] text-white font-semibold hover:shadow-lg transition-all"
              >
                Assign Exercise
              </button>
              <button
                onClick={() => setSelectedPatient(null)}
                className="py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
