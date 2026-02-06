import { create } from 'zustand';

export type IncidentType = 'fire' | 'flood' | 'medical' | 'other';

export interface Incident {
    id: string;
    type: IncidentType;
    location: string; // "lat,lng" for simplicity or a zone name
    severity: 'high' | 'medium' | 'low';
    status: 'open' | 'assigned' | 'resolved';
    timestamp: number;
}

export interface Volunteer {
    id: string;
    name: string;
    status: 'available' | 'busy' | 'offline';
    location: string;
    assignedIncidentId?: string | null;
}

interface State {
    userRole: 'admin' | 'citizen' | 'volunteer' | null;
    incidents: Incident[];
    volunteers: Volunteer[];

    // Actions
    setUserRole: (role: 'admin' | 'citizen' | 'volunteer' | null) => void;
    addIncident: (incident: Omit<Incident, 'id' | 'timestamp'>) => void;
    assignVolunteer: (volunteerId: string, incidentId: string) => void;
    updateVolunteerStatus: (volunteerId: string, status: Volunteer['status']) => void;
    simulateIncident: () => void; // For demo purpose
}

export const useStore = create<State>((set) => ({
    userRole: null,
    incidents: [
        { id: 'INC-001', type: 'fire', location: 'District A', severity: 'high', status: 'open', timestamp: Date.now() }
    ],
    volunteers: [
        { id: 'VOL-001', name: 'Priya S.', status: 'available', location: 'District A' },
        { id: 'VOL-002', name: 'Rahul K.', status: 'busy', location: 'District B', assignedIncidentId: 'INC-001' },
        { id: 'VOL-003', name: 'Amit B.', status: 'available', location: 'North Zone' },
    ],

    setUserRole: (role) => set({ userRole: role }),

    addIncident: (incident) => set((state) => ({
        incidents: [
            {
                ...incident,
                id: `INC-${Math.floor(Math.random() * 1000)}`,
                timestamp: Date.now()
            },
            ...state.incidents
        ]
    })),

    assignVolunteer: (volunteerId, incidentId) => set((state) => ({
        volunteers: state.volunteers.map(v =>
            v.id === volunteerId ? { ...v, status: 'busy', assignedIncidentId: incidentId } : v
        ),
        incidents: state.incidents.map(i =>
            i.id === incidentId ? { ...i, status: 'assigned' } : i
        )
    })),

    updateVolunteerStatus: (volunteerId, status) => set((state) => ({
        volunteers: state.volunteers.map(v =>
            v.id === volunteerId ? { ...v, status } : v
        )
    })),

    simulateIncident: () => set((state) => {
        const types: IncidentType[] = ['fire', 'flood', 'medical'];
        const type = types[Math.floor(Math.random() * types.length)];
        const zones = ['District A', 'District B', 'North Zone', 'Central Hub'];
        const zone = zones[Math.floor(Math.random() * zones.length)];

        return {
            incidents: [
                {
                    id: `SIM-${Math.floor(Math.random() * 1000)}`,
                    type,
                    location: zone,
                    severity: 'high',
                    status: 'open',
                    timestamp: Date.now()
                },
                ...state.incidents
            ]
        };
    })
}));
