import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Solución de Comunicaciones Empresariales',
    description: 'Sistema completo de comunicaciones unificadas para empresas medianas y grandes. Incluye VoIP, videoconferencias y colaboración en tiempo real.',
    price: 299,
    originalPrice: 399,
    image: '/placeholder.svg',
    category: 'Comunicaciones',
    subcategory: 'VoIP',
    features: ['Llamadas ilimitadas', 'Videoconferencias HD', 'Chat empresarial', 'Integración CRM'],
    inStock: true,
    isBundle: true,
    bundleProducts: ['voip-basic', 'video-conferencing', 'collaboration-tools'],
    tags: ['empresarial', 'comunicaciones', 'productividad']
  },
  {
    id: '2',
    name: 'Firewall de Nueva Generación',
    description: 'Protección avanzada contra amenazas con inteligencia artificial y análisis de comportamiento en tiempo real.',
    price: 799,
    image: '/placeholder.svg',
    category: 'Ciberseguridad',
    subcategory: 'Firewall',
    features: ['Protección IA', 'Análisis de tráfico', 'VPN integrada', 'Dashboard en tiempo real'],
    inStock: true,
    isBundle: false,
    tags: ['seguridad', 'firewall', 'protección']
  },
  {
    id: '3',
    name: 'Bundle Conectividad PYME',
    description: 'Solución completa de conectividad para pequeñas y medianas empresas. Router, switch y punto de acceso WiFi 6.',
    price: 199,
    originalPrice: 259,
    image: '/placeholder.svg',
    category: 'Conectividad',
    subcategory: 'Networking',
    features: ['WiFi 6', '24 puertos Gigabit', 'Gestión centralizada', 'QoS avanzado'],
    inStock: true,
    isBundle: true,
    bundleProducts: ['router-enterprise', 'switch-24p', 'wifi6-ap'],
    tags: ['pyme', 'networking', 'wifi']
  },
  {
    id: '4',
    name: 'Plataforma Cloud Híbrida',
    description: 'Infraestructura cloud híbrida escalable con herramientas de gestión y monitoreo avanzadas.',
    price: 499,
    image: '/placeholder.svg',
    category: 'Cloud',
    subcategory: 'Infraestructura',
    features: ['Multi-cloud', 'Auto-scaling', 'Backup automático', 'Monitoreo 24/7'],
    inStock: true,
    isBundle: false,
    tags: ['cloud', 'infraestructura', 'escalable']
  },
  {
    id: '5',
    name: 'Suite de Ciberseguridad Completa',
    description: 'Protección integral con endpoint security, email security y threat intelligence.',
    price: 899,
    originalPrice: 1199,
    image: '/placeholder.svg',
    category: 'Ciberseguridad',
    subcategory: 'Suite Completa',
    features: ['Endpoint Protection', 'Email Security', 'Threat Intelligence', 'SOC 24/7'],
    inStock: true,
    isBundle: true,
    bundleProducts: ['endpoint-security', 'email-protection', 'threat-intel'],
    tags: ['seguridad', 'suite', 'protección']
  },
  {
    id: '6',
    name: 'Switch Gestionado 48 Puertos',
    description: 'Switch empresarial de alto rendimiento con PoE+ y gestión avanzada de red.',
    price: 349,
    image: '/placeholder.svg',
    category: 'Conectividad',
    subcategory: 'Switches',
    features: ['48 puertos Gigabit', 'PoE+ 370W', 'VLAN avanzadas', 'Stack hasta 8 unidades'],
    inStock: false,
    isBundle: false,
    tags: ['switch', 'poe', 'gestionado']
  }
];

export const categories = [
  'Comunicaciones',
  'Ciberseguridad',
  'Conectividad',
  'Cloud'
];

export const subcategories = {
  'Comunicaciones': ['VoIP', 'Videoconferencias', 'Colaboración'],
  'Ciberseguridad': ['Firewall', 'Endpoint', 'Email Security', 'Suite Completa'],
  'Conectividad': ['Networking', 'Switches', 'WiFi', 'Routers'],
  'Cloud': ['Infraestructura', 'Servicios', 'Backup', 'Monitoreo']
};