import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  Video, 
  MessageSquare, 
  Users, 
  Cloud, 
  Shield, 
  Check, 
  Star,
  ArrowRight,
  Clock,
  HeadphonesIcon,
  Settings
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CommunicationPlan {
  id: string;
  name: string;
  subtitle: string;
  price: {
    monthly: number;
    yearly: number;
  };
  originalPrice?: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  highlights: string[];
  recommended?: boolean;
  category: 'basic' | 'standard' | 'premium' | 'enterprise';
  users: string;
  storage: string;
  support: string;
}

const Comunicaciones = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'small' | 'medium' | 'large'>('all');
  
  const { addItem } = useCart();
  const { toast } = useToast();

  const plans: CommunicationPlan[] = [
    {
      id: 'com-basic',
      name: 'Comunicaciones Básico',
      subtitle: 'Para equipos pequeños',
      price: { monthly: 49, yearly: 39 },
      originalPrice: { monthly: 59, yearly: 49 },
      description: 'Solución de comunicaciones esencial para empresas en crecimiento',
      features: [
        'Llamadas VoIP ilimitadas',
        'Hasta 50 participantes en videoconferencias',
        'Chat empresarial básico',
        'Grabación de llamadas (hasta 100 horas)',
        'Aplicación móvil incluida',
        'Soporte por email'
      ],
      highlights: [
        'Configuración en 24 horas',
        'Sin permanencia'
      ],
      category: 'basic',
      users: 'Hasta 25 usuarios',
      storage: '10 GB por usuario',
      support: 'Email (horario comercial)'
    },
    {
      id: 'com-standard',
      name: 'Comunicaciones Estándar',
      subtitle: 'Para empresas en crecimiento',
      price: { monthly: 89, yearly: 75 },
      originalPrice: { monthly: 109, yearly: 89 },
      description: 'Comunicaciones avanzadas con herramientas de colaboración profesional',
      features: [
        'Todo lo incluido en Básico',
        'Hasta 250 participantes en videoconferencias',
        'Integración con CRM',
        'Centralita virtual avanzada',
        'Grabación ilimitada',
        'Análisis de llamadas',
        'Webinars para hasta 100 asistentes',
        'Soporte telefónico prioritario'
      ],
      highlights: [
        'Más popular',
        'Ahorro del 20%'
      ],
      recommended: true,
      category: 'standard',
      users: 'Hasta 100 usuarios',
      storage: '50 GB por usuario',
      support: 'Teléfono y email 24/7'
    },
    {
      id: 'com-premium',
      name: 'Comunicaciones Premium',
      subtitle: 'Para empresas establecidas',
      price: { monthly: 149, yearly: 125 },
      originalPrice: { monthly: 179, yearly: 149 },
      description: 'Solución completa con funciones empresariales avanzadas',
      features: [
        'Todo lo incluido en Estándar',
        'Hasta 1000 participantes en videoconferencias',
        'IA para análisis de sentimientos',
        'Transcripción automática',
        'Integración completa Office 365',
        'Gestión avanzada de usuarios',
        'Webinars para hasta 500 asistentes',
        'Centro de contacto básico',
        'Gestor de cuenta dedicado'
      ],
      highlights: [
        'Funciones IA incluidas',
        'Gestor dedicado'
      ],
      category: 'premium',
      users: 'Hasta 500 usuarios',
      storage: '100 GB por usuario',
      support: 'Gestor dedicado + 24/7'
    },
    {
      id: 'com-enterprise',
      name: 'Comunicaciones Enterprise',
      subtitle: 'Para grandes organizaciones',
      price: { monthly: 299, yearly: 249 },
      description: 'Solución empresarial completa con máxima escalabilidad y seguridad',
      features: [
        'Todo lo incluido en Premium',
        'Participantes ilimitados',
        'Cumplimiento GDPR y SOX',
        'Integración API completa',
        'Centro de contacto avanzado',
        'Análisis predictivo con IA',
        'Implementación personalizada',
        'Formación incluida',
        'SLA del 99.99%'
      ],
      highlights: [
        'Solución personalizada',
        'SLA garantizado'
      ],
      category: 'enterprise',
      users: 'Usuarios ilimitados',
      storage: 'Almacenamiento ilimitado',
      support: 'Soporte enterprise 24/7/365'
    }
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? plans 
    : plans.filter(plan => {
        if (selectedCategory === 'small') return plan.category === 'basic';
        if (selectedCategory === 'medium') return plan.category === 'standard' || plan.category === 'premium';
        if (selectedCategory === 'large') return plan.category === 'enterprise';
        return true;
      });

  const handlePurchase = (plan: CommunicationPlan) => {
    const product = {
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price: billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly,
      originalPrice: plan.originalPrice ? 
        (billingCycle === 'yearly' ? plan.originalPrice.yearly : plan.originalPrice.monthly) : undefined,
      image: '/placeholder.svg',
      category: 'Comunicaciones',
      subcategory: 'VoIP',
      features: plan.features,
      inStock: true,
      isBundle: true,
      bundleProducts: ['voip', 'video', 'chat'],
      tags: ['comunicaciones', 'empresarial', 'voip']
    };

    addItem(product, 1, {
      billingCycle,
      planType: plan.category,
      users: plan.users
    });

    toast({
      title: "Plan añadido al carrito",
      description: `${plan.name} (${billingCycle === 'yearly' ? 'Anual' : 'Mensual'}) se ha añadido al carrito`,
    });
  };

  const savings = billingCycle === 'yearly' ? 'Ahorra hasta un 20%' : '';

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary via-primary-variant to-primary-glow text-white py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                Comunicaciones Empresariales
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Busca el plan de 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                  Comunicaciones más adecuado
                </span>
                para tu empresa
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Conecta a tu equipo con soluciones de comunicación unificada. 
                VoIP, videoconferencias y colaboración en una sola plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Video className="mr-2 h-5 w-5" />
                  Ver Demo
                </Button>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  <Phone className="mr-2 h-5 w-5" />
                  Contactar Ventas
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Filter Tabs */}
          <div className="mb-8">
            <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)} className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="small">Pequeña</TabsTrigger>
                  <TabsTrigger value="medium">Mediana</TabsTrigger>
                  <TabsTrigger value="large">Grande</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Label htmlFor="billing-toggle" className={billingCycle === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}>
              Mensualmente
            </Label>
            <Switch
              id="billing-toggle"
              checked={billingCycle === 'yearly'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
            />
            <Label htmlFor="billing-toggle" className={billingCycle === 'yearly' ? 'font-semibold' : 'text-muted-foreground'}>
              Anualmente
            </Label>
            {billingCycle === 'yearly' && (
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                {savings}
              </Badge>
            )}
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {filteredPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.recommended ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan.recommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Más popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">{plan.subtitle}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-1">
                      {plan.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          €{billingCycle === 'yearly' ? plan.originalPrice.yearly : plan.originalPrice.monthly}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-price">
                        €{billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /usuario/{billingCycle === 'yearly' ? 'año' : 'mes'}
                      </span>
                    </div>
                    
                    {plan.originalPrice && (
                      <Badge variant="secondary" className="price-discount">
                        -{Math.round(((plan.originalPrice[billingCycle] - plan.price[billingCycle]) / plan.originalPrice[billingCycle]) * 100)}%
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">{plan.description}</p>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span>{plan.users}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Cloud className="h-4 w-4 mr-2 text-primary" />
                      <span>{plan.storage}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <HeadphonesIcon className="h-4 w-4 mr-2 text-primary" />
                      <span>{plan.support}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    {plan.features.slice(0, 6).map((feature, index) => (
                      <div key={index} className="flex items-start text-sm">
                        <Check className="h-4 w-4 mr-2 text-success mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 6 && (
                      <p className="text-xs text-muted-foreground">
                        +{plan.features.length - 6} funciones adicionales
                      </p>
                    )}
                  </div>

                  {plan.highlights.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-1">
                        {plan.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Star className="h-4 w-4 mr-2 text-warning fill-current" />
                            <span className="font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="pt-4 space-y-2">
                    <Button 
                      className="w-full btn-primary"
                      onClick={() => handlePurchase(plan)}
                    >
                      Elegir Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Personalizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <section className="py-12 bg-muted/30 rounded-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Servicios Adicionales</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complementa tu plan de comunicaciones con servicios especializados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: MessageSquare,
                  title: 'Centro de Contacto',
                  description: 'Gestión completa de atención al cliente',
                  price: '€29/agente/mes'
                },
                {
                  icon: Shield,
                  title: 'Seguridad Avanzada',
                  description: 'Cifrado end-to-end y protección de datos',
                  price: '€15/usuario/mes'
                },
                {
                  icon: Clock,
                  title: 'Soporte Premium',
                  description: 'Asistencia 24/7 con SLA garantizado',
                  price: '€50/empresa/mes'
                }
              ].map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <p className="font-bold text-price mb-4">{service.price}</p>
                    <Button variant="outline" className="w-full">
                      Añadir
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

export default Comunicaciones;