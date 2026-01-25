import { motion } from 'motion/react';
import { Edit, Play } from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
}

export default function ExerciseLibrary() {
  const exercises: Exercise[] = [
    { id: 1, name: 'Knee Flexion', bodyPart: 'Knee', difficulty: 'Easy', duration: '5 min' },
    { id: 2, name: 'Shoulder Rotation', bodyPart: 'Shoulder', difficulty: 'Medium', duration: '8 min' },
    { id: 3, name: 'Hip Abduction', bodyPart: 'Hip', difficulty: 'Easy', duration: '6 min' },
    { id: 4, name: 'Ankle Pumps', bodyPart: 'Ankle', difficulty: 'Easy', duration: '4 min' },
    { id: 5, name: 'Hamstring Stretch', bodyPart: 'Leg', difficulty: 'Medium', duration: '7 min' },
    { id: 6, name: 'Chest Expansion', bodyPart: 'Chest', difficulty: 'Medium', duration: '6 min' },
    { id: 7, name: 'Spinal Twist', bodyPart: 'Back', difficulty: 'Hard', duration: '10 min' },
    { id: 8, name: 'Wrist Curls', bodyPart: 'Wrist', difficulty: 'Easy', duration: '5 min' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Exercise Library</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage physiotherapy exercises</p>
      </div>

      {/* Exercise Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {exercises.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all"
          >
            {/* Video Thumbnail */}
            <div className="relative h-40 bg-gradient-to-br from-[#3FA9F5] to-[#4ED1C5] flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">{exercise.name}</h3>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">{exercise.bodyPart}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{exercise.duration}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>

                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
