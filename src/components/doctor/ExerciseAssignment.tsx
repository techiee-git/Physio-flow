import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Upload, Plus } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  difficulty: string;
  duration: string;
}

interface ExerciseAssignmentProps {
  selectedPatientId: number | null;
}

export default function ExerciseAssignment({
  selectedPatientId,
}: ExerciseAssignmentProps) {
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [repetitions, setRepetitions] = useState("10");
  const [accuracyThreshold, setAccuracyThreshold] = useState("75");
  const [selectedPatient, setSelectedPatient] = useState(
    selectedPatientId?.toString() || ""
  );
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const patients = [
    { id: 1, name: "Amit Kumar" },
    { id: 2, name: "Neha Singh" },
    { id: 3, name: "Rajesh Gupta" },
    { id: 4, name: "Kavita Reddy" },
    { id: 5, name: "Suresh Patel" },
    { id: 6, name: "Deepa Nair" },
  ];

  const exercises: Exercise[] = [
    {
      id: 1,
      name: "Knee Flexion",
      bodyPart: "Knee",
      difficulty: "Easy",
      duration: "5 min",
    },
    {
      id: 2,
      name: "Shoulder Rotation",
      bodyPart: "Shoulder",
      difficulty: "Medium",
      duration: "8 min",
    },
    {
      id: 3,
      name: "Hip Abduction",
      bodyPart: "Hip",
      difficulty: "Easy",
      duration: "6 min",
    },
    {
      id: 4,
      name: "Ankle Pumps",
      bodyPart: "Ankle",
      difficulty: "Easy",
      duration: "4 min",
    },
    {
      id: 5,
      name: "Hamstring Stretch",
      bodyPart: "Leg",
      difficulty: "Medium",
      duration: "7 min",
    },
    {
      id: 6,
      name: "Chest Expansion",
      bodyPart: "Chest",
      difficulty: "Medium",
      duration: "6 min",
    },
  ];

  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const fd = new FormData();
      if (uploadedVideo) {
        fd.append("video", uploadedVideo);
      }
      fd.append("patientId", selectedPatient);
      fd.append("exerciseId", String(selectedExercise));

      // POST to local upload server
      const resp = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: fd,
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || "Upload failed");
      }

      const data = await resp.json();
      if (data && data.success) {
        alert(
          `Exercise assigned successfully!${
            data.filename ? `\nUploaded file: ${data.filename}` : ""
          }`
        );
        // Optionally clear uploaded video after successful upload
        removeUploadedVideo();
      } else {
        throw new Error("Upload failed");
      }
    } catch (err: any) {
      alert("Upload error: " + (err?.message || err));
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    // Revoke previous preview URL when uploadedVideo changes or component unmounts
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoPreview]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = ["video/mp4", "video/quicktime", "video/mov"];

    if (file.size > maxSize) {
      alert("File is too large. Maximum allowed size is 50MB.");
      e.currentTarget.value = "";
      return;
    }

    // Accept any video/* but prefer common types
    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file.");
      e.currentTarget.value = "";
      return;
    }

    // Clean up previous preview
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setUploadedVideo(file);
    setVideoPreview(previewUrl);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeUploadedVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setUploadedVideo(null);
    setVideoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Exercise Assignment
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Assign exercises to your patients
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Exercise Library */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Exercise Library
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {exercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedExercise(exercise.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedExercise === exercise.id
                    ? "border-[#3FA9F5] bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-[#3FA9F5]/50"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3FA9F5] to-[#4ED1C5] flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1 truncate">
                      {exercise.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exercise.bodyPart}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {exercise.difficulty}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {exercise.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Upload Custom Exercise */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Upload Custom Exercise
            </h3>
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-[#3FA9F5] transition-colors cursor-pointer"
              onClick={triggerFileSelect}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") triggerFileSelect();
              }}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Click to upload video
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                MP4, MOV up to 50MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp4,.mov,video/*"
                onChange={onFileChange}
                aria-hidden="true"
                style={{ display: "none" }}
              />
            </div>

            {/* Caption for chosen file (replaces default browser "Choose File" text) */}
            {!videoPreview && (
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 text-center">
                {uploadedVideo?.name ?? "No file chosen"}
              </p>
            )}

            {videoPreview && (
              <div className="mt-4">
                <video
                  src={videoPreview}
                  controls
                  className="w-full rounded-lg mb-2"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {uploadedVideo?.name}
                  </p>
                  <button
                    type="button"
                    onClick={removeUploadedVideo}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assignment Form */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
              Assignment Details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Patient
                </label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white"
                  required
                >
                  <option value="">Choose patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selected Exercise
                </label>
                <div className="px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-gray-800 dark:text-white font-medium">
                    {selectedExercise
                      ? exercises.find((e) => e.id === selectedExercise)?.name
                      : "No exercise selected"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Repetitions
                </label>
                <input
                  type="number"
                  value={repetitions}
                  onChange={(e) => setRepetitions(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white"
                  placeholder="10"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Accuracy Threshold (%)
                </label>
                <input
                  type="number"
                  value={accuracyThreshold}
                  onChange={(e) => setAccuracyThreshold(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20 outline-none transition-all text-gray-800 dark:text-white"
                  placeholder="75"
                  min="0"
                  max="100"
                  required
                />
                <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5]"
                    style={{ width: `${accuracyThreshold}%` }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedExercise || !selectedPatient}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5] text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Assign Exercise
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
