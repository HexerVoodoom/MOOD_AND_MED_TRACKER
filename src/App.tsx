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
  | 'settings';

interface Medication {
  id: string;
  name: string;
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
  const [medications, setMedications] = useState<Medication[]>([]);
  const [todayMoods, setTodayMoods] = useState<TodayMoods>({
    morning: undefined,
    afternoon: undefined,
    night: undefined
  });
  const [medicationTaken, setMedicationTaken] = useState<{ [key: string]: string }>({});
  const [activeDietaryTrackers, setActiveDietaryTrackers] = useState<DietaryTrackers>(() => {
    const saved = localStorage.getItem('activeDietaryTrackers');
    return saved ? JSON.parse(saved) : {
      sugar: true,
      gluten: true,
      alcohol: true,
      caffeine: true
    };
  });
  
  const [trackWeatherTime, setTrackWeatherTime] = useState(() => {
    const saved = localStorage.getItem('trackWeatherTime');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [trackMedication, setTrackMedication] = useState(() => {
    const saved = localStorage.getItem('trackMedication');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [isFirstMedicationSetup, setIsFirstMedicationSetup] = useState(false);
  
  const handleDietaryTrackersChange = (trackers: DietaryTrackers) => {
    setActiveDietaryTrackers(trackers);
    localStorage.setItem('activeDietaryTrackers', JSON.stringify(trackers));
  };
  
  const handleGetStarted = () => {
    setCurrentScreen('permissions');
  };
  
  const handlePermissionsContinue = () => {
    setCurrentScreen('setupPreferences');
  };
  
  const handleSetupPreferencesContinue = (preferences: {
    trackMedication: boolean;
    trackWeatherTime: boolean;
    dietaryTrackers: {
      sugar: boolean;
      gluten: boolean;
      alcohol: boolean;
      caffeine: boolean;
    };
  }) => {
    // Save preferences
    localStorage.setItem('trackMedication', JSON.stringify(preferences.trackMedication));
    localStorage.setItem('trackWeatherTime', JSON.stringify(preferences.trackWeatherTime));
    setTrackMedication(preferences.trackMedication);
    setTrackWeatherTime(preferences.trackWeatherTime);
    setActiveDietaryTrackers(preferences.dietaryTrackers);
    localStorage.setItem('activeDietaryTrackers', JSON.stringify(preferences.dietaryTrackers));
    
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
    
    setTodayMoods({ ...todayMoods, [periodToUpdate]: mood });
    
    // Save to mood history in localStorage
    const historyStr = localStorage.getItem('moodHistory');
    const history: MoodHistoryEntry[] = historyStr ? JSON.parse(historyStr) : [];
    
    // Find or create entry for today
    let todayEntry = history.find(entry => entry.date === today);
    if (!todayEntry) {
      todayEntry = { date: today };
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
      name: `${medication.name} ${medication.quantity}${medication.unit}`,
      nextDose: `Today, ${medication.doseTimes[0]}`,
      adherence: 0,
      startDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      daysTaken: 0,
      last7Days: [false, false, false, false, false, false, false],
      doseTimes: medication.doseTimes,
      pill: medication.pill.mode === 'generated' ? {
        shape: medication.pill.shape,
        size: medication.pill.size,
        color1: medication.pill.color1,
        color2: medication.pill.color2
      } : undefined
    };
    setMedications([...medications, newMed]);
    
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
  
  const handleDeleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    setSelectedMedicationId(null);
    setCurrentScreen('medications');
    setActiveTab('medications');
  };
  
  const handleMedicationCheck = (medId: string, time: string) => {
    setMedicationTaken({ ...medicationTaken, [medId]: time });
  };
  
  const handleMoodSelect = (period: 'morning' | 'afternoon' | 'night', mood: string) => {
    // Update today's moods
    setTodayMoods({
      ...todayMoods,
      [period]: mood
    });
    
    // Update mood history
    const today = new Date().toISOString().split('T')[0];
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
              activeDietaryTrackers={activeDietaryTrackers}
              trackWeatherTime={trackWeatherTime}
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
          activeDietaryTrackers={activeDietaryTrackers} 
          onDietaryTrackersChange={handleDietaryTrackersChange}
          trackWeatherTime={trackWeatherTime}
          onTrackWeatherTimeChange={(value) => {
            setTrackWeatherTime(value);
            localStorage.setItem('trackWeatherTime', JSON.stringify(value));
          }}
        />; 
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