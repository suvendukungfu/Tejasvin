// import StatsCard from "../components/dashboard/StatsCard";

// export default function Dashboard() {
//   return (
//     <div className="space-y-6">
      
//       {/* Stats Cards Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatsCard
//           title="Active Incidents"
//           value="12"
//           subtitle="Currently ongoing"
//           color="#ef4444"
//         />

//         <StatsCard
//           title="Incidents Today"
//           value="38"
//           subtitle="Reported today"
//           color="#f59e0b"
//         />

//         <StatsCard
//           title="Avg Response Time"
//           value="4.2 min"
//           subtitle="Emergency dispatch"
//           color="#3b82f6"
//         />

//         <StatsCard
//           title="Resolved"
//           value="26"
//           subtitle="Cases closed"
//           color="#22c55e"
//         />
//       </div>

//     </div>
//   );
// }

import IncidentItem from "../components/dashboard/IncidentItem";
import { incidents } from "../data/mockIncidents";

<IncidentItem incident={incidents[0]} />

