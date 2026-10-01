package pe.tecsup.nubope.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColorScheme = lightColorScheme(
    primary = DeepTeal,
    onPrimary = OnPrimaryTeal,
    primaryContainer = PrimaryContainerTeal,
    onPrimaryContainer = OnPrimaryContainerTeal,
    secondary = MintGreen,
    onSecondary = OnPrimaryTeal,
    secondaryContainer = SecondaryContainerMint,
    onSecondaryContainer = OnSecondaryContainerMint,
    tertiary = WarmAmber,
    onTertiary = OnPrimaryTeal,
    tertiaryContainer = WarmAmberContainer,
    background = SkySurface,
    onBackground = OnSurfaceDark,
    surface = SkySurface,
    onSurface = OnSurfaceDark,
    surfaceVariant = SkySurfaceContainerHigh,
    onSurfaceVariant = OnSurfaceVariantMuted,
    outline = OutlineGrey,
    outlineVariant = OutlineVariant,
    error = AlertRed,
    errorContainer = AlertRedContainer
)

@Composable
fun NuboPeTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}
