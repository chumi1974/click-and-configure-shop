import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Cloud, 
  Check, 
  Star,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Search
} from 'lucide-react';

const Ciberseguridad = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filtrar productos de ciberseguridad
  const cybersecurityProducts = products.filter(product => product.category === 'Ciberseguridad');

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    toast({
      title: "Producto añadido al carrito",
      description: `${product.name} se ha añadido al carrito`,
    });
  };

  const handleViewProduct = (productId: string) => {
    navigate(`/producto/${productId}`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                Ciberseguridad Empresarial
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Protege tu empresa con 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200">
                  soluciones de ciberseguridad
                </span>
                de última generación
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
                Desde firewalls hasta análisis de amenazas, encuentra todas las herramientas 
                para proteger tu infraestructura digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Evaluación Gratuita
                </Button>
                <Button size="lg" className="bg-white text-red-600 hover:bg-white/90 font-semibold">
                  <Shield className="mr-2 h-5 w-5" />
                  Contactar Especialista
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Stats Section */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: Shield, value: '99.9%', label: 'Protección garantizada' },
                { icon: AlertTriangle, value: '24/7', label: 'Monitoreo continuo' },
                { icon: Zap, value: '<1min', label: 'Tiempo de respuesta' },
                { icon: Users, value: '500+', label: 'Empresas protegidas' }
              ].map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-600 mb-2">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Products Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Catálogo de Productos de Ciberseguridad</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Soluciones integrales para proteger tu empresa contra las amenazas digitales modernas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cybersecurityProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        {product.subcategory}
                      </Badge>
                      {product.originalPrice && (
                        <Badge variant="destructive" className="bg-green-100 text-green-800">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          €{product.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-red-600">
                        €{product.price}
                      </span>
                      <span className="text-sm text-muted-foreground">/mes</span>
                    </div>

                    <div className="space-y-2">
                      {product.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start text-sm">
                          <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {product.features.length > 4 && (
                        <p className="text-xs text-muted-foreground">
                          +{product.features.length - 4} características adicionales
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={() => handleAddToCart(product)}
                      >
                        Añadir al Carrito
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleViewProduct(product.id)}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </Button>
                    </div>

                    {!product.inStock && (
                      <Badge variant="secondary" className="w-full justify-center">
                        Próximamente disponible
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Security Services */}
          <section className="py-12 bg-muted/30 rounded-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Servicios de Seguridad Adicionales</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complementa tu infraestructura con servicios especializados de ciberseguridad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'SOC 24/7',
                  description: 'Centro de operaciones de seguridad con monitoreo continuo',
                  price: '€199/mes'
                },
                {
                  icon: Eye,
                  title: 'Pentesting',
                  description: 'Pruebas de penetración y evaluación de vulnerabilidades',
                  price: '€899/evaluación'
                },
                {
                  icon: Lock,
                  title: 'Consultoría de Seguridad',
                  description: 'Asesoramiento especializado en ciberseguridad',
                  price: '€150/hora'
                }
              ].map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <p className="font-bold text-red-600 mb-4">{service.price}</p>
                    <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                      Contratar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Ciberseguridad;