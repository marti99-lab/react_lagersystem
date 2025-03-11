# react_lagersystem
Building an online inventory management system with React, now using a more modern version.

File Structure
```bash
│── public/
│── src/
│   ├── assets/
│   ├── components/
│            └── Header.tsx, Header.css, Footer.tsx, Footer.css, NewMedicineForm.tsx
│   ├── pages/
│            └── Inventory.tsx, Inventory.css,
│   ├── hooks/
│   ├── context/
│   ├── services/
│   ├── styles/
│   ├── utils/
│
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│
├── .gitignore
├── db.json
├── DOKUMENTATION.md
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts


```




# create the app
npm create vite@latest . --template react <br>
npm install <br>
npm run dev

# running the app after cloning the git repository
npm install <br>
npm install -g json-server <br>
npm run dev (First Terminal)<br>
json-server --watch db.json --port 5000 (Second Terminal)
