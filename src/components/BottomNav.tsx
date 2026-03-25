import { Home, Users, Activity, BarChart3, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'crew', icon: Users, label: 'Crew' },
  { id: 'activity', icon: Activity, label: 'Activity' },
  { id: 'stats', icon: BarChart3, label: 'Stats' },
  { id: 'chat', icon: MessageCircle, label: 'Chat' },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300",
                isActive ? "gradient-fire shadow-fire" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className={cn("w-5 h-5", isActive && "text-primary-foreground")} />
              <span className={cn("text-[10px] font-medium", isActive ? "text-primary-foreground" : "")}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
