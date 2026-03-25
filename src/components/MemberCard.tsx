import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CrewMember } from '@/lib/mockData';
import { roleDescriptions } from '@/lib/mockData';
import { ChevronDown, CheckCircle2, XCircle, Shield } from 'lucide-react';

interface MemberCardProps {
  member: CrewMember;
  index: number;
  isCurrentUser?: boolean;
}

const MemberCard = ({ member, index, isCurrentUser }: MemberCardProps) => {
  const [showRole, setShowRole] = useState(false);
  const role = roleDescriptions[member.role];
  
  return (
    <motion.div
      className={`glass rounded-2xl p-4 ${isCurrentUser ? 'ring-1 ring-ember/40' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="flex items-center gap-3">
        <div className="text-3xl">{member.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-display font-semibold text-sm text-foreground truncate">
              {isCurrentUser ? 'You' : member.name}
            </p>
            {/* Clickable role badge */}
            <button
              onClick={() => setShowRole(!showRole)}
              className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <span>{role.badge}</span>
              <span>{role.title}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showRole ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-1">
            {/* Token indicators */}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="w-3 h-3 text-ember" />
              {member.tokensRemaining}/2
            </span>
            {/* Goal completion */}
            {member.goalCompleted ? (
              <span className="flex items-center gap-1 text-xs text-success">
                <CheckCircle2 className="w-3 h-3" /> Done
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-destructive">
                <XCircle className="w-3 h-3" /> Pending
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-display font-bold gradient-fire-text">{member.caloriesBurned}</p>
          <p className="text-[10px] text-muted-foreground">cal</p>
        </div>
      </div>

      {/* Role description dropdown */}
      <AnimatePresence>
        {showRole && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-start gap-2 bg-muted/30 rounded-xl p-3">
                <span className="text-lg">{role.badge}</span>
                <div>
                  <p className="text-xs font-display font-semibold text-foreground">{role.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{role.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemberCard;
