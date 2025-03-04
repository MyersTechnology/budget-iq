
import { PlusCircle, Link } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AddAccountSectionProps {
  onAddAccount: () => void;
}

const AddAccountSection = ({ onAddAccount }: AddAccountSectionProps) => {
  return (
    <Card className="border border-border/50 border-dashed card-shadow hover:border-primary/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Link className="h-6 w-6 text-primary" />
          </div>
          
          <h3 className="font-medium">Connect a new account</h3>
          <p className="text-sm text-muted-foreground max-w-[240px]">
            Securely link your bank, credit cards, loans, and investment accounts.
          </p>
          
          <Button 
            onClick={onAddAccount}
            className="mt-2"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddAccountSection;
