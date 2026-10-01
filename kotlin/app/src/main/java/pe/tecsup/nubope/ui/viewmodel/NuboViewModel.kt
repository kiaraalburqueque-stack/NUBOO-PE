package pe.tecsup.nubope.ui.viewmodel

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

data class RoomState(
    val id: String,
    val name: String,
    val hardwareTag: String,
    val co2: Int,
    val temp: Double,
    val humidity: Int,
    val status: String,
    val trend: String,
    val description: String,
    val subAdvice: String
)

data class HardwareState(
    val name: String = "NUBO-PE Pebble",
    val revision: String = "Rev. 2.4",
    val firmware: String = "v1.2.0",
    val status: String = "Conectado",
    val signalStrength: String = "-48 dBm",
    val batteryPercent: Int = 100,
    val ledMode: String = "breeze", // breeze, discrete, night
    val brightness: Float = 0.45f,
    val oledMode: String = "icon", // icon, full
    val ledNotificationActive: Boolean = true,
    val isPulsing: Boolean = false,
    val isCalibrating: Boolean = false
)

data class TimelineSlotItem(
    val id: String,
    val timeRange: String,
    val badge: String,
    val duration: String,
    val description: String,
    val temp: String,
    val extra: String,
    val isActionable: Boolean = true,
    val isProgrammed: Boolean = false
)

class NuboViewModel : ViewModel() {

    val rooms = listOf(
        RoomState(
            id = "salon",
            name = "Salón Principal",
            hardwareTag = "Sala #01",
            co2 = 890,
            temp = 22.0,
            humidity = 58,
            status = "Cargado",
            trend = "subiendo",
            description = "Abre ventanas 15 minutos para renovar el aire",
            subAdvice = "El aire exterior está limpio y fresco. El CO₂ interior comienza a concentrarse ligeramente."
        ),
        RoomState(
            id = "dormitorio",
            name = "Dormitorio",
            hardwareTag = "Dorm #02",
            co2 = 640,
            temp = 20.5,
            humidity = 54,
            status = "Óptimo",
            trend = "estable",
            description = "Ambiente confortable y oxigenado",
            subAdvice = "El aire en el dormitorio se mantiene dentro del umbral ideal para el descanso."
        ),
        RoomState(
            id = "estudio",
            name = "Estudio",
            hardwareTag = "Est #03",
            co2 = 950,
            temp = 23.0,
            humidity = 59,
            status = "Cargado",
            trend = "subiendo",
            description = "Renovación recomendada para mejorar el foco",
            subAdvice = "El CO₂ acumulado en el estudio puede generar fatiga mental."
        )
    )

    private val _selectedRoomIndex = mutableStateOf(0)
    val selectedRoomIndex: State<Int> = _selectedRoomIndex
    val currentRoom: RoomState get() = rooms[_selectedRoomIndex.value]

    // 15-min Guided Ventilation Timer
    private val _timerSeconds = mutableStateOf(15 * 60)
    val timerSeconds: State<Int> = _timerSeconds

    private val _isTimerRunning = mutableStateOf(false)
    val isTimerRunning: State<Boolean> = _isTimerRunning

    private var timerJob: Job? = null

    // Hardware State
    private val _hardwareState = mutableStateOf(HardwareState())
    val hardwareState: State<HardwareState> = _hardwareState

    // Slots
    private val _slots = mutableStateOf(
        listOf(
            TimelineSlotItem("morning", "08:30 – 09:00", "Recomendado", "25 min", "Mañana fresca, rocío asentado y mínimo tráfico circundante.", "18°C Ext", "Polen Bajo"),
            TimelineSlotItem("noon", "13:00 – 16:30", "Evitar Abrir", "Pico térmico", "Alta insolación exterior, aumento de polen y tráfico urbano.", "27°C Caluroso", "PM2.5 Moderado", isActionable = false),
            TimelineSlotItem("night", "19:30 – 20:00", "Óptimo Descanso", "30 min", "Brisa atardecida libre de emisiones para un descanso profundo.", "17°C Ideal", "Sin tráfico")
        )
    )
    val slots: State<List<TimelineSlotItem>> = _slots

    fun selectRoom(index: Int) {
        _selectedRoomIndex.value = index
    }

    fun toggleTimer() {
        if (_isTimerRunning.value) {
            pauseTimer()
        } else {
            startTimer()
        }
    }

    private fun startTimer() {
        _isTimerRunning.value = true
        timerJob = viewModelScope.launch {
            while (_isTimerRunning.value && _timerSeconds.value > 0) {
                delay(1000L)
                _timerSeconds.value -= 1
            }
            if (_timerSeconds.value <= 0) {
                _isTimerRunning.value = false
            }
        }
    }

    fun pauseTimer() {
        _isTimerRunning.value = false
        timerJob?.cancel()
    }

    fun resetTimer() {
        pauseTimer()
        _timerSeconds.value = 15 * 60
    }

    fun setLedMode(mode: String) {
        _hardwareState.value = _hardwareState.value.copy(ledMode = mode)
    }

    fun setBrightness(brightness: Float) {
        _hardwareState.value = _hardwareState.value.copy(brightness = brightness)
    }

    fun setOledMode(mode: String) {
        _hardwareState.value = _hardwareState.value.copy(oledMode = mode)
    }

    fun triggerPulse() {
        _hardwareState.value = _hardwareState.value.copy(isPulsing = true)
        viewModelScope.launch {
            delay(1500L)
            _hardwareState.value = _hardwareState.value.copy(isPulsing = false)
        }
    }

    fun triggerCalibration() {
        _hardwareState.value = _hardwareState.value.copy(isCalibrating = true)
        viewModelScope.launch {
            delay(2000L)
            _hardwareState.value = _hardwareState.value.copy(isCalibrating = false)
        }
    }

    fun toggleSlotReminder(slotId: String) {
        _slots.value = _slots.value.map { slot ->
            if (slot.id == slotId) slot.copy(isProgrammed = !slot.isProgrammed) else slot
        }
    }
}
