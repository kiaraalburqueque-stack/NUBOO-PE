import React from 'react';
import { useApp } from '../../context/AppContext';

export const PronosticoScreen: React.FC = () => {
  const {
    currentRoom,
    exterior,
    slots,
    toggleSlotReminder,
    hardware,
    toggleLedNotification,
    setIsGuideModalOpen
  } = useApp();

  return (
    <div className="flex flex-col w-full gap-5 pb-6">
      {/* Contextual Card with Aura Glow */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#e2f8fc] p-4 shadow-sm border border-[#0e7673]/5">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#7afbb1] opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#80d5d1] opacity-30 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[#005c59] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              nest_eco_leaf
            </span>
            <span className="font-label text-xs text-[#005c59] uppercase tracking-wider font-semibold">
              Previsión Bioclimática
            </span>
          </div>
          <h2 className="font-headline text-lg text-[#0a1e22] font-semibold">
            Mejores momentos para ventilar hoy
          </h2>
          <p className="font-body text-xs text-[#3e4948] leading-relaxed">
            Analizamos la calidad del aire exterior, el tráfico de tu zona y la acumulación de CO₂ en el hogar para indicarte cuándo renovar el aire sin perder confort térmico.
          </p>
        </div>
      </div>

      {/* Quick State Card */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#0e7673]/5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#7afbb1]/40 text-[#007444] shrink-0">
            <span className="material-symbols-outlined text-[22px]">window_closed</span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#006d40]" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label text-xs text-[#0a1e22] font-semibold truncate">
                Ventanas Cerradas
              </span>
              <span className="font-label text-[10px] text-[#006d40] bg-[#e2f8fc] px-1.5 py-0.5 rounded-full font-medium">
                Estable
              </span>
            </div>
            <p className="font-body text-xs text-[#3e4948] truncate">
              Interior: {currentRoom.co2} ppm CO₂ · Ext: {exterior.temp}°C Limpio
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="font-headline text-base text-[#005c59] font-bold">AQI {exterior.aqi}</span>
          <span className="block font-label text-[10px] text-[#3e4948]">Exterior Puro</span>
        </div>
      </div>

      {/* Timeline Horizontal Scroll */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#005c59] text-[20px]">timelapse</span>
            <h3 className="font-headline text-sm text-[#0a1e22] font-semibold">Ventanas Horarias</h3>
          </div>
          <span className="font-label text-xs text-[#3e4948]">Actualizado hace 4 min</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 snap-x snap-mandatory">
          {slots.map((slot) => {
            const isRec = slot.badge === 'Recomendado';
            const isWarn = slot.badge === 'Evitar Abrir';
            const isNight = slot.badge === 'Óptimo Descanso';

            return (
              <div
                key={slot.id}
                className={`snap-start shrink-0 w-[275px] rounded-2xl p-4 shadow-sm flex flex-col justify-between relative overflow-hidden border ${
                  isWarn
                    ? 'bg-[#d6ecf1]/70 border-[#bdc9c7]'
                    : 'bg-white border-[#0e7673]/5 shadow-[0_8px_24px_rgba(14,118,115,0.04)]'
                }`}
              >
                {/* Decorative corner background */}
                {isRec && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#7afbb1]/20 rounded-bl-full pointer-events-none" />
                )}
                {isNight && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#80d5d1]/20 rounded-bl-full pointer-events-none" />
                )}

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label text-[10px] font-semibold ${
                        isRec
                          ? 'bg-[#7afbb1] text-[#007444]'
                          : isWarn
                          ? 'bg-[#ffdad6] text-[#93000a]'
                          : 'bg-[#9cf1ed] text-[#00201f]'
                      }`}
                    >
                      {isRec && <span className="w-1.5 h-1.5 rounded-full bg-[#006d40]" />}
                      {isWarn && (
                        <span className="material-symbols-outlined text-[13px]">block</span>
                      )}
                      {isNight && (
                        <span className="material-symbols-outlined text-[13px]">bedtime</span>
                      )}
                      <span>{slot.badge}</span>
                    </span>
                    <span className="font-label text-xs text-[#3e4948] font-medium">
                      {slot.duration}
                    </span>
                  </div>

                  <div className="mt-1">
                    <span className="font-headline text-base text-[#005c59] font-bold">
                      {slot.timeRange}
                    </span>
                    <p className="font-body text-xs text-[#0a1e22] mt-1 leading-snug">
                      {slot.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-[#3e4948] font-label text-xs">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#006d40]">
                        {isWarn ? 'air' : isNight ? 'check_circle' : 'eco'}
                      </span>
                      <span>{slot.extraInfo}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#005c59]">
                        {isWarn ? 'wb_sunny' : isNight ? 'nightlight' : 'thermostat'}
                      </span>
                      <span>{slot.temp}</span>
                    </span>
                  </div>
                </div>

                {/* Slot Action Button */}
                <div className="mt-4">
                  {isWarn ? (
                    <div className="w-full py-2.5 px-3 rounded-xl bg-white/80 text-[#3e4948] font-label text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#bdc9c7]">
                      <span className="material-symbols-outlined text-[17px]">lock</span>
                      <span>Sellar ambiente</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleSlotReminder(slot.id)}
                      className={`w-full py-2.5 px-3 rounded-xl font-label text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm ${
                        slot.active
                          ? 'bg-[#7afbb1] text-[#007444] border border-[#7afbb1]'
                          : isNight
                          ? 'bg-[#d6ecf1] text-[#005c59] hover:bg-[#c8dee2]'
                          : 'bg-[#005c59] text-white hover:bg-[#0e7673]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        {slot.active ? 'notifications_active' : isNight ? 'add_alert' : 'notifications'}
                      </span>
                      <span>
                        {slot.active
                          ? isNight
                            ? 'Programado (19:30)'
                            : 'Recordatorio fijado'
                          : slot.actionText}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hardware Sync Widget */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#0e7673]/5 flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-[#005c59] flex items-center justify-center text-white shrink-0 shadow-[0_0_12px_rgba(0,92,89,0.35)]">
              <span className="material-symbols-outlined text-[20px]">fluorescent</span>
              {hardware.ledNotificationEnabled && (
                <span className="absolute inset-0 rounded-full border-2 border-[#7afbb1] animate-ping opacity-30" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-label text-xs text-[#0a1e22] font-semibold">
                Aviso luminoso en NUBO-PE
              </span>
              <span className="font-label text-[11px] text-[#3e4948]">Anillo LED interactivo</span>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={toggleLedNotification}
            role="switch"
            aria-checked={hardware.ledNotificationEnabled}
            aria-label="Activar aviso luminoso en el dispositivo"
            className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
              hardware.ledNotificationEnabled ? 'bg-[#005c59]' : 'bg-[#bdc9c7]'
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                hardware.ledNotificationEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <p className="font-body text-xs text-[#3e4948] leading-relaxed">
          El anillo LED de tu sensor NUBO-PE pulsará con una brisa esmeralda 5 minutos antes de la hora ideal para invitarte a abrir las ventanas.
        </p>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#e2f8fc] border border-[#0e7673]/5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              hardware.ledNotificationEnabled ? 'bg-[#5cde97] animate-pulse' : 'bg-[#bdc9c7]'
            }`}
          />
          <span className="font-label text-xs text-[#0a1e22] font-medium">
            {hardware.ledNotificationEnabled
              ? 'Sincronizado: Salón principal · Brisa Suave activa'
              : 'Aviso luminoso pausado'}
          </span>
        </div>
      </div>

      {/* Resumen de Bienestar Acumulado */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#0e7673]/5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-headline text-sm text-[#0a1e22] font-semibold">
            Bienestar Acumulado
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#7afbb1] text-[#007444] font-label text-[11px] font-bold">
            Semana 18
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-1">
          <div className="p-3 bg-[#dcf2f6]/70 rounded-xl flex flex-col border border-[#0e7673]/5">
            <span className="font-label text-[11px] text-[#3e4948]">Ventilación Activa</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline text-2xl text-[#005c59] font-bold">42</span>
              <span className="font-label text-xs text-[#3e4948]">min hoy</span>
            </div>
            <span className="font-label text-[10px] text-[#006d40] flex items-center gap-0.5 mt-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +14% vs. ayer
            </span>
          </div>

          <div className="p-3 bg-[#dcf2f6]/70 rounded-xl flex flex-col border border-[#0e7673]/5">
            <span className="font-label text-[11px] text-[#3e4948]">Zona Saludable</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline text-2xl text-[#005c59] font-bold">88%</span>
              <span className="font-label text-xs text-[#3e4948]">del tiempo</span>
            </div>
            <span className="font-label text-[10px] text-[#006d40] flex items-center gap-0.5 mt-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Calidad Óptima
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex justify-between font-label text-xs text-[#3e4948]">
            <span>Meta Diaria de Renovación</span>
            <span className="text-[#0a1e22] font-semibold">42 / 45 min</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#d6ecf1] overflow-hidden">
            <div className="h-full bg-[#006d40] rounded-full transition-all duration-500" style={{ width: '93%' }} />
          </div>
        </div>
      </div>

      {/* Tip Bioclimático con Foto */}
      <div className="w-full bg-[#e2f8fc] rounded-2xl overflow-hidden shadow-sm flex flex-col border border-[#0e7673]/5">
        <div className="relative w-full h-40 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt="Bright modern minimalist bedroom with sunlight streaming through sheer white curtains dancing in a fresh gentle cross breeze"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjL6NNAb9EU6ZwlubrSOkVoFdADkCduvvwmCdDmY6RVEm0VDmCJrKeFLIuY5GBOA25WEmICJlrjnxGPu986XFrI96beVEbdHjzhEJF1LkRFs90VAkbiFZj_RdIs-JUayWj-io4ty-FaO8XN73QEmt8GN1OuRjnatODWtWMA8mHCr5weCvGHPhYbLcI1Dar9fHXj0MTLGYSfk4pYtfccmf8E4mCgcBVOYSJh38_M6a5GCINtIWcZoowuw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e2f8fc] via-transparent to-transparent" />
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
            <span className="material-symbols-outlined text-[#005c59] text-[16px]">air</span>
            <span className="font-label text-xs text-[#005c59] font-bold">Técnica Bioclimática</span>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h4 className="font-headline text-base text-[#0a1e22] font-semibold">
            Efecto chimenea y ventilación cruzada
          </h4>
          <p className="font-body text-xs text-[#3e4948] leading-relaxed">
            Abre simultáneamente la ventana del lado sombreado y una puerta opuesta durante 15 minutos. El flujo de presión natural evacúa partículas en suspensión 3 veces más rápido sin enfriar las superficies.
          </p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#0e7673]/8 text-[#3e4948] font-label text-xs">
            <span className="flex items-center gap-1 text-[#005c59] font-semibold">
              <span className="material-symbols-outlined text-[16px]">lightbulb</span>
              Ahorro energético pasivo
            </span>
            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="font-label text-xs text-[#005c59] font-semibold hover:underline min-h-[44px] flex items-center"
            >
              Ver guía completa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
