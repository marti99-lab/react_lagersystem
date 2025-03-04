# react_lagersystem
Building an online inventory management system with React, now using a more modern version.

Planned File Structure
```bash
│── public/               # Statische Dateien (z. B. HTML, Icons)
│── src/                  # Hauptverzeichnis für den Quellcode
│   ├── assets/           # Statische Assets wie Bilder, Fonts, SVGs
│   ├── components/       # Wiederverwendbare UI-Komponenten
│   ├── pages/            # Seiten der App (jeder Eintrag ist eine Route)
│   ├── hooks/            # Eigene benutzerdefinierte Hooks
│   ├── context/          # React Context API für globalen Zustand
│   ├── services/         # API-Fetch-Methoden und Backend-Interaktionen
│   ├── styles/           # Globale CSS- oder SCSS-Dateien
│   ├── utils/            # Hilfsfunktionen, Helfer-Methoden, Formatter, etc.
│
│   ├── App.css           # Globale Stile für die App-Komponente
│   ├── App.tsx           # Haupt-App-Komponente
│   ├── index.css         # Zentrale CSS-Datei
│   ├── main.tsx          # Einstiegspunkt der App, rendert `<App />`
│   ├── vite-env.d.ts     # Typen für Vite
│
├── .gitignore            # Dateien, die nicht in Git verfolgt werden sollen
├── eslint.config.js      # ESLint-Konfigurationsdatei für Code-Qualität
├── index.html            # Haupt-HTML-Datei der App
├── package.json          # Projekt- und Abhängigkeitsverwaltung
├── README.md             # Dokumentation des Projekts
├── tsconfig.app.json     # TypeScript-Konfiguration für die App
├── tsconfig.json         # Allgemeine TypeScript-Konfiguration
├── tsconfig.node.json    # TypeScript-Konfiguration für Node.js
├── vite.config.ts        # Vite-Konfigurationsdatei für das Projekt


```




# create the app
npm create vite@latest . --template react
npm install
npm run dev

# to create components
