import { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import HomeScreen from '@/components/HomeScreen';
import CrewScreen from '@/components/CrewScreen';
import ActivityScreen from '@/components/ActivityScreen';
import StatsScreen from '@/components/StatsScreen';
import ChatScreen from '@/components/ChatScreen';
import BottomNav from '@/components/BottomNav';

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  if (!isOnboarded) {
    return <WelcomeScreen onComplete={() => setIsOnboarded(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="safe-bottom overflow-y-auto" style={{ height: '100vh', paddingBottom: '5rem' }}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'crew' && <CrewScreen />}
        {activeTab === 'activity' && <ActivityScreen />}
        {activeTab === 'stats' && <StatsScreen />}
        {activeTab === 'chat' && <ChatScreen />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
