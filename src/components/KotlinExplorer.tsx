import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface KotlinFile {
  name: string;
  path: string;
  category: 'Screens' | 'Architecture' | 'Theme' | 'Gradle';
  code: string;
  description: string;
}

const kotlinFiles: KotlinFile[] = [
  {
    name: 'MainActivity.kt',
    path: 'app/src/main/java/pe/tecsup/nubope/MainActivity.kt',
    category: 'Architecture',
    description: 'Punto de entrada Jetpack Compose con Scaffold, TopBar y NavigationBar.',
    code: `package pe.tecsup.nubope

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import pe.tecsup.nubope.ui.navigation.NuboBottomBar
import pe.tecsup.nubope.ui.navigation.NuboTopBar
import pe.tecsup.nubope.ui.navigation.Screen
import pe.tecsup.nubope.ui.screens.*
import pe.tecsup.nubope.ui.theme.NuboPeTheme
import pe.tecsup.nubope.ui.viewmodel.NuboViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            NuboPeTheme {
                val viewModel: NuboViewModel = viewModel()
                var currentScreen by remember { mutableStateOf<Screen>(Screen.Estado) }

                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    topBar = {
                        NuboTopBar(
                            hardwareStatus = viewModel.hardwareState.value.status,
                            onProfileClick = { /* Diálogo de perfil */ }
                        )
                    },
                    bottomBar = {
                        NuboBottomBar(
                            currentScreen = currentScreen,
                            onScreenSelected = { currentScreen = it }
                        )
                    }
                ) { innerPadding ->
                    Surface(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding),
                        color = MaterialTheme.colorScheme.background
                    ) {
                        when (currentScreen) {
                            Screen.Estado -> EstadoScreen(viewModel = viewModel)
                            Screen.Diagnostico -> DiagnosticoScreen(viewModel = viewModel)
                            Screen.Pronostico -> PronosticoScreen(viewModel = viewModel)
                            Screen.Historial -> HistorialScreen(viewModel = viewModel)
                            Screen.Dispositivo -> DispositivoScreen(viewModel = viewModel)
                        }
                    }
                }
            }
        }
    }
}`
  },
  {
    name: 'NuboViewModel.kt',
    path: 'app/src/main/java/pe/tecsup/nubope/ui/viewmodel/NuboViewModel.kt',
    category: 'Architecture',
    description: 'Gestor de estado reactivo para temporizadores, cuartos, hardware y slots.',
    code: `package pe.tecsup.nubope.ui.viewmodel

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
    val ledMode: String = "breeze",
    val brightness: Float = 0.45f,
    val oledMode: String = "icon",
    val ledNotificationActive: Boolean = true,
    val isPulsing: Boolean = false,
    val isCalibrating: Boolean = false
)

class NuboViewModel : ViewModel() {
    val rooms = listOf(
        RoomState("salon", "Salón Principal", "Sala #01", 890, 22.0, 58, "Cargado", "subiendo", "Abre ventanas 15 minutos para renovar el aire", "El aire exterior está limpio y fresco."),
        RoomState("dormitorio", "Dormitorio", "Dorm #02", 640, 20.5, 54, "Óptimo", "estable", "Ambiente confortable y oxigenado", "El aire en el dormitorio se mantiene ideal."),
        RoomState("estudio", "Estudio", "Est #03", 950, 23.0, 59, "Cargado", "subiendo", "Renovación recomendada", "El CO₂ acumulado puede generar fatiga mental.")
    )

    private val _selectedRoomIndex = mutableStateOf(0)
    val selectedRoomIndex: State<Int> = _selectedRoomIndex
    val currentRoom: RoomState get() = rooms[_selectedRoomIndex.value]

    private val _timerSeconds = mutableStateOf(15 * 60)
    val timerSeconds: State<Int> = _timerSeconds

    private val _isTimerRunning = mutableStateOf(false)
    val isTimerRunning: State<Boolean> = _isTimerRunning

    private var timerJob: Job? = null

    private val _hardwareState = mutableStateOf(HardwareState())
    val hardwareState: State<HardwareState> = _hardwareState

    fun selectRoom(index: Int) { _selectedRoomIndex.value = index }

    fun toggleTimer() {
        if (_isTimerRunning.value) {
            _isTimerRunning.value = false
            timerJob?.cancel()
        } else {
            _isTimerRunning.value = true
            timerJob = viewModelScope.launch {
                while (_isTimerRunning.value && _timerSeconds.value > 0) {
                    delay(1000L)
                    _timerSeconds.value -= 1
                }
            }
        }
    }
}`
  },
  {
    name: 'EstadoScreen.kt',
    path: 'app/src/main/java/pe/tecsup/nubope/ui/screens/EstadoScreen.kt',
    category: 'Screens',
    description: 'Orbe biofílico con Canvas Stroke, temporizador de 15 min y balance interior vs. exterior.',
    code: `package pe.tecsup.nubope.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pe.tecsup.nubope.ui.theme.*
import pe.tecsup.nubope.ui.viewmodel.NuboViewModel

@Composable
fun EstadoScreen(viewModel: NuboViewModel) {
    val room = viewModel.currentRoom
    val isRunning = viewModel.isTimerRunning.value
    val secondsLeft = viewModel.timerSeconds.value
    val minutes = secondsLeft / 60
    val secs = secondsLeft % 60
    val formattedTime = String.format("%02d:%02d", minutes, secs)

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Orbe Biofílico Central
        Card(
            shape = RoundedCornerShape(28.dp),
            colors = CardDefaults.cardColors(containerColor = PureWhite),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.fillMaxWidth().padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(modifier = Modifier.size(200.dp), contentAlignment = Alignment.Center) {
                    val progress = secondsLeft / (15f * 60f)
                    Canvas(modifier = Modifier.fillMaxSize()) {
                        drawCircle(color = SkySurfaceContainerHigh, style = Stroke(width = 16f))
                        drawArc(color = MintGreen, startAngle = -90f, sweepAngle = 360f * progress, useCenter = false, style = Stroke(width = 16f, cap = StrokeCap.Round))
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(Icons.Default.Air, contentDescription = null, tint = MintGreen, modifier = Modifier.size(32.dp))
                        Text(formattedTime, fontSize = 32.sp, fontWeight = FontWeight.Bold, color = DeepTeal)
                        Text(if (isRunning) "Ventilando" else "Recomendado", fontSize = 12.sp, color = OnSurfaceVariantMuted)
                    }
                }

                Button(
                    onClick = { viewModel.toggleTimer() },
                    shape = CircleShape,
                    colors = ButtonDefaults.buttonColors(containerColor = DeepTeal),
                    modifier = Modifier.fillMaxWidth().padding(top = 16.dp)
                ) {
                    Text(if (isRunning) "Pausar ventilación guiada" else "Iniciar ventilación guiada")
                }
            }
        }
    }
}`
  },
  {
    name: 'DiagnosticoScreen.kt',
    path: 'app/src/main/java/pe/tecsup/nubope/ui/screens/DiagnosticoScreen.kt',
    category: 'Screens',
    description: 'Transparencia inteligente, matriz comparativa y corriente de 5 minutos.',
    code: `package pe.tecsup.nubope.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pe.tecsup.nubope.ui.theme.*
import pe.tecsup.nubope.ui.viewmodel.NuboViewModel

@Composable
fun DiagnosticoScreen(viewModel: NuboViewModel) {
    val room = viewModel.currentRoom

    Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Card(shape = RoundedCornerShape(20.dp), colors = CardDefaults.cardColors(containerColor = PureWhite)) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("TRANSPARENCIA INTELIGENTE", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = DeepTeal)
                Text("¿Por qué ventilar ahora?", fontSize = 18.sp, fontWeight = FontWeight.Bold)
                Text("Detectamos acumulación natural de CO₂ tras 2 horas de concentración en \${room.name}.", fontSize = 12.sp)
            }
        }
    }
}`
  },
  {
    name: 'PronosticoScreen.kt',
    path: 'app/src/main/java/pe/tecsup/nubope/ui/screens/PronosticoScreen.kt',
    category: 'Screens',
    description: 'Previsión bioclimática con ventanas horarias y toggle LED en hardware.',
    code: `package pe.tecsup.nubope.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import pe.tecsup.nubope.ui.theme.*
import pe.tecsup.nubope.ui.viewmodel.NuboViewModel

@Composable
fun PronosticoScreen(viewModel: NuboViewModel) {
    val slots = viewModel.slots.value

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("Ventanas Horarias", style = MaterialTheme.typography.titleMedium)
        LazyRow(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            items(slots) { slot ->
                Card(modifier = Modifier.width(260.dp), shape = RoundedCornerShape(20.dp)) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(slot.timeRange, color = DeepTeal)
                        Text(slot.description)
                    }
                }
            }
        }
    }
}`
  },
  {
    name: 'DispositivoScreen.kt',
    path: 'app/src/main/java/pe/tecsup/nubope/ui/screens/DispositivoScreen.kt',
    category: 'Screens',
    description: 'Telemetría de Pebble, anillo LED reactivo, slider de brillo y prueba háptica.',
    code: `package pe.tecsup.nubope.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Air
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import pe.tecsup.nubope.ui.theme.*
import pe.tecsup.nubope.ui.viewmodel.NuboViewModel

@Composable
fun DispositivoScreen(viewModel: NuboViewModel) {
    val hw = viewModel.hardwareState.value

    Column(modifier = Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Card(shape = RoundedCornerShape(24.dp), colors = CardDefaults.cardColors(containerColor = PureWhite)) {
            Column(modifier = Modifier.fillMaxWidth().padding(20.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                Box(
                    modifier = Modifier.size(140.dp).background(SecondaryContainerMint.copy(alpha = hw.brightness), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Box(modifier = Modifier.size(60.dp).background(DarkSlatePebble, CircleShape), contentAlignment = Alignment.Center) {
                        Icon(Icons.Default.Air, contentDescription = null, tint = SecondaryContainerMint)
                    }
                }
                Text(hw.name, style = MaterialTheme.typography.titleMedium)
                Text("\${hw.revision} · Firmware \${hw.firmware}", color = OnSurfaceVariantMuted)
            }
        }
    }
}`
  },
  {
    name: 'Color.kt',
    path: 'app/src/main/java/pe/tecsup/nubope/ui/theme/Color.kt',
    category: 'Theme',
    description: 'Paleta bioclimática (DeepTeal, MintGreen, SkySurface, PureWhite).',
    code: `package pe.tecsup.nubope.ui.theme

import androidx.compose.ui.graphics.Color

val DeepTeal = Color(0xFF005C59)
val PrimaryContainerTeal = Color(0xFF0E7673)
val OnPrimaryTeal = Color(0xFFFFFFFF)
val MintGreen = Color(0xFF006D40)
val SecondaryContainerMint = Color(0xFF7AFBB1)
val OnSecondaryContainerMint = Color(0xFF007444)
val SkySurface = Color(0xFFEEFCFF)
val SkySurfaceContainerLow = Color(0xFFE2F8FC)
val SkySurfaceContainerHigh = Color(0xFFD6ECF1)
val PureWhite = Color(0xFFFFFFFF)
val OnSurfaceDark = Color(0xFF0A1E22)
val OnSurfaceVariantMuted = Color(0xFF3E4948)
val DarkSlatePebble = Color(0xFF203337)
val WarmAmber = Color(0xFF744800)
val AlertRed = Color(0xFFBA1A1A)
val AlertRedContainer = Color(0xFFFFDAD6)`
  },
  {
    name: 'build.gradle.kts',
    path: 'app/build.gradle.kts',
    category: 'Gradle',
    description: 'Configuración Gradle para Android 15, Jetpack Compose y Coil.',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "pe.tecsup.nubope"
    compileSdk = 35

    defaultConfig {
        applicationId = "pe.tecsup.nubope"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.material.icons.extended)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation("io.coil-kt:coil-compose:2.7.0")
}`
  }
];

export const KotlinExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<KotlinFile>(kotlinFiles[0]);
  const [copied, setCopied] = useState(false);
  const { showToast } = useApp();

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(selectedFile.code);
      setCopied(true);
      showToast(`¡${selectedFile.name} copiado al portapapeles!`, 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([selectedFile.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = selectedFile.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`Descargando ${selectedFile.name}...`, 'info');
  };

  return (
    <div className="w-full flex flex-col gap-4 pb-12 animate-fadeIn">
      {/* Kotlin / Jetpack Compose Banner */}
      <div className="bg-[#203337] text-white p-4 rounded-2xl shadow-lg border border-[#7afbb1]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7F52FF] to-[#E24462] flex items-center justify-center font-bold text-xs text-white shadow-md">
              K
            </span>
            <div>
              <h2 className="font-headline text-sm font-bold text-white flex items-center gap-1.5">
                Proyecto Nativo en Kotlin (Jetpack Compose)
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7afbb1]/20 text-[#7afbb1] font-mono">
                  Android 15 / Material 3
                </span>
              </h2>
              <p className="font-body text-xs text-white/70">
                Estructura completa lista para Android Studio (pe.tecsup.nubope).
              </p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#005c59] hover:bg-[#0e7673] text-white text-xs font-semibold shadow-sm active:scale-95 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
        </div>
      </div>

      {/* File Selector Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {kotlinFiles.map((file) => {
          const isSelected = selectedFile.name === file.name;
          return (
            <button
              key={file.name}
              onClick={() => setSelectedFile(file)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#005c59] text-white shadow-sm font-semibold'
                  : 'bg-white text-[#3e4948] hover:bg-[#e2f8fc] border border-[#0e7673]/8'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#7afbb1]' : 'bg-[#bdc9c7]'}`} />
              <span>{file.name}</span>
            </button>
          );
        })}
      </div>

      {/* Code Viewer */}
      <div className="bg-[#0a1e22] text-[#eefcff] rounded-2xl overflow-hidden shadow-xl border border-[#0e7673]/20 flex flex-col">
        {/* Top File Bar */}
        <div className="px-4 py-3 bg-[#203337] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7afbb1] text-[18px]">code</span>
            <span className="font-mono text-xs text-white font-semibold">
              {selectedFile.path}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="text-[11px] text-white/80 hover:text-white px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">download</span>
              Descargar .kt
            </button>
          </div>
        </div>

        {/* File Description */}
        <div className="px-4 py-2 bg-[#203337]/50 text-xs text-[#80d5d1] border-b border-white/5 font-body">
          {selectedFile.description}
        </div>

        {/* Code Content */}
        <pre className="p-4 font-mono text-xs overflow-x-auto text-[#eefcff]/90 leading-relaxed selection:bg-[#005c59]">
          <code>{selectedFile.code}</code>
        </pre>
      </div>
    </div>
  );
};
