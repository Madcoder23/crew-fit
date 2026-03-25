import { motion } from 'framer-motion';
import { weeklyStats, activityBreakdown, currentUser, crew } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';
import { TrendingUp, Target, Flame, Award } from 'lucide-react';

const StatsScreen = () => {
  const avgSteps = Math.round(weeklyStats.reduce((s, d) => s + d.steps, 0) / 7);
  const totalCal = weeklyStats.reduce((s, d) => s + d.calories, 0);
  const totalDist = weeklyStats.reduce((s, d) => s + d.distance, 0).toFixed(1);

  return (
    <div className="px-4 pt-4 pb-4 space-y-5 max-w-lg mx-auto">
      <div>
        <h1 className="text-xl font-display font-bold text-foreground">Stats</h1>
        <p className="text-xs text-muted-foreground">This week's performance</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Target, label: 'Avg Steps', value: avgSteps.toLocaleString(), color: 'text-ember' },
          { icon: Flame, label: 'Total Cal', value: totalCal.toLocaleString(), color: 'text-flame' },
          { icon: TrendingUp, label: 'Distance', value: `${totalDist} km`, color: 'text-gold' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="glass rounded-2xl p-3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
            <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

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
            <YAxis hide />
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
            <YAxis hide />
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
          <Award className="w-4 h-4 text-gold" />
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

      {/* Streak history */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-3">🔥 Streak Calendar</p>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 28 }).map((_, i) => {
            const active = i < 12 || (i > 14 && i < 24);
            return (
              <div
                key={i}
                className={`aspect-square rounded-md ${active ? 'gradient-fire' : 'bg-muted/30'}`}
                style={{ opacity: active ? 0.4 + (i % 5) * 0.15 : 0.2 }}
              />
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">Last 28 days • Current streak: {currentUser.streak} days</p>
      </motion.div>
    </div>
  );
};

export default StatsScreen;
