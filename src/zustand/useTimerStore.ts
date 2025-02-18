import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_TIMER = 20;

interface TimerData {
  initialDuration: number;
  startTime: number | null;
  isActive: boolean;
  cookies: string[];
}

interface TimerState {
  timers: Record<string, TimerData>;
  getRemainingTime: (username: string) => number;
  startTimer: (username: string, cookies: string[], duration?: number) => void;
  pauseTimer: (username: string) => void;
  resetTimer: (username: string) => void;
  cacheUsername: (username: string, cookies: string[]) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      timers: {},

      getRemainingTime: (username: string) => {
        const timer = get().timers[username];
        if (!timer) return DEFAULT_TIMER;

        if (!timer.isActive || !timer.startTime) {
          return timer.initialDuration;
        }

        const elapsed = Date.now() - timer.startTime;
        const remaining = timer.initialDuration - Math.floor(elapsed / 1000);
        return remaining > 0 ? remaining : 0;
      },

      startTimer: (username: string, cookies: string[], duration?: number) => {
        const currentTimer = get().timers[username];
        const newDuration = duration
        || (currentTimer ? currentTimer.initialDuration : DEFAULT_TIMER);

        set((state) => ({
          timers: {
            ...state.timers,
            [username]: {
              initialDuration: newDuration,
              startTime: Date.now(),
              isActive: true,
              cookies,
            },
          },
        }));
      },

      pauseTimer: (username: string) => {
        const currentTimer = get().timers[username];
        if (!currentTimer) return;

        const remaining = get().getRemainingTime(username);
        set((state) => ({
          timers: {
            ...state.timers,
            [username]: {
              ...currentTimer,
              isActive: false,
              startTime: null,
              initialDuration: remaining,
            },
          },
        }));
      },

      resetTimer: (username: string) => {
        set((state) => ({
          timers: {
            ...state.timers,
            [username]: {
              initialDuration: DEFAULT_TIMER,
              startTime: null,
              isActive: false,
              cookies: [],
            },
          },
        }));
      },

      cacheUsername: (username: string, cookies: string[]) => {
        set((state) => ({
          timers: {
            ...state.timers,
            [username]:
              state.timers[username] || {
                initialDuration: DEFAULT_TIMER,
                startTime: null,
                isActive: false,
                cookies,
              },
          },
        }));
      },
    }),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.timers) {
          const updatedTimers: Record<string, TimerData> = { ...state.timers };

          Object.keys(updatedTimers).forEach((username) => {
            const timer = updatedTimers[username];

            if (timer?.isActive && timer.startTime) {
              const elapsed = Date.now() - timer.startTime;
              const remaining = timer.initialDuration - Math.floor(elapsed / 1000);
              const { cookies } = timer;

              if (remaining > 0) {
                updatedTimers[username] = {
                  initialDuration: remaining,
                  startTime: Date.now(),
                  isActive: true,
                  cookies,
                };
              } else {
                updatedTimers[username] = {
                  initialDuration: DEFAULT_TIMER,
                  startTime: null,
                  isActive: false,
                  cookies,
                };
              }
            }
          });

          Object.assign(state, { timers: updatedTimers });
        }
      },
    },
  ),
);
