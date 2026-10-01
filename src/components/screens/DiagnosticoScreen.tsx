import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const DiagnosticoScreen: React.FC = () => {
  const { currentRoom, exterior, diagTimerRunning, diagTimerSeconds, toggleDiagTimer } = useApp();

  const [openFactor, setOpenFactor] = useState<string | null>('co2');

  const diagMinutes = Math.floor(diagTimerSeconds / 60);
  const diagSec = diagTimerSeconds % 60;
  const diagTimeFormatted = `${diagMinutes}:${diagSec < 10 ? '0' : ''}${diagSec}`;

  const toggleFactor = (key: string) => {
    setOpenFactor((prev) => (prev === key ? null : key));
  };

  return (
    <div className="flex flex-col w-full gap-5 pb-6">
      {/* Atmospheric Aura & Hero Card */}
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div className="absolute -top-16 -left-12 w-64 h-64 bg-[#5cde97]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-8 -right-12 w-56 h-56 bg-[#ffddb8]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-[0_8px_24px_rgba(14,118,115,0.06)] border border-[#0e7673]/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#dcf2f6] text-[#005c59]">
              <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
            </span>
            <span className="font-label text-xs text-[#005c59] uppercase tracking-wider font-semibold">
              Transparencia Inteligente
            </span>
          </div>

          <h1 className="font-headline text-lg text-[#0a1e22] font-semibold mb-1">
            ¿Por qué ventilar ahora?
          </h1>

          <p className="font-body text-xs text-[#3e4948] leading-relaxed">
            Detectamos acumulación natural de CO₂ tras 2 horas de concentración en {currentRoom.name}. El exterior presenta condiciones idóneas para renovar el ambiente y revitalizar tu energía.
          </p>

          <div className="mt-3 flex items-center gap-2 p-2.5 bg-[#e2f8fc] rounded-xl text-[#005c59] border border-[#0e7673]/8">
            <span className="material-symbols-outlined text-[18px] text-[#744800] shrink-0">info</span>
            <p className="font-body text-xs text-[#3e4948]">
              Momento óptimo: aire fresco sin polen ni polución alta.
            </p>
          </div>
        </div>
      </div>

      {/* Ambient Photo Collage: Room Mood & Fresh Outdoors */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="relative h-28 rounded-2xl overflow-hidden shadow-sm border border-[#0e7673]/5">
          <img
            className="w-full h-full object-cover"
            alt="Interior room study with desk and indoor plant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuC54idLPHxnXW6hwTQkZAe-GhVcByOQHMxMF2F8fjcqxT50SLegid3ZZzA5BzHUJfJsCccCowdAhh3Lj-nqTkUoRA5Fxaj5nnD1dSVtwo7VfcJIEF0YfXAlSklKgdixwuIjfLwLmXzUniSrJYCGJx4XQvh-dtlAmw3erw8UNpa6glO48bkhKGMkMp6Bw4U4f33tbos0um1L_3tf2kjG9YD6-vPR6gqLqLQv_L7O8j5tOEJao3HBOTBQ"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e22]/70 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2.5 font-label text-xs text-white font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]" />
            Interior (Tu espacio)
          </span>
        </div>

        <div className="relative h-28 rounded-2xl overflow-hidden shadow-sm border border-[#0e7673]/5">
          <img
            className="w-full h-full object-cover"
            alt="Lush green balcony view looking towards a quiet suburban park"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDykmAvRWndmhcoeyB_2aOg3V-TYdzkMhVML03T2CZCBZXtAal_33h-tGAXhWYpO6Ard-01OJpKXY9EfudAWoj0CoWDglvYiGRTZjmY_5pzYIbDMPkjeLC4YMTlr3uy_nj8UnPHrxRiio1tUxSwoy8_biJeTbK4VjvZKSDZYcB3YauBOvvCHu1DNj7zuBEHFcR3GGc94FH-LOTkQ1phhudI5XGUL2k-zkxVS4EgNNQNkWbfsskG9PqnyA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e22]/70 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2.5 font-label text-xs text-white font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7afbb1]" />
            Exterior (Aire fresco)
          </span>
        </div>
      </div>

      {/* Side-by-Side Comparative Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline text-sm text-[#0a1e22] font-semibold">
            Comparativa en tiempo real
          </span>
          <span className="font-label text-xs text-[#005c59] font-medium">
            Actualizado hace 1 min
          </span>
        </div>

        <div className="flex flex-col gap-1.5 bg-white/90 backdrop-blur-md rounded-2xl p-2.5 shadow-[0_4px_20px_rgba(14,118,115,0.05)] border border-[#0e7673]/5">
          {/* Metric 1: Calidad */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#e2f8fc]/60">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#ffb95f]" />
                <span className="font-label text-xs text-[#3e4948] font-medium truncate">Interior</span>
              </div>
              <span className="font-label text-xs text-[#0a1e22] font-semibold truncate">
                {currentRoom.status}
              </span>
              <span className="font-body text-[11px] text-[#3e4948] line-clamp-1">
                Por respiración sostenida
              </span>
            </div>

            <div className="flex flex-col min-w-0 pl-2 border-l border-[#0e7673]/10">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-label text-xs text-[#005c59] font-medium truncate">Exterior</span>
              </div>
              <span className="font-label text-xs text-[#006d40] font-semibold truncate">
                Óptima y pura
              </span>
              <span className="font-body text-[11px] text-[#3e4948] line-clamp-1">
                Brisa limpia y ligera
              </span>
            </div>
          </div>

          {/* Metric 2: Temperatura */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-label text-xs text-[#3e4948] font-medium">Temperatura</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-base text-[#0a1e22] font-bold">{currentRoom.temp}°C</span>
                <span className="font-body text-[11px] text-[#3e4948]">Agradable</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 pl-2 border-l border-[#0e7673]/10">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-label text-xs text-[#005c59] font-medium">Exterior</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-base text-[#005c59] font-bold">{exterior.temp}°C</span>
                <span className="font-body text-[11px] text-[#006d40] font-medium">Refrescante</span>
              </div>
            </div>
          </div>

          {/* Metric 3: Humedad */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#e2f8fc]/60">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-label text-xs text-[#3e4948] font-medium">Humedad</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-base text-[#0a1e22] font-bold">{currentRoom.humidity}%</span>
                <span className="font-body text-[11px] text-[#3e4948]">Estable</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 pl-2 border-l border-[#0e7673]/10">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-label text-xs text-[#005c59] font-medium">Exterior</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-headline text-base text-[#005c59] font-bold">{exterior.humidity}%</span>
                <span className="font-body text-[11px] text-[#006d40] font-medium">Equilibrada</span>
              </div>
            </div>
          </div>

          {/* Metric 4: Alérgenos / Partículas */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-label text-xs text-[#3e4948] font-medium">Alérgenos int.</span>
              </div>
              <span className="font-label text-xs text-[#0a1e22] font-medium truncate">Mínimos</span>
              <span className="font-body text-[11px] text-[#3e4948] line-clamp-1">Polvo bajo control</span>
            </div>

            <div className="flex flex-col min-w-0 pl-2 border-l border-[#0e7673]/10">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-label text-xs text-[#005c59] font-medium">Polen y tráfico</span>
              </div>
              <span className="font-label text-xs text-[#006d40] font-medium truncate">Muy bajo</span>
              <span className="font-body text-[11px] text-[#3e4948] line-clamp-1">Sin tráfico próximo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Factores Analizados (Expandable Cards) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-headline text-sm text-[#0a1e22] font-semibold">Factores analizados</span>
          <span className="font-label text-xs text-[#3e4948]">Toca para explorar</span>
        </div>

        {/* Factor 1: CO2 */}
        <div className="rounded-2xl bg-white shadow-sm border border-[#0e7673]/5 overflow-hidden transition-all">
          <button
            onClick={() => toggleFactor('co2')}
            className="w-full p-3.5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#dcf2f6] flex items-center justify-center text-[#005c59] shrink-0">
                <span className="material-symbols-outlined text-[20px]">co2</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label text-xs text-[#0a1e22] font-semibold">
                  Nivel de CO₂ (Dióxido de Carbono)
                </span>
                <span className="font-body text-[11px] text-[#744800] font-medium">
                  {currentRoom.co2} ppm · Leve somnolencia
                </span>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-[#3e4948] transition-transform ${
                openFactor === 'co2' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {openFactor === 'co2' && (
            <div className="px-4 pb-4 pt-1 border-t border-[#0e7673]/5 flex flex-col gap-2 text-[#3e4948]">
              <p className="font-body text-xs leading-relaxed">
                {currentRoom.co2} ppm. Te puede causar leve somnolencia y pérdida de foco. No es peligroso, pero renovar el aire restaurará tu nivel de atención rápidamente.
              </p>
              <div className="w-full bg-[#dcf2f6] h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-[#ffb95f] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((currentRoom.co2 / 1200) * 100))}%` }}
                />
              </div>
              <div className="flex justify-between font-label text-[10px] text-[#3e4948] mt-0.5">
                <span>Óptimo (&lt;600)</span>
                <span className="font-semibold text-[#744800]">Actual ({currentRoom.co2})</span>
                <span>Pesado (&gt;1200)</span>
              </div>
            </div>
          )}
        </div>

        {/* Factor 2: COVs */}
        <div className="rounded-2xl bg-white shadow-sm border border-[#0e7673]/5 overflow-hidden transition-all">
          <button
            onClick={() => toggleFactor('voc')}
            className="w-full p-3.5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#dcf2f6] flex items-center justify-center text-[#005c59] shrink-0">
                <span className="material-symbols-outlined text-[20px]">science</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label text-xs text-[#0a1e22] font-semibold">
                  Compuestos Orgánicos (COVs)
                </span>
                <span className="font-body text-[11px] text-[#006d40] font-medium">
                  Bajos y seguros · Calidad limpia
                </span>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-[#3e4948] transition-transform ${
                openFactor === 'voc' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {openFactor === 'voc' && (
            <div className="px-4 pb-4 pt-1 border-t border-[#0e7673]/5 text-[#3e4948]">
              <p className="font-body text-xs leading-relaxed">
                Bajos y seguros. No hay vapores de cocción, aerosoles ni productos de limpieza acumulados en el ambiente de esta habitación.
              </p>
            </div>
          )}
        </div>

        {/* Factor 3: Microclima */}
        <div className="rounded-2xl bg-white shadow-sm border border-[#0e7673]/5 overflow-hidden transition-all">
          <button
            onClick={() => toggleFactor('climate')}
            className="w-full p-3.5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#dcf2f6] flex items-center justify-center text-[#005c59] shrink-0">
                <span className="material-symbols-outlined text-[20px]">air</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label text-xs text-[#0a1e22] font-semibold">
                  Microclima exterior
                </span>
                <span className="font-body text-[11px] text-[#005c59] font-medium">
                  Brisa norte favorable (11 km/h)
                </span>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-[#3e4948] transition-transform ${
                openFactor === 'climate' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {openFactor === 'climate' && (
            <div className="px-4 pb-4 pt-1 border-t border-[#0e7673]/5 text-[#3e4948]">
              <p className="font-body text-xs leading-relaxed">
                La estación meteorológica cercana reporta brisa norte favorable sin polución suspendida. Una apertura corta será suficiente para recambiar todo el volumen de aire.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Smart Cross-Ventilation Advice Card */}
      <div className="relative overflow-hidden bg-[#005c59] text-white rounded-2xl p-4 shadow-[0_12px_32px_rgba(0,92,89,0.18)]">
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#80d5d1]/20 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start gap-3 relative z-10 mb-2">
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px] text-[#9cf1ed]">mode_fan</span>
          </div>
          <div>
            <span className="font-label text-[10px] uppercase tracking-wider text-[#80d5d1] font-bold">
              Consejo de ventilación cruzada
            </span>
            <h2 className="font-headline text-base font-semibold mt-0.5">
              Corriente suave de 5 minutos
            </h2>
          </div>
        </div>

        <p className="font-body text-xs text-white/90 leading-relaxed mb-3 relative z-10">
          "Abre la ventana del balcón y la puerta del pasillo para crear una corriente suave de 5 minutos."
        </p>

        {/* Visual Schematic */}
        <div className="bg-white/10 rounded-xl p-2.5 mb-3.5 flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#9cf1ed] text-[18px]">window</span>
            <span className="font-label text-xs">Ventana balcón</span>
          </div>
          <div className="flex items-center gap-0.5 text-[#80d5d1]">
            <span className="material-symbols-outlined text-[15px] animate-pulse">east</span>
            <span className="material-symbols-outlined text-[15px] animate-pulse">east</span>
            <span className="material-symbols-outlined text-[15px] animate-pulse">east</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#9cf1ed] text-[18px]">door_open</span>
            <span className="font-label text-xs">Puerta pasillo</span>
          </div>
        </div>

        {/* Guided 5-min Button */}
        <button
          onClick={toggleDiagTimer}
          className={`w-full py-3 px-4 rounded-xl font-label text-xs font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm ${
            diagTimerRunning
              ? 'bg-[#7afbb1] text-[#002110]'
              : 'bg-white text-[#005c59] hover:bg-[#e2f8fc]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">timer</span>
          <span>
            {diagTimerRunning
              ? `Ventilando... ${diagTimeFormatted} restantes`
              : 'Iniciar temporizador de 5 min'}
          </span>
        </button>
      </div>

      {/* Ambient Micro-tip Card */}
      <div className="bg-[#e2f8fc]/70 rounded-2xl p-3.5 flex items-center gap-2.5 border border-[#0e7673]/5">
        <span className="material-symbols-outlined text-[#005c59] text-[22px] shrink-0">energy_savings_leaf</span>
        <p className="font-body text-xs text-[#3e4948] leading-tight">
          Ventilar durante 5 minutos en lugar de dejar la ventana entreabierta conserva la temperatura sin enfriar las paredes.
        </p>
      </div>
    </div>
  );
};
