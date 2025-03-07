
import AppLayout from "@/components/layout/AppLayout";
import SecurityLayout from "@/components/security/SecurityLayout";
import AuthenticationSettings from "@/components/security/AuthenticationSettings";
import DataSecuritySettings from "@/components/security/DataSecuritySettings";
import AccountManagement from "@/components/security/AccountManagement";

const SecurityPage = () => {
  return (
    <AppLayout>
      <div className="w-full max-w-4xl mx-auto px-4 font-size-responsive overflow-hidden">
        <h1 className="text-3xl font-bold mb-8">Security & Privacy</h1>
        
        <SecurityLayout>
          <AuthenticationSettings />
          <DataSecuritySettings />
          <AccountManagement />
        </SecurityLayout>
      </div>
    </AppLayout>
  );
};

export default SecurityPage;
