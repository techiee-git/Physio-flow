import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Flame, TrendingUp, Activity } from 'lucide-react';

export default function ProgressPage() {
  const accuracyData = [
    { week: 'Week 1', accuracy: 45 },
    { week: 'Week 2', accuracy: 52 },
    { week: 'Week 3', accuracy: 61 },
    { week: 'Week 4', accuracy: 68 },
    { week: 'Week 5', accuracy: 73 },
    { week: 'Week 6', accuracy: 75 },
  ];

  const exerciseCompletionData = [
    { week: 'Week 1', completed: 65 },
    { week: 'Week 2', completed: 70 },
    { week: 'Week 3', completed: 80 },
    { week: 'Week 4', completed: 75 },
    { week: 'Week 5', completed: 85 },
    { week: 'Week 6', completed: 90 },
  ];

  const badges = [
    { id: 1, name: '5 Day Streak', icon: Flame, earned: true, color: 'from-orange-400 to-red-500' },
    { id: 2, name: 'Perfect Posture', icon: Target, earned: true, color: 'from-green-400 to-teal-500' },
    { id: 3, name: '50 Sessions', icon: Trophy, earned: false, color: 'from-yellow-400 to-orange-500' },
    { id: 4, name: 'Top Performer', icon: TrendingUp, earned: false, color: 'from-purple-400 to-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">My Progress</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your recovery journey and achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Sessions', value: '42', icon: Activity, change: '+5 this week' },
          { label: 'Avg Accuracy', value: '75%', icon: Target, change: '+8% improvement' },
          { label: 'Current Streak', value: '5 days', icon: Flame, change: 'Keep going!' },
          { label: 'Recovery Rate', value: '75%', icon: TrendingUp, change: 'Excellent progress' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-2 mb-4">
              <stat.icon className="w-5 h-5 text-[#3FA9F5]" />
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.value}</p>
            <p className="text-xs text-green-500 font-medium">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Accuracy Improvement Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Accuracy Improvement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#3FA9F5"
                strokeWidth={3}
                dot={{ fill: '#3FA9F5', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Exercise Completion Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Exercise Completion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={exerciseCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#4ED1C5"
                strokeWidth={3}
                dot={{ fill: '#4ED1C5', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Achievements & Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Achievements & Badges</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`p-5 rounded-2xl text-center ${
                badge.earned
                  ? 'bg-gradient-to-br ' + badge.color
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                  badge.earned ? 'bg-white/20 backdrop-blur-sm' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              >
                <badge.icon
                  className={`w-8 h-8 ${badge.earned ? 'text-white' : 'text-gray-400'}`}
                />
              </div>
              <p
                className={`font-bold ${
                  badge.earned ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {badge.name}
              </p>
              {!badge.earned && (
                <p className="text-xs text-gray-400 mt-1">Not earned yet</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 bg-gradient-to-br from-[#3FA9F5]/10 to-[#4ED1C5]/10 dark:from-[#3FA9F5]/20 dark:to-[#4ED1C5]/20 rounded-2xl border border-[#3FA9F5]/30"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">This Week's Summary</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sessions Completed</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">5 / 7</p>
          </div>
          <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Duration</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">25 min</p>
          </div>
          <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Diet Adherence</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">85%</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}