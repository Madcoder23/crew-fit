import { motion } from 'framer-motion';
import MemberCard from './MemberCard';
import { crew, teamLeaderboard } from '@/lib/mockData';
import { Shield, Trophy, TrendingUp, Globe, Flame } from 'lucide-react';

const CrewScreen = () => {
  return (
    <div className="px-4 pt-4 pb-4 space-y-5 max-w-lg mx-auto">
      <div>
        <h1 className="text-xl font-display font-bold text-foreground">{crew.name}</h1>
        <p className="text-xs text-muted-foreground">Week {crew.weeklyStreak} streak • {crew.totalCalories} cal today</p>
      </div>

      {/* Group Streak & Tokens */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-ember" />
          <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">Group Streak</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-display font-bold gradient-fire-text">{crew.groupStreak}</p>
            <p className="text-[10px] text-muted-foreground">days (all members)</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-ember" />
              <p className="text-xs text-muted-foreground">Streak Tokens</p>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Each member gets 2 tokens / 2 months</p>
            <p className="text-[10px] text-muted-foreground">Can transfer to save a teammate</p>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground/60 mt-2 italic">If any member misses a day without using a token, the group streak resets to 0.</p>
      </motion.div>

      {/* Team Leaderboard */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-gold" />
          <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">Today's Leaderboard</p>
        </div>
        {[...crew.members].sort((a, b) => b.stepsToday - a.stepsToday).map((m, i) => (
          <div key={m.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
            <span className={`text-sm font-display font-bold ${i === 0 ? 'gradient-fire-text' : 'text-muted-foreground'}`}>#{i + 1}</span>
            <span className="text-lg">{m.avatar}</span>
            <span className="text-sm font-medium text-foreground flex-1">{m.id === 'user1' ? 'You' : m.name}</span>
            <span className="text-sm font-display font-bold text-foreground">{m.stepsToday.toLocaleString()}</span>
            <span className="text-[10px] text-muted-foreground">steps</span>
          </div>
        ))}
      </motion.div>

      {/* Global Team Leaderboard */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-ice" />
          <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">Global Team Rankings</p>
        </div>
        {teamLeaderboard.map((team, i) => {
          const isOurTeam = team.id === 'team2';
          return (
            <div key={team.id} className={`flex items-center gap-3 py-2 border-b border-border/50 last:border-0 ${isOurTeam ? 'bg-ember/10 rounded-lg px-2 -mx-2' : ''}`}>
              <span className={`text-sm font-display font-bold w-6 ${i === 0 ? 'gradient-fire-text' : 'text-muted-foreground'}`}>#{i + 1}</span>
              <span className="text-sm font-medium text-foreground flex-1">
                {team.name} {isOurTeam && <span className="text-[10px] text-ember">(You)</span>}
              </span>
              <span className="text-xs text-muted-foreground">{team.memberCount}👥</span>
              <span className="text-sm font-display font-bold text-foreground">{team.totalScore.toLocaleString()}</span>
              <span className="text-[10px] text-muted-foreground">pts</span>
            </div>
          );
        })}
      </motion.div>

      {/* Members */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-ember" />
          <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">Crew Members</p>
        </div>
        <div className="space-y-3">
          {crew.members.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} isCurrentUser={m.id === 'user1'} />
          ))}
        </div>
      </div>

      {/* Weekly Autopsy Report */}
      <motion.div className="glass rounded-2xl p-4 border-l-4 border-ice" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-2">📋 Weekly Autopsy Report</p>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>✅ <span className="text-foreground font-medium">Arjun</span> hit all 7 daily goals — promoted to Captain</p>
          <p>⚠️ <span className="text-foreground font-medium">Maya</span> missed 3 days — streak reset to 0</p>
          <p>🔥 Crew burned 8,420 total calories (↑12% vs last week)</p>
          <p>🧩 Puzzle completed 4/7 days</p>
          <p>📍 1 weekly meetup completed (+50 XP each)</p>
        </div>
        <p className="text-[10px] text-muted-foreground/50 mt-2 italic">Failure: Maya's 3-day drop caused puzzle incompletion on Mon, Thu, Fri</p>
      </motion.div>
    </div>
  );
};

export default CrewScreen;
