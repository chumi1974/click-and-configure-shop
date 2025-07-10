import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
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
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn-primary"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Añadir
                </Button>
              </div>
            </div>
          </div>
        </div>
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
            size="sm"
            className="flex-1 btn-primary"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Añadir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;