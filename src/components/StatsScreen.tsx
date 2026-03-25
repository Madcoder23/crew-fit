import { motion } from 'framer-motion';
import { weeklyStats, activityBreakdown, crew } from '@/lib/mockData';
import { AreaChart, Area, XAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip } from 'recharts';
import { TrendingUp, Skull, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import WeeklyAutopsy from './WeeklyAutopsy';

// Reliability scores for each member
const reliabilityData = crew.members.map(m => {
  const completionRate = Math.round((m.weeklyActivity.filter(s => s >= 8000).length / 7) * 100);
  const consistencyScore = Math.round(100 - (Math.max(...m.weeklyActivity) - Math.min(...m.weeklyActivity)) / Math.max(...m.weeklyActivity) * 100);
  const reliability = Math.round((completionRate * 0.6 + consistencyScore * 0.4));
  return { ...m, completionRate, consistencyScore, reliability };
});

const StatsScreen = () => {
  return (
    <div className="px-4 pt-4 pb-4 space-y-5 max-w-lg mx-auto">
      <div>
        <h1 className="text-xl font-display font-bold text-foreground">Stats</h1>
        <p className="text-xs text-muted-foreground">This week's performance</p>
      </div>

      {/* Weekly Autopsy — featured prominently */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Skull className="w-4 h-4 text-destructive" />
          <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">Weekly Autopsy</p>
        </div>
        <WeeklyAutopsy />
      </div>

      {/* Reliability Scores */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-ember" />
          <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">Reliability Score</p>
        </div>
        <p className="text-[10px] text-muted-foreground mb-3">Based on goal completion rate (60%) + consistency (40%)</p>
        <div className="space-y-3">
          {reliabilityData.sort((a, b) => b.reliability - a.reliability).map((m, i) => {
            const color = m.reliability >= 70 ? 'text-success' : m.reliability >= 40 ? 'text-gold' : 'text-destructive';
            const bgColor = m.reliability >= 70 ? 'bg-success' : m.reliability >= 40 ? 'bg-gold' : 'bg-destructive';
            return (
              <div key={m.id} className="flex items-center gap-3">
                <span className="text-lg">{m.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{m.id === 'user1' ? 'You' : m.name}</span>
                    <span className={`text-sm font-display font-bold ${color}`}>{m.reliability}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${bgColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${m.reliability}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" /> {m.completionRate}% completion
                    </span>
                    <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                      <AlertTriangle className="w-2.5 h-2.5" /> {m.consistencyScore}% consistency
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Steps area chart */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-3">📊 Daily Steps</p>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={weeklyStats}>
            <defs>
              <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(210, 80%, 55%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(210, 80%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(220, 10%, 50%)' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'hsl(220, 20%, 10%)', border: '1px solid hsl(220, 15%, 18%)', borderRadius: '12px', fontSize: '12px', color: 'hsl(210, 20%, 95%)' }}
              cursor={{ fill: 'hsla(210, 80%, 55%, 0.1)' }}
            />
            <Area type="monotone" dataKey="steps" stroke="hsl(210, 80%, 55%)" strokeWidth={2} fill="url(#stepsGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Calories line chart */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-3">🔥 Calories Trend</p>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={weeklyStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(220, 10%, 50%)' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'hsl(220, 20%, 10%)', border: '1px solid hsl(220, 15%, 18%)', borderRadius: '12px', fontSize: '12px', color: 'hsl(210, 20%, 95%)' }}
            />
            <Line type="monotone" dataKey="calories" stroke="hsl(190, 70%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(190, 70%, 50%)', r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Activity breakdown pie chart */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-3">🏃 Activity Breakdown</p>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie data={activityBreakdown} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value" strokeWidth={0}>
                {activityBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {activityBreakdown.map(a => (
              <div key={a.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: a.color }} />
                <span className="text-xs text-foreground flex-1">{a.name}</span>
                <span className="text-xs font-medium text-muted-foreground">{a.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Crew comparison */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-gold" />
          <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">Crew Comparison</p>
        </div>
        {crew.members.map(m => {
          const percentage = (m.stepsToday / 10000) * 100;
          return (
            <div key={m.id} className="flex items-center gap-3 mb-2">
              <span className="text-sm w-16 truncate text-foreground">{m.id === 'user1' ? 'You' : m.name}</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full gradient-fire"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, percentage)}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground w-10 text-right">{Math.round(percentage)}%</span>
            </div>
          );
        })}
        <p className="text-[10px] text-muted-foreground mt-1">% of 10,000 step daily goal</p>
      </motion.div>
    </div>
  );
};

export default StatsScreen;
