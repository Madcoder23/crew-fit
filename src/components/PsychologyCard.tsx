import { motion } from 'framer-motion';

interface PsychologyCardProps {
  title: string;
  description: string;
  icon: string;
  source: string;
  index: number;
}

const PsychologyCard = ({ title, description, icon, source, index }: PsychologyCardProps) => (
  <motion.div
    className="glass rounded-2xl p-4 min-w-[260px] snap-center"
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <h4 className="font-display font-semibold text-sm text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
        <p className="text-[10px] text-muted-foreground/60 mt-2 italic">— {source}</p>
      </div>
    </div>
  </motion.div>
);

export default PsychologyCard;
