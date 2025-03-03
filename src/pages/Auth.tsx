
import { useEffect } from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  useEffect(() => {
    // Add body class for the auth page
    document.body.classList.add('bg-gradient-to-br', 'from-blue-50', 'to-sky-50');
    
    return () => {
      // Remove classes when component unmounts
      document.body.classList.remove('bg-gradient-to-br', 'from-blue-50', 'to-sky-50');
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-scale-in">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">BudgetAI</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Your personal financial assistant powered by artificial intelligence
          </p>
        </div>
        
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
