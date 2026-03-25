import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, Gift, X, Clock } from 'lucide-react';
import { crewMembers, type CrewMember } from '@/lib/mockData';

interface NudgeSystemProps {
  isVisible: boolean;
  onClose: () => void;
}

const generateNudge = (member: CrewMember) => {
  const nudges = [
    `${member.name}, your ${member.streak}-day streak is about to die. Your crew is counting on you — don't be the one who kills the fire.`,
    `${member.name}, you've burned only ${member.caloriesBurned} cal today. Last week at this time you were at 400+. What happened?`,
    `${member.name}, the group streak is on the line. ${member.streak} days of work — gone if you don't move now.`,
  ];
  return nudges[Math.floor(Math.random() * nudges.length)];
};

const NudgeSystem = ({ isVisible, onClose }: NudgeSystemProps) => {
  const [savedMembers, setSavedMembers] = useState<Set<string>>(new Set());
  const failedMembers = crewMembers.filter(m => !m.goalCompleted);
  const currentUser = crewMembers.find(m => m.id === 'user1')!;

  const handleSaveToken = (memberId: string) => {
    if (currentUser.tokensRemaining > 0) {
      setSavedMembers(prev => new Set([...prev, memberId]));
    }
  };

  if (failedMembers.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Nudge panel */}
          <motion.div
            className="relative w-full max-w-lg mx-auto rounded-t-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, hsl(0, 60%, 12%) 0%, hsl(220, 25%, 6%) 100%)',
              border: '1px solid hsla(0, 70%, 40%, 0.3)',
              borderBottom: 'none',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Red pulse line */}
            <motion.div
              className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, hsl(0, 80%, 50%), hsl(0, 90%, 60%), hsl(0, 80%, 50%))' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            <div className="p-5 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-sm">⚠️ 9 PM NUDGE ALERT</h3>
                    <div className="flex items-center gap-1 text-[10px] text-destructive">
                      <Clock className="w-3 h-3" />
                      <span>Daily deadline approaching</span>
                    </div>
                  </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-muted/30">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Failed members */}
              <div className="space-y-3">
                {failedMembers.map((member) => {
                  const isSaved = savedMembers.has(member.id);
                  const isMe = member.id === 'user1';

                  return (
                    <motion.div
                      key={member.id}
                      className={`rounded-2xl p-4 ${isSaved ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{member.avatar}</span>
                        <div className="flex-1">
                          <p className="font-display font-semibold text-sm text-foreground">
                            {isMe ? 'You' : member.name}
                          </p>
                          {isSaved ? (
                            <p className="text-xs text-success mt-1">✅ Streak saved with a token! Crisis averted.</p>
                          ) : (
                            <>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed italic">
                                "{generateNudge(member)}"
                              </p>
                              <p className="text-[10px] text-destructive mt-1">
                                🤖 CrewFit AI — personalized nudge
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Save token action */}
                      {!isSaved && !isMe && currentUser.tokensRemaining > 0 && (
                        <button
                          onClick={() => handleSaveToken(member.id)}
                          className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium bg-ember/20 text-ember border border-ember/30 hover:bg-ember/30 transition-colors"
                        >
                          <Gift className="w-3.5 h-3.5" />
                          Use your token to save {member.name}'s streak
                        </button>
                      )}

                      {!isSaved && isMe && currentUser.tokensRemaining > 0 && (
                        <button
                          onClick={() => handleSaveToken(member.id)}
                          className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium bg-ember/20 text-ember border border-ember/30 hover:bg-ember/30 transition-colors"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          Use your token ({currentUser.tokensRemaining} left)
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Token status */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/30 text-xs text-muted-foreground">
                <Shield className="w-4 h-4 text-ember" />
                <span>Your tokens: <strong className="text-foreground">{currentUser.tokensRemaining}/2</strong> • Resets every 2 months</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NudgeSystem;
