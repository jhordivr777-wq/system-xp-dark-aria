SYSTEM XP V4 — DARK ARIA + GOOGLE SHEETS

Esta versión conserva el paquete DARK ARIA original: avatares, interfaz, PWA, música SYSTEM/BOSS y efectos de audio.

Google Sheets / Apps Script
- Endpoint configurado: https://script.google.com/macros/s/AKfycbyyw9-EbdduMgqZetdY8md0t7WdBTL4h6VJmCpYUEm2nLCqVcC7oPiAYnlVMm_tGmHZ/exec
- Al iniciar, SYSTEM XP lee PLAYER en segundo plano (nombre, XP y racha).
- Al completar una misión, SYSTEM XP envía el registro y los totales al Apps Script.
- REGISTRO evita duplicados por ID.
- B5/B6/B7/B8 solo se escriben si esas celdas no contienen fórmulas; así se protegen fórmulas existentes.
- Se usa POST como text/plain para evitar un preflight CORS innecesario.

Apps Script
1. Abre Extensiones > Apps Script en tu hoja.
2. Copia apps-script/Code.gs completo.
3. Implementa como aplicación web y crea una nueva versión después de cada cambio.
4. Usa acceso que permita que tu página pueda llamar al endpoint.

Uso local
- Para desarrollo, abre con VS Code Live Server o un servidor HTTP local.
- Pulsa ENTRAR AL SISTEMA para permitir reproducción de audio.

Audio
- Música SYSTEM: audio/dark_aria.mp3
- Música BOSS: audio/boss_theme.wav
- Efecto misión: audio/mission_complete.wav
- Efecto nivel: audio/level_up.wav
- Efecto rango: audio/rank_up.wav
