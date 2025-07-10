import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Settings, ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/types';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ConfiguredProduct extends Product {
  configuredPrice: number;
  selectedConfiguration: {
    storage?: string;
    memory?: string;
    bandwidth?: string;
    users?: number;
    duration?: string;
    features?: string[];
  };
  quantity: number;
}

interface Solution {
  id: string;
  name: string;
  description: string;
  products: ConfiguredProduct[];
  totalPrice: number;
  discount: number;
}

const ConfigureSolution: React.FC = () => {
  const [currentSolution, setCurrentSolution] = useState<Solution>({
    id: '',
    name: 'Mi Solución Personalizada',
    description: 'Solución configurada para mis necesidades específicas',
    products: [],
    totalPrice: 0,
    discount: 0
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [configuringProduct, setConfiguringProduct] = useState<Product | null>(null);
  const [productConfig, setProductConfig] = useState<ConfiguredProduct['selectedConfiguration']>({});

  const { addItem } = useCart();
  const { toast } = useToast();

  const categories = ['all', 'comunicaciones', 'ciberseguridad', 'cloud', 'conectividad'];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addProductToSolution = (product: Product) => {
    setConfiguringProduct(product);
    setProductConfig({
      storage: '256GB',
      memory: '8GB',
      bandwidth: '100Mbps',
      users: 10,
      duration: '12 meses',
      features: []
    });
  };

  const confirmProductConfiguration = () => {
    if (!configuringProduct) return;

    const basePrice = configuringProduct.price;
    const configMultiplier = calculateConfigMultiplier(productConfig);
    const configuredPrice = basePrice * configMultiplier;

    const configuredProduct: ConfiguredProduct = {
      ...configuringProduct,
      configuredPrice,
      selectedConfiguration: productConfig,
      quantity: 1
    };

    setCurrentSolution(prev => ({
      ...prev,
      products: [...prev.products, configuredProduct],
      totalPrice: prev.totalPrice + configuredPrice
    }));

    setConfiguringProduct(null);
    setProductConfig({});

    toast({
      title: "Producto configurado",
      description: `${configuringProduct.name} se ha añadido a tu solución`,
    });
  };

  const calculateConfigMultiplier = (config: ConfiguredProduct['selectedConfiguration']): number => {
    let multiplier = 1;
    
    if (config.storage === '512GB') multiplier += 0.3;
    if (config.storage === '1TB') multiplier += 0.6;
    if (config.memory === '16GB') multiplier += 0.25;
    if (config.memory === '32GB') multiplier += 0.5;
    if (config.bandwidth === '500Mbps') multiplier += 0.4;
    if (config.bandwidth === '1Gbps') multiplier += 0.8;
    if (config.users && config.users > 50) multiplier += 0.2;
    if (config.duration === '24 meses') multiplier += 0.1;
    if (config.duration === '36 meses') multiplier += 0.15;
    
    return multiplier;
  };

  const updateProductQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeProductFromSolution(productId);
      return;
    }

    setCurrentSolution(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === productId ? { ...p, quantity: newQuantity } : p
      ),
      totalPrice: prev.products.reduce((total, p) => 
        total + (p.id === productId ? p.configuredPrice * newQuantity : p.configuredPrice * p.quantity), 0
      )
    }));
  };

  const removeProductFromSolution = (productId: string) => {
    setCurrentSolution(prev => {
      const newProducts = prev.products.filter(p => p.id !== productId);
      return {
        ...prev,
        products: newProducts,
        totalPrice: newProducts.reduce((total, p) => total + (p.configuredPrice * p.quantity), 0)
      };
    });
  };

  const addSolutionToCart = () => {
    currentSolution.products.forEach(product => {
      addItem(product, product.quantity, {
        configuration: JSON.stringify(product.selectedConfiguration),
        solutionName: currentSolution.name
      });
    });

    toast({
      title: "Solución añadida al carrito",
      description: `${currentSolution.products.length} productos configurados añadidos`,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Configurador Principal */}
            <div className="lg:col-span-2 space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
                  Configurador de Soluciones
                </h1>
                <p className="text-lg text-muted-foreground">
                  Selecciona y configura productos para crear tu solución perfecta
                </p>
              </div>

              {/* Filtros de Categorías */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Seleccionar Productos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        className="capitalize"
                      >
                        {category === 'all' ? 'Todos' : category}
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProducts.map(product => (
                      <Card key={product.id} className="hover-scale cursor-pointer">
                        <CardContent className="p-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-semibold mb-2">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-price">
                              €{product.price}
                            </span>
                            <Button 
                              size="sm"
                              onClick={() => addProductToSolution(product)}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Configurar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Panel de Solución */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-center">Tu Solución</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="solution-name">Nombre de la solución</Label>
                    <Input
                      id="solution-name"
                      value={currentSolution.name}
                      onChange={(e) => setCurrentSolution(prev => ({
                        ...prev,
                        name: e.target.value
                      }))}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    {currentSolution.products.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Añade productos para comenzar a configurar tu solución
                      </p>
                    ) : (
                      currentSolution.products.map(product => (
                        <div key={product.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProductFromSolution(product.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateProductQuantity(product.id, product.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium px-2">{product.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateProductQuantity(product.id, product.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-xs text-muted-foreground">
                            Configuración personalizada aplicada
                          </div>
                          
                          <div className="text-right">
                            <span className="font-semibold text-price">
                              €{(product.configuredPrice * product.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {currentSolution.products.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-price">€{currentSolution.totalPrice.toFixed(2)}</span>
                        </div>
                        
                        <Button 
                          className="w-full"
                          onClick={addSolutionToCart}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Añadir Solución al Carrito
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Modal de Configuración */}
        {configuringProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Configurar {configuringProduct.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Almacenamiento */}
                  <div className="space-y-3">
                    <Label>Almacenamiento</Label>
                    <Select
                      value={productConfig.storage}
                      onValueChange={(value) => setProductConfig(prev => ({...prev, storage: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="256GB">256GB (+€0)</SelectItem>
                        <SelectItem value="512GB">512GB (+30%)</SelectItem>
                        <SelectItem value="1TB">1TB (+60%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Memoria */}
                  <div className="space-y-3">
                    <Label>Memoria RAM</Label>
                    <Select
                      value={productConfig.memory}
                      onValueChange={(value) => setProductConfig(prev => ({...prev, memory: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8GB">8GB (+€0)</SelectItem>
                        <SelectItem value="16GB">16GB (+25%)</SelectItem>
                        <SelectItem value="32GB">32GB (+50%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ancho de banda */}
                  <div className="space-y-3">
                    <Label>Ancho de Banda</Label>
                    <Select
                      value={productConfig.bandwidth}
                      onValueChange={(value) => setProductConfig(prev => ({...prev, bandwidth: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100Mbps">100Mbps (+€0)</SelectItem>
                        <SelectItem value="500Mbps">500Mbps (+40%)</SelectItem>
                        <SelectItem value="1Gbps">1Gbps (+80%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duración */}
                  <div className="space-y-3">
                    <Label>Duración del Contrato</Label>
                    <Select
                      value={productConfig.duration}
                      onValueChange={(value) => setProductConfig(prev => ({...prev, duration: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12 meses">12 meses (+€0)</SelectItem>
                        <SelectItem value="24 meses">24 meses (+10%)</SelectItem>
                        <SelectItem value="36 meses">36 meses (+15%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Usuarios */}
                <div className="space-y-3">
                  <Label>Número de Usuarios: {productConfig.users}</Label>
                  <Slider
                    value={[productConfig.users || 10]}
                    onValueChange={([value]) => setProductConfig(prev => ({...prev, users: value}))}
                    max={200}
                    min={1}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 usuario</span>
                    <span>200 usuarios</span>
                  </div>
                </div>

                {/* Precio estimado */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Precio configurado:</span>
                    <span className="text-xl font-bold text-price">
                      €{(configuringProduct.price * calculateConfigMultiplier(productConfig)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setConfiguringProduct(null)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={confirmProductConfiguration}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Confirmar Configuración
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ConfigureSolution;