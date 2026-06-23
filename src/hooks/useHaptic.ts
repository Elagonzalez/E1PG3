import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useHaptic = () => {
  const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (error) {
      console.log('Haptic feedback not available:', error);
    }
  };

  return { triggerHaptic };
};
