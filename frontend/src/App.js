import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/brands/')
      .then(res => setBrands(res.data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>BrandBuddy Dashboard</h1>
      <ul>
        {brands.map(brand => (
          <li key={brand.id}>{brand.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
