import { useState } from 'react';
import { 
  Users, 
  Activity, 
  FileText, 
  Brain,
  LogOut,
  Menu,
  X,
  Stethoscope,
  Dumbbell,
  Apple
} from 'lucide-react';
import DoctorOverview from './DoctorOverview';
import MyPatients from './MyPatients';
import ExerciseAssignment from './ExerciseAssignment';
import DietPlan from './DietPlan';
import DoctorReports from './DoctorReports';

interface DoctorDashboardProps {
  onLogout: () => void;
}

export default function DoctorDashboard({ onLogout }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'patients', label: 'My Patients', icon: Users },
    { id: 'exercises', label: 'Exercise Assignment', icon: Dumbbell },
    { id: 'diet', label: 'Diet Plans', icon: Apple },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  const handlePatientSelect = (patientId: number) => {
    setSelectedPatientId(patientId);
    setActiveTab('exercises');
  };

  return (
    <div className="min-h-screen bg-[#F5FAFF] dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3FA9F5] to-[#4ED1C5] flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 dark:text-white">Doctor Portal</h2>
              <p className="text-xs text-gray-500">Dr. Arjun Sharma</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-[#3FA9F5] to-[#4ED1C5] text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        {activeTab === 'dashboard' && <DoctorOverview onPatientSelect={handlePatientSelect} />}
        {activeTab === 'patients' && <MyPatients onPatientSelect={handlePatientSelect} />}
        {activeTab === 'exercises' && <ExerciseAssignment selectedPatientId={selectedPatientId} />}
        {activeTab === 'diet' && <DietPlan />}
        {activeTab === 'reports' && <DoctorReports />}
      </main>
    </div>
  );
}
