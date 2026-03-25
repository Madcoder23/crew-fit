import { motion } from 'framer-motion';
import { MapPin, Flame, Footprints, Clock } from 'lucide-react';
import Campfire from './Campfire';
import SharedPuzzle from './SharedPuzzle';
import PsychologyCard from './PsychologyCard';
import { crew, currentUser, psychologyTips } from '@/lib/mockData';

const HomeScreen = () => {
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
      <motion.div
        className="glass rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
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
        {/* Progress ring */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div className="h-full gradient-fire rounded-full" initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1.2 }} />
          </div>
          <span className="text-xs font-medium gradient-fire-text">78%</span>
        </div>
      </motion.div>

      {/* Campfire */}
      <motion.div
        className="glass rounded-2xl p-5 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Campfire level={crew.campfireLevel} totalCalories={crew.totalCalories} />
      </motion.div>

      {/* Crew name + nearby */}
      <motion.div
        className="glass rounded-2xl p-4 flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div>
          <p className="font-display font-bold text-foreground">{crew.name}</p>
          <p className="text-xs text-muted-foreground">{crew.members.length} members • Week {crew.weeklyStreak} streak</p>
        </div>
        <div className="flex items-center gap-1 text-success text-xs">
          <MapPin className="w-3 h-3" />
          <span>2 nearby</span>
        </div>
      </motion.div>

      {/* Shared puzzle */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <SharedPuzzle members={crew.members} totalPieces={crew.members.length} />
      </motion.div>

      {/* AI Nudge */}
      <motion.div
        className="glass rounded-2xl p-4 border-l-4 border-ember"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
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

      {/* Psychology tips */}
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">🧠 Psychology Boost</p>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
          {psychologyTips.map((tip, i) => (
            <PsychologyCard key={tip.title} {...tip} index={i} />
          ))}
        </div>
      </div>

      {/* Weekly meetup alert */}
      <motion.div
        className="glass rounded-2xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-fire flex items-center justify-center text-lg">📍</div>
          <div className="flex-1">
            <p className="text-sm font-display font-semibold text-foreground">Weekly Meetup</p>
            <p className="text-xs text-muted-foreground">2 crew members within 500m. Work out together for bonus XP!</p>
          </div>
          <span className="text-xs gradient-fire-text font-bold">+50 XP</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeScreen;
