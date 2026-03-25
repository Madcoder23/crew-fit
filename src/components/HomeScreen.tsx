import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Flame, Footprints, Clock, Sparkles } from 'lucide-react';
import Campfire from './Campfire';
import SharedPuzzle from './SharedPuzzle';
import PsychologyCard from './PsychologyCard';
import MeetupScheduler from './MeetupScheduler';
import { crew, currentUser, psychologyTips } from '@/lib/mockData';

const aiPersonalizedTips = [
  { title: "Your Morning Window", description: "Based on your activity, you're 3x more productive between 7-8 AM. Schedule your run then!", icon: "🎯", source: "CrewFit AI — personalized for You" },
  { title: "Streak Psychology", description: "You've maintained a 12-day streak. Research shows people with 10+ day streaks are 4x less likely to quit.", icon: "🔥", source: "CrewFit AI — based on your data" },
  { title: "Social Accountability", description: "Your crew's activity jumps 40% when you post in chat first. You're the catalyst!", icon: "⚡", source: "CrewFit AI — crew analysis" },
  { title: "Recovery Pattern", description: "Your Friday dips suggest fatigue. Try a light walk instead of a skip — it preserves your streak.", icon: "🧘", source: "CrewFit AI — weekly pattern" },
];

const HomeScreen = () => {
  const [showAITips, setShowAITips] = useState(true);

  return (
    <div className="px-4 pt-4 pb-4 space-y-5 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Good evening 👋</p>
          <h1 className="text-xl font-display font-bold text-foreground">CREWFIT</h1>
        </div>
        <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full">
          <Flame className="w-4 h-4 text-ember" />
          <span className="text-sm font-display font-bold text-foreground">{currentUser.streak}</span>
        </div>
      </div>

      {/* Today's auto-tracked stats */}
      <motion.div className="glass rounded-2xl p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">Auto-Tracked Today</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Footprints className="w-5 h-5 text-ember mx-auto mb-1" />
            <p className="text-xl font-display font-bold text-foreground">{currentUser.stepsToday.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">steps</p>
          </div>
          <div className="text-center">
            <Flame className="w-5 h-5 text-flame mx-auto mb-1" />
            <p className="text-xl font-display font-bold text-foreground">{currentUser.caloriesBurned}</p>
            <p className="text-[10px] text-muted-foreground">calories</p>
          </div>
          <div className="text-center">
            <Clock className="w-5 h-5 text-gold mx-auto mb-1" />
            <p className="text-xl font-display font-bold text-foreground">47</p>
            <p className="text-[10px] text-muted-foreground">min active</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div className="h-full gradient-fire rounded-full" initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1.2 }} />
          </div>
          <span className="text-xs font-medium gradient-fire-text">78%</span>
        </div>
      </motion.div>

      {/* Campfire */}
      <motion.div className="glass rounded-2xl p-5 flex justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Campfire level={crew.campfireLevel} totalCalories={crew.totalCalories} />
      </motion.div>

      {/* Crew name + nearby */}
      <motion.div className="glass rounded-2xl p-4 flex items-center justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div>
          <p className="font-display font-bold text-foreground">{crew.name}</p>
          <p className="text-xs text-muted-foreground">{crew.members.length} members • Week {crew.weeklyStreak} streak</p>
        </div>
        <div className="flex items-center gap-1 text-success text-xs">
          <MapPin className="w-3 h-3" />
          <span>2 nearby</span>
        </div>
      </motion.div>

      {/* Shared puzzle with reward info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <SharedPuzzle members={crew.members} totalPieces={crew.members.length} consecutiveWeeks={crew.puzzleConsecutiveWeeks} />
      </motion.div>

      {/* AI Nudge */}
      <motion.div className="glass rounded-2xl p-4 border-l-4 border-ember" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="flex items-start gap-3">
          <span className="text-xl">🤖</span>
          <div>
            <p className="text-xs font-display font-semibold text-foreground">CrewFit AI</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Your crew is on a 5-week streak! Rahul needs 1,800 more steps — send him a nudge to keep the fire alive 🔥
            </p>
          </div>
        </div>
      </motion.div>

      {/* AI-Personalized Psychology Boost */}
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
    </div>
  );
};

export default HomeScreen;
