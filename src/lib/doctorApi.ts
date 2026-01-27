import { supabase } from './supabase'
import { Patient } from './adminApi' // Reusing Patient type

export async function fetchAssignedPatients(doctorId: string): Promise<Patient[]> {
    // Get all assignments for this doctor
    const { data: assignments, error } = await supabase
        .from('assignments')
        .select('patient_id')
        .eq('doctor_id', doctorId)

    if (error || !assignments || assignments.length === 0) {
        return []
    }

    const patientIds = assignments.map(a => a.patient_id)

    // Fetch patient details
    const { data: patients } = await supabase
        .from('users')
        .select('*')
        .in('id', patientIds)
        .eq('role', 'patient')

    if (!patients) return []

    // Map to Patient type (adding doctor info which is self-evident here)

    return patients.map(p => ({
        ...p,
        doctor_id: doctorId
    }))
}

export interface ActivityItem {
    id: string;
    type: 'joined' | 'session';
    patientName: string;
    description: string;
    timestamp: string;
}

export async function fetchDoctorActivity(doctorId: string): Promise<ActivityItem[]> {
    // 1. Get assigned patients
    const patients = await fetchAssignedPatients(doctorId)
    const patientIds = patients.map(p => p.id)

    if (patientIds.length === 0) return []

    // 2. Get join events (from users table)
    const joinEvents: ActivityItem[] = patients.map(p => ({
        id: `join-${p.id}`,
        type: 'joined',
        patientName: p.name,
        description: 'Joined the platform',
        timestamp: p.created_at || new Date().toISOString()
    }))

    // 3. Get session events (from sessions table)
    const { data: sessions } = await supabase
        .from('sessions')
        .select('*')
        .in('patient_id', patientIds)
        .order('started_at', { ascending: false })
        .limit(20)

    const sessionEvents: ActivityItem[] = (sessions || []).map(s => {
        const patient = patients.find(p => p.id === s.patient_id)
        return {
            id: `session-${s.id}`,
            type: 'session',
            patientName: patient?.name || 'Unknown Patient',
            description: 'Completed an exercise session',
            timestamp: s.created_at || s.started_at // Fallback to started_at
        }
    })

    // 4. Merge and sort
    return [...joinEvents, ...sessionEvents]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10)
}
