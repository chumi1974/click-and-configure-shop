import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">TC</span>
              </div>
              <span className="font-bold text-xl text-foreground">TechCommerce</span>
            </div>
            <p className="text-muted-foreground">
              Soluciones tecnológicas integrales para empresas. Comunicaciones, conectividad, 
              ciberseguridad y cloud computing.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Productos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/comunicaciones" className="text-muted-foreground hover:text-primary transition-colors">
                  Comunicaciones
                </Link>
              </li>
              <li>
                <Link to="/conectividad" className="text-muted-foreground hover:text-primary transition-colors">
                  Conectividad
                </Link>
              </li>
              <li>
                <Link to="/ciberseguridad" className="text-muted-foreground hover:text-primary transition-colors">
                  Ciberseguridad
                </Link>
              </li>
              <li>
                <Link to="/cloud" className="text-muted-foreground hover:text-primary transition-colors">
                  Cloud Computing
                </Link>
              </li>
              <li>
                <Link to="/bundles" className="text-muted-foreground hover:text-primary transition-colors">
                  Bundles
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ayuda" className="text-muted-foreground hover:text-primary transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/envios" className="text-muted-foreground hover:text-primary transition-colors">
                  Envíos y Devoluciones
                </Link>
              </li>
              <li>
                <Link to="/garantia" className="text-muted-foreground hover:text-primary transition-colors">
                  Garantía
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Av. Tecnología 123<br />
                  28001 Madrid, España
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">info@techcommerce.es</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm">
            © 2024 TechCommerce. Todos los derechos reservados.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacidad" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Política de Privacidad
            </Link>
            <Link to="/terminos" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Términos de Uso
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;