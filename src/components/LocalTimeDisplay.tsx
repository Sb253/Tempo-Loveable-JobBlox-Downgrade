
import { useLocalTime } from '@/hooks/useLocalTime';
import { Clock } from 'lucide-react';

interface LocalTimeDisplayProps {
  showSeconds?: boolean;
  showDate?: boolean;
  className?: string;
}

export const LocalTimeDisplay = ({ 
  showSeconds = true, 
  showDate = true, 
  className = "" 
}: LocalTimeDisplayProps) => {
  const { currentTime, timeZone, isReady, formatTime, formatDate } = useLocalTime();

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds && { second: '2-digit' })
  };

  if (!isReady) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Clock className="h-4 w-4" />
        <div className="text-sm">
          <div className="font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className="h-4 w-4" />
      <div className="text-sm">
        <div className="font-medium">
          {formatTime(currentTime, timeOptions)}
        </div>
        {showDate && (
          <div className="text-xs text-muted-foreground">
            {formatDate(currentTime)} ({timeZone})
          </div>
        )}
      </div>
    </div>
  );
};
