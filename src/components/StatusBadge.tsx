import { Badge } from "@/components/ui/badge";

type StatusType = 'completed' | 'in-progress' | 'not-started' | 'delayed' | 'validated';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  'completed': {
    label: 'Completed',
    className: 'bg-status-success text-status-success-foreground hover:bg-status-success/90'
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-status-warning text-status-warning-foreground hover:bg-status-warning/90'
  },
  'not-started': {
    label: 'Not Started',
    className: 'bg-muted text-muted-foreground hover:bg-muted/80'
  },
  'delayed': {
    label: 'Delayed',
    className: 'bg-status-danger text-status-danger-foreground hover:bg-status-danger/90'
  },
  'validated': {
    label: 'Validated',
    className: 'bg-status-success text-status-success-foreground hover:bg-status-success/90'
  }
};

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  // Fallback for unknown status values
  if (!config) {
    return (
      <Badge className={`bg-muted text-muted-foreground hover:bg-muted/80 ${className}`}>
        {status}
      </Badge>
    );
  }
  
  return (
    <Badge className={`${config.className} ${className}`}>
      {config.label}
    </Badge>
  );
};