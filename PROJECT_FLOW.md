# SanketSetu - Project Flow & Architecture

## ✅ Status: Fully Connected

The **SanketSetu** platform is now fully integrated with a connected flow between all user roles. All components are sharing real-time synchronized state.

### 🔄 Core Data Flow

```mermaid
graph TD
    Store[Global Store (Zustand)]
    
    %% Citizen Flow
    Citizen[Citizen Portal] -->|Report Incident| Store
    Store -->|Update Status| Citizen
    
    %% Dashboard Flow
    Store -->|Real-time Incidents| Dashboard[Command Center]
    Store -->|Volunteer Locations| Dashboard
    Dashboard -->|Dispatch Commands| Store
    
    %% Volunteer Flow
    Store -->|New Mission Alert| Volunteer[Volunteer App]
    Volunteer -->|Accept Mission| Store
    Volunteer -->|Update Status| Store
```

### 🔗 Role-Based Connections

#### 1. 👤 Citizen (`/citizen`)
- **Input**: Can press "SOS" button.
- **Action**: Triggers `addIncident()` in Global Store.
- **Feedback**: Receives confirmation when a volunteer is assigned (listening to Store).

#### 2. 🛡️ Command Center (`/dashboard`)
- **Input**: Monitors all activities.
- **Visuals**: 
  - **LiveMap**: Displays incidents and units on Leaflet map (Fixed crasher issues).
  - **Incident Feed**: Updates instantly when Citizen reports.
  - **Unit Status**: Shows real-time availability of volunteers.

#### 3. 🚑 Volunteer (`/volunteer`)
- **Input**: Receives alerts.
- **Action**: Can "Swipe to Accept" missions.
- **Result**: Updates incident status to 'Assigned' and self status to 'Busy' in Global Store.

### 🛠️ Key Technical Components

| Component | Responsibility | Connection |
|-----------|----------------|------------|
| **`lib/store.ts`** | **The Brain**. Holds all state (Incidents, Volunteers). | Connected to ALL pages. |
| **`LiveMap.tsx`** | Visualizes spatial data. | Connected to Dashboard (Fixed re-render crash). |
| **`TopNav.tsx`** | Admin navigation. | Connects Dashboard, Incidents, Unit views. |
| **`LoginPage`** | Authentication & Routing. | Directs users to their specific portal based on role. |

---

## 🐛 Fixes Applied

### 🚨 "Map container is already initialized" Error
**Status**: ✅ FIXED
- **Root Cause**: Next.js & React Strict Mode caused the Leaflet map to re-initialize on the same DOM element during re-renders.
- **Fix**: 
  - Added strict User-Agent/Client-Side checks.
  - Added a unique `key` prop to `MapContainer` to ensure safe mounting/unmounting.
  - Ensures map is only rendered when component is fully mounted on the client.

## 🚀 How to Test the Flow

1. **Open 3 Browser Tabs** (Simulation):
   - **Tab 1**: `http://localhost:3000/dashboard` (Admin View)
   - **Tab 2**: `http://localhost:3000/citizen` (Citizen View)
   - **Tab 3**: `http://localhost:3000/volunteer` (Volunteer View)

2. **Actions**:
   - In **Citizen Tab**: Press "SOS".
   - Watch **Tab 1 (Dashboard)**: New incident appears instantly on Feed and Map.
   - Watch **Tab 3 (Volunteer)**: "High Priority Alert" pops up.
   - In **Volunteer Tab**: "Swipe to Accept".
   - Watch **Tab 1**: Incident turns "Assigned".
   - Watch **Tab 2**: Citizen sees "Help is on the way!".

**Everything is now connected and running smoothly.**
