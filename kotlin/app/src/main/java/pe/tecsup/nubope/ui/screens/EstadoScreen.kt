package pe.tecsup.nubope.ui.screens

import androidx.compose.animation.core.*
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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
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
    val scrollState = rememberScrollState()
    val room = viewModel.currentRoom
    val isTimerRunning = viewModel.isTimerRunning.value
    val secondsLeft = viewModel.timerSeconds.value

    val minutes = secondsLeft / 60
    val secs = secondsLeft % 60
    val timeFormatted = String.format("%02d:%02d", minutes, secs)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Selector de Espacio Activo
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                viewModel.rooms.forEachIndexed { index, r ->
                    val isSelected = index == viewModel.selectedRoomIndex.value
                    Surface(
                        shape = CircleShape,
                        color = if (isSelected) DeepTeal else SkySurfaceContainerLow,
                        modifier = Modifier.clickable { viewModel.selectRoom(index) }
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            if (isSelected) {
                                Box(
                                    modifier = Modifier
                                        .size(6.dp)
                                        .background(SecondaryContainerMint, CircleShape)
                                )
                            }
                            Text(
                                text = r.name,
                                color = if (isSelected) Color.White else OnSurfaceVariantMuted,
                                fontSize = 12.sp,
                                fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Medium
                            )
                        }
                    }
                }
            }

            // Hardware tag
            Surface(
                shape = CircleShape,
                color = PureWhite,
                shadowElevation = 1.dp
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Sensors,
                        contentDescription = null,
                        tint = DeepTeal,
                        modifier = Modifier.size(16.dp)
                    )
                    Text(
                        text = room.hardwareTag,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = DeepTeal
                    )
                }
            }
        }

        // Orbe Biofílico Central
        Card(
            shape = RoundedCornerShape(28.dp),
            colors = CardDefaults.cardColors(containerColor = PureWhite),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Ring Graphic
                Box(
                    modifier = Modifier
                        .size(200.dp)
                        .padding(8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    val progress = secondsLeft / (15f * 60f)
                    androidx.compose.foundation.Canvas(modifier = Modifier.fillMaxSize()) {
                        // Background circle
                        drawCircle(
                            color = SkySurfaceContainerHigh,
                            style = Stroke(width = 16f, cap = StrokeCap.Round)
                        )
                        // Progress arc
                        drawArc(
                            color = MintGreen,
                            startAngle = -90f,
                            sweepAngle = 360f * progress,
                            useCenter = false,
                            style = Stroke(width = 16f, cap = StrokeCap.Round)
                        )
                    }

                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(
                            imageVector = Icons.Default.Air,
                            contentDescription = null,
                            tint = MintGreen,
                            modifier = Modifier.size(32.dp)
                        )
                        Text(
                            text = timeFormatted,
                            fontSize = 32.sp,
                            fontWeight = FontWeight.Bold,
                            color = DeepTeal
                        )
                        Text(
                            text = if (isTimerRunning) "Ventilación activa" else "Recomendado",
                            fontSize = 12.sp,
                            color = OnSurfaceVariantMuted
                        )
                    }
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Pill Tag
                Surface(
                    shape = CircleShape,
                    color = SecondaryContainerMint.copy(alpha = 0.5f)
                ) {
                    Text(
                        text = "Momento Ideal para Ventilar",
                        color = OnSecondaryContainerMint,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                    )
                }

                Spacer(modifier = Modifier.height(10.dp))

                Text(
                    text = room.description,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = OnSurfaceDark,
                    textAlign = androidx.compose.ui.text.style.TextAlign.Center
                )

                Text(
                    text = room.subAdvice,
                    fontSize = 12.sp,
                    color = OnSurfaceVariantMuted,
                    textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                    modifier = Modifier.padding(top = 8.dp)
                )

                Spacer(modifier = Modifier.height(18.dp))

                // Action Buttons
                Button(
                    onClick = { viewModel.toggleTimer() },
                    shape = CircleShape,
                    colors = ButtonDefaults.buttonColors(containerColor = DeepTeal),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                ) {
                    Icon(
                        imageVector = if (isTimerRunning) Icons.Default.Pause else Icons.Default.PlayArrow,
                        contentDescription = null,
                        modifier = Modifier.size(20.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = if (isTimerRunning) "Pausar ventilación guiada" else "Iniciar ventilación guiada",
                        fontWeight = FontWeight.SemiBold
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedButton(
                    onClick = { viewModel.toggleTimer() },
                    shape = CircleShape,
                    colors = ButtonDefaults.outlinedButtonColors(containerColor = SkySurfaceContainerLow),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(42.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Check,
                        contentDescription = null,
                        tint = DeepTeal,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "Ya he abierto las ventanas",
                        color = DeepTeal,
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 12.sp
                    )
                }
            }
        }

        // Balance de Ambientes
        Card(
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = PureWhite),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "Balance de Ambientes",
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp
                    )
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        Box(modifier = Modifier.size(6.dp).background(MintGreen, CircleShape))
                        Text(text = "Sincronizado", fontSize = 11.sp, color = DeepTeal, fontWeight = FontWeight.SemiBold)
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    // Interior
                    Surface(
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(16.dp),
                        color = SkySurfaceContainerLow
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text("Interior", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                                Surface(shape = CircleShape, color = SkySurfaceContainerHigh) {
                                    Text(room.status, fontSize = 9.sp, modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp))
                                }
                            }
                            Spacer(modifier = Modifier.height(8.dp))
                            Text("CO₂  ${room.co2} ppm", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                            Text("Temp  ${room.temp}°C", fontSize = 12.sp, color = OnSurfaceVariantMuted)
                            Spacer(modifier = Modifier.height(8.dp))
                            Text("▲ CO₂ subiendo", fontSize = 10.sp, color = WarmAmber)
                        }
                    }

                    // Exterior
                    Surface(
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(16.dp),
                        color = SecondaryContainerMint.copy(alpha = 0.3f)
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text("Exterior", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                                Surface(shape = CircleShape, color = SecondaryContainerMint) {
                                    Text("Puro", fontSize = 9.sp, fontWeight = FontWeight.Bold, color = OnSecondaryContainerMint, modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp))
                                }
                            }
                            Spacer(modifier = Modifier.height(8.dp))
                            Text("AQI  22 Óptimo", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = MintGreen)
                            Text("Brisa  18°C · Suave", fontSize = 12.sp, color = OnSurfaceVariantMuted)
                            Spacer(modifier = Modifier.height(8.dp))
                            Text("✓ Flujo favorable", fontSize = 10.sp, color = MintGreen, fontWeight = FontWeight.SemiBold)
                        }
                    }
                }
            }
        }
    }
}
