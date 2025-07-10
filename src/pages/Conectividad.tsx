import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Wifi, Zap, Network, Router, Cable, Shield, Check, Clock } from 'lucide-react';

interface ConnectivityProduct {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  features: string[];
  icon: any;
  category: string;
  configOptions: {
    speeds?: string[];
    bandwidth?: string[];
    duration?: string[];
    installation?: boolean;
    support?: boolean;
  };
}

interface ProductConfiguration {
  speed?: string;
  bandwidth?: string;
  duration?: string;
  installation?: boolean;
  support?: boolean;
}

const connectivityProducts: ConnectivityProduct[] = [
  {
    id: 'gigas-fibra',
    name: 'Gigas Fibra FTTH',
    description: 'Conexión de fibra óptica hasta el hogar con velocidades simétricas garantizadas para empresas.',
    basePrice: 45,
    features: ['Velocidad simétrica', 'IP estática incluida', 'SLA 99.9%', 'Soporte 24/7'],
    icon: Zap,
    category: 'fibra',
    configOptions: {
      speeds: ['100Mb', '300Mb', '600Mb', '1Gb'],
      duration: ['12 meses', '24 meses', '36 meses'],
      installation: true,
      support: true
    }
  },
  {
    id: 'fibra-flexible',
    name: 'Fibra Flexible',
    description: 'Conectividad adaptable a las necesidades de tu empresa con escalabilidad automática.',
    basePrice: 65,
    features: ['Escalabilidad automática', 'Facturación por uso', 'Múltiples ubicaciones', 'Gestión centralizada'],
    icon: Cable,
    category: 'fibra',
    configOptions: {
      speeds: ['50Mb', '100Mb', '200Mb', '500Mb', '1Gb'],
      duration: ['Sin permanencia', '12 meses', '24 meses'],
      installation: true,
      support: true
    }
  },
  {
    id: 'circuitos-dedicados',
    name: 'Circuitos Dedicados',
    description: 'Conexiones punto a punto dedicadas con ancho de banda garantizado y máxima seguridad.',
    basePrice: 150,
    features: ['Ancho de banda dedicado', 'Baja latencia', 'Múltiples protocolos', 'Redundancia incluida'],
    icon: Network,
    category: 'dedicado',
    configOptions: {
      bandwidth: ['2Mb', '10Mb', '50Mb', '100Mb', '500Mb', '1Gb'],
      duration: ['24 meses', '36 meses', '48 meses'],
      installation: true,
      support: true
    }
  },
  {
    id: 'private-cloud-connect',
    name: 'Private Cloud Connect',
    description: 'Conectividad privada y segura entre tu infraestructura y servicios cloud.',
    basePrice: 120,
    features: ['Conexión privada', 'Múltiples clouds', 'Cifrado extremo', 'Baja latencia'],
    icon: Shield,
    category: 'cloud',
    configOptions: {
      bandwidth: ['100Mb', '500Mb', '1Gb', '10Gb'],
      duration: ['12 meses', '24 meses', '36 meses'],
      installation: true,
      support: true
    }
  },
  {
    id: 'router-empresarial',
    name: 'Router Empresarial Avanzado',
    description: 'Router de alta gama con funciones de seguridad avanzadas y gestión centralizada.',
    basePrice: 85,
    features: ['Firewall integrado', 'VPN hasta 100 túneles', 'QoS avanzado', 'Gestión remota'],
    icon: Router,
    category: 'equipment',
    configOptions: {
      speeds: ['Gigabit', '10 Gigabit'],
      duration: ['Compra', '12 meses renting', '24 meses renting', '36 meses renting'],
      installation: true,
      support: true
    }
  },
  {
    id: 'wifi-empresarial',
    name: 'WiFi Empresarial 6E',
    description: 'Puntos de acceso WiFi 6E con gestión centralizada y máximo rendimiento.',
    basePrice: 55,
    features: ['WiFi 6E', 'Gestión en la nube', 'Seguridad WPA3', 'Análisis de red'],
    icon: Wifi,
    category: 'wifi',
    configOptions: {
      bandwidth: ['1.2Gbps', '2.4Gbps', '4.8Gbps'],
      duration: ['Compra', '12 meses renting', '24 meses renting'],
      installation: true,
      support: true
    }
  }
];

const Conectividad = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [configuringProduct, setConfiguringProduct] = useState<ConnectivityProduct | null>(null);
  const [productConfig, setProductConfig] = useState<ProductConfiguration>({});
  const { addItem } = useCart();
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'Todos los productos' },
    { id: 'fibra', name: 'Fibra Óptica' },
    { id: 'dedicado', name: 'Circuitos Dedicados' },
    { id: 'cloud', name: 'Cloud Connect' },
    { id: 'equipment', name: 'Equipamiento' },
    { id: 'wifi', name: 'WiFi Empresarial' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? connectivityProducts 
    : connectivityProducts.filter(p => p.category === selectedCategory);

  const calculatePrice = (product: ConnectivityProduct, config: ProductConfiguration): number => {
    let price = product.basePrice;
    let multiplier = 1;

    // Speed/Bandwidth multipliers
    if (config.speed) {
      const speedMultipliers: Record<string, number> = {
        '50Mb': 0.8, '100Mb': 1, '200Mb': 1.5, '300Mb': 2, '500Mb': 2.8, '600Mb': 3.2, '1Gb': 4, '10Gb': 15
      };
      multiplier *= speedMultipliers[config.speed] || 1;
    }

    if (config.bandwidth) {
      const bandwidthMultipliers: Record<string, number> = {
        '2Mb': 0.5, '10Mb': 1, '50Mb': 2.5, '100Mb': 4, '500Mb': 8, '1Gb': 12, '10Gb': 25,
        '1.2Gbps': 1, '2.4Gbps': 1.8, '4.8Gbps': 2.5
      };
      multiplier *= bandwidthMultipliers[config.bandwidth] || 1;
    }

    // Duration discounts
    if (config.duration) {
      const durationDiscounts: Record<string, number> = {
        'Sin permanencia': 1.2, '12 meses': 1, '24 meses': 0.9, '36 meses': 0.8, '48 meses': 0.75,
        'Compra': 5, '12 meses renting': 1, '24 meses renting': 0.85, '36 meses renting': 0.75
      };
      multiplier *= durationDiscounts[config.duration] || 1;
    }

    // Add-ons
    if (config.installation) price += 50;
    if (config.support) price += 25;

    return Math.round(price * multiplier);
  };

  const handleAddToCart = (product: ConnectivityProduct, config: ProductConfiguration) => {
    const configuredPrice = calculatePrice(product, config);
    
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: configuredPrice,
      image: '/placeholder.svg',
      category: 'Conectividad',
      subcategory: product.category,
      features: product.features,
      inStock: true,
      isBundle: false,
      tags: ['conectividad']
    }, 1, config as Record<string, string>);

    toast({
      title: "Producto añadido al carrito",
      description: `${product.name} configurado añadido correctamente.`,
    });

    setConfiguringProduct(null);
    setProductConfig({});
  };

  const handleQuickAdd = (product: ConnectivityProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.basePrice,
      image: '/placeholder.svg',
      category: 'Conectividad',
      subcategory: product.category,
      features: product.features,
      inStock: true,
      isBundle: false,
      tags: ['conectividad']
    });

    toast({
      title: "Producto añadido al carrito",
      description: `${product.name} añadido con configuración estándar.`,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        {/* Hero Section */}
        <section className="relative py-24 px-4 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6 bg-green-500/20 text-green-300 border-green-500/30">
                CONECTIVIDAD EMPRESARIAL
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                CONECTA TU
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  EMPRESA AL FUTURO
                </span>
              </h1>
              <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
                Soluciones de conectividad avanzadas para empresas de todos los tamaños. 
                Fibra óptica, circuitos dedicados y conectividad cloud de alta velocidad.
              </p>
              
              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Zap className="h-8 w-8 text-green-400 mb-2" />
                  <span className="text-sm font-semibold">Desde 45€/mes</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-blue-400 mb-2" />
                  <span className="text-sm font-semibold">SLA 99.9%</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Network className="h-8 w-8 text-green-400 mb-2" />
                  <span className="text-sm font-semibold">100% Gestionado</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Clock className="h-8 w-8 text-blue-400 mb-2" />
                  <span className="text-sm font-semibold">Soporte 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "border-white/30 text-white hover:bg-white/10"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const IconComponent = product.icon;
                return (
                  <Card key={product.id} className="bg-white/10 border-white/20 backdrop-blur-sm text-white hover:bg-white/15 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <IconComponent className="h-6 w-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-white">{product.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1 bg-blue-500/20 text-blue-300 border-blue-500/30">
                            Desde {product.basePrice}€/mes
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-300">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          {product.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                              <span className="text-sm text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 pt-4">
                          <Button 
                            size="sm" 
                            onClick={() => handleQuickAdd(product)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          >
                            Añadir
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setConfiguringProduct(product);
                                  setProductConfig({});
                                }}
                                className="flex-1 border-white/30 text-white hover:bg-white/10"
                              >
                                Configurar
                              </Button>
                            </DialogTrigger>
                            
                            <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white">
                              {configuringProduct && (
                                <>
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl text-white">
                                      Configurar {configuringProduct.name}
                                    </DialogTitle>
                                  </DialogHeader>
                                  
                                  <div className="space-y-6">
                                    {/* Speed Configuration */}
                                    {configuringProduct.configOptions.speeds && (
                                      <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Velocidad</label>
                                        <Select 
                                          value={productConfig.speed || ''} 
                                          onValueChange={(value) => setProductConfig({...productConfig, speed: value})}
                                        >
                                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                            <SelectValue placeholder="Seleccionar velocidad" />
                                          </SelectTrigger>
                                          <SelectContent className="bg-gray-800 border-gray-600">
                                            {configuringProduct.configOptions.speeds.map(speed => (
                                              <SelectItem key={speed} value={speed} className="text-white">
                                                {speed}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    )}

                                    {/* Bandwidth Configuration */}
                                    {configuringProduct.configOptions.bandwidth && (
                                      <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Ancho de Banda</label>
                                        <Select 
                                          value={productConfig.bandwidth || ''} 
                                          onValueChange={(value) => setProductConfig({...productConfig, bandwidth: value})}
                                        >
                                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                            <SelectValue placeholder="Seleccionar ancho de banda" />
                                          </SelectTrigger>
                                          <SelectContent className="bg-gray-800 border-gray-600">
                                            {configuringProduct.configOptions.bandwidth.map(bw => (
                                              <SelectItem key={bw} value={bw} className="text-white">
                                                {bw}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    )}

                                    {/* Duration Configuration */}
                                    {configuringProduct.configOptions.duration && (
                                      <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">Duración del Contrato</label>
                                        <Select 
                                          value={productConfig.duration || ''} 
                                          onValueChange={(value) => setProductConfig({...productConfig, duration: value})}
                                        >
                                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                            <SelectValue placeholder="Seleccionar duración" />
                                          </SelectTrigger>
                                          <SelectContent className="bg-gray-800 border-gray-600">
                                            {configuringProduct.configOptions.duration.map(duration => (
                                              <SelectItem key={duration} value={duration} className="text-white">
                                                {duration}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    )}

                                    {/* Add-ons */}
                                    <div className="space-y-3">
                                      <label className="text-sm font-medium text-gray-300">Servicios Adicionales</label>
                                      <div className="space-y-2">
                                        {configuringProduct.configOptions.installation && (
                                          <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                              type="checkbox"
                                              checked={productConfig.installation || false}
                                              onChange={(e) => setProductConfig({...productConfig, installation: e.target.checked})}
                                              className="w-4 h-4"
                                            />
                                            <span className="text-sm text-gray-300">Instalación profesional (+50€)</span>
                                          </label>
                                        )}
                                        {configuringProduct.configOptions.support && (
                                          <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                              type="checkbox"
                                              checked={productConfig.support || false}
                                              onChange={(e) => setProductConfig({...productConfig, support: e.target.checked})}
                                              className="w-4 h-4"
                                            />
                                            <span className="text-sm text-gray-300">Soporte extendido (+25€/mes)</span>
                                          </label>
                                        )}
                                      </div>
                                    </div>

                                    {/* Price Display */}
                                    <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
                                      <div className="text-center">
                                        <div className="text-2xl font-bold text-green-400">
                                          {calculatePrice(configuringProduct, productConfig)}€
                                          <span className="text-sm text-gray-300 ml-1">
                                            {productConfig.duration?.includes('Compra') ? ' (única)' : '/mes'}
                                          </span>
                                        </div>
                                        <div className="text-sm text-gray-300 mt-1">Precio configurado</div>
                                      </div>
                                    </div>

                                    <Button 
                                      onClick={() => handleAddToCart(configuringProduct, productConfig)}
                                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                                      size="lg"
                                    >
                                      Añadir al Carrito
                                    </Button>
                                  </div>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-green-500/10 backdrop-blur-sm">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Necesitas una solución personalizada?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos puede diseñar una solución de conectividad 
              específica para las necesidades de tu empresa.
            </p>
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
              Contactar con Expertos
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Conectividad;