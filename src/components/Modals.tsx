import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Modals: React.FC = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    isGuideModalOpen,
    setIsGuideModalOpen,
    isWifiModalOpen,
    setIsWifiModalOpen,
    isShareModalOpen,
    setIsShareModalOpen,
    hardware,
    currentRoom,
    exterior,
    toasts,
    showToast
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [wifiInput, setWifiInput] = useState(hardware.wifiSsid);

  const handleCopySummary = () => {
    const text = `Reporte Bioclimático NUBO-PE
Índice Bioclimático: 92/100 (Entorno Saludable)
Interior (${currentRoom.name}): ${currentRoom.co2} ppm CO2, ${currentRoom.temp}°C
Exterior: AQI ${exterior.aqi} (${exterior.aqiStatus}), ${exterior.temp}°C
Ventilación Activa Semanal: 48 min/día promedio.
Dispositivo: ${hardware.name} (${hardware.revision})`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('¡Resumen copiado al portapapeles!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Toast Notification Stack */}
      <div className="fixed top-20 inset-x-0 z-50 flex flex-col items-center gap-2 pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto max-w-sm w-full bg-[#203337] text-white px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 flex items-center justify-between gap-3 animate-fadeIn"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`material-symbols-outlined text-[18px] shrink-0 ${
                  toast.type === 'success'
                    ? 'text-[#7afbb1]'
                    : toast.type === 'warning'
                    ? 'text-[#ffb95f]'
                    : 'text-[#9cf1ed]'
                }`}
              >
                {toast.type === 'success' ? 'check_circle' : toast.type === 'warning' ? 'warning' : 'info'}
              </span>
              <span className="font-body text-xs text-white/95 truncate">
                {toast.message}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Guide Modal: Bioclimatic Chimney Effect */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-[#0e7673]/10">
            {/* Header */}
            <div className="p-4 border-b border-[#0e7673]/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#005c59] text-[22px]">air</span>
                <h3 className="font-headline text-base text-[#0a1e22] font-semibold">
                  Guía: Ventilación Bioclimática
                </h3>
              </div>
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#e2f8fc] flex items-center justify-center text-[#3e4948] hover:bg-[#d6ecf1]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-[#3e4948]">
              <div className="relative rounded-2xl overflow-hidden h-36 border border-[#0e7673]/8">
                <img
                  className="w-full h-full object-cover"
                  alt="Ventilación cruzada en el hogar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjL6NNAb9EU6ZwlubrSOkVoFdADkCduvvwmCdDmY6RVEm0VDmCJrKeFLIuY5GBOA25WEmICJlrjnxGPu986XFrI96beVEbdHjzhEJF1LkRFs90VAkbiFZj_RdIs-JUayWj-io4ty-FaO8XN73QEmt8GN1OuRjnatODWtWMA8mHCr5weCvGHPhYbLcI1Dar9fHXj0MTLGYSfk4pYtfccmf8E4mCgcBVOYSJh38_M6a5GCINtIWcZoowuw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-semibold">Flujo de Presión Natural</span>
                </div>
              </div>

              <div>
                <h4 className="font-headline text-sm font-semibold text-[#0a1e22] mb-1">
                  1. Principio del Efecto Chimenea
                </h4>
                <p className="font-body text-xs leading-relaxed">
                  El aire caliente y cargado de CO₂ asciende de forma natural. Al abrir aberturas en lados opuestos con diferente insolación (zona norte sombreada y sur iluminada), se genera una diferencia de presión que arrastra el aire viciado sin requerir ventiladores mecánicos.
                </p>
              </div>

              <div>
                <h4 className="font-headline text-sm font-semibold text-[#0a1e22] mb-1">
                  2. Regla de los 5 a 15 Minutos
                </h4>
                <p className="font-body text-xs leading-relaxed">
                  Ventilar de golpe (ráfaga corta) renueva el 100% del volumen de aire sin enfriar los muros ni los muebles, ahorrando hasta un 24% en climatización o calefacción.
                </p>
              </div>

              <div className="p-3 bg-[#e2f8fc] rounded-xl flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#005c59] text-[20px] shrink-0">spa</span>
                <p className="font-body text-xs text-[#005c59]">
                  NUBO-PE monitoriza el punto óptimo y avisa cuando la concentración interior iguala la pureza exterior.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-[#0e7673]/8">
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#005c59] text-white font-label text-xs font-semibold"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share / Export Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#0e7673]/10">
            <div className="flex items-center justify-between pb-3 border-b border-[#0e7673]/8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#005c59] text-[22px]">ios_share</span>
                <h3 className="font-headline text-base text-[#0a1e22] font-semibold">
                  Resumen de Bienestar Semanal
                </h3>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#e2f8fc] flex items-center justify-center text-[#3e4948]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="p-3.5 bg-[#e2f8fc]/70 rounded-2xl border border-[#0e7673]/8 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#3e4948]">Índice Bioclimático</span>
                  <span className="font-bold text-[#005c59]">92 / 100</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#3e4948]">Exposición a aire limpio</span>
                  <span className="font-bold text-[#006d40]">94% del tiempo</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#3e4948]">Ventilación activa media</span>
                  <span className="font-bold text-[#0a1e22]">48 min/día</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#3e4948]">Picos de CO2 prevenidos</span>
                  <span className="font-bold text-[#006d40]">14 eventos</span>
                </div>
              </div>
              <p className="font-body text-xs text-[#3e4948]">
                Puedes copiar este resumen para compartirlo con tu familia o para tu historial de salud ambiental.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCopySummary}
                className="flex-1 py-3 rounded-xl bg-[#005c59] text-white font-label text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? '¡Copiado!' : 'Copiar Resumen'}</span>
              </button>
              <button
                onClick={() => {
                  showToast('Informe descargado en PDF simulado', 'success');
                  setIsShareModalOpen(false);
                }}
                className="px-4 py-3 rounded-xl bg-[#e2f8fc] text-[#005c59] font-label text-xs font-semibold hover:bg-[#d6ecf1]"
              >
                Descargar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wi-Fi & Sincronización Modal */}
      {isWifiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#0e7673]/10">
            <div className="flex items-center justify-between pb-3 border-b border-[#0e7673]/8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#005c59] text-[22px]">cloud_sync</span>
                <h3 className="font-headline text-base text-[#0a1e22] font-semibold">
                  Ajustes Wi-Fi y Nube
                </h3>
              </div>
              <button
                onClick={() => setIsWifiModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#e2f8fc] flex items-center justify-center text-[#3e4948]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-[#3e4948]">
              <div>
                <label className="font-label text-xs font-semibold text-[#0a1e22] block mb-1">
                  Red Wi-Fi configurada
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={wifiInput}
                    onChange={(e) => setWifiInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#e2f8fc] rounded-xl border border-[#0e7673]/15 font-label text-xs text-[#0a1e22] focus:outline-none focus:border-[#005c59]"
                  />
                  <span className="font-label text-xs text-[#006d40] font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                    Conectada
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-[#e2f8fc]/60 rounded-xl">
                  <span className="text-[#6e7978] block">Frecuencia Muestreo</span>
                  <span className="font-semibold text-[#0a1e22]">Cada 30 seg</span>
                </div>
                <div className="p-3 bg-[#e2f8fc]/60 rounded-xl">
                  <span className="text-[#6e7978] block">Firmware</span>
                  <span className="font-semibold text-[#0a1e22]">{hardware.firmware} (Actual)</span>
                </div>
              </div>

              <div className="p-3 bg-[#7afbb1]/20 rounded-xl border border-[#7afbb1]/40 flex items-center gap-2 text-[#007444]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Canal BLE cifrado y enlace seguro MQTT activo.</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  showToast('Ajustes de red guardados', 'success');
                  setIsWifiModalOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#005c59] text-white font-label text-xs font-semibold"
              >
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#0e7673]/10">
            <div className="flex items-center justify-between pb-3 border-b border-[#0e7673]/8">
              <h3 className="font-headline text-base text-[#0a1e22] font-semibold">
                Perfil de Usuario
              </h3>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="w-8 h-8 rounded-full bg-[#e2f8fc] flex items-center justify-center text-[#3e4948]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 flex flex-col items-center text-center">
              <img
                alt="Kiara"
                className="w-16 h-16 rounded-full object-cover ring-4 ring-[#7afbb1]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWBoSmp5iCyJ869trZqjVnAAza64QzFrRf0VuWFWiyq7_P7NzGiFlCpwY0keuq09oEOXcwgYyTF3pSroDWLEs7Dl_R2kDicc3MsxbE82f5Vm3P3dtbozDIKcAzMLDc7GknVzDcw9Nmz8eFE5s1esjPY1m7L-pkecfT-uk1b2FOn0cNoawuyqDnIO_Nq6dq9TpG6SQsHlntXgj-re4v50ffcG38g-f_vh8e4mqGq5cUcNvCU_U8enFFmg"
              />
              <h4 className="font-headline text-base font-bold text-[#0a1e22] mt-2">
                Kiara Alburqueque
              </h4>
              <p className="font-label text-xs text-[#005c59] font-medium">
                kiara.alburqueque@tecsup.edu.pe
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2f8fc] text-[#005c59] font-label text-[11px] mt-2 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006d40]" />
                Hogar Conectado · Tecsup IoT Lab
              </div>

              <div className="w-full mt-4 space-y-2 text-left">
                <div className="p-3 bg-[#e2f8fc]/60 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-[#3e4948]">Dispositivos activos</span>
                  <span className="font-semibold text-[#0a1e22]">1 Pebble (Sala #01)</span>
                </div>
                <div className="p-3 bg-[#e2f8fc]/60 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-[#3e4948]">Notificaciones inteligentes</span>
                  <span className="font-semibold text-[#006d40]">Activadas</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsProfileOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#005c59] text-white font-label text-xs font-semibold mt-1"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
