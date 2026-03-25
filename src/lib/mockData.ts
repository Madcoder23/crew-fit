export interface CrewMember {
  id: string;
  name: string;
  avatar: string;
  role: 'Captain' | 'Enforcer' | 'Motivator' | 'Rookie';
  streak: number;
  stepsToday: number;
  caloriesBurned: number;
  weeklyActivity: number[];
  puzzlePiece: boolean; // has contributed today
}

export interface Crew {
  id: string;
  name: string;
  campfireLevel: number; // 0-100
  totalCalories: number;
  weeklyStreak: number;
  members: CrewMember[];
  puzzleProgress: number; // 0-6 pieces
}

export interface ActivityData {
  date: string;
  steps: number;
  calories: number;
  distance: number; // km
  activeMinutes: number;
}

export interface WeeklyStats {
  day: string;
  steps: number;
  calories: number;
  distance: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  isAI?: boolean;
}

export const currentUser: CrewMember = {
  id: 'user1',
  name: 'You',
  avatar: '🏃',
  role: 'Motivator',
  streak: 12,
  stepsToday: 7842,
  caloriesBurned: 420,
  weeklyActivity: [8200, 6500, 9100, 7800, 5200, 8900, 7842],
  puzzlePiece: true,
};

export const crewMembers: CrewMember[] = [
  currentUser,
  { id: 'user2', name: 'Arjun', avatar: '💪', role: 'Captain', streak: 24, stepsToday: 10200, caloriesBurned: 580, weeklyActivity: [9500, 8700, 10200, 9800, 7600, 11000, 10200], puzzlePiece: true },
  { id: 'user3', name: 'Priya', avatar: '🧘', role: 'Enforcer', streak: 18, stepsToday: 6400, caloriesBurned: 320, weeklyActivity: [7200, 5800, 8400, 6900, 4300, 7800, 6400], puzzlePiece: true },
  { id: 'user4', name: 'Rahul', avatar: '🚴', role: 'Motivator', streak: 8, stepsToday: 3200, caloriesBurned: 180, weeklyActivity: [6100, 4500, 7300, 5200, 3800, 6600, 3200], puzzlePiece: false },
  { id: 'user5', name: 'Maya', avatar: '🏋️', role: 'Rookie', streak: 3, stepsToday: 1500, caloriesBurned: 90, weeklyActivity: [3200, 2100, 4500, 2800, 1900, 3900, 1500], puzzlePiece: false },
];

export const crew: Crew = {
  id: 'crew1',
  name: 'Iron Wolves 🐺',
  campfireLevel: 72,
  totalCalories: 1590,
  weeklyStreak: 5,
  members: crewMembers,
  puzzleProgress: 3,
};

export const weeklyStats: WeeklyStats[] = [
  { day: 'Mon', steps: 8200, calories: 450, distance: 5.8 },
  { day: 'Tue', steps: 6500, calories: 340, distance: 4.2 },
  { day: 'Wed', steps: 9100, calories: 510, distance: 6.4 },
  { day: 'Thu', steps: 7800, calories: 420, distance: 5.5 },
  { day: 'Fri', steps: 5200, calories: 280, distance: 3.6 },
  { day: 'Sat', steps: 8900, calories: 490, distance: 6.2 },
  { day: 'Sun', steps: 7842, calories: 420, distance: 5.4 },
];

export const activityBreakdown = [
  { name: 'Walking', value: 45, color: 'hsl(16, 90%, 58%)' },
  { name: 'Running', value: 25, color: 'hsl(35, 95%, 55%)' },
  { name: 'Cycling', value: 15, color: 'hsl(45, 100%, 60%)' },
  { name: 'Gym', value: 15, color: 'hsl(200, 80%, 50%)' },
];

export const chatMessages: ChatMessage[] = [
  { id: '1', senderId: 'user2', senderName: 'Arjun', message: "Let's crush 10K steps today! 💪", timestamp: new Date(Date.now() - 3600000) },
  { id: '2', senderId: 'ai', senderName: '🤖 CrewFit AI', message: "Your crew burned 12% more calories than last week! Keep the fire alive 🔥", timestamp: new Date(Date.now() - 2400000), isAI: true },
  { id: '3', senderId: 'user3', senderName: 'Priya', message: "Just finished a 5K run! Who's next?", timestamp: new Date(Date.now() - 1800000) },
  { id: '4', senderId: 'user1', senderName: 'You', message: "On it! Heading out for a walk now 🚶", timestamp: new Date(Date.now() - 900000) },
  { id: '5', senderId: 'ai', senderName: '🤖 CrewFit AI', message: "⚡ Rahul, you're only 1,800 steps from your daily goal. Your 8-day streak is on the line — don't let the crew down!", timestamp: new Date(Date.now() - 300000), isAI: true },
];

export const psychologyTips = [
  { title: "The 2-Minute Rule", description: "If a workout feels hard, commit to just 2 minutes. 80% of people continue past it.", icon: "🧠", source: "BJ Fogg, Stanford" },
  { title: "Social Proof Effect", description: "You're 65% more likely to hit your goal when your crew is active.", icon: "👥", source: "Cialdini, 1984" },
  { title: "Loss Aversion", description: "Losing your streak hurts 2x more than gaining one feels good. Protect it!", icon: "🔥", source: "Kahneman & Tversky" },
  { title: "Implementation Intent", description: "People who set a specific time to exercise are 91% more likely to follow through.", icon: "⏰", source: "Gollwitzer, 1999" },
];

export const roleDescriptions: Record<string, { title: string; description: string; badge: string }> = {
  Captain: { title: 'Captain', description: 'Highest streak & consistency. Leads the crew.', badge: '👑' },
  Enforcer: { title: 'Enforcer', description: 'Calls out slackers. Keeps accountability high.', badge: '⚔️' },
  Motivator: { title: 'Motivator', description: 'Hypes the crew. Most messages & encouragement.', badge: '🎯' },
  Rookie: { title: 'Rookie', description: 'New to the crew. Building habits & trust.', badge: '🌱' },
};
