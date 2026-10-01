package pe.tecsup.nubope

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
                            onProfileClick = { /* Abrir diálogo de perfil */ }
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
}
