# React Lagersystem – Dokumentation

Diese Datei dient zur Protokollierung aller wichtigen Gedanken, Code-Änderungen und Architektur-Entscheidungen während der Entwicklung.

---
File Structure
```bash
│── public/               # Enthält statische Dateien wie das Haupt-HTML-Dokument, Favicons usw.
│── src/                  # Hauptverzeichnis für den Quellcode der Anwendung
│   ├── assets/           # Statische Assets wie Bilder, Icons, Fonts, SVGs
│   ├── components/       # Wiederverwendbare UI-Komponenten (z. B. Header, Footer, Buttons)
│   ├── pages/            # Seiten der Anwendung (jede Route bekommt eine eigene Datei)
│   ├── hooks/            # Eigene benutzerdefinierte Hooks für wiederverwendbare Logik
│   ├── context/          # React Context API für globalen Zustand
│   ├── services/         # API-Fetch-Methoden und Backend-Interaktionen
│   ├── styles/           # Globale CSS- oder SCSS-Dateien für das Styling
│   ├── utils/            # Hilfsfunktionen, z. B. für Datenformatierung oder Berechnungen
│
│   ├── App.css           # Globale Stile für die gesamte App
│   ├── App.tsx           # Haupt-App-Komponente, die alle anderen Komponenten zusammenführt
│   ├── index.css         # Zentrale CSS-Datei mit grundlegenden Stilen
│   ├── main.tsx          # Einstiegspunkt der App, rendert `<App />`
│   ├── vite-env.d.ts     # TypeScript-Typendeklarationen für Vite
│
├── .gitignore            # Definiert Dateien und Ordner, die nicht mit Git hochgeladen werden sollen
├── db.json               # Simulierte API-Datenbank für `json-server`
├── DOKUMENTATION.md      # Dokumentation des Projekts mit Entwicklungsnotizen
├── eslint.config.js      # Konfiguration für ESLint zur Code-Qualitätssicherung
├── index.html            # Haupt-HTML-Datei, in die React eingebunden wird
├── package.json          # Enthält Projektdetails und verwaltet Abhängigkeiten mit npm
├── README.md             # Projektbeschreibung und Anleitungen zur Nutzung
├── tsconfig.app.json     # TypeScript-Konfiguration speziell für die App
├── tsconfig.json         # Allgemeine TypeScript-Konfiguration
├── tsconfig.node.json    # TypeScript-Konfiguration für Node.js
├── vite.config.ts        # Konfigurationsdatei für Vite (Modul-Bundler)

```

##  **1. Projektstart**
### **Initiale Einrichtung**
Projekt mit Vite erstellt:
  ```bash
  npm create vite@latest . --template react
  npm install
  npm run dev
  ``` 

##  **2. Header und Footer erstellt**
### **Hier Bsp. Code für Header.tsx und Header.css analog für Footer**
Header.tsx:
  ```bash
import './Header.css'

const Header = () => {
  return (
<header className="header">
<p>Das ist der Header</p>
</header>
  )
}

export default Header
  ``` 
Header.css:
  ```bash
.header p {
    font-size: 1.8em;
    font-weight: bold;
    color: rgb(25, 158, 235);
}
  ``` 
##  **3. Navigation mit React Router**
### **React Router installiert**
npm install react-router-dom

### **Routes in App.tsx**
```bash
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Inventory from './pages/Inventory';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Inventory />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
``` 

##  **4. Inventarliste**
### **als Tabelle mit Testdaten erstellt**
Inventory.tsx:
  ```bash
import "./Inventory.css";

const Inventory = () => {
  const items = [
    { id: 1, orderNumber: "ORD-1001", name: "Paracetamol", stock: 48, sold: 20, weight: "500 mg", price: 16.34, discount: 5 },
    { id: 2, orderNumber: "ORD-1002", name: "Ibuprofen", stock: 65, sold: 12, weight: "400 mg", price: 22.75, discount: 10 }
  ];

  return (
    <div className="inventory">
      <h2>Inventarliste</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bestellnummer</th>
            <th>Produkt</th>
            <th>Anzahl im Lager</th>
            <th>Anzahl verkauft</th>
            <th>Gewicht</th>
            <th>Preis (€)</th>
            <th>Rabatt (%)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.orderNumber}</td>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.sold}</td>
              <td>{item.weight}</td>
              <td>{item.price.toFixed(2)} €</td>
              <td>{item.discount}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
  ``` 
Inventory.css:
  ```bash
.inventory table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .inventory th, .inventory td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .inventory th {
    color: rgb(25, 158, 235);
  }
  ``` 


##  **5. API-Anbindung**
### **mit json-server simuliert**
npm install -g json-server
Datei db.json erstellt

db.json:
  ```bash
{
  "inventory": [
    {
      "id": 1,
      "orderNumber": "ORD-1001",
      "name": "Paracetamol",
      "stock": 48,
      "sold": 20,
      "weight": "500 mg",
      "price": 16.34,
      "discount": 5
    }
    // Weitere Produkte folgen in dieser Struktur
  ]
}
  ``` 
## **test**
### **API-Server gestartet**
json-server --watch db.json --port 5000

### **Fetch-Request in Inventory.tsx eingebaut**
Inventory.tsx:
  ```bash
import { useState, useEffect } from "react";
import "./Inventory.css";

type InventoryItem = {
  id: number;
  orderNumber: string;
  name: string;
  stock: number;
  sold: number;
  weight: string;
  price: number;
  discount: number;
};

const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/inventory")
      .then((response) => response.json())
      .then((data: InventoryItem[]) => {
        console.log("Daten von API:", data);
        setItems(data);
      })
      .catch((error) => console.error("Fehler beim Abruf:", error));
  }, []);

  return (
    <div className="inventory">
      <h2>Inventarliste</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bestellnummer</th>
            <th>Produkt</th>
            <th>Anzahl im Lager</th>
            <th>Anzahl verkauft</th>
            <th>Gewicht</th>
            <th>Preis (€)</th>
            <th>Rabatt (%)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.orderNumber}</td>
                <td>{item.name}</td>
                <td>{item.stock}</td>
                <td>{item.sold}</td>
                <td>{item.weight}</td>
                <td>{item.price.toFixed(2)} €</td>
                <td>{item.discount}%</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>Keine Daten verfügbar</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
  ``` 

