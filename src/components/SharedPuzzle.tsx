import { motion } from 'framer-motion';
import type { CrewMember } from '@/lib/mockData';
import { Award, Shield } from 'lucide-react';

interface SharedPuzzleProps {
  members: CrewMember[];
  totalPieces: number;
  consecutiveWeeks?: number;
}

const SharedPuzzle = ({ members, totalPieces, consecutiveWeeks = 0 }: SharedPuzzleProps) => {
  const contributed = members.filter(m => m.puzzlePiece).length;
  const isComplete = contributed === totalPieces;
  const weeksToReward = 3 - consecutiveWeeks;

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-display font-semibold text-foreground">🧩 Shared Puzzle</h3>
        {consecutiveWeeks > 0 && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-ember/10">
            <Award className="w-3 h-3 text-ember" />
            <span className="text-[10px] font-medium text-ember">{consecutiveWeeks}/3 weeks</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1.5 max-w-[180px] mx-auto">
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            className={`aspect-square rounded-lg flex items-center justify-center text-lg ${
              member.puzzlePiece 
                ? 'gradient-fire' 
                : 'bg-muted/50 border border-dashed border-muted-foreground/30'
            }`}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: 'spring' }}
          >
            {member.puzzlePiece ? member.avatar : '❓'}
          </motion.div>
        ))}
        {Array.from({ length: Math.max(0, 6 - members.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square rounded-lg bg-muted/20 border border-dashed border-muted-foreground/20" />
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">
        {isComplete ? '🎉 Puzzle complete! Crew bonus unlocked!' : `${contributed}/${totalPieces} pieces — everyone must contribute!`}
      </p>
      
      {/* Reward info */}
      <div className="mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <Shield className="w-3 h-3 text-ember" />
          {weeksToReward > 0 ? (
            <span>Complete puzzle for <span className="text-ember font-medium">{weeksToReward} more week{weeksToReward > 1 ? 's' : ''}</span> to earn bonus tokens & points!</span>
          ) : (
            <span className="text-ember font-medium">🎊 3-week streak achieved! Bonus tokens + 500 XP rewarded!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedPuzzle;
