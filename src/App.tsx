/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { EstadoScreen } from './components/screens/EstadoScreen';
import { DiagnosticoScreen } from './components/screens/DiagnosticoScreen';
import { PronosticoScreen } from './components/screens/PronosticoScreen';
import { HistorialScreen } from './components/screens/HistorialScreen';
import { DispositivoScreen } from './components/screens/DispositivoScreen';
import { KotlinExplorer } from './components/KotlinExplorer';
import { Modals } from './components/Modals';

const MainContent: React.FC = () => {
  const { activeTab, viewMode } = useApp();

  return (
    <div className="min-h-screen bg-[#eefcff] flex flex-col items-center">
      {/* Fixed Header */}
      <Header />

      {/* Main Viewport Container */}
      <main className="w-full max-w-md px-4 pt-20 pb-28 flex flex-col flex-1">
        {viewMode === 'kotlin' ? (
          <KotlinExplorer />
        ) : (
          <>
            {activeTab === 'estado' && <EstadoScreen />}
            {activeTab === 'diagnostico' && <DiagnosticoScreen />}
            {activeTab === 'pronostico' && <PronosticoScreen />}
            {activeTab === 'historial' && <HistorialScreen />}
            {activeTab === 'dispositivo' && <DispositivoScreen />}
          </>
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      {viewMode === 'app' && <BottomNav />}

      {/* Modals & Overlay Alerts */}
      <Modals />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
