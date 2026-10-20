// ============================================================
//  FECHAS
// ============================================================

/** "2026-10-20T07:42:00.000Z" → "20-10-2026, 4:42:00" (hora de Chile) */
export function formatearFecha(textoFecha) {
    return new Date(textoFecha).toLocaleString('es-CL');
}