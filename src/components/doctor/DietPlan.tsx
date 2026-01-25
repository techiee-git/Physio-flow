import { useState } from 'react';
import { motion } from 'motion/react';
import { Save } from 'lucide-react';

interface DietPlanData {
  patientId: string;
  morning: string;
  afternoon: string;
  evening: string;
}

export default function DietPlan() {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [dietPlan, setDietPlan] = useState<DietPlanData>({
    patientId: '',
    morning: '',
    afternoon: '',
    evening: '',
  });

  const patients = [
    { id: 1, name: 'Amit Kumar' },
    { id: 2, name: 'Neha Singh' },
    { id: 3, name: 'Rajesh Gupta' },
    { id: 4, name: 'Kavita Reddy' },
    { id: 5, name: 'Suresh Patel' },
    { id: 6, name: 'Deepa Nair' },
  ];

  const sampleDietPlans = {
    morning: `• 1 cup Oatmeal with nuts and honey
• 2 Boiled eggs or Paneer bhurji
• 1 glass Fresh fruit juice (Orange/Pomegranate)
• Handful of almonds and walnuts
• Green tea`,
    afternoon: `• 2 Chapati with Dal (Lentils)
• Brown rice (1 cup)
• Mixed vegetable curry (Seasonal vegetables)
• Curd or Buttermilk
• Cucumber and tomato salad`,
    evening: `• Grilled chicken or Fish curry (150g)
• 2 Chapati or 1 cup quinoa
• Palak paneer or Mixed vegetable sabzi
• Dal or Sambhar
• Fresh green salad`,
  };

  const handlePatientChange = (patientId: string) => {
    setSelectedPatient(patientId);
    setDietPlan({
      patientId,
      morning: sampleDietPlans.morning,
      afternoon: sampleDietPlans.afternoon,
      evening: sampleDietPlans.evening,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Diet plan saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Diet Plan Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Create and manage personalized diet plans</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Selection */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select Patient
          </label>
          <select
            value={selectedPatient}
            onChange={(e) => handlePatientChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white"
            required
          >
            <option value="">Choose a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        {selectedPatient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Morning Diet */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                  <span className="text-2xl">🌅</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Morning Diet</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Breakfast (7:00 AM - 9:00 AM)</p>
                </div>
              </div>
              <textarea
                value={dietPlan.morning}
                onChange={(e) => setDietPlan({ ...dietPlan, morning: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white resize-none"
                placeholder="Enter morning diet plan with Indian dishes..."
                required
              />
            </div>

            {/* Afternoon Diet */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <span className="text-2xl">☀️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Afternoon Diet</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Lunch (12:00 PM - 2:00 PM)</p>
                </div>
              </div>
              <textarea
                value={dietPlan.afternoon}
                onChange={(e) => setDietPlan({ ...dietPlan, afternoon: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white resize-none"
                placeholder="Enter afternoon diet plan with Indian dishes..."
                required
              />
            </div>

            {/* Evening Diet */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                  <span className="text-2xl">🌙</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Evening Diet</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dinner (7:00 PM - 9:00 PM)</p>
                </div>
              </div>
              <textarea
                value={dietPlan.evening}
                onChange={(e) => setDietPlan({ ...dietPlan, evening: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white resize-none"
                placeholder="Enter evening diet plan with Indian dishes..."
                required
              />
            </div>

            {/* Nutritional Tips */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl border border-green-200 dark:border-green-800">
              <h4 className="font-bold text-gray-800 dark:text-white mb-3">💡 Nutritional Tips</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Include plenty of protein for muscle recovery</li>
                <li>• Stay hydrated - 8-10 glasses of water daily</li>
                <li>• Add seasonal fruits and vegetables</li>
                <li>• Avoid processed foods and excessive sugar</li>
                <li>• Incorporate traditional Indian superfoods like turmeric and ginger</li>
              </ul>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5] text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Diet Plan
            </button>
          </motion.div>
        )}
      </form>
    </div>
  );
}
