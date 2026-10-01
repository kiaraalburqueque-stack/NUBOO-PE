export type TabType = 'estado' | 'diagnostico' | 'pronostico' | 'historial' | 'dispositivo';

export type RoomId = 'salon' | 'dormitorio' | 'estudio';

export interface RoomData {
  id: RoomId;
  name: string;
  hardwareTag: string;
  co2: number;
  temp: number;
  humidity: number;
  status: 'Cargado' | 'Óptimo' | 'Excelente';
  trend: 'subiendo' | 'bajando' | 'estable';
  recommendedMinutes: number;
  description: string;
  subAdvice: string;
}

export interface ExteriorData {
  aqi: number;
  aqiStatus: string;
  temp: number;
  condition: string;
  windSpeed: string;
  windDir: string;
  humidity: number;
  pollen: string;
}

export type LedMode = 'breeze' | 'discrete' | 'night';
export type OledDisplayMode = 'icon' | 'full';

export interface HardwareConfig {
  name: string;
  model: string;
  revision: string;
  firmware: string;
  signalStrength: string;
  batteryPercent: number;
  status: 'Conectado' | 'Sincronizando' | 'Pausado';
  ledMode: LedMode;
  brightness: number;
  oledMode: OledDisplayMode;
  autoRotation: boolean;
  ledNotificationEnabled: boolean;
  isPulsing: boolean;
  isCalibrating: boolean;
  wifiSsid: string;
}

export interface TimelineSlot {
  id: string;
  timeRange: string;
  badge: 'Recomendado' | 'Evitar Abrir' | 'Óptimo Descanso';
  duration: string;
  title: string;
  description: string;
  badgeColor: 'secondary' | 'error' | 'primary';
  temp: string;
  extraInfo: string;
  actionText: string;
  active: boolean;
}

export interface HistoricalDay {
  dayLetter: string;
  dayName: string;
  goodHours: number;
  badHours: number;
  isCurrent?: boolean;
}
