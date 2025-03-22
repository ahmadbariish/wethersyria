import React from 'react';
import { useTranslation } from 'react-i18next';
import { SunIcon, CloudIcon, CloudArrowUpIcon, BoltIcon } from '@heroicons/react/24/outline';

interface Recommendation {
  type: 'clothing' | 'activities' | 'health';
  title: string;
  description: string;
  icon: string;
}

export const WeatherRecommendations: React.FC = () => {
  const { t } = useTranslation();

  // TODO: Replace with actual AI-generated recommendations
  const recommendations: Recommendation[] = [
    {
      type: 'clothing',
      title: t('recommendations.clothing'),
      description: 'قم بارتداء ملابس خفيفة وواقية من الشمس',
      icon: 'SunIcon',
    },
    {
      type: 'activities',
      title: t('recommendations.activities'),
      description: 'الوقت المثالي للنزهات في الصباح الباكر',
      icon: 'CloudIcon',
    },
    {
      type: 'health',
      title: t('recommendations.health'),
      description: 'احرص على شرب الماء بكمية كافية',
      icon: 'CloudArrowUpIcon',
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'SunIcon':
        return <SunIcon className="h-6 w-6" />;
      case 'CloudIcon':
        return <CloudIcon className="h-6 w-6" />;
      case 'CloudArrowUpIcon':
        return <CloudArrowUpIcon className="h-6 w-6" />;
      case 'BoltIcon':
        return <BoltIcon className="h-6 w-6" />;
      default:
        return <SunIcon className="h-6 w-6" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {t('recommendations.title')}
      </h3>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <div className="flex-shrink-0 text-blue-500">
              {getIcon(rec.icon)}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {rec.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {rec.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 