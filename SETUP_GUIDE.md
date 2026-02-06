# SanketSetu - Setup Guide

## ✅ Changes Made

I've successfully downgraded your project to **Next.js 15** with the following changes:

### Updated Dependencies:
- **Next.js**: 16.1.6 → **15.1.6**
- **React**: 19.2.3 → **18.3.1**
- **React DOM**: 19.2.3 → **18.3.1**
- **Framer Motion**: 12.33.0 → **11.11.17** (compatible with React 18)
- **Zod**: 4.3.6 → **3.24.1** (stable version)
- **@types/react**: 19 → **18.3.18**
- **@types/react-dom**: 19 → **18.3.5**
- **eslint-config-next**: 16.1.6 → **15.1.6**

---

## 🚀 How to Run the Project

### Step 1: Install Node.js

**Node.js is currently NOT installed on your system.** You need to install it first:

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (recommended for most users)
3. Run the installer
4. **Important**: During installation, make sure "Add to PATH" is checked
5. Restart your terminal/PowerShell after installation

### Step 2: Verify Installation

Open a **new** PowerShell window and run:

```powershell
node --version
npm --version
```

You should see version numbers like:
```
v20.x.x
10.x.x
```

### Step 3: Install Project Dependencies

Navigate to the project directory and install dependencies:

```powershell
cd "c:\Users\LOQ\Downloads\sanket-setu\sanket-setu"
npm install
```

This will:
- Install all the updated dependencies from `package.json`
- Create a new `package-lock.json` file
- Set up the project with Next.js 15

### Step 4: Configure Environment Variables

Create a `.env.local` file in the project root:

```powershell
Copy-Item .env.local.example .env.local
```

Then edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to get these values:**
1. Go to [https://supabase.com/](https://supabase.com/)
2. Sign in to your project (or create a new one)
3. Go to Project Settings → API
4. Copy the "Project URL" and "anon/public" key

### Step 5: Run the Development Server

```powershell
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
sanket-setu/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── analytics/    # Analytics dashboard
│   │   ├── citizen/      # Citizen portal
│   │   ├── dashboard/    # Main dashboard
│   │   ├── incidents/    # Incident management
│   │   ├── login/        # Login page
│   │   ├── volunteer/    # Volunteer management
│   │   └── volunteers/   # Volunteers list
│   ├── components/       # React components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── incidents/    # Incident components
│   │   ├── layout/       # Layout components
│   │   ├── providers/    # Context providers
│   │   └── volunteers/   # Volunteer components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and configurations
│       ├── store.ts     # Zustand state management
│       ├── supabase.ts  # Supabase client
│       └── utils.ts     # Utility functions
├── public/              # Static assets
└── package.json         # Dependencies (now with Next.js 15)
```

---

## 🛠️ Available Scripts

```powershell
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🔧 Troubleshooting

### Issue: "npm is not recognized"
**Solution**: Node.js is not installed or not in PATH. Follow Step 1 above.

### Issue: Port 3000 already in use
**Solution**: Either stop the other process or run on a different port:
```powershell
npm run dev -- -p 3001
```

### Issue: Supabase connection errors
**Solution**: Check your `.env.local` file has the correct credentials.

### Issue: Module not found errors
**Solution**: Delete `node_modules` and reinstall:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 📝 Next Steps After Setup

1. **Install Node.js** (most important!)
2. Run `npm install` to install dependencies
3. Configure your `.env.local` file
4. Run `npm run dev` to start the development server
5. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🎯 What This Project Does

**SanketSetu** appears to be a crisis response/disaster management platform with:
- 🗺️ Live incident mapping (using Leaflet)
- 📊 Analytics dashboard (using Recharts)
- 👥 Volunteer management
- 🚨 Incident tracking and queue management
- 🎯 Real-time updates (using React Query)
- 💾 Backend powered by Supabase

---

**Need help?** Once you have Node.js installed, I can help you run the project and fix any issues that come up!
