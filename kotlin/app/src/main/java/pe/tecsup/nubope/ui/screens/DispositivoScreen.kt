package pe.tecsup.nubope.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pe.tecsup.nubope.ui.theme.*
import pe.tecsup.nubope.ui.viewmodel.NuboViewModel

@Composable
fun DispositivoScreen(viewModel: NuboViewModel) {
    val scrollState = rememberScrollState()
    val hardware = viewModel.hardwareState.value

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Physical Pebble Card
        Card(
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = PureWhite),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Virtual Pebble
                Box(
                    modifier = Modifier
                        .size(160.dp)
                        .background(
                            color = if (hardware.isPulsing) SecondaryContainerMint else SecondaryContainerMint.copy(alpha = hardware.brightness),
                            shape = CircleShape
                        )
                        .padding(14.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(PureWhite, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Box(
                            modifier = Modifier
                                .size(70.dp)
                                .background(DarkSlatePebble, CircleShape),
                            contentAlignment = Alignment.Center
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Icon(imageVector = Icons.Default.Air, contentDescription = null, tint = SecondaryContainerMint, modifier = Modifier.size(24.dp))
                                if (hardware.oledMode == "full") {
                                    Text("15 min", fontSize = 9.sp, color = SkySurface)
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(10.dp))

                Text(hardware.name, fontSize = 16.sp, fontWeight = FontWeight.Bold)
                Text("${hardware.revision} · Firmware ${hardware.firmware} al día", fontSize = 11.sp, color = OnSurfaceVariantMuted)

                Spacer(modifier = Modifier.height(12.dp))

                // Telemetry
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Surface(modifier = Modifier.weight(1f), shape = RoundedCornerShape(10.dp), color = SkySurfaceContainerLow) {
                        Column(modifier = Modifier.padding(8.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(hardware.signalStrength, fontWeight = FontWeight.Bold, fontSize = 11.sp, color = DeepTeal)
                            Text("Señal Alta", fontSize = 9.sp, color = OnSurfaceVariantMuted)
                        }
                    }
                    Surface(modifier = Modifier.weight(1f), shape = RoundedCornerShape(10.dp), color = SkySurfaceContainerLow) {
                        Column(modifier = Modifier.padding(8.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("${hardware.batteryPercent}%", fontWeight = FontWeight.Bold, fontSize = 11.sp, color = MintGreen)
                            Text("Alimentado", fontSize = 9.sp, color = OnSurfaceVariantMuted)
                        }
                    }
                    Surface(modifier = Modifier.weight(1f), shape = RoundedCornerShape(10.dp), color = SkySurfaceContainerLow) {
                        Column(modifier = Modifier.padding(8.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("Enlace", fontWeight = FontWeight.Bold, fontSize = 11.sp, color = DeepTeal)
                            Text("Óptimo", fontSize = 9.sp, color = OnSurfaceVariantMuted)
                        }
                    }
                }
            }
        }

        // Control Anillo LED
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = PureWhite),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Anillo de Luz LED", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                Spacer(modifier = Modifier.height(10.dp))

                listOf(
                    Pair("breeze", "Brisa Ambiental (Respiración lumínica continua)"),
                    Pair("discrete", "Modo Discreto (Solo alerta ante cambios)"),
                    Pair("night", "Modo Noche (Apagado 23:00 - 07:00)")
                ).forEach { (mode, desc) ->
                    val isSelected = hardware.ledMode == mode
                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = if (isSelected) DeepTeal else SkySurfaceContainerLow,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                            .clickable { viewModel.setLedMode(mode) }
                    ) {
                        Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = desc,
                                fontSize = 11.sp,
                                color = if (isSelected) Color.White else OnSurfaceDark,
                                fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Normal
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                Text("Intensidad luminosa: ${(hardware.brightness * 100).toInt()}%", fontSize = 12.sp, color = OnSurfaceVariantMuted)
                Slider(
                    value = hardware.brightness,
                    onValueChange = { viewModel.setBrightness(it) },
                    valueRange = 0.1f..1f,
                    colors = SliderDefaults.colors(thumbColor = DeepTeal, activeTrackColor = DeepTeal)
                )
            }
        }

        // Pruebas y Sensores
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = PureWhite),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Pruebas y Sensores", fontWeight = FontWeight.Bold, fontSize = 14.sp)

                Button(
                    onClick = { viewModel.triggerPulse() },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = SkySurfaceContainerLow),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = if (hardware.isPulsing) "Emitiendo pulso esmeralda..." else "Probar pulso de luz ahora",
                        color = DeepTeal,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }

                Button(
                    onClick = { viewModel.triggerCalibration() },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = SkySurfaceContainerLow),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = if (hardware.isCalibrating) "Calibrando NDIR..." else "Calibrar sensores de cero",
                        color = DeepTeal,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}
