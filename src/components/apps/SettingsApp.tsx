import React, { useState } from 'react';
import { MobileScreen } from '@/components/MobileScreen';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Battery, 
  Wifi, 
  Volume2, 
  Moon, 
  Sun,
  ChevronRight,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useBattery } from '@/hooks/use-battery';

interface SettingsAppProps {
  onBack: () => void;
}

export const SettingsApp = ({ onBack }: SettingsAppProps) => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const { level: batteryPercentage, charging } = useBattery();

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    hasToggle = false, 
    toggleValue = false, 
    onToggle,
    hasChevron = true 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    hasToggle?: boolean;
    toggleValue?: boolean;
    onToggle?: () => void;
    hasChevron?: boolean;
  }) => (
    <div 
      className="flex items-center p-4 bg-secondary/20 rounded-xl mb-3 cursor-pointer hover:bg-secondary/30 transition-colors"
      onClick={hasToggle ? onToggle : undefined}
    >
      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      
      {hasToggle ? (
        toggleValue ? (
          <ToggleRight className="w-8 h-8 text-primary" />
        ) : (
          <ToggleLeft className="w-8 h-8 text-muted-foreground" />
        )
      ) : hasChevron ? (
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      ) : null}
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="text-sm font-medium text-muted-foreground mb-3 mt-6 first:mt-0">
      {title.toUpperCase()}
    </div>
  );

  return (
    <MobileScreen title="Settings" onBack={onBack}>
      <div className="space-y-2">
        {/* Profile */}
        <SettingItem
          icon={User}
          title="Iheoma Nkwo"
          subtitle="Apple ID, iCloud, Media & Purchases"
        />

        <SectionHeader title="Connectivity" />
        <SettingItem
          icon={Wifi}
          title="Wi-Fi"
          subtitle={wifi ? "Connected to Home Network" : "Not Connected"}
          hasToggle
          toggleValue={wifi}
          onToggle={() => setWifi(!wifi)}
        />
        
        <SettingItem
          icon={Bell}
          title="Bluetooth"
          subtitle={bluetooth ? "Connected" : "Off"}
          hasToggle
          toggleValue={bluetooth}
          onToggle={() => setBluetooth(!bluetooth)}
        />

        <SectionHeader title="Display & Sound" />
        <SettingItem
          icon={darkMode ? Moon : Sun}
          title="Dark Mode"
          subtitle={darkMode ? "On" : "Off"}
          hasToggle
          toggleValue={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
        />
        
        <SettingItem
          icon={Volume2}
          title="Sound & Haptics"
          subtitle="Ringtones, alerts, and system sounds"
        />
        
        <SettingItem
          icon={Palette}
          title="Display & Brightness"
          subtitle="Auto-brightness, True Tone"
        />

        <SectionHeader title="Privacy & Security" />
        <SettingItem
          icon={Shield}
          title="Privacy & Security"
          subtitle="Location, analytics, tracking"
        />
        
        <SettingItem
          icon={Bell}
          title="Notifications"
          subtitle={notifications ? "Allowed" : "Off"}
          hasToggle
          toggleValue={notifications}
          onToggle={() => setNotifications(!notifications)}
        />

        <SectionHeader title="General" />
        <SettingItem
          icon={Globe}
          title="General"
          subtitle="About, software update, storage"
        />
        
        <SettingItem
          icon={Battery}
          title="Battery"
          subtitle={`${batteryPercentage}% - ${charging ? 'Charging' : 'Good condition'}`}
        />

        {/* System Info */}
        <div className="mt-8 p-4 bg-secondary/10 rounded-xl">
          <div className="text-center text-sm text-muted-foreground">
            <div>iOS 26.0</div>
            <div className="mt-1">Model: iPhone Portfolio</div>
            <div className="mt-1">Serial: PWX123456789</div>
          </div>
        </div>
      </div>
    </MobileScreen>
  );
};