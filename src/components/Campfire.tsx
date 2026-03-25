import { motion } from 'framer-motion';

interface CampfireProps {
  level: number;
  totalCalories: number;
}

const Campfire = ({ level, totalCalories }: CampfireProps) => {
  const fireScale = Math.max(0.3, level / 100);
  const isDying = level < 25;
  const isCold = level < 10;
  const isWarm = level >= 25 && level <= 50;
  const isStrong = level > 50 && level <= 80;
  const isBlazing = level > 80;

  const getFireEmoji = () => {
    if (isCold) return '🧊';
    if (isDying) return '🪵';
    if (isWarm) return '🕯️';
    if (isBlazing) return '🔥';
    return '🔥';
  };

  const getGlowColor = () => {
    if (isCold) return 'hsla(200, 80%, 60%, 0.2)';
    if (isDying) return 'hsla(30, 60%, 40%, 0.2)';
    if (isWarm) return 'hsla(35, 90%, 55%, 0.3)';
    if (isBlazing) return 'hsla(15, 95%, 55%, 0.5)';
    return 'hsla(25, 90%, 50%, 0.4)';
  };

  const getStatusText = () => {
    if (isCold) return '❄️ Fire is DEAD. The crew went cold.';
    if (isDying) return '⚠️ Fire is dying! Get moving!';
    if (isWarm) return 'Warming up... keep pushing!';
    if (isBlazing) return '🔥 BLAZING INFERNO! Unstoppable!';
    return '🔥 Burning strong!';
  };

  const getBarGradient = () => {
    if (isCold) return 'linear-gradient(90deg, hsl(200, 70%, 50%), hsl(210, 80%, 55%))';
    if (isDying) return 'linear-gradient(90deg, hsl(30, 60%, 40%), hsl(40, 70%, 50%))';
    return 'var(--gradient-fire)';
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative flex items-center justify-center" style={{ width: `${80 + fireScale * 80}px`, height: `${80 + fireScale * 80}px` }}>
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${getGlowColor()} 0%, transparent 70%)`,
            transform: `scale(${1.5 + fireScale * 0.5})`,
          }}
          animate={{
            scale: isCold ? [1.5, 1.5] : [1.5 + fireScale * 0.5, 1.8 + fireScale * 0.5, 1.5 + fireScale * 0.5],
            opacity: isCold ? [0.3, 0.3] : [0.4, 0.9, 0.4],
          }}
          transition={{ duration: isCold ? 0 : 1.5, repeat: Infinity }}
        />

        {/* Second glow ring for blazing */}
        {isBlazing && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, hsla(25, 100%, 55%, 0.15) 0%, transparent 80%)`,
              transform: 'scale(2.5)',
            }}
            animate={{ scale: [2.5, 3, 2.5], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Fire emoji */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          animate={isCold ? {} : {
            scale: [fireScale, fireScale * 1.12, fireScale],
            y: [0, -4, 0],
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="select-none"
            style={{
              fontSize: `${48 + fireScale * 32}px`,
              filter: isCold ? 'saturate(0.3) brightness(0.7)' : isDying ? 'saturate(0.5)' : 'none',
            }}
          >
            {getFireEmoji()}
          </span>
          {isBlazing && (
            <>
              <motion.span className="text-2xl absolute -top-3 -left-2" animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5], rotate: [-10, 10, -10] }} transition={{ duration: 0.8, repeat: Infinity }}>
                ✨
              </motion.span>
              <motion.span className="text-xl absolute -top-2 right-0" animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 1.1, repeat: Infinity }}>
                🔥
              </motion.span>
            </>
          )}
        </motion.div>
      </div>

      <div className="text-center w-full">
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Group Campfire</p>
        <p className={`text-3xl font-display font-bold mt-1 ${isCold ? 'text-ice' : 'gradient-fire-text'}`}>
          {totalCalories.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">cal</span>
        </p>
        <div className="w-32 h-2 rounded-full bg-muted mt-3 mx-auto overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: getBarGradient() }}
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <p className={`text-[10px] mt-1.5 font-medium ${isCold ? 'text-ice' : isDying ? 'text-destructive' : 'text-muted-foreground'}`}>
          {getStatusText()}
        </p>
      </div>
    </div>
  );
};

export default Campfire;
