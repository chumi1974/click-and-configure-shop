import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart, Share2, Star, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/catalog/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => 
    p.id !== id && p.category === product?.category
  ).slice(0, 3);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button onClick={() => navigate('/catalogo')}>
            Volver al catálogo
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/carrito');
  };

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/catalogo')}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <span className="text-white font-semibold text-xl">Agotado</span>
                </div>
              )}
              {product.isBundle && (
                <Badge className="absolute top-4 left-4 bg-accent text-lg px-3 py-1">
                  Bundle
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 price-discount text-lg px-3 py-1">
                  -{discount}%
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-warning" />
                  ))}
                </div>
                <span className="text-muted-foreground">(4.8) • 156 reseñas</span>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-b py-4">
              <div className="flex items-center gap-3">
                <span className="price text-3xl font-bold">€{product.price}</span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through text-xl">
                    €{product.originalPrice}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-success font-semibold">
                    Ahorras €{product.originalPrice! - product.price}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mt-1">
                {product.isBundle ? 'Bundle completo con descuento' : 'Precio por unidad'}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Cantidad:</label>
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 btn-primary" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Añadir al carrito
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Comprar ahora
                </Button>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center gap-2"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                  {isLiked ? 'En favoritos' : 'Añadir a favoritos'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({ title: "Enlace copiado", description: "El enlace del producto se ha copiado al portapapeles" });
                  }}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  {product.inStock ? (
                    <>
                      <Check className="h-5 w-5 text-success" />
                      <span className="text-success font-medium">En stock</span>
                      <span className="text-muted-foreground">• Envío en 24-48h</span>
                    </>
                  ) : (
                    <>
                      <span className="text-destructive font-medium">Agotado</span>
                      <span className="text-muted-foreground">• Restock esperado en 2-3 semanas</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Características</TabsTrigger>
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {product.isBundle && product.bundleProducts && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-3">Productos incluidos en el bundle:</h4>
                    <div className="space-y-2">
                      {product.bundleProducts.map(bundleProduct => (
                        <div key={bundleProduct} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-accent" />
                          <span className="capitalize">{bundleProduct.replace('-', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Esta solución está diseñada para empresas que buscan optimizar sus operaciones 
                    tecnológicas. Con una arquitectura escalable y flexible, se adapta a las necesidades 
                    específicas de cada organización.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Incluye soporte técnico 24/7, garantía extendida y actualizaciones automáticas 
                    para asegurar el máximo rendimiento y seguridad.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-warning" />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">156 reseñas</div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center gap-2">
                          <span className="text-sm w-8">{rating}★</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-warning h-2 rounded-full"
                              style={{ width: `${rating === 5 ? 75 : rating === 4 ? 20 : 5}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {rating === 5 ? 75 : rating === 4 ? 20 : 5}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current text-warning" />
                        ))}
                      </div>
                      <span className="font-medium">Juan Carlos M.</span>
                      <span className="text-muted-foreground text-sm">hace 2 días</span>
                    </div>
                    <p className="text-muted-foreground">
                      Excelente solución, muy fácil de implementar y el soporte técnico es excepcional.
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current text-warning" />
                        ))}
                        <Star className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <span className="font-medium">María López</span>
                      <span className="text-muted-foreground text-sm">hace 1 semana</span>
                    </div>
                    <p className="text-muted-foreground">
                      Muy buena relación calidad-precio. Ha mejorado significativamente nuestra productividad.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  viewMode="grid"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;