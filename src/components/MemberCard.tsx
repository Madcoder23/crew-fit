import { motion } from 'framer-motion';
import type { CrewMember } from '@/lib/mockData';
import { roleDescriptions } from '@/lib/mockData';

interface MemberCardProps {
  member: CrewMember;
  index: number;
  isCurrentUser?: boolean;
}

const MemberCard = ({ member, index, isCurrentUser }: MemberCardProps) => {
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
            <span className="text-xs">{role.badge}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {role.title}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-muted-foreground">🔥 {member.streak} day streak</span>
            <span className="text-xs text-muted-foreground">👣 {member.stepsToday.toLocaleString()}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-display font-bold gradient-fire-text">{member.caloriesBurned}</p>
          <p className="text-[10px] text-muted-foreground">cal</p>
        </div>
      </div>
      
      {/* Mini activity bars */}
      <div className="flex items-end gap-1 mt-3 h-8">
        {member.weeklyActivity.map((val, i) => {
          const max = Math.max(...member.weeklyActivity);
          const height = (val / max) * 100;
          return (
            <div
              key={i}
              className="flex-1 rounded-t-sm gradient-fire transition-all"
              style={{ height: `${height}%`, opacity: i === 6 ? 1 : 0.5 }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default MemberCard;
