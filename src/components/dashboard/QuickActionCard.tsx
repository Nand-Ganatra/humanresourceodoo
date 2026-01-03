import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  variant?: 'default' | 'primary' | 'accent';
}

const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  to, 
  variant = 'default' 
}: QuickActionCardProps) => {
  const variants = {
    default: 'bg-card hover:border-primary/30',
    primary: 'bg-primary/5 border-primary/20 hover:bg-primary/10',
    accent: 'bg-accent/5 border-accent/20 hover:bg-accent/10',
  };

  const iconVariants = {
    default: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
    primary: 'bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
    accent: 'bg-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground',
  };

  return (
    <Link
      to={to}
      className={cn(
        "group block p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        variants[variant]
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
        iconVariants[variant]
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
};

export default QuickActionCard;
