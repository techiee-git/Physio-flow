import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Check, AlertCircle } from 'lucide-react';

export default function ExercisePage() {
  const [isExercising, setIsExercising] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState('Position yourself in front of the camera');
  const [reps, setReps] = useState(0);

  const startExercise = () => {
    setIsExercising(true);
    // Simulate AI feedback
    const feedbacks = [
      'Good posture! Keep it up',
      'Raise your arm slightly higher',
      'Perfect form! Excellent',
      'Bend your knee a bit more',
      'Great progress! Continue',
    ];

    const interval = setInterval(() => {
      setAccuracy(prev => Math.min(prev + Math.random() * 10, 95));
      setReps(prev => prev + 1);
      setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
    }, 3000);

    setTimeout(() => {
      clearInterval(interval);
      setIsExercising(false);
      alert('Exercise completed! Great work!');
    }, 30000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Exercise Session</h1>
        <p className="text-gray-600 dark:text-gray-400">Follow along and let AI guide your movements</p>
      </div>

      {/* Exercise Video/Camera */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-200 dark:border-gray-700"
      >
        {/* Video Demo */}
        <div className="relative aspect-video bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative text-center z-10">
            {!isExercising ? (
              <button
                onClick={startExercise}
                className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
              >
                <Play className="w-10 h-10 text-[#3FA9F5] ml-1" />
              </button>
            ) : (
              <div className="text-white">
                <div className="text-6xl font-bold mb-2">{reps}</div>
                <div className="text-xl">Repetitions</div>
              </div>
            )}
          </div>

          {/* Pose Overlay Skeleton (Mock) */}
          {isExercising && (
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 640 480">
                {/* Mock skeleton points */}
                <circle cx="320" cy="100" r="8" fill="#4ED1C5" />
                <circle cx="280" cy="160" r="8" fill="#4ED1C5" />
                <circle cx="360" cy="160" r="8" fill="#4ED1C5" />
                <circle cx="320" cy="220" r="8" fill="#4ED1C5" />
                <line x1="320" y1="100" x2="280" y2="160" stroke="#4ED1C5" strokeWidth="3" />
                <line x1="320" y1="100" x2="360" y2="160" stroke="#4ED1C5" strokeWidth="3" />
              </svg>
            </div>
          )}
        </div>

        {/* Exercise Info Overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md text-white">
            <p className="text-sm font-medium">Current Exercise</p>
            <p className="text-lg font-bold">Knee Flexion</p>
          </div>
          {isExercising && (
            <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md text-white">
              <p className="text-sm font-medium">Accuracy</p>
              <p className="text-2xl font-bold">{Math.round(accuracy)}%</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Camera Preview (Patient View) */}
      {isExercising && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 dark:border-gray-700"
        >
          <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <p className="text-white text-lg">📹 Your Camera View</p>
          </div>
          <div className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-xl bg-black/70 backdrop-blur-md text-white">
            <div className="flex items-center gap-2 mb-1">
              {accuracy > 70 ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              )}
              <p className="font-semibold">Live Feedback</p>
            </div>
            <p className="text-sm">{feedback}</p>
          </div>
        </motion.div>
      )}

      {/* Accuracy Indicator */}
      {isExercising && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 dark:text-white">Session Accuracy</h3>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">{Math.round(accuracy)}%</span>
          </div>
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              className="h-full bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5]"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {accuracy > 80 ? 'Excellent form!' : accuracy > 60 ? 'Good job, keep going!' : 'Focus on your posture'}
          </p>
        </motion.div>
      )}

      {/* Exercise Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Exercise Instructions</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3FA9F5] text-white flex items-center justify-center font-semibold flex-shrink-0">
              1
            </div>
            <p className="text-gray-700 dark:text-gray-300">Stand with your feet shoulder-width apart</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3FA9F5] text-white flex items-center justify-center font-semibold flex-shrink-0">
              2
            </div>
            <p className="text-gray-700 dark:text-gray-300">Slowly bend your knee to a 90-degree angle</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3FA9F5] text-white flex items-center justify-center font-semibold flex-shrink-0">
              3
            </div>
            <p className="text-gray-700 dark:text-gray-300">Hold for 2 seconds, then return to starting position</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3FA9F5] text-white flex items-center justify-center font-semibold flex-shrink-0">
              4
            </div>
            <p className="text-gray-700 dark:text-gray-300">Repeat 10 times or as prescribed by your doctor</p>
          </div>
        </div>
      </motion.div>

      {!isExercising && (
        <button
          onClick={startExercise}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5] text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
        >
          Start Exercise Session
        </button>
      )}

      {isExercising && (
        <button
          onClick={() => setIsExercising(false)}
          className="w-full py-4 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
        >
          End Session
        </button>
      )}
    </div>
  );
}
