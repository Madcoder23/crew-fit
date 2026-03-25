import { motion } from 'framer-motion';

interface CampfireProps {
  level: number; // 0-100
  totalCalories: number;
}

const Campfire = ({ level, totalCalories }: CampfireProps) => {
  const fireScale = Math.max(0.3, level / 100);
  const isDying = level < 25;
  const isStrong = level > 70;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, hsla(16, 90%, 58%, ${fireScale * 0.3}) 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Fire emoji stack */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          animate={{ 
            scale: [fireScale, fireScale * 1.08, fireScale],
            y: [0, -3, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-6xl" style={{ filter: isDying ? 'saturate(0.5)' : 'none' }}>
            {isDying ? '🪵' : isStrong ? '🔥' : '🕯️'}
          </span>
          {isStrong && (
            <motion.span 
              className="text-3xl absolute -top-4"
              animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✨
            </motion.span>
          )}
        </motion.div>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Group Campfire</p>
        <p className="text-2xl font-display font-bold gradient-fire-text">{totalCalories} cal</p>
        <div className="w-24 h-1.5 rounded-full bg-muted mt-2 mx-auto overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-fire"
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className={`text-[10px] mt-1 ${isDying ? 'text-destructive' : 'text-muted-foreground'}`}>
          {isDying ? '⚠️ Fire is dying! Get moving!' : isStrong ? '🔥 Blazing strong!' : 'Keep it going!'}
        </p>
      </div>
    </div>
  );
};

export default Campfire;
