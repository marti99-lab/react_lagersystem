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
