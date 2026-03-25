import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bell } from 'lucide-react';
import Campfire from './Campfire';
import PsychologyCard from './PsychologyCard';
import MeetupScheduler from './MeetupScheduler';
import NudgeSystem from './NudgeSystem';
import { crew, psychologyTips } from '@/lib/mockData';

const aiPersonalizedTips = [
  { title: "Your Morning Window", description: "Based on your activity, you're 3x more productive between 7-8 AM. Schedule your run then!", icon: "🎯", source: "CrewFit AI — personalized for You" },
  { title: "Streak Psychology", description: "You've maintained a 12-day streak. Research shows people with 10+ day streaks are 4x less likely to quit.", icon: "🔥", source: "CrewFit AI — based on your data" },
  { title: "Social Accountability", description: "Your crew's activity jumps 40% when you post in chat first. You're the catalyst!", icon: "⚡", source: "CrewFit AI — crew analysis" },
  { title: "Recovery Pattern", description: "Your Friday dips suggest fatigue. Try a light walk instead of a skip — it preserves your streak.", icon: "🧘", source: "CrewFit AI — weekly pattern" },
];

const HomeScreen = () => {
  const [showAITips, setShowAITips] = useState(true);
  const [showNudge, setShowNudge] = useState(false);

  // Simulate 9PM nudge trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasIncomplete = crew.members.some(m => !m.goalCompleted);
      if (hasIncomplete) setShowNudge(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 pt-4 pb-4 space-y-5 max-w-lg mx-auto">
      {/* Crew name header */}
      <motion.div
        className="glass rounded-2xl p-5 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ background: 'var(--gradient-fire)' }}
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest relative z-10">Your Crew</p>
        <h1 className="text-2xl font-display font-bold gradient-fire-text relative z-10 mt-1">{crew.name}</h1>
        <p className="text-xs text-muted-foreground relative z-10 mt-1">{crew.members.length} members • Week {crew.weeklyStreak} streak</p>
      </motion.div>

      {/* Nudge alert button */}
      {crew.members.some(m => !m.goalCompleted) && (
        <motion.button
          className="w-full glass rounded-2xl p-3 flex items-center gap-3 border border-destructive/20"
          style={{ background: 'hsla(0, 50%, 12%, 0.6)' }}
          onClick={() => setShowNudge(true)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <Bell className="w-5 h-5 text-destructive" />
          </motion.div>
          <div className="flex-1 text-left">
            <p className="text-xs font-display font-semibold text-foreground">9PM Nudge Active</p>
            <p className="text-[10px] text-destructive">{crew.members.filter(m => !m.goalCompleted).length} members haven't completed today's goal</p>
          </div>
          <span className="text-xs text-ember font-medium">View →</span>
        </motion.button>
      )}

      {/* Group Campfire — prominent */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Campfire level={crew.campfireLevel} totalCalories={crew.totalCalories} />
      </motion.div>

      {/* AI Psychology Boost */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-ember" />
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">🧠 AI Psychology Boost</p>
          <button
            onClick={() => setShowAITips(!showAITips)}
            className="ml-auto text-[10px] text-ember font-medium"
          >
            {showAITips ? 'Show Classic' : 'Show AI'}
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
          {(showAITips ? aiPersonalizedTips : psychologyTips).map((tip, i) => (
            <PsychologyCard key={tip.title} {...tip} index={i} isAI={showAITips} />
          ))}
        </div>
      </div>

      {/* Weekly Meetup Scheduler */}
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">📍 Weekly Meetup</p>
        <MeetupScheduler />
      </div>

      {/* Nudge System Modal */}
      <NudgeSystem isVisible={showNudge} onClose={() => setShowNudge(false)} />
    </div>
  );
};

export default HomeScreen;
