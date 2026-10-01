package pe.tecsup.nubope.ui.screens

import androidx.compose.foundation.background
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
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pe.tecsup.nubope.ui.theme.*
import pe.tecsup.nubope.ui.viewmodel.NuboViewModel

@Composable
fun HistorialScreen(viewModel: NuboViewModel) {
    val scrollState = rememberScrollState()
    var selectedPeriod by remember { mutableStateOf("Semana") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text("EVOLUCIÓN & SALUD", fontSize = 11.sp, color = DeepTeal, fontWeight = FontWeight.Bold)
                Text("Tendencias de Bienestar", fontSize = 18.sp, fontWeight = FontWeight.Bold)
            }
            Surface(
                shape = CircleShape,
                color = SkySurfaceContainerLow
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(imageVector = Icons.Default.Share, contentDescription = null, tint = DeepTeal, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Resumen", fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = DeepTeal)
                }
            }
        }

        // Period Selector
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(SkySurfaceContainerHigh, CircleShape)
                .padding(4.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            listOf("Día", "Semana", "Mes").forEach { period ->
                val isSelected = selectedPeriod == period
                Surface(
                    shape = CircleShape,
                    color = if (isSelected) PureWhite else Color.Transparent,
                    modifier = Modifier.weight(1f)
                ) {
                    Text(
                        text = period,
                        fontSize = 12.sp,
                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                        color = if (isSelected) DeepTeal else OnSurfaceVariantMuted,
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                        modifier = Modifier.padding(vertical = 8.dp)
                    )
                }
            }
        }

        // Bioclimatic Score 92/100
        Card(
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = PureWhite),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(18.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Índice Bioclimático", fontSize = 14.sp, fontWeight = FontWeight.Bold)
                    Surface(shape = CircleShape, color = SecondaryContainerMint) {
                        Text("Entorno Saludable", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = OnSecondaryContainerMint, modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp))
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Box(modifier = Modifier.size(90.dp), contentAlignment = Alignment.Center) {
                        androidx.compose.foundation.Canvas(modifier = Modifier.fillMaxSize()) {
                            drawCircle(color = SkySurfaceContainerHigh, style = Stroke(width = 16f))
                            drawArc(color = MintGreen, startAngle = -90f, sweepAngle = 360f * 0.92f, useCenter = false, style = Stroke(width = 16f, cap = StrokeCap.Round))
                        }
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("92", fontSize = 26.sp, fontWeight = FontWeight.Bold, color = DeepTeal)
                            Text("/100", fontSize = 10.sp, color = OnSurfaceVariantMuted)
                        }
                    }

                    Column {
                        Text("▲ +14% vs. semana previa", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = MintGreen)
                        Text("Esta semana optimizaste la ventilación cruzada en tus horas de trabajo.", fontSize = 11.sp, color = OnSurfaceVariantMuted)
                    }
                }
            }
        }

        // Impacto en Tu Día a Día
        Text("Impacto en Tu Día a Día", fontSize = 14.sp, fontWeight = FontWeight.Bold)

        listOf(
            Triple("Calidad del Sueño", "+22 min de sueño profundo", Icons.Default.Bedtime),
            Triple("Foco en Teletrabajo", "0 picos de fatiga por CO₂", Icons.Default.Psychology),
            Triple("Eficiencia Térmica", "Confort equilibrado constante", Icons.Default.Thermostat)
        ).forEach { (title, subtitle, icon) ->
            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = PureWhite),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Box(
                        modifier = Modifier.size(38.dp).background(SkySurfaceContainerLow, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(imageVector = icon, contentDescription = null, tint = DeepTeal, modifier = Modifier.size(20.dp))
                    }
                    Column {
                        Text(title, fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                        Text(subtitle, fontSize = 11.sp, color = DeepTeal, fontWeight = FontWeight.Medium)
                    }
                }
            }
        }
    }
}
