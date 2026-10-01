import React, { createContext, useContext, useState, useEffect, useTransition } from 'react';
import { TabType, RoomId, RoomData, ExteriorData, HardwareConfig, TimelineSlot, HistoricalDay } from '../types';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeRoomId: RoomId;
  setActiveRoomId: (id: RoomId) => void;
  rooms: Record<RoomId, RoomData>;
  currentRoom: RoomData;
  exterior: ExteriorData;
  
  // View Mode: Live App vs Kotlin Project
  viewMode: 'app' | 'kotlin';
  setViewMode: (mode: 'app' | 'kotlin') => void;

  // Ventilation Timer (Main 15 min)
  timerRunning: boolean;
  timerSeconds: number;
  totalTimerSeconds: number;
  toggleTimer: () => void;
  markAsOpened: () => void;
  resetTimer: () => void;
  
  // Secondary 5-min Cross-Ventilation Timer (Diagnóstico)
  diagTimerRunning: boolean;
  diagTimerSeconds: number;
  toggleDiagTimer: () => void;

  // Hardware State
  hardware: HardwareConfig;
  setLedMode: (mode: HardwareConfig['ledMode']) => void;
  setBrightness: (val: number) => void;
  setOledMode: (mode: HardwareConfig['oledMode']) => void;
  toggleAutoRotation: () => void;
  toggleLedNotification: () => void;
  triggerHardwarePulse: () => void;
  triggerCalibration: () => void;

  // Reminders & Pronóstico
  slots: TimelineSlot[];
  toggleSlotReminder: (slotId: string) => void;

  // History & Period
  selectedPeriod: 'dia' | 'semana' | 'mes';
  setSelectedPeriod: (period: 'dia' | 'semana' | 'mes') => void;
  historyDays: HistoricalDay[];

  // Modals & UI overlays
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isGuideModalOpen: boolean;
  setIsGuideModalOpen: (open: boolean) => void;
  isWifiModalOpen: boolean;
  setIsWifiModalOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const initialRooms: Record<RoomId, RoomData> = {
  salon: {
    id: 'salon',
    name: 'Salón Principal',
    hardwareTag: 'Sala #01',
    co2: 890,
    temp: 22,
    humidity: 58,
    status: 'Cargado',
    trend: 'subiendo',
    recommendedMinutes: 15,
    description: 'Abre ventanas 15 minutos para renovar el aire',
    subAdvice: 'El aire exterior está limpio y fresco. El CO₂ interior comienza a concentrarse ligeramente.'
  },
  dormitorio: {
    id: 'dormitorio',
    name: 'Dormitorio',
    hardwareTag: 'Dorm #02',
    co2: 640,
    temp: 20.5,
    humidity: 54,
    status: 'Óptimo',
    trend: 'estable',
    recommendedMinutes: 10,
    description: 'Ambiente confortable y oxigenado',
    subAdvice: 'El aire en el dormitorio se mantiene dentro del umbral ideal para un descanso reparador.'
  },
  estudio: {
    id: 'estudio',
    name: 'Estudio',
    hardwareTag: 'Est #03',
    co2: 950,
    temp: 23,
    humidity: 59,
    status: 'Cargado',
    trend: 'subiendo',
    recommendedMinutes: 15,
    description: 'Renovación recomendada para mejorar el foco',
    subAdvice: 'El CO₂ acumulado en el estudio puede generar fatiga mental. Ventila ahora 15 minutos.'
  }
};

const initialExterior: ExteriorData = {
  aqi: 22,
  aqiStatus: 'Óptimo y puro',
  temp: 18,
  condition: 'Brisa suave y despejado',
  windSpeed: '11 km/h',
  windDir: 'Norte',
  humidity: 48,
  pollen: 'Muy bajo'
};

const initialSlots: TimelineSlot[] = [
  {
    id: 'morning',
    timeRange: '08:30 – 09:00',
    badge: 'Recomendado',
    duration: '25 min',
    title: 'Ventilación Matutina Limpia',
    description: 'Mañana fresca, rocío asentado y mínimo tráfico circundante. Óptimo para disipar el CO₂ acumulado de la noche.',
    badgeColor: 'secondary',
    temp: '18°C Ext',
    extraInfo: 'Polen Bajo',
    actionText: 'Avisarme',
    active: false
  },
  {
    id: 'noon',
    timeRange: '13:00 – 16:30',
    badge: 'Evitar Abrir',
    duration: 'Pico térmico',
    title: 'Bloqueo Térmico y Solar',
    description: 'Alta insolación exterior, aumento de polen en suspensión y tráfico urbano. Mantén persianas y ventanas cerradas.',
    badgeColor: 'error',
    temp: '27°C Caluroso',
    extraInfo: 'PM2.5 Moderado',
    actionText: 'Sellar ambiente',
    active: true
  },
  {
    id: 'night',
    timeRange: '19:30 – 20:00',
    badge: 'Óptimo Descanso',
    duration: '30 min',
    title: 'Purificación Nocturna',
    description: 'Brisa atardecida libre de emisiones. Enfría muros y renueva oxígeno para favorecer un sueño profundo y reparador.',
    badgeColor: 'primary',
    temp: '17°C Ideal',
    extraInfo: 'Sin tráfico',
    actionText: 'Programar',
    active: false
  }
];

const initialHistory: HistoricalDay[] = [
  { dayLetter: 'L', dayName: 'Lunes', goodHours: 21, badHours: 3 },
  { dayLetter: 'M', dayName: 'Martes', goodHours: 20, badHours: 4 },
  { dayLetter: 'X', dayName: 'Miércoles', goodHours: 22, badHours: 2 },
  { dayLetter: 'J', dayName: 'Jueves', goodHours: 19, badHours: 5 },
  { dayLetter: 'V', dayName: 'Viernes', goodHours: 23, badHours: 1 },
  { dayLetter: 'S', dayName: 'Sábado', goodHours: 24, badHours: 0 },
  { dayLetter: 'D', dayName: 'Domingo (Hoy)', goodHours: 22, badHours: 2, isCurrent: true }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('estado');
  const [viewMode, setViewMode] = useState<'app' | 'kotlin'>('app');
  const [activeRoomId, setActiveRoomId] = useState<RoomId>('salon');
  const [rooms, setRooms] = useState<Record<RoomId, RoomData>>(initialRooms);
  const [exterior] = useState<ExteriorData>(initialExterior);

  // Main 15 min Timer
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(15 * 60);
  const totalTimerSeconds = 15 * 60;

  // Secondary 5 min Timer (Diagnóstico)
  const [diagTimerRunning, setDiagTimerRunning] = useState<boolean>(false);
  const [diagTimerSeconds, setDiagTimerSeconds] = useState<number>(5 * 60);

  // Hardware State
  const [hardware, setHardware] = useState<HardwareConfig>({
    name: 'NUBO-PE Pebble',
    model: 'Smart Bioclimatic Monitor',
    revision: 'Rev. 2.4',
    firmware: 'v1.2.0',
    signalStrength: '-48 dBm',
    batteryPercent: 100,
    status: 'Conectado',
    ledMode: 'breeze',
    brightness: 45,
    oledMode: 'icon',
    autoRotation: true,
    ledNotificationEnabled: true,
    isPulsing: false,
    isCalibrating: false,
    wifiSsid: 'Casa_Familia_5G'
  });

  const [slots, setSlots] = useState<TimelineSlot[]>(initialSlots);
  const [selectedPeriod, setSelectedPeriod] = useState<'dia' | 'semana' | 'mes'>('semana');
  const [historyDays] = useState<HistoricalDay[]>(initialHistory);

  // Modals
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isWifiModalOpen, setIsWifiModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Main Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            showToast('¡Tiempo cumplido! Tu espacio ha sido renovado con aire fresco puro.', 'success');
            // lower co2 in active room
            setRooms((old) => ({
              ...old,
              [activeRoomId]: {
                ...old[activeRoomId],
                co2: 450,
                status: 'Excelente',
                trend: 'estable',
                subAdvice: 'Ventilación completada. El aire está limpio y revitalizado.'
              }
            }));
            return 0;
          }
          // Gradually reduce CO2 as ventilation proceeds
          if (prev % 15 === 0) {
            setRooms((old) => {
              const currentRoom = old[activeRoomId];
              if (currentRoom.co2 > 460) {
                return {
                  ...old,
                  [activeRoomId]: {
                    ...currentRoom,
                    co2: Math.max(450, currentRoom.co2 - 8)
                  }
                };
              }
              return old;
            });
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds, activeRoomId]);

  // Secondary Diagnostico 5-min timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (diagTimerRunning && diagTimerSeconds > 0) {
      interval = setInterval(() => {
        setDiagTimerSeconds((prev) => {
          if (prev <= 1) {
            setDiagTimerRunning(false);
            showToast('¡Corriente cruzada completada! Partículas disipadas.', 'success');
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [diagTimerRunning, diagTimerSeconds]);

  const toggleTimer = () => {
    if (!timerRunning && timerSeconds === 0) {
      setTimerSeconds(15 * 60);
    }
    setTimerRunning(!timerRunning);
    if (!timerRunning) {
      showToast('Temporizador de ventilación iniciado (15 min)', 'info');
    }
  };

  const markAsOpened = () => {
    setTimerRunning(true);
    showToast('Ventanas registradas como abiertas. Ventilando...', 'success');
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(15 * 60);
    showToast('Temporizador reiniciado a 15:00', 'info');
  };

  const toggleDiagTimer = () => {
    setDiagTimerRunning(!diagTimerRunning);
    if (!diagTimerRunning) {
      showToast('Temporizador de 5 minutos iniciado', 'info');
    }
  };

  const setLedMode = (mode: HardwareConfig['ledMode']) => {
    setHardware((prev) => ({ ...prev, ledMode: mode }));
    const labels = {
      breeze: 'Brisa Ambiental (Respiración lumínica continua)',
      discrete: 'Modo Discreto (Solo alerta ante cambios)',
      night: 'Modo Noche (Apagado 23:00 - 07:00)'
    };
    showToast(`Modo LED cambiado: ${labels[mode]}`, 'info');
  };

  const setBrightness = (val: number) => {
    setHardware((prev) => ({ ...prev, brightness: val }));
  };

  const setOledMode = (mode: HardwareConfig['oledMode']) => {
    setHardware((prev) => ({ ...prev, oledMode: mode }));
    showToast(`Micro-pantalla OLED: ${mode === 'icon' ? 'Solo icono de acción' : 'Icono + minutos'}`, 'info');
  };

  const toggleAutoRotation = () => {
    setHardware((prev) => {
      const next = !prev.autoRotation;
      showToast(next ? 'Giroscopio activado' : 'Orientación fija', 'info');
      return { ...prev, autoRotation: next };
    });
  };

  const toggleLedNotification = () => {
    setHardware((prev) => {
      const next = !prev.ledNotificationEnabled;
      showToast(next ? 'Aviso luminoso en NUBO-PE activado' : 'Aviso luminoso en NUBO-PE pausado', 'info');
      return { ...prev, ledNotificationEnabled: next };
    });
  };

  const triggerHardwarePulse = () => {
    setHardware((prev) => ({ ...prev, isPulsing: true }));
    showToast('Enviando ráfaga luminosa al anillo físico...', 'info');
    setTimeout(() => {
      setHardware((prev) => ({ ...prev, isPulsing: false }));
      showToast('¡Pulso esmeralda emitido con éxito en el prototipo!', 'success');
    }, 1800);
  };

  const triggerCalibration = () => {
    setHardware((prev) => ({ ...prev, isCalibrating: true }));
    showToast('Calibrando línea de base NDIR y TVOC con aire exterior...', 'info');
    setTimeout(() => {
      setHardware((prev) => ({ ...prev, isCalibrating: false }));
      showToast('Sensores calibrados a línea base 415 ppm', 'success');
    }, 2200);
  };

  const toggleSlotReminder = (slotId: string) => {
    setSlots((prev) =>
      prev.map((s) => {
        if (s.id === slotId) {
          const next = !s.active;
          showToast(
            next
              ? `Recordatorio fijado para ${s.timeRange}`
              : `Recordatorio cancelado para ${s.timeRange}`,
            'info'
          );
          return { ...s, active: next };
        }
        return s;
      })
    );
  };

  const currentRoom = rooms[activeRoomId];

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        activeRoomId,
        setActiveRoomId,
        rooms,
        currentRoom,
        exterior,
        timerRunning,
        timerSeconds,
        totalTimerSeconds,
        toggleTimer,
        markAsOpened,
        resetTimer,
        diagTimerRunning,
        diagTimerSeconds,
        toggleDiagTimer,
        hardware,
        setLedMode,
        setBrightness,
        setOledMode,
        toggleAutoRotation,
        toggleLedNotification,
        triggerHardwarePulse,
        triggerCalibration,
        slots,
        toggleSlotReminder,
        selectedPeriod,
        setSelectedPeriod,
        historyDays,
        isProfileOpen,
        setIsProfileOpen,
        isGuideModalOpen,
        setIsGuideModalOpen,
        isWifiModalOpen,
        setIsWifiModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
