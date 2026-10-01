import React from 'react';
import { useApp } from '../../context/AppContext';

export const DispositivoScreen: React.FC = () => {
  const {
    hardware,
    setLedMode,
    setBrightness,
    setOledMode,
    toggleAutoRotation,
    triggerHardwarePulse,
    triggerCalibration,
    setIsWifiModalOpen,
    timerSeconds
  } = useApp();

  const minutesRemaining = Math.max(1, Math.ceil(timerSeconds / 60));

  return (
    <div className="flex flex-col w-full gap-5 pb-6">
      {/* Tarjeta Central de Hardware NUBO-PE */}
      <section className="relative overflow-hidden rounded-2xl bg-white shadow-[0_12px_32px_-4px_rgba(14,118,115,0.08)] p-4 border border-[#0e7673]/5">
        {/* Glow ambiental detrás del hardware */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#7afbb1]/40 blur-[40px] pointer-events-none transition-opacity duration-300"
          style={{ opacity: hardware.brightness / 100 }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Render / Representación del Prototipo Físico (Guijarro + Anillo LED Esmeralda) */}
          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            {/* Halo de respiración sutil */}
            <div
              className={`absolute inset-2 rounded-full bg-[#7afbb1] blur-md transition-all duration-500 ${
                hardware.isPulsing ? 'scale-125 opacity-100 bg-[#5cde97]' : 'animate-pulse-subtle'
              }`}
              style={{
                opacity: hardware.isPulsing ? 0.95 : Math.max(0.2, (hardware.brightness / 100) * 0.75)
              }}
            />

            {/* Silueta física de guijarro orgánico */}
            <div className="relative w-36 h-36 rounded-full bg-white shadow-[0_10px_25px_rgba(0,109,64,0.12)] flex items-center justify-center border border-[#0e7673]/10">
              {/* Anillo LED físico (SVG perimétrico) */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 144 144">
                <circle
                  cx="72"
                  cy="72"
                  fill="none"
                  r="66"
                  stroke="#e2f8fc"
                  strokeWidth="4"
                />
                <circle
                  className="transition-all duration-500"
                  cx="72"
                  cy="72"
                  fill="none"
                  r="66"
                  stroke="#006d40"
                  strokeDasharray="415"
                  strokeDashoffset={hardware.isPulsing ? "0" : "100"}
                  strokeLinecap="round"
                  strokeWidth={hardware.isPulsing ? "6" : "4.5"}
                  style={{ opacity: Math.max(0.3, hardware.brightness / 100) }}
                />
              </svg>

              {/* Micro Pantalla OLED Física Integrada */}
              <div className="w-20 h-20 rounded-full bg-[#203337] flex flex-col items-center justify-center text-center p-2 shadow-inner border border-[#0a1e22]">
                <span
                  className="material-symbols-outlined text-[#7afbb1] text-[26px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  air
                </span>
                {hardware.oledMode === 'full' && (
                  <span className="font-label text-[#e2f8fc] text-[10px] tracking-tight mt-0.5 animate-fadeIn">
                    {minutesRemaining} min
                  </span>
                )}
              </div>
            </div>

            {/* Indicador flotante de sincronización activa */}
            <div className="absolute bottom-1 right-5 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-sm border border-[#0e7673]/10">
              <span className="w-2 h-2 rounded-full bg-[#006d40] animate-pulse" />
              <span className="font-label text-[10px] text-[#3e4948] font-semibold">BLE+Wi-Fi</span>
            </div>
          </div>

          {/* Ficha de Estado del Dispositivo */}
          <div className="w-full text-center mt-1">
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="font-headline text-base text-[#0a1e22] font-semibold">
                {hardware.name}
              </h2>
              <span
                className="material-symbols-outlined text-[#005c59] text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <p className="font-label text-xs text-[#3e4948] mt-0.5">
              {hardware.revision} · Firmware {hardware.firmware} al día
            </p>
          </div>

          {/* Telemetría rápida en chips suaves */}
          <div className="grid grid-cols-3 gap-2 w-full mt-3 pt-2 border-t border-[#0e7673]/8">
            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#e2f8fc] text-center border border-[#0e7673]/5">
              <div className="flex items-center gap-1 text-[#005c59]">
                <span className="material-symbols-outlined text-[15px]">wifi</span>
                <span className="font-label text-xs font-semibold">{hardware.signalStrength}</span>
              </div>
              <span className="font-label text-[10px] text-[#3e4948] mt-0.5">Señal Alta</span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#e2f8fc] text-center border border-[#0e7673]/5">
              <div className="flex items-center gap-1 text-[#006d40]">
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  battery_charging_full
                </span>
                <span className="font-label text-xs font-semibold">{hardware.batteryPercent}%</span>
              </div>
              <span className="font-label text-[10px] text-[#3e4948] mt-0.5">Alimentado</span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#e2f8fc] text-center border border-[#0e7673]/5">
              <div className="flex items-center gap-1 text-[#005c59]">
                <span className="material-symbols-outlined text-[15px]">bluetooth_connected</span>
                <span className="font-label text-xs font-semibold">Enlace</span>
              </div>
              <span className="font-label text-[10px] text-[#3e4948] mt-0.5">Óptimo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Control del Anillo LED */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-headline text-sm text-[#0a1e22] font-semibold">Anillo de Luz LED</h3>
          <span className="font-label text-xs text-[#005c59] font-semibold">Respaldo Háptico</span>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(14,118,115,0.04)] flex flex-col gap-3.5 border border-[#0e7673]/5">
          {/* Selector de Modos de Luz */}
          <div className="flex flex-col gap-2">
            {/* Opción 1: Brisa Ambiental */}
            <button
              onClick={() => setLedMode('breeze')}
              type="button"
              className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                hardware.ledMode === 'breeze'
                  ? 'bg-[#005c59] text-white shadow-md'
                  : 'bg-[#e2f8fc] text-[#0a1e22] hover:bg-[#dcf2f6]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  hardware.ledMode === 'breeze' ? 'bg-white/20 text-white' : 'bg-[#d6ecf1] text-[#005c59]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">air</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label text-xs font-semibold">Brisa Ambiental</span>
                  {hardware.ledMode === 'breeze' && (
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  )}
                </div>
                <p
                  className={`font-body text-xs mt-0.5 leading-snug ${
                    hardware.ledMode === 'breeze' ? 'text-white/90' : 'text-[#3e4948]'
                  }`}
                >
                  Respiración lumínica continua y suave que refleja la frescura del aire.
                </p>
              </div>
            </button>

            {/* Opción 2: Modo Discreto */}
            <button
              onClick={() => setLedMode('discrete')}
              type="button"
              className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                hardware.ledMode === 'discrete'
                  ? 'bg-[#005c59] text-white shadow-md'
                  : 'bg-[#e2f8fc] text-[#0a1e22] hover:bg-[#dcf2f6]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  hardware.ledMode === 'discrete' ? 'bg-white/20 text-white' : 'bg-[#d6ecf1] text-[#005c59]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">notifications_paused</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label text-xs font-semibold">Modo Discreto</span>
                  {hardware.ledMode === 'discrete' && (
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  )}
                </div>
                <p
                  className={`font-body text-xs mt-0.5 leading-snug ${
                    hardware.ledMode === 'discrete' ? 'text-white/90' : 'text-[#3e4948]'
                  }`}
                >
                  Permanece tenue; solo pulsa suavemente ante cambios críticos de CO2.
                </p>
              </div>
            </button>

            {/* Opción 3: Modo Noche */}
            <button
              onClick={() => setLedMode('night')}
              type="button"
              className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                hardware.ledMode === 'night'
                  ? 'bg-[#005c59] text-white shadow-md'
                  : 'bg-[#e2f8fc] text-[#0a1e22] hover:bg-[#dcf2f6]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  hardware.ledMode === 'night' ? 'bg-white/20 text-white' : 'bg-[#d6ecf1] text-[#005c59]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">bedtime</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label text-xs font-semibold">Modo Noche</span>
                  {hardware.ledMode === 'night' && (
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  )}
                </div>
                <p
                  className={`font-body text-xs mt-0.5 leading-snug ${
                    hardware.ledMode === 'night' ? 'text-white/90' : 'text-[#3e4948]'
                  }`}
                >
                  LED completamente apagado de 23:00 a 07:00 para no perturbar tu sueño.
                </p>
              </div>
            </button>
          </div>

          {/* Slider de Brillo del Anillo */}
          <div className="pt-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs text-[#3e4948] font-medium">
                Intensidad luminosa
              </span>
              <span className="font-label text-xs text-[#005c59] font-bold">
                {hardware.brightness}%
              </span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[18px] text-[#6e7978] mr-2 shrink-0">
                brightness_low
              </span>
              <input
                className="w-full h-2 bg-[#d6ecf1] rounded-full appearance-none accent-[#005c59] cursor-pointer"
                max={100}
                min={10}
                type="range"
                value={hardware.brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
              />
              <span className="material-symbols-outlined text-[18px] text-[#6e7978] ml-2 shrink-0">
                brightness_high
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Configuración Micro-Pantalla OLED */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-headline text-sm text-[#0a1e22] font-semibold">Micro-Pantalla OLED</h3>
          <span className="font-label text-xs text-[#3e4948]">En Hardware</span>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(14,118,115,0.04)] flex flex-col gap-3 border border-[#0e7673]/5">
          <p className="font-body text-xs text-[#3e4948]">
            Define qué información muestra la pequeña pantalla central del dispositivo en tu mesa:
          </p>

          {/* Segmented Control */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#e2f8fc] rounded-xl">
            <button
              onClick={() => setOledMode('icon')}
              type="button"
              className={`py-2 px-2 rounded-lg font-label text-xs text-center transition-all ${
                hardware.oledMode === 'icon'
                  ? 'bg-white text-[#005c59] shadow-sm font-semibold'
                  : 'text-[#3e4948] font-medium hover:text-[#0a1e22]'
              }`}
            >
              Solo icono de acción
            </button>
            <button
              onClick={() => setOledMode('full')}
              type="button"
              className={`py-2 px-2 rounded-lg font-label text-xs text-center transition-all ${
                hardware.oledMode === 'full'
                  ? 'bg-white text-[#005c59] shadow-sm font-semibold'
                  : 'text-[#3e4948] font-medium hover:text-[#0a1e22]'
              }`}
            >
              Icono + minutos
            </button>
          </div>

          <button
            onClick={toggleAutoRotation}
            className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-[#e2f8fc]/60 text-left hover:bg-[#e2f8fc] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#005c59] text-[20px]">screen_rotation</span>
              <span className="font-body text-xs text-[#0a1e22] font-medium">Orientación automática</span>
            </div>
            <span
              className={`font-label text-xs font-semibold ${
                hardware.autoRotation ? 'text-[#006d40]' : 'text-[#6e7978]'
              }`}
            >
              {hardware.autoRotation ? 'Giroscopio Activo' : 'Desactivado'}
            </span>
          </button>
        </div>
      </section>

      {/* Pruebas y Sensores */}
      <section className="flex flex-col gap-2">
        <h3 className="font-headline text-sm text-[#0a1e22] font-semibold px-1">Pruebas y Sensores</h3>
        <div className="rounded-2xl bg-white p-3.5 shadow-[0_4px_16px_rgba(14,118,115,0.04)] flex flex-col gap-2 border border-[#0e7673]/5">
          {/* Botón de Prueba Háptica/Luz */}
          <button
            onClick={triggerHardwarePulse}
            disabled={hardware.isPulsing}
            type="button"
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#e2f8fc] hover:bg-[#dcf2f6] text-[#005c59] transition-all active:scale-[0.99] border border-[#0e7673]/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#d6ecf1] flex items-center justify-center text-[#005c59]">
                <span className={`material-symbols-outlined text-[18px] ${hardware.isPulsing ? 'animate-spin' : ''}`}>
                  flare
                </span>
              </div>
              <div className="text-left">
                <span className="font-label text-xs block text-[#0a1e22] font-semibold">
                  Probar pulso de luz ahora
                </span>
                <span className="font-body text-[11px] text-[#3e4948] block">
                  {hardware.isPulsing ? 'Emitiendo pulso esmeralda...' : 'Hace parpadear el halo físico de prueba'}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#6e7978]">play_arrow</span>
          </button>

          {/* Botón Calibración Rápida */}
          <button
            onClick={triggerCalibration}
            disabled={hardware.isCalibrating}
            type="button"
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#e2f8fc] hover:bg-[#dcf2f6] text-[#005c59] transition-all active:scale-[0.99] border border-[#0e7673]/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#d6ecf1] flex items-center justify-center text-[#005c59]">
                <span className={`material-symbols-outlined text-[18px] ${hardware.isCalibrating ? 'animate-spin' : ''}`}>
                  tune
                </span>
              </div>
              <div className="text-left">
                <span className="font-label text-xs block text-[#0a1e22] font-semibold">
                  Calibrar sensores de cero
                </span>
                <span className="font-body text-[11px] text-[#3e4948] block">
                  {hardware.isCalibrating ? 'Ajustando línea de base NDIR...' : 'Ajusta NDIR CO2 y TVOC con aire limpio'}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#6e7978]">autorenew</span>
          </button>

          {/* Red y Nube */}
          <button
            onClick={() => setIsWifiModalOpen(true)}
            type="button"
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#e2f8fc] hover:bg-[#dcf2f6] text-[#005c59] transition-all active:scale-[0.99] border border-[#0e7673]/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#d6ecf1] flex items-center justify-center text-[#005c59]">
                <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
              </div>
              <div className="text-left">
                <span className="font-label text-xs block text-[#0a1e22] font-semibold">
                  Ajustes Wi-Fi y Sincronización
                </span>
                <span className="font-body text-[11px] text-[#3e4948] block">
                  Red: "{hardware.wifiSsid}" · Nube activa
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#6e7978]">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Mensaje Cálido de Estado */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#e2f8fc]/80 border border-[#0e7673]/5">
        <span
          className="material-symbols-outlined text-[#006d40] text-[22px] shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          spa
        </span>
        <p className="font-body text-xs text-[#3e4948] leading-tight">
          Tu hardware se encuentra en un entorno ventilado. Las mediciones se sincronizan cada 30 segundos automáticamente.
        </p>
      </div>
    </div>
  );
};
