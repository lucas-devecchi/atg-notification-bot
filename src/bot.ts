import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { obtenerUltimoCapitulo } from './playwright.ts';
import { exec } from 'child_process';


// Solución para __dirname en ES Modules
function getArchivoTexto() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const archivoUltimoCapitulo = path.join(__dirname, 'ultimoCapitulo.txt');

  return archivoUltimoCapitulo;
}

console.log('Revisando si hay nuevos capítulos cada 10 minutos...');

cron.schedule('*/10 * * * *', async () => {
  console.log('Revisando último capítulo...');

  const ultimoCapituloDN = await obtenerUltimoCapitulo();
  if (!ultimoCapituloDN) {
    console.log('No se pudo obtener el capítulo.');
    return;
  }

  // Leer ultimoCapitulo.txt
  let capituloGuardado: { texto: string; url: string; } | null = null;
  try {
    const contenido = await fs.readFile(getArchivoTexto(), 'utf-8');
    capituloGuardado = JSON.parse(contenido);
  } catch {
    console.log('El archivo no existe o está vacío.');
  }

  const hayCapituloNuevo = capituloGuardado?.texto !== ultimoCapituloDN.texto;

  if (hayCapituloNuevo) {
    console.log('¡Hay un capítulo nuevo!');

    const chapterData = {
      texto: ultimoCapituloDN.texto,
      url: ultimoCapituloDN.url
    };

    await fs.writeFile(getArchivoTexto(), JSON.stringify(chapterData, null, 2));
    console.log('Archivo txt actualizado con el último capítulo exitosamente!');

    const mensaje = `¡Se publicó ${ultimoCapituloDN.texto}!`;
    const titulo = 'ATG - Nuevo Capítulo';
    exec(`powershell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('${mensaje}', '${titulo}')"`);

  } else {
    console.log('No hay capítulo nuevo.');
  }
});
