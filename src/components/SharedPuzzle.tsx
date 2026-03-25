import { motion } from 'framer-motion';
import type { CrewMember } from '@/lib/mockData';

interface SharedPuzzleProps {
  members: CrewMember[];
  totalPieces: number;
}

const SharedPuzzle = ({ members, totalPieces }: SharedPuzzleProps) => {
  const contributed = members.filter(m => m.puzzlePiece).length;
  const isComplete = contributed === totalPieces;

  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="text-sm font-display font-semibold text-foreground mb-3">🧩 Shared Puzzle</h3>
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
    </div>
  );
};

export default SharedPuzzle;
