import { useState } from 'react';
import './App.css';
import ListProduct from './components/ListProduct';
import Navbar from './components/Navbar';
import CardInput from './components/CardInput';
import { Product } from './components/apiServices';

function App() {
  const [productData, setProductData] = useState<Product | null>(null);

  return (
    <>
      <div className="d-flex flex-column">
        <Navbar />
        <CardInput/>
        {/* {<ListProduct product={productData} />} */}
      </div>
    </>
  );
}

export default App;
