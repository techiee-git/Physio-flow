import { motion } from 'motion/react';
import { Users, UserCheck, Activity, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminOverview() {
  const stats = [
    { label: 'Total Doctors', value: '24', icon: UserCheck, color: 'from-blue-400 to-blue-600', change: '+3 this month' },
    { label: 'Total Patients', value: '156', icon: Users, color: 'from-green-400 to-green-600', change: '+12 this week' },
    { label: 'Exercise Sessions', value: '1,234', icon: Activity, color: 'from-purple-400 to-purple-600', change: '+45 today' },
    { label: 'Active Users', value: '89', icon: TrendingUp, color: 'from-orange-400 to-orange-600', change: 'Currently online' },
  ];

  const patientActivityData = [
    { month: 'Jan', patients: 120 },
    { month: 'Feb', patients: 132 },
    { month: 'Mar', patients: 145 },
    { month: 'Apr', patients: 138 },
    { month: 'May', patients: 150 },
    { month: 'Jun', patients: 156 },
  ];

  const doctorActivityData = [
    { name: 'Dr. Arjun', sessions: 45 },
    { name: 'Dr. Priya', sessions: 38 },
    { name: 'Dr. Rahul', sessions: 42 },
    { name: 'Dr. Sneha', sessions: 36 },
    { name: 'Dr. Vikram', sessions: 40 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your platform overview.</p>
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

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Patient Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Patient Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patientActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                }} 
              />
              <Line type="monotone" dataKey="patients" stroke="#3FA9F5" strokeWidth={3} dot={{ fill: '#3FA9F5', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Doctor Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Top Doctors by Sessions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={doctorActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                }} 
              />
              <Bar dataKey="sessions" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ED1C5" />
                  <stop offset="100%" stopColor="#3FA9F5" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
