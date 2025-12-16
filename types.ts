export enum DayStatus {
  LOCKED_DATE = 'LOCKED_DATE',     // Future date
  LOCKED_PREV = 'LOCKED_PREV',     // Previous day not completed
  AVAILABLE = 'AVAILABLE',         // Ready to play
  COMPLETED = 'COMPLETED'          // Finished
}

export interface DayConfig {
  day: number;
  title: string;
  description: string;
  type: 'quiz' | 'qr_hunt' | 'photo' | 'message';
  unlockCode: string; // The code required to finish this day
  clue?: string; // Hint for the user
  content: string; // The task description
}

export interface UserState {
  completedDays: number[];
  currentDay: number; // The furthest unlocked day
  name: string;
  isAuthenticated: boolean;
}

export const INITIAL_STATE: UserState = {
  completedDays: [],
  currentDay: 1,
  name: 'Anastasia',
  isAuthenticated: false
};
