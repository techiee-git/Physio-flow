import { motion } from 'motion/react';

export default function PatientDietPlan() {
  const dietPlan = {
    morning: {
      time: '7:00 AM - 9:00 AM',
      items: [
        '1 cup Oatmeal with nuts and honey',
        '2 Boiled eggs or Paneer bhurji',
        '1 glass Fresh fruit juice (Orange/Pomegranate)',
        'Handful of almonds and walnuts',
        'Green tea',
      ],
      emoji: '🌅',
      color: 'from-orange-400 to-yellow-500',
    },
    afternoon: {
      time: '12:00 PM - 2:00 PM',
      items: [
        '2 Chapati with Dal (Lentils)',
        'Brown rice (1 cup)',
        'Mixed vegetable curry (Seasonal vegetables)',
        'Curd or Buttermilk',
        'Cucumber and tomato salad',
      ],
      emoji: '☀️',
      color: 'from-yellow-400 to-orange-500',
    },
    evening: {
      time: '7:00 PM - 9:00 PM',
      items: [
        'Grilled chicken or Fish curry (150g)',
        '2 Chapati or 1 cup quinoa',
        'Palak paneer or Mixed vegetable sabzi',
        'Dal or Sambhar',
        'Fresh green salad',
      ],
      emoji: '🌙',
      color: 'from-purple-400 to-blue-500',
    },
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Your Diet Plan</h1>
        <p className="text-gray-600 dark:text-gray-400">Personalized nutrition plan by Dr. Arjun Sharma</p>
      </div>

      {/* Morning Diet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dietPlan.morning.color} flex items-center justify-center text-3xl`}>
            {dietPlan.morning.emoji}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Morning Diet</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{dietPlan.morning.time}</p>
          </div>
        </div>
        <div className="space-y-3">
          {dietPlan.morning.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500" />
              <p className="text-gray-700 dark:text-gray-300">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Afternoon Diet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dietPlan.afternoon.color} flex items-center justify-center text-3xl`}>
            {dietPlan.afternoon.emoji}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Afternoon Diet</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{dietPlan.afternoon.time}</p>
          </div>
        </div>
        <div className="space-y-3">
          {dietPlan.afternoon.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
              <p className="text-gray-700 dark:text-gray-300">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Evening Diet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dietPlan.evening.color} flex items-center justify-center text-3xl`}>
            {dietPlan.evening.emoji}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Evening Diet</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{dietPlan.evening.time}</p>
          </div>
        </div>
        <div className="space-y-3">
          {dietPlan.evening.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-500" />
              <p className="text-gray-700 dark:text-gray-300">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Hydration Reminder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">💧</div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-2">Hydration Reminder</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Drink 8-10 glasses of water daily for optimal recovery
            </p>
            <div className="flex flex-wrap gap-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3FA9F5] to-[#4ED1C5] flex items-center justify-center text-white font-bold"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Nutritional Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl border border-green-200 dark:border-green-800"
      >
        <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Doctor's Nutritional Tips
        </h4>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>Include plenty of protein for muscle recovery and tissue repair</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>Eat seasonal fruits rich in vitamins and antioxidants</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>Avoid processed foods, excessive salt, and refined sugar</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>Include turmeric, ginger, and garlic for natural anti-inflammatory benefits</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>Take meals at regular times to maintain metabolism</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
