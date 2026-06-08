import { usePetContext } from '../context/PetContext';
import { getPetMotivation } from '../data/petMessages';

/**
 * Hook to get personality-aware motivation messages
 * Usage: const message = usePetMessages('quiz_pass')
 * Returns a random message from the pet's message pool for that context
 */
export function usePetMessages() {
  const { pet, bigFiveScores } = usePetContext();

  const getMessage = (context) => {
    if (!pet?.petType) return null;
    return getPetMotivation(pet.petType, context, bigFiveScores);
  };

  return getMessage;
}
