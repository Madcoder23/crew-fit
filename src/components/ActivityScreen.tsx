import { motion } from 'framer-motion';
import { Navigation, Footprints, Flame, Timer, Zap, MapPin } from 'lucide-react';
import { currentUser } from '@/lib/mockData';

const activityLog = [
  { time: '7:02 AM', type: 'Walking', duration: '23 min', steps: 2400, calories: 120, icon: '🚶' },
  { time: '8:15 AM', type: 'Cycling', duration: '18 min', steps: 0, calories: 180, icon: '🚴' },
  { time: '12:30 PM', type: 'Walking', duration: '12 min', steps: 1200, calories: 60, icon: '🚶' },
  { time: '5:45 PM', type: 'Running', duration: '28 min', steps: 3800, calories: 320, icon: '🏃' },
  { time: '7:10 PM', type: 'Walking', duration: '8 min', steps: 442, calories: 22, icon: '🚶' },
];

const ActivityScreen = () => {
  return (
    <div className="px-4 pt-4 pb-4 space-y-5 max-w-lg mx-auto">
      <div>
        <h1 className="text-xl font-display font-bold text-foreground">Activity</h1>
        <p className="text-xs text-muted-foreground">Auto-tracked via GPS & accelerometer</p>
      </div>

      {/* Live status */}
      <motion.div
        className="glass rounded-2xl p-5 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="absolute top-0 left-0 h-1 gradient-fire"
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
          <p className="text-xs font-medium text-success uppercase tracking-wider">Tracking Active</p>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <Footprints className="w-5 h-5 text-ember mx-auto mb-1" />
            <p className="text-lg font-display font-bold text-foreground">{currentUser.stepsToday.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">steps</p>
          </div>
          <div className="text-center">
            <Navigation className="w-5 h-5 text-flame mx-auto mb-1" />
            <p className="text-lg font-display font-bold text-foreground">5.4</p>
            <p className="text-[10px] text-muted-foreground">km</p>
          </div>
          <div className="text-center">
            <Flame className="w-5 h-5 text-gold mx-auto mb-1" />
            <p className="text-lg font-display font-bold text-foreground">{currentUser.caloriesBurned}</p>
            <p className="text-[10px] text-muted-foreground">cal</p>
          </div>
          <div className="text-center">
            <Timer className="w-5 h-5 text-ice mx-auto mb-1" />
            <p className="text-lg font-display font-bold text-foreground">89</p>
            <p className="text-[10px] text-muted-foreground">min</p>
          </div>
        </div>
      </motion.div>

      {/* GPS Map placeholder */}
      <motion.div
        className="glass rounded-2xl p-4 h-40 flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-background opacity-50" />
        <div className="relative z-10 text-center">
          <MapPin className="w-8 h-8 text-ember mx-auto mb-2 animate-float" />
          <p className="text-xs text-muted-foreground font-medium">GPS Route Tracking</p>
          <p className="text-[10px] text-muted-foreground">5.4 km covered today</p>
        </div>
        {/* Fake route line */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 100">
          <path d="M 10 80 Q 50 20, 90 50 T 170 30" stroke="hsl(16, 90%, 58%)" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* Activity timeline */}
      <div>
        <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-3">📍 Today's Timeline</p>
        <div className="space-y-2">
          {activityLog.map((a, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-3 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-xl">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{a.type}</p>
                <p className="text-[10px] text-muted-foreground">{a.time} • {a.duration}</p>
              </div>
              <div className="text-right">
                {a.steps > 0 && <p className="text-xs text-foreground font-medium">{a.steps.toLocaleString()} steps</p>}
                <p className="text-[10px] text-muted-foreground">{a.calories} cal</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Nearby crew alert */}
      <motion.div
        className="glass rounded-2xl p-4 border-l-4 border-success"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-success" />
          <div>
            <p className="text-sm font-display font-semibold text-foreground">Proximity Bonus Active</p>
            <p className="text-xs text-muted-foreground">Arjun is 320m away. Work out together for +50 XP!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ActivityScreen;
