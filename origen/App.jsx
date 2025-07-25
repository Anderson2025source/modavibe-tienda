import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Heart, Star, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Card, CardContent } from './components/ui/card';
import Cart from './components/Cart';
import ProductFilter from './components/ProductFilter';
import ProductModal from './components/ProductModal';
import './App.css';

// Importar imágenes
import menImage1 from './assets/W01wYvG3xdVD.jpg';
import menImage2 from './assets/IYbHvwuA8E74.jpg';
import menImage3 from './assets/FDBxiCG8L7pe.jpg';
import menImage4 from './assets/oIaondtG42vG.jpg';
import womenImage1 from './assets/2GUFmh1ELjNc.jpg';
import womenImage2 from './assets/KTxC5rfgbLp7.jpg';
import womenImage3 from './assets/9LR3AwzAsK9J.jpg';
import womenImage4 from './assets/g1HA0cUt90A6.png';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 999 },
    minRating: 0,
    onSale: false
  });

  // Datos de productos
  const products = [
    {
      id: 1,
      name: 'Chaqueta Moderna Hombre',
      price: 89.99,
      originalPrice: 129.99,
      image: menImage1,
      category: 'hombre',
      rating: 4.8,
      discount: 30
    },
    {
      id: 2,
      name: 'Conjunto Casual Elegante',
      price: 149.99,
      originalPrice: 199.99,
      image: menImage2,
      category: 'hombre',
      rating: 4.9,
      discount: 25
    },
    {
      id: 3,
      name: 'Look Profesional Premium',
      price: 199.99,
      originalPrice: 279.99,
      image: menImage3,
      category: 'hombre',
      rating: 4.7,
      discount: 28
    },
    {
      id: 4,
      name: 'Estilo Urbano Moderno',
      price: 79.99,
      originalPrice: 109.99,
      image: menImage4,
      category: 'hombre',
      rating: 4.6,
      discount: 27
    },
    {
      id: 5,
      name: 'Outfit Elegante Mujer',
      price: 119.99,
      originalPrice: 159.99,
      image: womenImage1,
      category: 'mujer',
      rating: 4.9,
      discount: 25
    },
    {
      id: 6,
      name: 'Colección Tendencia 2025',
      price: 169.99,
      originalPrice: 229.99,
      image: womenImage2,
      category: 'mujer',
      rating: 4.8,
      discount: 26
    },
    {
      id: 7,
      name: 'Looks Inspiración Casual',
      price: 139.99,
      originalPrice: 189.99,
      image: womenImage3,
      category: 'mujer',
      rating: 4.7,
      discount: 26
    },
    {
      id: 8,
      name: 'Vestido Moderno USA',
      price: 99.99,
      originalPrice: 139.99,
      image: womenImage4,
      category: 'mujer',
      rating: 4.6,
      discount: 28
    }
  ];

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id && item.size === product.size);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.size === product.size
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: product.quantity || 1 }]);
    }
  };

  const updateCartItem = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
    const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
    const matchesRating = product.rating >= filters.minRating;
    const matchesOnSale = !filters.onSale || product.discount > 0;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesOnSale;
  });

  const Header = () => (
    <header className="sticky top-0 z-50 glass-effect border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gradient">ModaVibe</h1>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary font-semibold' : ''}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => setCurrentPage('women')}
              className={`hover:text-primary transition-colors ${currentPage === 'women' ? 'text-primary font-semibold' : ''}`}
            >
              Mujer
            </button>
            <button 
              onClick={() => setCurrentPage('men')}
              className={`hover:text-primary transition-colors ${currentPage === 'men' ? 'text-primary font-semibold' : ''}`}
            >
              Hombre
            </button>
            <button 
              onClick={() => setCurrentPage('collections')}
              className={`hover:text-primary transition-colors ${currentPage === 'collections' ? 'text-primary font-semibold' : ''}`}
            >
              Colecciones
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`hover:text-primary transition-colors ${currentPage === 'contact' ? 'text-primary font-semibold' : ''}`}
            >
              Contacto
            </button>
          </nav>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Buscar productos..." 
                className="pl-10 bg-background/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Iconos de acción */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 cart-badge bg-primary text-primary-foreground">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar productos..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button onClick={() => setCurrentPage('home')} className="text-left hover:text-primary transition-colors">Inicio</button>
              <button onClick={() => setCurrentPage('women')} className="text-left hover:text-primary transition-colors">Mujer</button>
              <button onClick={() => setCurrentPage('men')} className="text-left hover:text-primary transition-colors">Hombre</button>
              <button onClick={() => setCurrentPage('collections')} className="text-left hover:text-primary transition-colors">Colecciones</button>
              <button onClick={() => setCurrentPage('contact')} className="text-left hover:text-primary transition-colors">Contacto</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  const Hero = () => (
    <section className="hero-gradient py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="fade-in">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Viste con Estilo
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubre las últimas tendencias en moda moderna. Elegancia y comodidad en cada prenda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg px-8 py-3">
              Explorar Colección
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Ver Ofertas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  const ProductCard = ({ product }) => (
    <Card className="product-card overflow-hidden border-0 shadow-lg">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover cursor-pointer"
          onClick={() => setSelectedProduct(product)}
        />
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            -{product.discount}%
          </Badge>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 cursor-pointer hover:text-primary transition-colors" onClick={() => setSelectedProduct(product)}>
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm text-muted-foreground">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <Button onClick={() => addToCart({ ...product, size: 'M' })} className="btn-primary">
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const ProductGrid = ({ title, products, category, showFilters = false }) => {
    const productsToShow = category 
      ? filteredProducts.filter(product => product.category === category)
      : filteredProducts;

    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              {title}
            </h2>
            {showFilters && (
              <Button 
                variant="outline" 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filtros</span>
              </Button>
            )}
          </div>
          
          {productsToShow.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {productsToShow.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  const Categories = () => (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
          Explora por Categorías
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            className="category-card relative h-64 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setCurrentPage('women')}
          >
            <img 
              src={womenImage1} 
              alt="Moda Mujer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-2">Mujer</h3>
                <p className="text-lg">Elegancia y estilo</p>
              </div>
            </div>
          </div>
          <div 
            className="category-card relative h-64 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setCurrentPage('men')}
          >
            <img 
              src={menImage1} 
              alt="Moda Hombre"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-2">Hombre</h3>
                <p className="text-lg">Sofisticación moderna</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Contact = () => (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
          Contacto
        </h2>
        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <Input placeholder="Tu nombre completo" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mensaje</label>
              <textarea 
                className="w-full p-3 border rounded-md resize-none h-32"
                placeholder="¿En qué podemos ayudarte?"
              ></textarea>
            </div>
            <Button className="w-full btn-primary">
              Enviar Mensaje
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">ModaVibe</h3>
            <p className="text-primary-foreground/80">
              Tu destino para la moda moderna y elegante. Calidad y estilo en cada prenda.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><button onClick={() => setCurrentPage('women')}>Mujer</button></li>
              <li><button onClick={() => setCurrentPage('men')}>Hombre</button></li>
              <li><button onClick={() => setCurrentPage('collections')}>Colecciones</button></li>
              <li>Accesorios</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Guía de tallas</li>
              <li>Envíos y devoluciones</li>
              <li>Preguntas frecuentes</li>
              <li><button onClick={() => setCurrentPage('contact')}>Contacto</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Pinterest</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
          <p>&copy; 2025 ModaVibe. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );

  const renderPage = () => {
    switch(currentPage) {
      case 'women':
        return <ProductGrid title="Moda Mujer" products={products} category="mujer" showFilters={true} />;
      case 'men':
        return <ProductGrid title="Moda Hombre" products={products} category="hombre" showFilters={true} />;
      case 'collections':
        return <ProductGrid title="Todas las Colecciones" products={products} showFilters={true} />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero />
            <Categories />
            <ProductGrid title="Productos Destacados" products={products.slice(0, 4)} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer />
      
      {/* Modales y componentes flotantes */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateCartItem={updateCartItem}
        removeFromCart={removeFromCart}
      />
      
      <ProductFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
      
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default App;

