import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Check, X, Navigation, Award } from 'lucide-react';
import { meetupSchedule, crewMembers } from '@/lib/mockData';

const suggestedLocations = [
  { name: 'Central Park Track', coords: { lat: 12.9716, lng: 77.5946 } },
  { name: 'City Gym Plaza', coords: { lat: 12.9750, lng: 77.5980 } },
  { name: 'Lakeside Running Path', coords: { lat: 12.9680, lng: 77.5910 } },
  { name: 'University Sports Complex', coords: { lat: 12.9800, lng: 77.6020 } },
];

const MeetupScheduler = () => {
  const [schedule, setSchedule] = useState(meetupSchedule);
  const [selectedLocation, setSelectedLocation] = useState(schedule.location);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [proximityDetected, setProximityDetected] = useState(false);

  const toggleAvailability = (memberId: string) => {
    setSchedule(prev => ({
      ...prev,
      availability: { ...prev.availability, [memberId]: !prev.availability[memberId] },
    }));
  };

  const availableCount = Object.values(schedule.availability).filter(Boolean).length;
  const allAvailable = availableCount === crewMembers.length;

  return (
    <div className="space-y-4">
      {/* Meetup card */}
      <motion.div className="glass rounded-2xl p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-ember" />
          <p className="text-xs font-display font-semibold text-foreground uppercase tracking-wider">Weekly Meetup</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{schedule.proposedDate} at {schedule.proposedTime}</span>
          </div>

          {/* Location */}
          <div>
            <button
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="flex items-center gap-3 text-sm w-full text-left hover:bg-muted/30 rounded-xl p-2 -m-2 transition-colors"
            >
              <MapPin className="w-4 h-4 text-ember" />
              <span className="text-foreground flex-1">{selectedLocation}</span>
              <span className="text-[10px] text-ember">Change</span>
            </button>

            <AnimatePresence>
              {showLocationPicker && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 space-y-1.5">
                    {suggestedLocations.map(loc => (
                      <button
                        key={loc.name}
                        onClick={() => { setSelectedLocation(loc.name); setShowLocationPicker(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all ${
                          selectedLocation === loc.name ? 'bg-ember/20 text-foreground border border-ember/30' : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                        }`}
                      >
                        <MapPin className="w-3 h-3 inline mr-1" />{loc.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Availability */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Team availability ({availableCount}/{crewMembers.length})</p>
            <div className="space-y-1.5">
              {crewMembers.map(m => {
                const isAvailable = schedule.availability[m.id];
                const isMe = m.id === 'user1';
                return (
                  <button
                    key={m.id}
                    onClick={() => isMe && toggleAvailability(m.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all ${
                      isAvailable ? 'bg-success/10 text-success' : 'bg-muted/30 text-muted-foreground'
                    } ${isMe ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                  >
                    <span>{m.avatar}</span>
                    <span className="flex-1 text-left">{isMe ? 'You' : m.name}</span>
                    {isAvailable ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {isMe && <span className="text-[10px] text-ember">(tap to toggle)</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Proximity detection */}
      <motion.div
        className={`glass rounded-2xl p-4 border-l-4 ${proximityDetected ? 'border-success' : 'border-muted'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <Navigation className="w-5 h-5 text-ember" />
          <div className="flex-1">
            <p className="text-sm font-display font-semibold text-foreground">Proximity Tracking</p>
            <p className="text-xs text-muted-foreground">
              {proximityDetected
                ? '🎉 All members detected within 500m! +100 bonus XP!'
                : 'When all team members are within 500m, meetup is confirmed automatically'
              }
            </p>
          </div>
          {proximityDetected && (
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4 text-gold" />
              <span className="text-xs font-bold gradient-fire-text">+100 XP</span>
            </div>
          )}
        </div>
        {!proximityDetected && (
          <button
            onClick={() => setProximityDetected(true)}
            className="mt-3 w-full py-2 rounded-xl text-xs font-medium gradient-fire text-primary-foreground shadow-fire"
          >
            Simulate Meetup Detection
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default MeetupScheduler;
