import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Eye, Heart, Star, Settings, Check, X } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

interface ProductConfiguration {
  storage?: string;
  memory?: string;
  bandwidth?: string;
  users?: number;
  duration?: string;
  features?: string[];
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [productConfig, setProductConfig] = useState<ProductConfiguration>({
    storage: '256GB',
    memory: '8GB',
    bandwidth: '100Mbps',
    users: 10,
    duration: '12 meses',
    features: []
  });
  
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const calculateConfigMultiplier = (config: ProductConfiguration): number => {
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

  const configuredPrice = product.price * calculateConfigMultiplier(productConfig);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showConfiguration) {
      addItem(product, 1, {
        configuration: JSON.stringify(productConfig),
        configuredPrice: configuredPrice.toString()
      });
      setShowConfiguration(false);
      toast({
        title: "Producto configurado añadido",
        description: `${product.name} se ha añadido al carrito con tu configuración personalizada`,
      });
    } else {
      setShowConfiguration(true);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleViewProduct = () => {
    navigate(`/producto/${product.id}`);
  };

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  if (viewMode === 'list') {
    return (
      <Card className="product-card hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={handleViewProduct}>
        <div className="flex p-4">
          <div className="relative w-48 h-32 mr-4 flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <span className="text-white font-semibold">Agotado</span>
              </div>
            )}
            {product.isBundle && (
              <Badge className="absolute top-2 left-2 bg-accent">Bundle</Badge>
            )}
            {discount > 0 && (
              <Badge className="absolute top-2 right-2 price-discount">-{discount}%</Badge>
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLiked(!isLiked);
                  }}
                  className="flex-shrink-0"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                </Button>
              </div>
              
              <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                {product.description}
              </p>
              
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-warning" />
                ))}
                <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {product.features.slice(0, 3).map(feature => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="price text-xl font-bold">€{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through">
                      €{product.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.isBundle ? 'Bundle completo' : 'Producto individual'}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  handleViewProduct();
                }}>
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleQuickAdd}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Rápido
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn-primary"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Configurar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (showConfiguration) {
    return (
      <Card className="product-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">Configurar {product.name}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowConfiguration(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Almacenamiento */}
            <div className="space-y-2">
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
            <div className="space-y-2">
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
            <div className="space-y-2">
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
            <div className="space-y-2">
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
          <div className="space-y-2">
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

          {/* Precio configurado */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Precio configurado:</span>
              <span className="text-xl font-bold text-price">
                €{configuredPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setShowConfiguration(false)}
          >
            Cancelar
          </Button>
          <Button 
            className="flex-1 btn-primary"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <Check className="h-4 w-4 mr-2" />
            Añadir Configurado
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="product-card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          onClick={handleViewProduct}>
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
              <span className="text-white font-semibold">Agotado</span>
            </div>
          )}
          {product.isBundle && (
            <Badge className="absolute top-2 left-2 bg-accent">Bundle</Badge>
          )}
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 price-discount">-{discount}%</Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
          </Button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current text-warning" />
            ))}
            <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.slice(0, 2).map(feature => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="price text-lg font-bold">€{product.price}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-sm">
                  €{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.isBundle ? 'Bundle completo' : 'Producto individual'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1" onClick={(e) => {
            e.stopPropagation();
            handleViewProduct();
          }}>
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Rápido
          </Button>
          <Button 
            size="sm"
            className="flex-1 btn-primary"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <Settings className="h-4 w-4 mr-1" />
            Config
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;