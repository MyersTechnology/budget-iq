
import MainLayout from "@/components/layout/MainLayout";
import SettingsLayout from "@/components/settings/SettingsLayout";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AISettings from "@/components/settings/AISettings";
import UISettings from "@/components/settings/UISettings";
import DataPrivacySettings from "@/components/settings/DataPrivacySettings";

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <SettingsLayout>
          <NotificationSettings />
          <AISettings />
          <UISettings />
          <DataPrivacySettings />
        </SettingsLayout>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
