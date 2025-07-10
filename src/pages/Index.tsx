import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Cloud, Wifi, MessageSquare, Star, CheckCircle } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Comunicaciones",
      description: "Sistemas VoIP, centralitas virtuales y soluciones de comunicación unificada"
    },
    {
      icon: Wifi,
      title: "Conectividad",
      description: "Fibra óptica, conexiones dedicadas y redes empresariales de alta velocidad"
    },
    {
      icon: Shield,
      title: "Ciberseguridad",
      description: "Firewalls, antivirus empresarial y protección avanzada contra amenazas"
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Servidores en la nube, backup y soluciones de almacenamiento escalables"
    }
  ];

  const benefits = [
    "Soluciones integrales para empresas",
    "Soporte técnico 24/7",
    "Instalación y configuración incluida",
    "Garantía extendida en todos los productos",
    "Escalabilidad según crecimiento"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              Líderes en Tecnología Empresarial
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Soluciones Tecnológicas
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                Integrales para tu Empresa
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Comunicaciones, conectividad, ciberseguridad y cloud computing. 
              Todo lo que necesitas para digitalizar tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                Ver Catálogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Configurar Solución
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Nuestras Especialidades
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos soluciones completas en las áreas más críticas de la tecnología empresarial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="product-card group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                ¿Por qué elegir TechCommerce?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Más de 10 años de experiencia proporcionando soluciones tecnológicas 
                a empresas de todos los tamaños.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 btn-primary">
                Conocer Más
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="product-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Empresas Atendidas</p>
                </CardContent>
              </Card>
              <Card className="product-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <p className="text-muted-foreground">Uptime Garantizado</p>
                </CardContent>
              </Card>
              <Card className="product-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-muted-foreground">Soporte Técnico</p>
                </CardContent>
              </Card>
              <Card className="product-card">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">Satisfacción Cliente</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                ¿Listo para transformar tu empresa?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Configura tu solución personalizada o explora nuestros bundles 
                diseñados específicamente para diferentes tipos de negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-primary">
                  Configurar Solución
                </Button>
                <Button size="lg" variant="outline">
                  Ver Bundles
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
