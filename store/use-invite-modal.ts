import { create } from 'zustand'

interface InviteModalState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useInviteModal = create<InviteModalState>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
