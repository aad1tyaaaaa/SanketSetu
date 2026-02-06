import { IncidentTable } from "@/components/incidents/IncidentTable";

export default function IncidentsPage() {
    return (
        <div className="h-full w-full bg-slate-950 overflow-auto">
            <IncidentTable />
        </div>
    );
}
