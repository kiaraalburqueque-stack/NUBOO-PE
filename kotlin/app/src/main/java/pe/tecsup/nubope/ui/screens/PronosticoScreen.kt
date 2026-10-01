package pe.tecsup.nubope.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
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
fun PronosticoScreen(viewModel: NuboViewModel) {
    val scrollState = rememberScrollState()
    val slots = viewModel.slots.value
    val hardware = viewModel.hardwareState.value

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Previsión Bioclimática Header
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = SkySurfaceContainerLow),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "PREVISIÓN BIOCLIMÁTICA",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = DeepTeal
                )
                Text(
                    text = "Mejores momentos para ventilar hoy",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = OnSurfaceDark,
                    modifier = Modifier.padding(vertical = 4.dp)
                )
                Text(
                    text = "Analizamos la calidad del aire exterior, el tráfico y la acumulación de CO₂ para indicarte cuándo renovar el aire sin perder confort térmico.",
                    fontSize = 12.sp,
                    color = OnSurfaceVariantMuted
                )
            }
        }

        // Horizontal Timeline Slots
        Text(
            text = "Ventanas Horarias",
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold
        )

        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(horizontal = 4.dp)
        ) {
            items(slots) { slot ->
                val isAvoid = slot.badge == "Evitar Abrir"
                Card(
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = if (isAvoid) SkySurfaceContainerHigh else PureWhite
                    ),
                    modifier = Modifier.width(260.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Surface(
                                shape = CircleShape,
                                color = if (isAvoid) AlertRedContainer else SecondaryContainerMint
                            ) {
                                Text(
                                    text = slot.badge,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (isAvoid) AlertRed else OnSecondaryContainerMint,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }
                            Text(text = slot.duration, fontSize = 11.sp, color = OnSurfaceVariantMuted)
                        }

                        Spacer(modifier = Modifier.height(10.dp))

                        Text(text = slot.timeRange, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = DeepTeal)
                        Text(text = slot.description, fontSize = 11.sp, color = OnSurfaceDark, modifier = Modifier.padding(vertical = 4.dp))

                        Spacer(modifier = Modifier.height(8.dp))

                        Text(text = "${slot.extra} · ${slot.temp}", fontSize = 11.sp, color = OnSurfaceVariantMuted)

                        Spacer(modifier = Modifier.height(12.dp))

                        if (isAvoid) {
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = PureWhite,
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Text(
                                    text = "Sellar ambiente",
                                    fontSize = 11.sp,
                                    color = OnSurfaceVariantMuted,
                                    modifier = Modifier.padding(vertical = 8.dp),
                                    textAlign = androidx.compose.ui.text.style.TextAlign.Center
                                )
                            }
                        } else {
                            Button(
                                onClick = { viewModel.toggleSlotReminder(slot.id) },
                                shape = RoundedCornerShape(10.dp),
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = if (slot.isProgrammed) SecondaryContainerMint else DeepTeal
                                ),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Text(
                                    text = if (slot.isProgrammed) "Recordatorio fijado" else "Avisarme",
                                    color = if (slot.isProgrammed) OnSecondaryContainerMint else Color.White,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                }
            }
        }

        // Aviso Luminoso en NUBO-PE
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = PureWhite),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("Aviso luminoso en NUBO-PE", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        Text("Anillo LED interactivo", fontSize = 11.sp, color = OnSurfaceVariantMuted)
                    }
                    Switch(
                        checked = hardware.ledNotificationActive,
                        onCheckedChange = { /* toggle */ }
                    )
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "El anillo LED de tu sensor NUBO-PE pulsará con una brisa esmeralda 5 minutos antes de la hora ideal.",
                    fontSize = 12.sp,
                    color = OnSurfaceVariantMuted
                )
            }
        }
    }
}
