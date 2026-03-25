import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MemberCard from './MemberCard';
import NudgeSystem from './NudgeSystem';
import { crew, crewMembers, teamLeaderboard } from '@/lib/mockData';
import { Shield, Trophy, Globe, Flame, Heart, Gift, Bell, CheckCircle2, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const CrewScreen = () => {
  const [showNudge, setShowNudge] = useState(false);
  const [tokens, setTokens] = useState(() => {
    const map: Record<string, number> = {};
    crewMembers.forEach(m => { map[m.id] = m.tokensRemaining; });
    return map;
  });
  const [savedMembers, setSavedMembers] = useState<Set<string>>(new Set());

  // Crew HP: percentage of members who completed today's goal
  const completedCount = crew.members.filter(m => m.goalCompleted).length;
  const crewHP = Math.round((completedCount / crew.members.length) * 100);

  // Simulate nudge trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasIncomplete = crew.members.some(m => !m.goalCompleted);
      if (hasIncomplete) setShowNudge(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveToken = (failedMemberId: string, saviorId: string) => {
    if (tokens[saviorId] > 0 && !savedMembers.has(failedMemberId)) {
      setTokens(prev => ({ ...prev, [saviorId]: prev[saviorId] - 1 }));
      setSavedMembers(prev => new Set([...prev, failedMemberId]));
    }
  };

  const failedMembers = crew.members.filter(m => !m.goalCompleted);
  const currentUser = crew.members.find(m => m.id === 'user1')!;

  return (
    <div className="px-4 pt-4 pb-4 space-y-5 max-w-lg mx-auto">
      <div>
        <h1 className="text-xl font-display font-bold text-foreground">{crew.name}</h1>
        <p className="text-xs text-muted-foreground">Week {crew.weeklyStreak} streak • {crew.totalCalories} cal today</p>
      </div>

      {/* Crew HP Progress Bar */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-destructive" />
          <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">Crew HP</p>
          <span className="ml-auto text-sm font-display font-bold text-foreground">{crewHP}%</span>
        </div>
        <Progress value={crewHP} className="h-3 bg-muted" />
        <p className="text-[10px] text-muted-foreground mt-1.5">{completedCount}/{crew.members.length} members completed today's goal</p>
      </motion.div>

      {/* Nudge alert button */}
      {failedMembers.length > 0 && (
        <motion.button
          className="w-full glass rounded-2xl p-3 flex items-center gap-3 border border-ember/20"
          style={{ background: 'hsla(210, 40%, 12%, 0.6)' }}
          onClick={() => setShowNudge(true)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <Bell className="w-5 h-5 text-ember" />
          </motion.div>
          <div className="flex-1 text-left">
            <p className="text-xs font-display font-semibold text-foreground">9PM Nudge Active</p>
            <p className="text-[10px] text-muted-foreground">{failedMembers.length} members still working on today's goal</p>
          </div>
          <span className="text-xs text-ember font-medium">View →</span>
        </motion.button>
      )}

      {/* Group Streak & Token Save Mechanism */}
      <motion.div className="glass rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
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
              <p className="text-xs text-muted-foreground">Your Tokens: <strong className="text-foreground">{tokens['user1']}/2</strong></p>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">Resets every 2 months</p>
          </div>
        </div>

        {/* Save token section for failed members */}
        {failedMembers.length > 0 && (
          <div className="border-t border-border/30 pt-3 space-y-2">
            <p className="text-[10px] text-destructive font-medium uppercase tracking-wider flex items-center gap-1">
              <XCircle className="w-3 h-3" /> Members at risk — use a token to save the streak
            </p>
            {failedMembers.map(member => {
              const isSaved = savedMembers.has(member.id);
              const isMe = member.id === 'user1';
              return (
                <div key={member.id} className={`rounded-xl p-3 ${isSaved ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{member.avatar}</span>
                    <span className="text-xs font-medium text-foreground flex-1">{isMe ? 'You' : member.name}</span>
                    {isSaved ? (
                      <span className="text-[10px] text-success flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Streak saved!
                      </span>
                    ) : (
                      <span className="text-[10px] text-destructive">Goal incomplete</span>
                    )}
                  </div>
                  {!isSaved && tokens['user1'] > 0 && (
                    <button
                      onClick={() => handleSaveToken(member.id, 'user1')}
                      className="mt-2 w-full flex items-center justify-center gap-2 py-1.5 rounded-lg text-[11px] font-medium bg-ember/20 text-ember border border-ember/30 hover:bg-ember/30 transition-colors"
                    >
                      <Gift className="w-3 h-3" />
                      {isMe ? `Use your token (${tokens['user1']} left)` : `Give your token to save ${member.name}`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <p className="text-[10px] text-muted-foreground/60 italic">If any member misses a day without a token, the group streak resets to 0.</p>
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

      {/* Nudge System Modal */}
      <NudgeSystem isVisible={showNudge} onClose={() => setShowNudge(false)} />
    </div>
  );
};

export default CrewScreen;
