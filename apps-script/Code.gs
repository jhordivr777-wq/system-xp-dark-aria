function doGet() {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("PLAYER");

  const player = {
    nombre: sheet.getRange("B4").getValue(),
    xp: sheet.getRange("B5").getValue(),
    nivel: sheet.getRange("B6").getValue(),
    rango: sheet.getRange("B7").getValue(),
    racha: sheet.getRange("B8").getValue()
  };

  return ContentService
    .createTextOutput(JSON.stringify(player))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const datos = JSON.parse(e.postData.contents || "{}");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const player = ss.getSheetByName("PLAYER");
    const registro = ss.getSheetByName("REGISTRO");

    if (!player) throw new Error('No existe la hoja PLAYER');

    if (datos.nombre !== undefined && String(datos.nombre).trim()) {
      if (!player.getRange("B4").getFormula()) {
        player.getRange("B4").setValue(String(datos.nombre));
      }
    }

    if (datos.record && registro && datos.record.id) {
      const record = datos.record;
      const lastRow = Math.max(registro.getLastRow(), 3);
      const rowCount = Math.max(lastRow - 2, 1);
      const ids = registro.getRange(3, 1, rowCount, 1).getValues().flat().map(String);
      const id = String(record.id);

      if (!ids.includes(id)) {
        registro.appendRow([
          id,
          record.date || "",
          record.time || "",
          record.missionId || "",
          record.mission || "",
          record.attr || "",
          Number(record.xp) || 0,
          record.type || "Misión"
        ]);
      }
    }

    if (datos.xp !== undefined && Number.isFinite(Number(datos.xp))) {
      const xp = Number(datos.xp);
      const b5 = player.getRange("B5");
      if (!b5.getFormula()) {
        b5.setValue(xp);
      }

      const nivel = Math.max(1, Math.floor((1 + Math.sqrt(1 + 8 * xp / 100)) / 2));
      const rango = getRank_(nivel);

      const b6 = player.getRange("B6");
      if (!b6.getFormula()) b6.setValue(nivel);

      const b7 = player.getRange("B7");
      if (!b7.getFormula()) b7.setValue(rango);
    }

    if (datos.racha !== undefined && Number.isFinite(Number(datos.racha))) {
      const b8 = player.getRange("B8");
      if (!b8.getFormula()) b8.setValue(Number(datos.racha));
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        ok: true,
        mensaje: "Datos guardados correctamente"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getRank_(level) {
  if (level <= 24) return "E";
  if (level <= 49) return "D";
  if (level <= 74) return "C";
  if (level <= 99) return "B";
  if (level <= 149) return "A";
  if (level <= 199) return "S";
  return "Nacional";
}
