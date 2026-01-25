import { motion } from 'motion/react';
import { Download, FileText, Share2 } from 'lucide-react';

export default function DoctorReports() {
  const reports = [
    {
      id: 1,
      patientName: 'Amit Kumar',
      type: 'Progress Report',
      date: 'Jan 15, 2026',
      status: 'Ready',
    },
    {
      id: 2,
      patientName: 'Neha Singh',
      type: 'Treatment Summary',
      date: 'Jan 14, 2026',
      status: 'Ready',
    },
    {
      id: 3,
      patientName: 'Rajesh Gupta',
      type: 'Monthly Report',
      date: 'Jan 10, 2026',
      status: 'Ready',
    },
    {
      id: 4,
      patientName: 'Kavita Reddy',
      type: 'Progress Report',
      date: 'Jan 8, 2026',
      status: 'Ready',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Patient Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">Generate and share patient progress reports</p>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3FA9F5] to-[#4ED1C5] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1">{report.patientName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{report.type}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{report.date}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5] text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
