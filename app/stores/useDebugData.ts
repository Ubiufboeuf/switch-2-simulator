import { create } from 'zustand'

type DebugData = { [key: string]: unknown }

type DebugStore = {
  isPanelVisible: boolean
  debugData: DebugData
  setIsPanelVisible: (isPanelVisible: boolean) => void
  setDebugData: (newDebugData: DebugData) => void
  toggleIsPanelVisible: () => void
}

export const useDebugStore = create<DebugStore>((set, get) => ({
  isPanelVisible: false,
  debugData: {},
  setDebugData: (debugData) => set({ debugData }),
  setIsPanelVisible: (isPanelVisible) => set({ isPanelVisible }),
  toggleIsPanelVisible: () => set({ isPanelVisible: !get().isPanelVisible })
}))
