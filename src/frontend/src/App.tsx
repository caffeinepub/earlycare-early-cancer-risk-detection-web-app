import { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import SplashScreen from './pages/SplashScreen';
import HomeScreen from './pages/HomeScreen';
import TestScreen from './pages/TestScreen';
import ResultScreen from './pages/ResultScreen';
import HealthTipsScreen from './pages/HealthTipsScreen';
import EmergencyScreen from './pages/EmergencyScreen';
import MyReportsScreen from './pages/MyReportsScreen';
import ProfileSetupModal from './components/ProfileSetupModal';
import BottomNavigation from './components/BottomNavigation';
import { Toaster } from './components/ui/sonner';

export type Screen = 'splash' | 'home' | 'test' | 'result' | 'tips' | 'emergency' | 'reports';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [showSplash, setShowSplash] = useState(true);
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setCurrentScreen('home');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const showBottomNav = !showSplash && currentScreen !== 'splash' && currentScreen !== 'result';

  return (
    <div className="min-h-screen bg-background">
      {showSplash && currentScreen === 'splash' ? (
        <SplashScreen />
      ) : (
        <>
          {currentScreen === 'home' && <HomeScreen onNavigate={navigateTo} />}
          {currentScreen === 'test' && <TestScreen onNavigate={navigateTo} />}
          {currentScreen === 'result' && <ResultScreen onNavigate={navigateTo} />}
          {currentScreen === 'tips' && <HealthTipsScreen onNavigate={navigateTo} />}
          {currentScreen === 'emergency' && <EmergencyScreen onNavigate={navigateTo} />}
          {currentScreen === 'reports' && <MyReportsScreen onNavigate={navigateTo} />}
          
          {showBottomNav && <BottomNavigation currentScreen={currentScreen} onNavigate={navigateTo} />}
        </>
      )}
      
      {showProfileSetup && <ProfileSetupModal />}
      <Toaster />
    </div>
  );
}

export default App;
