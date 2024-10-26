import { useState, useEffect } from 'react';
import { motoko_project_backend } from 'declarations/motoko_project_backend';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [greeting, setGreeting] = useState('');

  // Ürünleri almak için kullanılır
  useEffect(() => {
    motoko_project_backend.getAllProducts().then(setProducts);
  }, []);

  // Ürün ekleme formu
  async function handleAddProduct(event) {
    event.preventDefault();
    if (name && price && description) {
      const newProductId = await motoko_project_backend.addProduct(name, parseInt(price), description);
      const newProduct = { id: newProductId, name, price: parseInt(price), description, inStock: true };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setName('');
      setPrice('');
      setDescription('');
    }
  }

  // Selamlaşma fonksiyonu
  function handleGreeting(event) {
    event.preventDefault();
    const userName = event.target.elements.name.value;
    motoko_project_backend.greet(userName).then(setGreeting);
  }

  return (
    <main>
      <h1>Ürün Yönetim Sistemi</h1>

      {/* Selamlaşma Formu */}
      <form onSubmit={handleGreeting}>
        <label htmlFor="name">Adınızı Girin: &nbsp;</label>
        <input id="name" type="text" />
        <button type="submit">Selamla!</button>
      </form>
      <section>{greeting && <p>{greeting}</p>}</section>

      {/* Yeni Ürün Ekleme Formu */}
      <form onSubmit={handleAddProduct}>
        <h2>Yeni Ürün Ekle</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ürün Adı"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Fiyat"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama"
          required
        />
        <button type="submit">Ürünü Ekle</button>
      </form>

      {/* Ürün Listeleme */}
      <section>
        <h2>Ürün Listesi</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - {product.price}₺
              <p>{product.description}</p>
              <p>{product.inStock ? "Stokta" : "Stokta Yok"}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
