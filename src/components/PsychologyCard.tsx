import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PsychologyCardProps {
  title: string;
  description: string;
  icon: string;
  source: string;
  index: number;
  isAI?: boolean;
}

const PsychologyCard = ({ title, description, icon, source, index, isAI }: PsychologyCardProps) => (
  <motion.div
    className={`glass rounded-2xl p-4 min-w-[260px] snap-center ${isAI ? 'border border-ember/20' : ''}`}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="flex items-center gap-1.5">
          <h4 className="font-display font-semibold text-sm text-foreground">{title}</h4>
          {isAI && <Sparkles className="w-3 h-3 text-ember" />}
        </div>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
        <p className={`text-[10px] mt-2 italic ${isAI ? 'gradient-fire-text font-medium' : 'text-muted-foreground/60'}`}>— {source}</p>
      </div>
    </div>
  </motion.div>
);

export default PsychologyCard;
