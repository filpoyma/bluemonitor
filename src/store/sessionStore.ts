import { create } from 'zustand';

interface SessionState {
  hasSeenTestHint: boolean;
  dismissTestHint: () => void;
}

export const useSessionStore = create<SessionState>(set => ({
  hasSeenTestHint: false,
  dismissTestHint: () => set({ hasSeenTestHint: true }),
}));
