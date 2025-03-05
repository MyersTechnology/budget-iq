
import { useState, useEffect } from 'react';

interface SettingsState {
  // Notification settings
  spendingAlerts: boolean;
  budgetReminders: boolean;
  goalUpdates: boolean;
  notificationFrequency: 'daily' | 'weekly' | 'monthly';
  
  // AI settings
  autoCategorizationEnabled: boolean;
  aiInsightsEnabled: boolean;
  
  // UI settings
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  
  // Data & Privacy settings
  analyticsSharingEnabled: boolean;
  transactionHistoryEnabled: boolean;
}

const defaultSettings: SettingsState = {
  // Notification settings
  spendingAlerts: true,
  budgetReminders: true,
  goalUpdates: true,
  notificationFrequency: 'weekly',
  
  // AI settings
  autoCategorizationEnabled: true,
  aiInsightsEnabled: true,
  
  // UI settings
  darkMode: false,
  fontSize: 'medium',
  highContrast: false,
  
  // Data & Privacy settings
  analyticsSharingEnabled: true,
  transactionHistoryEnabled: true,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  
  // Update individual setting
  const updateSetting = <K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };
  
  // Apply dark mode setting
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.darkMode);
  }, [settings.darkMode]);
  
  // Apply font size setting
  useEffect(() => {
    // This is a simplified example. In a real app, you might want to use
    // CSS variables or a theming system for more advanced styling
    document.documentElement.dataset.fontSize = settings.fontSize;
  }, [settings.fontSize]);
  
  // Apply high contrast setting
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
  }, [settings.highContrast]);
  
  return {
    settings,
    updateSetting,
  };
};
