import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PermissionsScreen } from './components/PermissionsScreen';
import { SetupPreferencesScreen } from './components/SetupPreferencesScreen';
import { MoodReminderScreen } from './components/MoodReminderScreen';
import { HomeScreen } from './components/HomeScreen';
import { MoodRecordingScreen } from './components/MoodRecordingScreen';
import { MedicationsScreen } from './components/MedicationsScreen';
import { AddMedicationScreen } from './components/AddMedicationScreen';
import { MedicationDetailScreen } from './components/MedicationDetailScreen';
import { ReportsScreen } from './components/ReportsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { NotificationSettings } from './components/NotificationSettings';
import { PrivacySettings } from './components/PrivacySettings';
import { HelpSupportScreen } from './components/HelpSupportScreen';
import { TabBar } from './components/TabBar';

type Screen = 
  | 'welcome' 
  | 'permissions'
  | 'setupPreferences'
  | 'moodReminder' 
  | 'home' 
  | 'moodRecording' 
  | 'medications' 
  | 'addMedication'
  | 'medicationDetail'
  | 'reports' 
  | 'settings'
  | 'notificationSettings'
  | 'privacySettings';

interface Medication {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  nextDose: string;
  adherence: number;
  startDate: string;
  endDate?: string;
  daysTaken: number;
  last7Days: boolean[];
  doseTimes: string[];
  pill?: {
    shape: 'capsule' | 'round' | 'square' | 'triangular';
    size: 'S' | 'M' | 'L';
    color1: string;
    color2: string;
    image?: string;
  };
}

interface TodayMoods {
  morning?: string;
  afternoon?: string;
  night?: string;
}

interface DietaryTrackers {
  sugar: boolean;
  gluten: boolean;
  alcohol: boolean;
  caffeine: boolean;
}

interface MoodHistoryEntry {
  date: string; // YYYY-MM-DD format
  morning?: string;
  afternoon?: string;
  night?: string;
  medicationTaken?: string[]; // IDs of medications taken
  sleep?: number; // hours
  dietary?: {
    morning?: { sugar?: boolean; gluten?: boolean; alcohol?: boolean; caffeine?: boolean };
    afternoon?: { sugar?: boolean; gluten?: boolean; alcohol?: boolean; caffeine?: boolean };
    night?: { sugar?: boolean; gluten?: boolean; alcohol?: boolean; caffeine?: boolean };
  };
  weather?: {
    temp?: number;
    condition?: string;
  };
}

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    const saved = localStorage.getItem('hasCompletedOnboarding');
    return saved === 'true';
  });
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    const saved = localStorage.getItem('hasCompletedOnboarding');
    return saved === 'true' ? 'home' : 'welcome';
  });
  const [activeTab, setActiveTab] = useState<'home' | 'medications' | 'reports'>('home');
  const [currentPeriod, setCurrentPeriod] = useState<string | undefined>(undefined);
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);
  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = localStorage.getItem('medications');
    return saved ? JSON.parse(saved) : [];
  });
  const [todayMoods, setTodayMoods] = useState<TodayMoods>(() => {
    const saved = localStorage.getItem('todayMoods');
    const todayStr = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem('todayMoodsDate');
    
    if (savedDate === todayStr && saved) {
      return JSON.parse(saved);
    }
    return {
      morning: undefined,
      afternoon: undefined,
      night: undefined
    };
  });
  const [medicationTaken, setMedicationTaken] = useState<{ [key: string]: string }>(() => {
    const saved = localStorage.getItem('medicationTaken');
    const todayStr = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem('medicationTakenDate');
    
    if (savedDate === todayStr && saved) {
      return JSON.parse(saved);
    }
    return {};
  });
  
  const [isFirstMedicationSetup, setIsFirstMedicationSetup] = useState(false);
  
  const handleGetStarted = () => {
    setCurrentScreen('permissions');
  };
  
  const handlePermissionsContinue = () => {
    setCurrentScreen('moodReminder');
  };
  
  const handleSetupPreferencesContinue = (preferences: {
    trackMedication: boolean;
  }) => {
    // Save preferences
    localStorage.setItem('trackMedication', JSON.stringify(preferences.trackMedication));
    
    setCurrentScreen('moodReminder');
  };
  
  const handleMoodReminderFinish = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    // Check if user wants to track medication
    const shouldTrackMedication = localStorage.getItem('trackMedication');
    if (shouldTrackMedication === 'true') {
      // Redirect to add medication for first setup
      setIsFirstMedicationSetup(true);
      setCurrentScreen('addMedication');
    } else {
      // Go directly to home
      setCurrentScreen('home');
    }
  };
  
  const handleRecordMood = (period?: string) => {
    setCurrentPeriod(period);
    setCurrentScreen('moodRecording');
  };
  
  const handleMoodRecordingBack = () => {
    setCurrentScreen('home');
    setCurrentPeriod(undefined);
  };
  
  const handleSaveMood = (mood: string) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Update today's moods in state
    let periodToUpdate = currentPeriod;
    if (!periodToUpdate) {
      // Determine based on current time
      const hour = new Date().getHours();
      if (hour < 12) {
        periodToUpdate = 'morning';
      } else if (hour < 18) {
        periodToUpdate = 'afternoon';
      } else {
        periodToUpdate = 'night';
      }
    }
    
    const newMoods = { ...todayMoods, [periodToUpdate as string]: mood };
    setTodayMoods(newMoods);
    
    localStorage.setItem('todayMoods', JSON.stringify(newMoods));
    localStorage.setItem('todayMoodsDate', today);
    
    // Save to mood history in localStorage
    const historyStr = localStorage.getItem('moodHistory');
    const history: MoodHistoryEntry[] = historyStr ? JSON.parse(historyStr) : [];
    
    // Find or create entry for today
    let todayEntry = history.find(entry => entry.date === today);
    if (!todayEntry) {
      todayEntry = { date: today, medicationTaken: [] };
      history.push(todayEntry);
    }
    
    // Update the mood for the specific period
    todayEntry[periodToUpdate as keyof Omit<MoodHistoryEntry, 'date' | 'medicationTaken' | 'sleep' | 'dietary' | 'weather'>] = mood;
    
    // Sort by date (most recent first)
    history.sort((a, b) => b.date.localeCompare(a.date));
    
    // Keep only last 90 days
    const last90Days = history.slice(0, 90);
    localStorage.setItem('moodHistory', JSON.stringify(last90Days));
    
    setCurrentScreen('home');
    setCurrentPeriod(undefined);
  };
  
  const handleSettings = () => {
    setCurrentScreen('settings');
  };
  
  const handleSettingsBack = () => {
    setCurrentScreen('home');
  };

  const handleNavigateSettings = (screen: 'notificationSettings' | 'privacySettings') => {
    setCurrentScreen(screen);
  };
  
  const handleTabChange = (tab: 'home' | 'medications' | 'reports') => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'medications') {
      setCurrentScreen('medications');
    } else if (tab === 'reports') {
      setCurrentScreen('reports');
    }
  };
  
  const handleAddMedication = () => {
    setCurrentScreen('addMedication');
  };
  
  const handleAddMedicationBack = () => {
    // If it's the first medication setup during onboarding, go to home
    if (isFirstMedicationSetup && medications.length === 0) {
      setIsFirstMedicationSetup(false);
      setCurrentScreen('home');
    } else {
      setCurrentScreen('medications');
    }
  };
  
  const handleSaveMedication = (medication: any) => {
    const newMed: Medication = {
      id: Date.now().toString(),
      name: medication.name,
      quantity: medication.quantity,
      unit: medication.unit,
      nextDose: `Hoje, ${medication.doseTimes[0]}`,
      adherence: 0,
      startDate: new Date().toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' }),
      daysTaken: 0,
      last7Days: [false, false, false, false, false, false, false],
      doseTimes: medication.doseTimes,
      pill: {
        shape: medication.pill.shape,
        size: medication.pill.size,
        color1: medication.pill.color1,
        color2: medication.pill.color2,
        image: medication.pill.image
      }
    };
    const newMedsList = [...medications, newMed];
    setMedications(newMedsList);
    localStorage.setItem('medications', JSON.stringify(newMedsList));
    
    // If it's the first medication setup during onboarding, go to home
    if (isFirstMedicationSetup) {
      setIsFirstMedicationSetup(false);
      setCurrentScreen('home');
    } else {
      setCurrentScreen('medications');
    }
  };
  
  const handleEditMedication = (id: string) => {
    setSelectedMedicationId(id);
    setCurrentScreen('medicationDetail');
  };
  
  const handleMedicationDetailBack = () => {
    setSelectedMedicationId(null);
    setCurrentScreen('medications');
    setActiveTab('medications');
  };
  
  const handleEditMedicationFromDetail = () => {
    // Future: navigate to edit screen
    console.log('Edit medication');
  };
  
  const handleDeleteMedication = (id: string, deleteHistory: boolean) => {
    // 1. Filter medications list
    const newMeds = medications.filter(med => med.id !== id);
    setMedications(newMeds);
    localStorage.setItem('medications', JSON.stringify(newMeds));
    
    // 2. If deleteHistory is true, clean up reports and history
    if (deleteHistory) {
      // Clean today's taken medication
      const newTaken = { ...medicationTaken };
      // Note: medicationTaken uses doseId (medId-time), so we filter by prefix
      Object.keys(newTaken).forEach(key => {
        if (key.startsWith(id)) {
          delete newTaken[key];
        }
      });
      setMedicationTaken(newTaken);
      localStorage.setItem('medicationTaken', JSON.stringify(newTaken));

      // Clean mood history entries
      const historyStr = localStorage.getItem('moodHistory');
      if (historyStr) {
        const history: MoodHistoryEntry[] = JSON.parse(historyStr);
        const updatedHistory = history.map(entry => ({
          ...entry,
          medicationTaken: entry.medicationTaken?.filter(medId => medId !== id)
        }));
        localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
      }
    }

    setSelectedMedicationId(null);
    setCurrentScreen('medications');
    setActiveTab('medications');
  };
  
  const handleMedicationCheck = (medId: string, time: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newTaken = { ...medicationTaken, [medId]: time };
    setMedicationTaken(newTaken);
    localStorage.setItem('medicationTaken', JSON.stringify(newTaken));
    localStorage.setItem('medicationTakenDate', today);

    // Also update mood history for reports
    const historyStr = localStorage.getItem('moodHistory');
    const history: MoodHistoryEntry[] = historyStr ? JSON.parse(historyStr) : [];
    
    let todayEntry = history.find(entry => entry.date === today);
    if (!todayEntry) {
      todayEntry = { date: today, medicationTaken: [] };
      history.push(todayEntry);
    }
    
    if (!todayEntry.medicationTaken) {
      todayEntry.medicationTaken = [];
    }

    // Extract base med ID (medId is "med-123-08:00")
    const baseId = medId.split('-').slice(0, -1).join('-');
    
    if (!todayEntry.medicationTaken.includes(baseId)) {
      todayEntry.medicationTaken.push(baseId);
    }

    localStorage.setItem('moodHistory', JSON.stringify(history));

    // Update medication daysTaken if not already counted today
    const medIndex = medications.findIndex(m => m.id === baseId);
    if (medIndex !== -1) {
      const updatedMeds = [...medications];
      // Simple logic: we increment daysTaken if this is the first dose today
      // (Simplified for now, just to show activity)
      updatedMeds[medIndex] = {
        ...updatedMeds[medIndex],
        daysTaken: updatedMeds[medIndex].daysTaken + 1
      };
      setMedications(updatedMeds);
      localStorage.setItem('medications', JSON.stringify(updatedMeds));
    }
  };
  
  const handleMoodSelect = (period: 'morning' | 'afternoon' | 'night', mood: string) => {
    // Update today's moods
    const newMoods = {
      ...todayMoods,
      [period]: mood
    };
    setTodayMoods(newMoods);
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('todayMoods', JSON.stringify(newMoods));
    localStorage.setItem('todayMoodsDate', today);
    
    // Update mood history
    const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
    
    let todayEntry = history.find((entry: any) => entry.date === today);
    if (!todayEntry) {
      todayEntry = { date: today };
      history.push(todayEntry);
    }
    
    todayEntry[period] = mood;
    
    history.sort((a: any, b: any) => b.date.localeCompare(a.date));
    const last90Days = history.slice(0, 90);
    localStorage.setItem('moodHistory', JSON.stringify(last90Days));
  };
  
  // Render appropriate screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={handleGetStarted} />; case 'permissions':
        return <PermissionsScreen onContinue={handlePermissionsContinue} />;
      case 'setupPreferences':
        return <SetupPreferencesScreen onContinue={handleSetupPreferencesContinue} />;
      case 'moodReminder':
        return <MoodReminderScreen onFinish={handleMoodReminderFinish} />;
      case 'home':
        return (
          <>
            <HomeScreen 
              onRecordMood={handleRecordMood} 
              onSettings={handleSettings}
              todayMoods={todayMoods}
              medications={medications}
              onMedicationCheck={handleMedicationCheck}
              medicationTaken={medicationTaken}
              onMoodSelect={handleMoodSelect}
            />
            <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
          </>
        );
      case 'moodRecording':
        return (
          <MoodRecordingScreen 
            onBack={handleMoodRecordingBack} 
            onSave={handleSaveMood}
            period={currentPeriod}
          />
        );
      case 'medications':
        return (
          <>
            <MedicationsScreen 
              medications={medications}
              onAddMedication={handleAddMedication}
              onEditMedication={handleEditMedication}
            />
            <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
          </>
        );
      case 'addMedication':
        return <AddMedicationScreen onBack={handleAddMedicationBack} onSave={handleSaveMedication} isFirstSetup={isFirstMedicationSetup} />;
      
      case 'medicationDetail':
        const selectedMed = medications.find(m => m.id === selectedMedicationId);
        if (!selectedMed) return null;
        return (
          <MedicationDetailScreen 
            medication={selectedMed}
            onBack={handleMedicationDetailBack}
            onEdit={handleEditMedicationFromDetail}
            onDelete={handleDeleteMedication}
          />
        );
      
      case 'reports':
        return (
          <>
            <ReportsScreen medications={medications} />
            <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
          </>
        );
      case 'settings':
        return <SettingsScreen 
          onBack={handleSettingsBack} 
          onNavigate={handleNavigateSettings}
        />;
      case 'notificationSettings':
        return <NotificationSettings onBack={() => setCurrentScreen('settings')} />;
      case 'privacySettings':
        return <PrivacySettings onBack={() => setCurrentScreen('settings')} />;
      default:
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
    }
  };
  
  return (
    <div className="max-w-[390px] mx-auto min-h-screen bg-white">
      {renderScreen()}
    </div>
  );
}