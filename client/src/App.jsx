import Header from './components/Header';
import Footer from './components/Footer';

import './styles/custom.css';
import './styles/style.css'

import IndexInventario from './features/inventario/pages';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
{/*
        <IndexInventario />
        */
}
        
      </main>
      <Footer />
    </div>
  );
};

export default App;