import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const HistorialScreen: React.FC = () => {
  const {
    selectedPeriod,
    setSelectedPeriod,
    historyDays,
    setIsShareModalOpen,
    showToast
  } = useApp();

  const [activeDayIdx, setActiveDayIdx] = useState<number>(6); // Default domingo/hoy

  const activeDay = historyDays[activeDayIdx];

  // Circumference for 42 radius = 263.89
  const score = selectedPeriod === 'dia' ? 94 : selectedPeriod === 'semana' ? 92 : 89;
  const strokeOffset = 263.89 * (1 - score / 100);

  return (
    <div className="flex flex-col w-full gap-5 pb-6">
      {/* Subheader Contextual */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <span className="font-label text-xs text-[#005c59] uppercase tracking-wider font-semibold">
            Evolución & Salud
          </span>
          <h2 className="font-headline text-lg text-[#0a1e22] font-semibold">
            Tendencias de Bienestar
          </h2>
        </div>

        <button
          onClick={() => setIsShareModalOpen(true)}
          aria-label="Exportar informe"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2f8fc] text-[#005c59] shadow-sm active:scale-95 transition-transform hover:bg-[#dcf2f6] border border-[#0e7673]/8"
        >
          <span className="material-symbols-outlined text-[18px]">ios_share</span>
          <span className="font-label text-xs font-semibold">Resumen</span>
        </button>
      </div>

      {/* Selector de Período Temporal */}
      <div className="flex p-1 rounded-full bg-[#d6ecf1] shadow-inner justify-between items-center" role="tablist">
        {(['dia', 'semana', 'mes'] as const).map((period) => {
          const isSelected = selectedPeriod === period;
          const labels = { dia: 'Día', semana: 'Semana', mes: 'Mes' };
          return (
            <button
              key={period}
              type="button"
              onClick={() => {
                setSelectedPeriod(period);
                showToast(`Visualizando período: ${labels[period]}`, 'info');
              }}
              className={`flex-1 py-2 text-center rounded-full font-label text-xs transition-all ${
                isSelected
                  ? 'bg-white text-[#005c59] shadow-sm font-semibold'
                  : 'text-[#3e4948] hover:text-[#0a1e22]'
              }`}
            >
              {labels[period]}
            </button>
          );
        })}
      </div>

      {/* Tarjeta Destacada: Puntuación de Bienestar Ambiental */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-[0_12px_32px_-4px_rgba(14,118,115,0.07)] border border-[#0e7673]/5">
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#7afbb1]/30 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#9cf1ed]/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#7afbb1] flex items-center justify-center text-[#007444]">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  spa
                </span>
              </div>
              <span className="font-label text-xs text-[#0a1e22] font-semibold">
                Índice Bioclimático
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#7afbb1]/40 text-[#007444] font-label text-[11px] font-bold border border-[#7afbb1]">
              Entorno Saludable
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* SVG Progress Gauge Dial */}
            <div className="relative flex-shrink-0 w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  className="text-[#d6ecf1]"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8.5"
                />
                <circle
                  className="text-[#006d40] transition-all duration-1000"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="42"
                  stroke="currentColor"
                  strokeDasharray="263.89"
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  strokeWidth="8.5"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-headline text-3xl text-[#005c59] font-bold tracking-tighter leading-none">
                  {score}
                </span>
                <span className="font-label text-[10px] text-[#3e4948] leading-none mt-0.5">
                  / 100
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div className="flex items-center gap-1 text-[#006d40] font-label text-xs font-semibold">
                <span className="material-symbols-outlined text-[17px]">trending_up</span>
                <span>+14% vs. semana previa</span>
              </div>
              <p className="font-body text-xs text-[#3e4948] mt-1 leading-snug">
                Esta semana optimizaste la ventilación cruzada en tus horas habituales de descanso y trabajo.
              </p>
            </div>
          </div>

          {/* Micro banner empático */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#e2f8fc] text-[#005c59] border border-[#0e7673]/5">
            <span className="material-symbols-outlined text-[18px] text-[#005c59] shrink-0">verified</span>
            <span className="font-label text-xs font-medium">
              9.4 de cada 10 horas tus pulmones respiraron aire puro y oxigenado.
            </span>
          </div>
        </div>
      </div>

      {/* Gráfico de Tendencias Semanales */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(14,118,115,0.05)] flex flex-col gap-3 border border-[#0e7673]/5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-headline text-base text-[#0a1e22] font-semibold">Equilibrio Diario</h3>
            <p className="font-body text-xs text-[#3e4948]">24 hrs: Aire Óptimo vs. Aire Viciado</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-headline text-base text-[#005c59] font-bold">
              48 min<span className="font-label text-xs font-normal text-[#3e4948]">/día</span>
            </span>
            <span className="font-label text-xs text-[#006d40] font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> Meta cumplida
            </span>
          </div>
        </div>

        {/* Leyenda de colores */}
        <div className="flex items-center gap-4 text-[#3e4948]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006d40]" />
            <span className="font-label text-xs">Aire Óptimo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]" />
            <span className="font-label text-xs">Aire Cargado / CO₂</span>
          </div>
        </div>

        {/* Visualizador de Barras Semanal */}
        <div className="flex items-end justify-between gap-2 h-44 pt-3 pb-1 border-b border-[#0e7673]/8">
          {historyDays.map((day, idx) => {
            const isSelected = activeDayIdx === idx;
            const goodPct = Math.round((day.goodHours / 24) * 100);
            const badPct = 100 - goodPct;

            return (
              <div
                key={day.dayLetter}
                onClick={() => setActiveDayIdx(idx)}
                className="flex flex-col items-center flex-1 h-full justify-end gap-1.5 group cursor-pointer"
              >
                <span
                  className={`font-label text-[10px] transition-opacity ${
                    isSelected ? 'opacity-100 font-bold text-[#005c59]' : 'opacity-0 group-hover:opacity-100 text-[#3e4948]'
                  }`}
                >
                  {day.goodHours}h
                </span>

                <div
                  className={`w-full max-w-[28px] flex flex-col h-[85%] rounded-full overflow-hidden bg-[#d6ecf1] transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-[#005c59] shadow-md scale-105' : 'hover:opacity-90'
                  }`}
                >
                  <div className="w-full bg-[#ffb95f]" style={{ height: `${badPct}%` }} />
                  <div className="w-full bg-[#006d40] rounded-b-full flex-1" />
                </div>

                <span
                  className={`font-label text-xs ${
                    day.isCurrent
                      ? 'text-[#005c59] font-bold'
                      : isSelected
                      ? 'text-[#005c59] font-semibold'
                      : 'text-[#3e4948]'
                  }`}
                >
                  {day.dayLetter}
                </span>
              </div>
            );
          })}
        </div>

        {/* Active day preview chip */}
        <div className="flex items-center justify-between text-[#3e4948] pt-1">
          <span className="font-label text-xs flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#005c59]">eco</span>
            <span>
              <strong>{activeDay.dayName}:</strong> {activeDay.goodHours}h en zona óptima, {activeDay.badHours}h viciado.
            </span>
          </span>
        </div>
      </div>

      {/* Impacto en Tu Día a Día (3 Tarjetas) */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-sm text-[#0a1e22] font-semibold">
            Impacto en Tu Día a Día
          </h3>
          <span className="font-label text-xs text-[#3e4948]">Sensor & Rutinas</span>
        </div>

        {/* Tarjeta 1: Calidad del Sueño */}
        <div className="rounded-2xl bg-white p-3.5 shadow-sm flex flex-col gap-2 border border-[#0e7673]/5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#0e7673] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">bedtime</span>
              </div>
              <div>
                <h4 className="font-headline text-sm text-[#0a1e22] font-semibold">Calidad del Sueño</h4>
                <span className="font-label text-xs text-[#005c59] font-semibold">
                  +22 min de sueño profundo
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#006d40] text-[24px]">
              sentiment_very_satisfied
            </span>
          </div>
          <p className="font-body text-xs text-[#3e4948] leading-relaxed">
            Ventilar durante 15 minutos entre las 22:00 y las 22:30 redujo el CO₂ a 450 ppm en el dormitorio, propiciando despertares más despejados.
          </p>
        </div>

        {/* Tarjeta 2: Foco en Teletrabajo */}
        <div className="rounded-2xl bg-white p-3.5 shadow-sm flex flex-col gap-2 border border-[#0e7673]/5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#7afbb1] flex items-center justify-center text-[#007444]">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <div>
                <h4 className="font-headline text-sm text-[#0a1e22] font-semibold">Foco en Teletrabajo</h4>
                <span className="font-label text-xs text-[#006d40] font-semibold">
                  0 picos de fatiga por CO₂
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#006d40] text-[24px]">bolt</span>
          </div>
          <p className="font-body text-xs text-[#3e4948] leading-relaxed">
            Durante la jornada laboral (09:00 - 18:00), los niveles de dióxido de carbono se mantuvieron siempre en el rango óptimo, previniendo la somnolencia diurna.
          </p>
        </div>

        {/* Tarjeta 3: Eficiencia Térmica */}
        <div className="rounded-2xl bg-white p-3.5 shadow-sm flex flex-col gap-2 border border-[#0e7673]/5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#d6ecf1] flex items-center justify-center text-[#005c59]">
                <span className="material-symbols-outlined text-[20px]">thermostat</span>
              </div>
              <div>
                <h4 className="font-headline text-sm text-[#0a1e22] font-semibold">Eficiencia Térmica</h4>
                <span className="font-label text-xs text-[#005c59] font-semibold">
                  Confort equilibrado
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#005c59] text-[24px]">
              nest_heat_link_gen_3
            </span>
          </div>
          <p className="font-body text-xs text-[#3e4948] leading-relaxed">
            La renovación por ráfagas cortas evitó pérdidas energéticas en climatización manteniendo la temperatura constante a 21.5°C.
          </p>
        </div>
      </div>

      {/* Momentos Clave */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-headline text-sm text-[#0a1e22] font-semibold">Momentos Clave</h3>
          <span 
            onClick={() => showToast('Registro histórico exportado al resumen', 'info')}
            className="font-label text-xs text-[#005c59] font-medium cursor-pointer hover:underline"
          >
            Ver registro completo
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Evento 1 */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-[#0e7673]/5">
            <div className="w-8 h-8 rounded-full bg-[#7afbb1]/40 flex items-center justify-center text-[#007444] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">air</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs text-[#0a1e22] font-semibold truncate">
                  Ventilación vespertina
                </span>
                <span className="font-label text-[11px] text-[#3e4948]">Ayer 19:35</span>
              </div>
              <p className="font-body text-xs text-[#3e4948] mt-0.5">
                Completada con éxito (12 min). Retorno a calidad óptima antes de cenar.
              </p>
            </div>
          </div>

          {/* Evento 2 */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-[#0e7673]/5">
            <div className="w-8 h-8 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#744800] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">shield</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs text-[#0a1e22] font-semibold truncate">
                  Alerta evitada: Polen exterior
                </span>
                <span className="font-label text-[11px] text-[#3e4948]">Ayer 14:10</span>
              </div>
              <p className="font-body text-xs text-[#3e4948] mt-0.5">
                Ventanas cerradas oportunamente ante incremento de partículas exteriores.
              </p>
            </div>
          </div>

          {/* Evento 3 */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-[#0e7673]/5">
            <div className="w-8 h-8 rounded-full bg-[#9cf1ed] flex items-center justify-center text-[#005c59] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs text-[#0a1e22] font-semibold truncate">
                  Renovación matutina
                </span>
                <span className="font-label text-[11px] text-[#3e4948]">Lunes 08:30</span>
              </div>
              <p className="font-body text-xs text-[#3e4948] mt-0.5">
                Excelente entrada de aire fresco limpio para empezar la jornada laboral.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Foto-Momento de Bienestar */}
      <div className="rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col border border-[#0e7673]/5">
        <div className="relative w-full h-36">
          <img
            className="w-full h-full object-cover"
            alt="A peaceful and sun-drenched modern living room with natural house plants on shelves"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBejnWlAD1i5PLWLR3UooZvzRo1s0tkUYfnl4CPSz7kFzW_eD1kg_Akr4wblvGHqoci8D2-JrNntT3mtFucl7zRrNEaSaQFqiQAoG0UL4ouJ9-ag4GOnfntZsUap1OVww0a3HSQPdhd6giEAdWoTkxJtrwuNlB-z1_iihmZIEaM8VrKhKNrA7Dbhf7GPkhjWDgc7PueGGj4MXgQ4TDop6feHRnwRQ3-ItdIQ6TJ4Gm7lATswWlft7uq5A"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#203337]/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="font-label text-[10px] uppercase tracking-wider text-[#7afbb1] font-bold">
              Hábito Consolidado
            </span>
            <p className="font-body text-xs font-semibold leading-snug">
              Tu hogar mantiene el aire fresco un 32% más de tiempo que la media urbana.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
