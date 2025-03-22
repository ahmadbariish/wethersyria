import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { WeatherDashboard } from './components/weather/WeatherDashboard';
import { WeatherAlerts } from './components/weather/WeatherAlerts';
import { WeatherChatbot } from './components/chat/WeatherChatbot';
import { WeatherRecommendations } from './components/weather/WeatherRecommendations';
import { WeatherMap } from './components/weather/WeatherMap';

function App() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <WeatherDashboard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeatherMap />
            <WeatherRecommendations />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <WeatherAlerts />
          <WeatherChatbot />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;