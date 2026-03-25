import { motion } from 'framer-motion';
import { Skull, AlertTriangle, TrendingDown, Calendar, Flame } from 'lucide-react';
import { crew } from '@/lib/mockData';

const failureLog = [
  { member: 'Maya', day: 'Monday', detail: 'Missed entirely — 0 steps logged', severity: 'critical' },
  { member: 'Rahul', day: 'Thursday', detail: 'Only 1,200 steps — 88% below target', severity: 'high' },
  { member: 'Maya', day: 'Thursday', detail: 'Skipped again — used 1 streak token', severity: 'warning' },
  { member: 'Maya', day: 'Friday', detail: 'Third miss — no tokens left. Group streak BROKEN.', severity: 'critical' },
  { member: 'Rahul', day: 'Saturday', detail: 'Recovered — hit 8,400 steps after AI nudge', severity: 'recovered' },
];

const aiVerdict = `This week exposed a pattern: Maya's consistency collapsed mid-week, dragging the group streak down from 5 to 0. Rahul teetered on the edge but was saved by a well-timed nudge. The crew burned 8,420 total calories (+12% vs last week), but individual accountability gaps cost the team their streak and 200 bonus XP. Verdict: The crew is only as strong as its weakest link.`;

const WeeklyAutopsy = () => {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsla(0, 50%, 10%, 0.8) 0%, hsla(220, 25%, 8%, 0.9) 100%)',
        border: '1px solid hsla(0, 60%, 30%, 0.4)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Red accent bar */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, hsl(0, 80%, 40%), hsl(0, 90%, 55%), hsl(0, 80%, 40%))' }} />

      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Skull className="w-6 h-6 text-destructive" />
          </motion.div>
          <div>
            <h3 className="font-display font-bold text-foreground text-sm">WEEKLY AUTOPSY REPORT</h3>
            <p className="text-[10px] text-destructive">Week {crew.weeklyStreak} • March 18–24, 2026</p>
          </div>
        </div>

        {/* Failure timeline */}
        <div className="space-y-2">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-destructive" /> Failure Timeline
          </p>
          {failureLog.map((entry, i) => (
            <motion.div
              key={i}
              className={`flex items-start gap-3 px-3 py-2 rounded-xl text-xs ${
                entry.severity === 'critical' ? 'bg-destructive/15 border border-destructive/20' :
                entry.severity === 'high' ? 'bg-destructive/10 border border-destructive/15' :
                entry.severity === 'warning' ? 'bg-gold/10 border border-gold/20' :
                'bg-success/10 border border-success/20'
              }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-1.5 min-w-[80px]">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">{entry.day}</span>
              </div>
              <div className="flex-1">
                <span className={`font-semibold ${
                  entry.severity === 'recovered' ? 'text-success' : 'text-foreground'
                }`}>{entry.member}</span>
                <span className="text-muted-foreground"> — {entry.detail}</span>
              </div>
              {entry.severity === 'critical' && (
                <motion.span
                  className="text-destructive text-[10px] font-bold"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  FAIL
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Total Cal', value: '8,420', icon: Flame, trend: '+12%', good: true },
            { label: 'Streak Lost', value: '5→0', icon: TrendingDown, trend: 'RESET', good: false },
            { label: 'XP Lost', value: '-200', icon: AlertTriangle, trend: 'penalty', good: false },
          ].map((stat, i) => (
            <div key={i} className={`rounded-xl p-2.5 text-center ${stat.good ? 'bg-muted/30' : 'bg-destructive/10'}`}>
              <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.good ? 'text-ember' : 'text-destructive'}`} />
              <p className={`text-sm font-display font-bold ${stat.good ? 'text-foreground' : 'text-destructive'}`}>{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              <p className={`text-[8px] font-medium ${stat.good ? 'text-success' : 'text-destructive'}`}>{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* AI verdict */}
        <div className="rounded-xl p-3 bg-muted/20 border border-destructive/10">
          <p className="text-[10px] text-destructive font-display font-semibold uppercase tracking-wider mb-1.5">
            🤖 AI VERDICT — Dark Consequential Analysis
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            "{aiVerdict}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyAutopsy;
