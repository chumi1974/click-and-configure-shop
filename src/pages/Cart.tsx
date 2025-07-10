import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const Cart = () => {
  const navigate = useNavigate();
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const suggestedProducts = products.filter(p => 
    !items.some(item => item.product.id === p.id)
  ).slice(0, 3);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'descuento10') {
      setDiscount(total * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const finalTotal = total - discount;
  const shipping = total > 100 ? 0 : 15;
  const totalWithShipping = finalTotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-6">
              Descubre nuestros productos y añádelos a tu carrito
            </p>
            <Button onClick={() => navigate('/catalogo')} className="btn-primary">
              Explorar productos
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/catalogo')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Continuar comprando
          </Button>
          <h1 className="text-3xl font-bold">Carrito de compra</h1>
          <Badge variant="secondary" className="cart-badge">
            {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{item.product.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {item.product.description}
                      </p>
                      
                      {item.product.isBundle && (
                        <Badge className="mb-3 bg-accent">Bundle</Badge>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-lg">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-2 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <span className="price text-lg font-bold">
                            €{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <p className="text-muted-foreground text-sm">
                            €{item.product.price} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                Vaciar carrito
              </Button>
              <p className="text-muted-foreground">
                {itemCount} {itemCount === 1 ? 'producto' : 'productos'} en tu carrito
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} productos)</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Descuento aplicado</span>
                    <span>-€{discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-success">Gratis</span>
                    ) : (
                      `€${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="price">€{totalWithShipping.toFixed(2)}</span>
                </div>
                
                {shipping > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Envío gratis en pedidos superiores a €100
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle>Código promocional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Introduce tu código"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyPromo}>
                    Aplicar
                  </Button>
                </div>
                {discount > 0 && (
                  <p className="text-success text-sm mt-2">
                    ¡Código aplicado! Ahorras €{discount.toFixed(2)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button 
              className="w-full btn-primary" 
              size="lg"
              onClick={() => navigate('/checkout')}
            >
              Proceder al pago
            </Button>
          </div>
        </div>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">También te puede interesar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedProducts.map(product => (
                <Card key={product.id} className="product-card hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="price font-bold">€{product.price}</span>
                      <Button size="sm" onClick={() => navigate(`/producto/${product.id}`)}>
                        Ver producto
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;