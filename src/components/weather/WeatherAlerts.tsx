import React, { useState, useEffect } from 'react';
import { ExclamationTriangleIcon, BellIcon } from '@heroicons/react/24/outline';

interface WeatherAlert {
  id: string;
  type: 'warning' | 'info' | 'danger';
  title: string;
  description: string;
  timestamp: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
}

export const WeatherAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchAlerts = async () => {
      try {
        // Simulated data for now
        const mockAlerts: WeatherAlert[] = [
          {
            id: '1',
            type: 'warning',
            title: 'High Temperature Alert',
            description: 'Temperatures are expected to reach 35°C in Damascus. Stay hydrated and avoid outdoor activities during peak hours.',
            timestamp: new Date().toISOString(),
            location: 'Damascus',
            severity: 'high',
          },
          {
            id: '2',
            type: 'info',
            title: 'Air Quality Update',
            description: 'Moderate air quality in Aleppo. Sensitive groups should limit outdoor activities.',
            timestamp: new Date().toISOString(),
            location: 'Aleppo',
            severity: 'medium',
          },
        ];
        setAlerts(mockAlerts);
      } catch (error) {
        console.error('Error fetching weather alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const getAlertColor = (type: WeatherAlert['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200';
      case 'danger':
        return 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Weather Alerts
        </h3>
      </div>
      
      {alerts.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          No active weather alerts at this time.
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">{alert.title}</h4>
                  <p className="text-sm mt-1">{alert.description}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <span>{alert.location}</span>
                    <span>•</span>
                    <span>
                      {new Date(alert.timestamp).toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 