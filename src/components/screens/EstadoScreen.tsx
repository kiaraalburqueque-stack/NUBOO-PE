import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoomId } from '../../types';

export const EstadoScreen: React.FC = () => {
  const {
    activeRoomId,
    setActiveRoomId,
    currentRoom,
    rooms,
    exterior,
    timerRunning,
    timerSeconds,
    totalTimerSeconds,
    toggleTimer,
    markAsOpened,
    resetTimer,
    hardware,
    setLedMode
  } = useApp();

  const [isRoomMenuOpen, setIsRoomMenuOpen] = useState(false);

  // Format mm:ss
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // SVG ring circumference = 2 * PI * 42 ≈ 263.89
  const circumference = 264;
  const progressRatio = timerSeconds / totalTimerSeconds;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="flex flex-col w-full gap-5 pb-6">
      {/* Selector de Espacio Activo y Estado Hardware */}
      <section className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Main room button / dropdown trigger */}
          <div className="relative">
            <button
              onClick={() => setIsRoomMenuOpen(!isRoomMenuOpen)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#005c59] text-white shadow-sm active:scale-95 transition-all text-xs font-semibold whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#7afbb1] animate-pulse" />
              <span>{currentRoom.name}</span>
              <span className="material-symbols-outlined text-[16px] leading-none opacity-80">
                {isRoomMenuOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isRoomMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#0e7673]/10 py-1.5 z-40 backdrop-blur-md">
                {(Object.keys(rooms) as RoomId[]).map((roomId) => {
                  const room = rooms[roomId];
                  const isSelected = room.id === activeRoomId;
                  return (
                    <button
                      key={room.id}
                      onClick={() => {
                        setActiveRoomId(room.id);
                        setIsRoomMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#e2f8fc] transition-colors ${
                        isSelected ? 'font-semibold text-[#005c59] bg-[#e2f8fc]/50' : 'text-[#3e4948]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#006d40]' : 'bg-[#bdc9c7]'}`} />
                        <span>{room.name}</span>
                      </div>
                      <span className="text-[10px] text-[#6e7978]">{room.co2} ppm</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick chip for other rooms */}
          {(Object.keys(rooms) as RoomId[])
            .filter((id) => id !== activeRoomId)
            .map((roomId) => (
              <button
                key={roomId}
                onClick={() => setActiveRoomId(roomId)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2f8fc] text-[#3e4948] hover:text-[#0a1e22] hover:bg-[#dcf2f6] active:scale-95 transition-all text-xs font-medium whitespace-nowrap"
              >
                <span>{rooms[roomId].name}</span>
              </button>
            ))}
        </div>

        {/* Hardware sensor tag badge */}
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white text-[#005c59] shadow-sm shrink-0 border border-[#0e7673]/8">
          <span className="material-symbols-outlined text-[16px]">sensors</span>
          <span className="font-label text-[11px] font-semibold">{currentRoom.hardwareTag}</span>
        </div>
      </section>

      {/* Orbe Biofílico Central & Guía Intuitiva de Ventilación */}
      <section className="relative flex flex-col items-center justify-center p-6 rounded-[28px] bg-white shadow-[0_16px_40px_rgba(14,118,115,0.06)] border border-[#0e7673]/5 overflow-hidden text-center">
        {/* Aura lumínica reactiva ambiental tipo Hardware Ring */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#7afbb1]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-[#9cf1ed]/25 blur-3xl pointer-events-none" />

        {/* Anillo Halo Emulado NUBO-PE */}
        <div className="relative w-56 h-56 flex items-center justify-center my-2">
          {/* Glow perimetral del halo */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#7afbb1] via-[#9cf1ed] to-[#5cde97] transition-all duration-700 blur-md ${
              timerRunning ? 'opacity-80 scale-105 animate-pulse' : 'opacity-40 animate-pulse-subtle'
            }`}
          />

          {/* SVG Dial Biofílico */}
          <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 100 100">
            <circle
              className="text-[#d6ecf1]"
              cx="50"
              cy="50"
              fill="none"
              r="42"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="5.5"
            />
            <circle
              className="transition-all duration-1000 text-[#006d40]"
              cx="50"
              cy="50"
              fill="none"
              r="42"
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="5.5"
            />
          </svg>

          {/* Núcleo Interactivo de la Esfera */}
          <div className="absolute inset-3 rounded-full bg-white flex flex-col items-center justify-center p-3 shadow-inner z-20">
            <span 
              className={`material-symbols-outlined text-[28px] mb-0.5 text-[#006d40] transition-transform ${
                timerRunning ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '3s' }}
            >
              wind_power
            </span>
            <span className="font-headline text-[32px] leading-tight text-[#005c59] tracking-tight font-bold tabular-nums">
              {timeFormatted}
            </span>
            <span className="font-label text-[11px] text-[#3e4948] font-medium">
              {timerRunning ? 'Ventilación activa' : 'Recomendado'}
            </span>
          </div>
        </div>

        {/* Mensajes Semánticos Claros */}
        <div className="relative z-20 mt-3 max-w-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7afbb1]/40 text-[#007444] mb-2 border border-[#7afbb1]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006d40]" />
            <span className="font-label text-xs font-semibold">Momento Ideal para Ventilar</span>
          </div>
          <h2 className="font-headline text-[22px] leading-snug text-[#0a1e22] font-semibold tracking-tight">
            {currentRoom.description}
          </h2>
          <p className="font-body text-xs text-[#3e4948] mt-2 leading-relaxed">
            {currentRoom.subAdvice}
          </p>
        </div>

        {/* Botón de Acción Principal y Toggle de Estado */}
        <div className="relative z-20 w-full mt-4 flex flex-col gap-2">
          <button
            onClick={toggleTimer}
            className="w-full h-12 rounded-full bg-[#005c59] text-white font-label text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(0,92,89,0.22)] active:scale-[0.98] transition-all hover:bg-[#0e7673]"
          >
            <span className="material-symbols-outlined text-[20px]">
              {timerRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>
              {timerRunning
                ? 'Pausar ventilación guiada'
                : timerSeconds < totalTimerSeconds && timerSeconds > 0
                ? 'Reanudar ventilación guiada'
                : 'Iniciar ventilación guiada'}
            </span>
          </button>

          <button
            onClick={markAsOpened}
            className="w-full h-10 rounded-full bg-[#e2f8fc] text-[#005c59] font-label text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#dcf2f6] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">check</span>
            <span>Ya he abierto las ventanas</span>
          </button>

          {timerSeconds < totalTimerSeconds && (
            <button
              onClick={resetTimer}
              className="text-xs text-[#6e7978] hover:text-[#005c59] py-1 transition-colors"
            >
              Reiniciar temporizador a 15:00
            </button>
          )}
        </div>
      </section>

      {/* Tarjeta de Síntesis Interior vs Exterior */}
      <section className="flex flex-col rounded-[24px] bg-white p-4 shadow-[0_8px_24px_rgba(14,118,115,0.04)] border border-[#0e7673]/5 gap-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-label text-sm text-[#0a1e22] font-semibold">Balance de Ambientes</h3>
          <span className="font-label text-xs text-[#005c59] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#006d40] animate-pulse" />
            Sincronizado
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Columna Interior */}
          <div className="flex flex-col p-3 rounded-2xl bg-[#e2f8fc]/70 justify-between border border-[#0e7673]/5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label text-xs font-semibold text-[#0a1e22]">Interior</span>
              <span className="px-2 py-0.5 rounded-full bg-[#d6ecf1] text-[#3e4948] font-label text-[10px] font-medium">
                {currentRoom.status}
              </span>
            </div>
            <div className="space-y-1.5 my-1">
              <div className="flex items-center justify-between text-[#0a1e22]">
                <span className="font-body text-xs text-[#3e4948] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#744800]">co2</span>
                  CO₂
                </span>
                <span className="font-label text-xs font-semibold tabular-nums">{currentRoom.co2} ppm</span>
              </div>
              <div className="flex items-center justify-between text-[#0a1e22]">
                <span className="font-body text-xs text-[#3e4948] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#005c59]">thermostat</span>
                  Temp.
                </span>
                <span className="font-label text-xs font-semibold">{currentRoom.temp}°C</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#0e7673]/8 flex items-center gap-1 text-[#3e4948]">
              <span className="material-symbols-outlined text-[14px] text-[#744800]">
                {currentRoom.trend === 'subiendo' ? 'trending_up' : 'trending_flat'}
              </span>
              <span className="font-label text-[10px]">
                {currentRoom.trend === 'subiendo' ? 'CO₂ subiendo' : 'CO₂ estable'}
              </span>
            </div>
          </div>

          {/* Columna Exterior */}
          <div className="flex flex-col p-3 rounded-2xl bg-[#7afbb1]/20 justify-between border border-[#7afbb1]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label text-xs font-semibold text-[#0a1e22]">Exterior</span>
              <span className="px-2 py-0.5 rounded-full bg-[#7afbb1] text-[#007444] font-label text-[10px] font-bold">
                Puro
              </span>
            </div>
            <div className="space-y-1.5 my-1">
              <div className="flex items-center justify-between text-[#0a1e22]">
                <span className="font-body text-xs text-[#3e4948] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#006d40]">filter_vintage</span>
                  AQI
                </span>
                <span className="font-label text-xs font-semibold text-[#006d40]">
                  {exterior.aqi} Óptimo
                </span>
              </div>
              <div className="flex items-center justify-between text-[#0a1e22]">
                <span className="font-body text-xs text-[#3e4948] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#005c59]">air</span>
                  Brisa
                </span>
                <span className="font-label text-xs font-semibold">{exterior.temp}°C · Suave</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[#006d40]/10 flex items-center gap-1 text-[#006d40]">
              <span className="material-symbols-outlined text-[14px]">nature_people</span>
              <span className="font-label text-[10px] font-semibold">Flujo favorable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen Contextual de Armonía Hogar */}
      <section className="relative w-full h-36 rounded-[24px] overflow-hidden shadow-sm border border-[#0e7673]/5">
        <img
          className="w-full h-full object-cover"
          alt="Modern bright living room interior bathed in gentle morning sunlight"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhLTJOGosRCQQ3MRW0S8A5hfgHH7tGraDfoiCA75SV_4FSBhzgZaNPU0HFcMCkLTQbeP5G2huR1uhYfxsBv-z6uEgAEpCMDk6RhkT6KIuZFYpGahosjRTX8fJOr7GHlr1DQ---PE1lxyCVkBjw23qkosDEhB8r4AbVv2NQmmbjs7hqlqtyfQdFEZnUDboh0CfR_fF5z6Q0rG2dAZNpvF-EEBp7Ezu088ZD-BPG7qeEDbV5aklaGdLGpQ"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#203337]/80 via-[#203337]/20 to-transparent flex items-end p-4">
          <div className="flex items-center justify-between w-full text-white">
            <div>
              <p className="font-label text-xs text-[#7afbb1] font-semibold">Purificación Natural</p>
              <p className="font-headline text-lg font-semibold">Brisa cruzada óptima</p>
            </div>
            <span className="material-symbols-outlined text-[26px] text-[#7afbb1]">window</span>
          </div>
        </div>
      </section>

      {/* Modos Rápidos del Sensor NUBO-PE */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-label text-sm text-[#0a1e22] font-semibold">Modos Rápidos del Sensor</h3>
          <span className="font-label text-xs text-[#3e4948]">LED Ring Activo</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Modo Silencio Nocturno */}
          <button
            onClick={() => setLedMode('night')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all active:scale-95 group border ${
              hardware.ledMode === 'night'
                ? 'bg-[#005c59] text-white border-[#005c59] shadow-md'
                : 'bg-white text-[#0a1e22] border-[#0e7673]/5 hover:bg-[#e2f8fc]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                hardware.ledMode === 'night'
                  ? 'bg-white/20 text-white'
                  : 'bg-[#dcf2f6] text-[#005c59] group-hover:bg-[#005c59] group-hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">bedtime</span>
            </div>
            <span className="font-label text-xs font-semibold text-center leading-tight">
              Silencio Nocturno
            </span>
            <span
              className={`font-label text-[10px] mt-0.5 ${
                hardware.ledMode === 'night' ? 'text-white/80' : 'text-[#3e4948]'
              }`}
            >
              LED tenue
            </span>
          </button>

          {/* Modo Alta Precisión */}
          <button
            onClick={() => setLedMode('discrete')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all active:scale-95 group border ${
              hardware.ledMode === 'discrete'
                ? 'bg-[#005c59] text-white border-[#005c59] shadow-md'
                : 'bg-white text-[#0a1e22] border-[#0e7673]/5 hover:bg-[#e2f8fc]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                hardware.ledMode === 'discrete'
                  ? 'bg-white/20 text-white'
                  : 'bg-[#dcf2f6] text-[#005c59] group-hover:bg-[#005c59] group-hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">radar</span>
            </div>
            <span className="font-label text-xs font-semibold text-center leading-tight">
              Alta Precisión
            </span>
            <span
              className={`font-label text-[10px] mt-0.5 ${
                hardware.ledMode === 'discrete' ? 'text-white/80' : 'text-[#3e4948]'
              }`}
            >
              Muestreo 10s
            </span>
          </button>

          {/* Modo Eco Brisa */}
          <button
            onClick={() => setLedMode('breeze')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all active:scale-95 group border ${
              hardware.ledMode === 'breeze'
                ? 'bg-[#006d40] text-white border-[#006d40] shadow-md'
                : 'bg-white text-[#0a1e22] border-[#0e7673]/5 hover:bg-[#e2f8fc]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                hardware.ledMode === 'breeze'
                  ? 'bg-white/20 text-white'
                  : 'bg-[#7afbb1] text-[#007444] group-hover:bg-[#006d40] group-hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">spa</span>
            </div>
            <span className="font-label text-xs font-semibold text-center leading-tight">
              Eco Brisa
            </span>
            <span
              className={`font-label text-[10px] mt-0.5 font-medium ${
                hardware.ledMode === 'breeze' ? 'text-white/80' : 'text-[#006d40]'
              }`}
            >
              Activo
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
