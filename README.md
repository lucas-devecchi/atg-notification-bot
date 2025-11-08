# 🧠 ATG Notification Bot

Este bot en Node.js + TypeScript revisa automáticamente la página de [DevilNovels - Contra los Dioses](https://devilnovels.com/contra-los-dioses/) cada cierto tiempo y detecta si se publicó un nuevo capítulo.  
Cuando aparece un capítulo nuevo, muestra una **alerta de Windows** y guarda el último capítulo detectado en un archivo local (`ultimoCapitulo.txt`).

<p align="center">
  <img width="500" height="280" src="https://github.com/user-attachments/assets/998aaa87-f380-4724-927b-49ba4b11f660" alt="image" />
</p>

## 🕒 Funcionamiento

- El bot revisa la web cada **10 minutos**
- Compara si el último capítulo de la página es el mismo que en `ultimoCapitulo.txt`
- Si son distintos, hay nuevo capítulo:
  - Muestra una alerta en Windows con el título del nuevo capítulo
  - Actualiza el archivo con la nueva información

---

## 📦 Instalación

Si ya posees Node.js 18+ ( Sino lo podés [Descargar Acá](https://nodejs.org/en/download) )

Cloná el repositorio:

```
git clone https://github.com/tuusuario/atg-notification-bot.git
cd atg-notification-bot
```

Instalá las dependencias:

```
npm install
npx playwright install chromium
```

---

## ⚙️ Scripts disponibles

### 🧩 Modo desarrollo

Ejecuta el proyecto directamente en TypeScript usando **ts-node** y **nodemon**:

```
npm run build
npm run dev
```

Esto:
- Transpila el código TypeScript a JavaScript (crea la carpeta `dist/`):
- Compila y ejecuta el código desde `src/`
- Reinicia automáticamente cuando hay cambios en los archivos `.ts`

---

## 🧰 Estructura del proyecto

```
├── src/
│   ├── bot.ts                # Lógica principal (cron, guardado, alerta)
│   ├── playwright.ts         # Scraper con Playwright
│   ├── ultimoCapitulo.txt    # Último capítulo guardado
│   └── ...
├── package.json
├── tsconfig.json
├── .gitignore
└── README.txt

Hecho con ❤️ por Lucas.
