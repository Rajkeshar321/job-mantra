import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          setIsExiting(true);
          setTimeout(onClose, 300);
          return 0;
        }
        return prev - (100 / (duration / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`pointer-events-auto bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden min-w-[320px] transition-all duration-300 ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
      <div className="flex items-center gap-3 p-4">
        {icons[type]}
        <p className="text-sm font-medium text-gray-900 flex-1">{message}</p>
        <button 
          onClick={() => {
            setIsExiting(true);
            setTimeout(onClose, 300);
          }}
          className="shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div 
          className={`h-full transition-all duration-50 ${colors[type]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;