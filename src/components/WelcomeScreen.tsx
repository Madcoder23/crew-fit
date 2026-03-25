import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Users, Shuffle } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const tracks = [
  { id: 'gym', emoji: '🏋️', label: 'Gym Training' },
  { id: 'running', emoji: '🏃', label: 'Running / Cycling' },
  { id: 'sports', emoji: '⚽', label: 'Sports / Other' },
];

const goals = ['Lose Weight', 'Build Muscle', 'Stay Active', 'Train for Event'];
const seriousness = ['Casual', 'Moderate', 'Serious', 'Beast Mode'];
const times = ['🌅 Morning', '🌇 Evening', 'Both'];

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pairingType, setPairingType] = useState<'friends' | 'random' | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedSeriousness, setSelectedSeriousness] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const canProceed = () => {
    if (step === 0) return true;
    if (step === 1) return username.length >= 3 && password.length >= 4;
    if (step === 2) return pairingType !== null;
    if (step === 3) return selectedTrack !== null;
    if (step === 4) return selectedGoal && selectedSeriousness && selectedTime;
    return true;
  };

  const next = () => {
    if (step === 4 || (step === 3 && pairingType === 'friends')) {
      onComplete();
    } else if (step === 3 && pairingType === 'random') {
      setStep(4);
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-ember/10 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-60 h-60 rounded-full bg-flame/10 blur-3xl" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="welcome" className="text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
            <motion.div className="text-7xl mb-6" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🔥
            </motion.div>
            <h1 className="text-4xl font-display font-bold gradient-fire-text mb-3">CREWFIT</h1>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
              Build your crew. Burn together. Never workout alone again.
            </p>
            <motion.button
              onClick={next}
              className="mt-10 gradient-fire text-primary-foreground font-display font-semibold px-8 py-3 rounded-2xl shadow-fire flex items-center gap-2 mx-auto"
              whileTap={{ scale: 0.95 }}
            >
              Get Started <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="signup" className="w-full max-w-sm" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}>
            <h2 className="text-2xl font-display font-bold text-foreground mb-1">Join the fire 🔥</h2>
            <p className="text-sm text-muted-foreground mb-6">Create your account</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Username</label>
                <input
                  value={username} onChange={e => setUsername(e.target.value)}
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ember/50"
                  placeholder="your_crewname"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ember/50"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="pairing" className="w-full max-w-sm" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}>
            <h2 className="text-2xl font-display font-bold text-foreground mb-1">Find your crew</h2>
            <p className="text-sm text-muted-foreground mb-6">How do you want to team up?</p>
            <div className="space-y-3">
              <button
                onClick={() => setPairingType('friends')}
                className={`w-full glass rounded-2xl p-4 text-left flex items-center gap-4 transition-all ${pairingType === 'friends' ? 'ring-2 ring-ember shadow-fire' : ''}`}
              >
                <Users className="w-8 h-8 text-ember" />
                <div>
                  <p className="font-display font-semibold text-foreground">Invite Friends</p>
                  <p className="text-xs text-muted-foreground">Create a crew with people you know</p>
                </div>
              </button>
              <button
                onClick={() => setPairingType('random')}
                className={`w-full glass rounded-2xl p-4 text-left flex items-center gap-4 transition-all ${pairingType === 'random' ? 'ring-2 ring-ember shadow-fire' : ''}`}
              >
                <Shuffle className="w-8 h-8 text-flame" />
                <div>
                  <p className="font-display font-semibold text-foreground">Match Me</p>
                  <p className="text-xs text-muted-foreground">Pair with like-minded strangers</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="track" className="w-full max-w-sm" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}>
            <h2 className="text-2xl font-display font-bold text-foreground mb-1">Choose your track</h2>
            <p className="text-sm text-muted-foreground mb-6">What fires you up?</p>
            <div className="space-y-3">
              {tracks.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(t.id)}
                  className={`w-full glass rounded-2xl p-4 text-left flex items-center gap-4 transition-all ${selectedTrack === t.id ? 'ring-2 ring-ember shadow-fire' : ''}`}
                >
                  <span className="text-3xl">{t.emoji}</span>
                  <p className="font-display font-semibold text-foreground">{t.label}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="prefs" className="w-full max-w-sm" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}>
            <h2 className="text-2xl font-display font-bold text-foreground mb-1">Your preferences</h2>
            <p className="text-sm text-muted-foreground mb-6">Help us find your perfect crew</p>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Fitness Goal</p>
                <div className="flex flex-wrap gap-2">
                  {goals.map(g => (
                    <button key={g} onClick={() => setSelectedGoal(g)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedGoal === g ? 'gradient-fire text-primary-foreground shadow-fire' : 'glass text-muted-foreground'}`}
                    >{g}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Seriousness Level</p>
                <div className="flex flex-wrap gap-2">
                  {seriousness.map(s => (
                    <button key={s} onClick={() => setSelectedSeriousness(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedSeriousness === s ? 'gradient-fire text-primary-foreground shadow-fire' : 'glass text-muted-foreground'}`}
                    >{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Preferred Time</p>
                <div className="flex flex-wrap gap-2">
                  {times.map(t => (
                    <button key={t} onClick={() => setSelectedTime(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedTime === t ? 'gradient-fire text-primary-foreground shadow-fire' : 'glass text-muted-foreground'}`}
                    >{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step > 0 && (
        <motion.div className="mt-8 w-full max-w-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            onClick={next}
            disabled={!canProceed()}
            className="w-full gradient-fire text-primary-foreground font-display font-semibold py-3 rounded-2xl shadow-fire disabled:opacity-40 disabled:shadow-none transition-all flex items-center justify-center gap-2"
          >
            {step === 4 || (step === 3 && pairingType === 'friends') ? 'Find My Crew 🔥' : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </button>
          {/* Step dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[1,2,3,4].map(s => (
              <div key={s} className={`w-2 h-2 rounded-full transition-all ${step >= s ? 'bg-ember' : 'bg-muted'}`} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WelcomeScreen;
