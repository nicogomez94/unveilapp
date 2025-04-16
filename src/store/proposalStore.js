import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useProposalStore = create(
  persist(
    (set, get) => ({
      // Estado para almacenar las propuestas por oferta
      proposals: {},
      
      // Añadir o actualizar una propuesta
      addProposal: (offerId, dates, status = 'pending') => set((state) => ({
        proposals: {
          ...state.proposals,
          [offerId]: { dates, status, updatedAt: new Date().toISOString() }
        }
      })),
      
      // Actualizar estado de una propuesta
      updateProposalStatus: (offerId, status) => set((state) => ({
        proposals: {
          ...state.proposals,
          [offerId]: { 
            ...state.proposals[offerId],
            status, 
            updatedAt: new Date().toISOString() 
          }
        }
      })),
      
      // Verificar si una oferta ya tiene propuesta
      hasProposal: (offerId) => {
        const proposals = get().proposals;
        return proposals && proposals[offerId] !== undefined;
      },
      
      // Obtener propuesta específica
      getProposal: (offerId) => {
        const proposals = get().proposals;
        return proposals && proposals[offerId];
      },
      
      // Eliminar propuesta
      removeProposal: (offerId) => set((state) => {
        const { [offerId]: _, ...rest } = state.proposals;
        return { proposals: rest };
      }),
      
      // Limpiar todas las propuestas
      clearProposals: () => set({ proposals: {} }),
    }),
    {
      name: 'proposals-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);