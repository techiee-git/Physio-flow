import { motion } from 'motion/react';
import { Users, Activity, FileText, Brain } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DoctorOverviewProps {
  onPatientSelect: (patientId: number) => void;
}

export default function DoctorOverview({ onPatientSelect }: DoctorOverviewProps) {
  const stats = [
    { label: 'My Patients', value: '23', icon: Users, color: 'from-blue-400 to-blue-600', change: '+2 this week' },
    { label: 'Active Treatments', value: '18', icon: Activity, color: 'from-green-400 to-green-600', change: '5 completed' },
    { label: 'Pending Reports', value: '4', icon: FileText, color: 'from-orange-400 to-orange-600', change: '2 due today' },
    { label: 'AI Sessions', value: '156', icon: Brain, color: 'from-purple-400 to-purple-600', change: '+23 this week' },
  ];

  const poseAccuracyData = [
    { name: 'Excellent (90-100%)', value: 45, color: '#10B981' },
    { name: 'Good (70-89%)', value: 35, color: '#3FA9F5' },
    { name: 'Fair (50-69%)', value: 15, color: '#F59E0B' },
    { name: 'Needs Work (<50%)', value: 5, color: '#EF4444' },
  ];

  const recentPatients = [
    { id: 1, name: 'Amit Kumar', condition: 'Knee Rehabilitation', lastSession: '2 hours ago', accuracy: 85 },
    { id: 2, name: 'Neha Singh', condition: 'Shoulder Recovery', lastSession: '1 day ago', accuracy: 92 },
    { id: 3, name: 'Rajesh Gupta', condition: 'Back Pain Therapy', lastSession: '2 days ago', accuracy: 78 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Doctor Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, Dr. Arjun! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</p>
            <p className="text-xs text-green-500 font-medium">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Pose Accuracy Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">AI Pose Accuracy Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={poseAccuracyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {poseAccuracyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Patient Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Recent Patient Activity</h3>
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
                onClick={() => onPatientSelect(patient.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">{patient.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{patient.condition}</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{patient.lastSession}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5]"
                      style={{ width: `${patient.accuracy}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{patient.accuracy}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
