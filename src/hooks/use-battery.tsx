import { useState, useEffect } from 'react';

interface BatteryManager {
  level: number;
  charging: boolean;
  onlevelchange: EventListenerOrEventListenerObject | null;
  onchargingchange: EventListenerOrEventListenerObject | null;
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void;
}

interface BatteryState {
  level: number;
  charging: boolean;
}

export const useBattery = () => {
  const [battery, setBattery] = useState<BatteryState>({
    level: 85, // Default fallback value
    charging: false
  });
  const [supported, setSupported] = useState<boolean>(false);

  useEffect(() => {
    // Check if the Battery Status API is available
    if ('getBattery' in navigator || ('navigator' in window && 'getBattery' in (window.navigator as any))) {
      const getBatteryPromise = ('getBattery' in navigator
        ? (navigator as any).getBattery()
        : (window.navigator as any).getBattery()
      ) as Promise<BatteryManager>;

      getBatteryPromise
        .then((batteryManager: BatteryManager) => {
          setSupported(true);
          
          // Set initial battery state
          setBattery({
            level: Math.round(batteryManager.level * 100),
            charging: batteryManager.charging
          });

          // Add event listeners for battery state changes
          const handleLevelChange = () => {
            setBattery(prev => ({
              ...prev,
              level: Math.round(batteryManager.level * 100)
            }));
          };

          const handleChargingChange = () => {
            setBattery(prev => ({
              ...prev,
              charging: batteryManager.charging
            }));
          };

          batteryManager.addEventListener('levelchange', handleLevelChange);
          batteryManager.addEventListener('chargingchange', handleChargingChange);

          // Clean up event listeners on unmount
          return () => {
            batteryManager.removeEventListener('levelchange', handleLevelChange);
            batteryManager.removeEventListener('chargingchange', handleChargingChange);
          };
        })
        .catch(() => {
          // If there's an error accessing the battery API, keep using the default value
          setSupported(false);
        });
    } else {
      // Battery API not supported
      setSupported(false);
    }
  }, []);

  return {
    ...battery,
    supported
  };
}