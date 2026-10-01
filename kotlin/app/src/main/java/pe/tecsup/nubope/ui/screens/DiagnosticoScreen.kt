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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pe.tecsup.nubope.ui.theme.*
import pe.tecsup.nubope.ui.viewmodel.NuboViewModel

@Composable
fun DiagnosticoScreen(viewModel: NuboViewModel) {
    val scrollState = rememberScrollState()
    val room = viewModel.currentRoom

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Transparencia Inteligente
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = PureWhite),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Psychology,
                        contentDescription = null,
                        tint = DeepTeal,
                        modifier = Modifier.size(20.dp)
                    )
                    Text(
                        text = "TRANSPARENCIA INTELIGENTE",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = DeepTeal
                    )
                }

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "¿Por qué ventilar ahora?",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = OnSurfaceDark
                )

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "Detectamos acumulación natural de CO₂ tras 2 horas de concentración en ${room.name}. El exterior presenta condiciones idóneas para renovar el ambiente y revitalizar tu energía.",
                    fontSize = 12.sp,
                    color = OnSurfaceVariantMuted,
                    lineHeight = 18.sp
                )

                Spacer(modifier = Modifier.height(10.dp))

                Surface(
                    shape = RoundedCornerShape(10.dp),
                    color = SkySurfaceContainerLow,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(10.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Info,
                            contentDescription = null,
                            tint = WarmAmber,
                            modifier = Modifier.size(18.dp)
                        )
                        Text(
                            text = "Momento óptimo: aire fresco sin polen ni polución alta.",
                            fontSize = 11.sp,
                            color = OnSurfaceVariantMuted
                        )
                    }
                }
            }
        }

        // Comparativa en tiempo real
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = PureWhite),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Comparativa en tiempo real",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )

                Spacer(modifier = Modifier.height(12.dp))

                // Métricas
                listOf(
                    Triple("Calidad del aire", "${room.status} (Respiración sostenida)", "Óptima y pura (Brisa limpia)"),
                    Triple("Temperatura", "${room.temp}°C Agradable", "19°C Refrescante"),
                    Triple("Humedad", "${room.humidity}% Estable", "48% Equilibrada"),
                    Triple("Alérgenos", "Mínimos (Polvo bajo control)", "Muy bajo (Sin tráfico)")
                ).forEach { (title, inside, outside) ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 6.dp),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(title, fontSize = 11.sp, color = OnSurfaceVariantMuted)
                            Text(inside, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                        }
                        Column(modifier = Modifier.weight(1f)) {
                            Text("Exterior", fontSize = 11.sp, color = MintGreen)
                            Text(outside, fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = MintGreen)
                        }
                    }
                }
            }
        }

        // Consejo de ventilación cruzada
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = DeepTeal),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "CONSEJO DE VENTILACIÓN CRUZADA",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = SecondaryContainerMint
                )
                Text(
                    text = "Corriente suave de 5 minutos",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    modifier = Modifier.padding(vertical = 4.dp)
                )
                Text(
                    text = "\"Abre la ventana del balcón y la puerta del pasillo para crear una corriente suave de 5 minutos.\"",
                    fontSize = 12.sp,
                    color = Color.White.copy(alpha = 0.9f)
                )

                Spacer(modifier = Modifier.height(14.dp))

                Button(
                    onClick = { /* Iniciar temporizador 5 min */ },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = PureWhite),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Icon(imageVector = Icons.Default.Timer, contentDescription = null, tint = DeepTeal)
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Iniciar temporizador de 5 min", color = DeepTeal, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
