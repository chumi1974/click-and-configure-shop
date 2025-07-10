import { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid, List } from 'lucide-react';
import { FilterOptions } from '@/types';
import ProductCard from '@/components/catalog/ProductCard';
import ProductFilters from '@/components/catalog/ProductFilters';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    inStock: false,
    bundles: false
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesStock = !filters.inStock || product.inStock;
      const matchesBundles = !filters.bundles || product.isBundle;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesBundles;
    });
  }, [searchTerm, filters]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>
          <p className="text-muted-foreground">
            Descubre nuestras soluciones tecnológicas para empresas
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="flex items-center gap-2"
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              {viewMode === 'grid' ? 'Lista' : 'Cuadrícula'}
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.categories.length > 0 || filters.inStock || filters.bundles) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.categories.map(category => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1">
                {category}
                <button
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    categories: prev.categories.filter(c => c !== category)
                  }))}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
            {filters.inStock && (
              <Badge variant="secondary" className="flex items-center gap-1">
                En Stock
                <button
                  onClick={() => setFilters(prev => ({ ...prev, inStock: false }))}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.bundles && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Solo Bundles
                <button
                  onClick={() => setFilters(prev => ({ ...prev, bundles: false }))}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <ProductFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          )}

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">
                {filteredProducts.length} productos encontrados
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No se encontraron productos</p>
                <p className="text-muted-foreground">Intenta ajustar los filtros o términos de búsqueda</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;