import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Clock, Zap } from 'lucide-react';
import { crewMembers, type CrewMember } from '@/lib/mockData';

interface NudgeSystemProps {
  isVisible: boolean;
  onClose: () => void;
}

const generateMotivationalNudge = (member: CrewMember) => {
  const nudges = [
    `${member.name}, you're at ${member.stepsToday.toLocaleString()} steps — just ${(10000 - member.stepsToday).toLocaleString()} more to hit your goal! Your ${member.streak}-day streak is legendary. Don't stop now!`,
    `${member.name}, a quick 15-min walk gets you there. Your crew is counting on you — be the reason the campfire stays lit tonight! 🔥`,
    `${member.name}, you've done harder things before. Remember last Tuesday when you smashed 11K? Channel that energy — you've got this!`,
  ];
  return nudges[Math.floor(Math.random() * nudges.length)];
};

const NudgeSystem = ({ isVisible, onClose }: NudgeSystemProps) => {
  const incompleteMembers = crewMembers.filter(m => !m.goalCompleted);

  if (incompleteMembers.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          <motion.div
            className="relative w-full max-w-lg mx-auto rounded-t-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, hsl(220, 40%, 12%) 0%, hsl(220, 25%, 6%) 100%)',
              border: '1px solid hsla(210, 70%, 40%, 0.3)',
              borderBottom: 'none',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <motion.div
              className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, hsl(210, 80%, 50%), hsl(190, 70%, 50%), hsl(210, 80%, 50%))' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Zap className="w-6 h-6 text-ember" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-sm">⚡ 9 PM MOTIVATION NUDGE</h3>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>There's still time — keep pushing!</span>
                    </div>
                  </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-muted/30">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-3">
                {incompleteMembers.map((member) => {
                  const isMe = member.id === 'user1';
                  const progress = Math.round((member.stepsToday / 10000) * 100);

                  return (
                    <motion.div
                      key={member.id}
                      className="rounded-2xl p-4 bg-muted/20 border border-border/30"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{member.avatar}</span>
                        <div className="flex-1">
                          <p className="font-display font-semibold text-sm text-foreground">
                            {isMe ? 'You' : member.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed italic">
                            "{generateMotivationalNudge(member)}"
                          </p>
                          <p className="text-[10px] text-ember mt-1">
                            🤖 CrewFit AI — motivational nudge
                          </p>
                          {/* Progress indicator */}
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                className="h-full rounded-full gradient-fire"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1 }}
                              />
                            </div>
                            <span className="text-[10px] text-muted-foreground font-medium">{progress}%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/30 text-xs text-muted-foreground">
                <AlertTriangle className="w-4 h-4 text-ember" />
                <span>Day isn't over yet! Encourage your crew to finish strong.</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NudgeSystem;
