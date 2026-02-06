import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useIncidents() {
    return useQuery({
        queryKey: ['incidents'],
        queryFn: async () => {
            // Return mock data if no Supabase connection
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
                console.warn("Supabase not configured, returning mock data");
                return [
                    { id: 1, title: 'Mock Incident', status: 'active' },
                ];
            }

            const { data, error } = await supabase
                .from('incidents')
                .select('*');

            if (error) throw error;
            return data;
        },
    });
}
