import { Building2, Laptop, Phone, Store, Wrench } from 'lucide-react';

export const WhyUs = () => {
  const servicios = [
    {
      icon: <Building2 className="h-10 w-10 text-red-500" />,
      title: 'Alianzas estratégicas',
      description:
        'Desde el 2004, somos service oficial y servicio técnico de Ariston Termo Argentina, lo que nos permite ofrecer productos de calidad respaldados por una marca reconocida a nivel nacional e internacional.',
    },
    {
      icon: <Laptop className="h-10 w-10 text-red-500" />,
      title: 'Asesoramiento profesional',
      description:
        'Nuestro equipo de expertos está aquí para brindarle asesoramiento personalizado y ayudarle a encontrar las soluciones tecnológicas que mejor se adapten a sus necesidades.',
    },
    {
      icon: <Store className="h-10 w-10 text-red-500" />,
      title: 'Soluciones a medida',
      description:
        'Entendemos que cada cliente tiene necesidades únicas, por lo que trabajamos contigo para desarrollar soluciones a medida que impulsen el crecimiento y la eficiencia de tu negocio.',
    },
    {
      icon: <Phone className="h-10 w-10 text-red-500" />,
      title: 'Atención personalizada',
      description:
        'Para más información sobre nuestros productos y servicios, no dude en ponerse en contacto con nosotros. Estaremos aquí para ayudarlo a encontrar las soluciones que mejor se adapten a sus necesidades.',
    },
    {
      icon: <Wrench className="h-10 w-10 text-red-500" />,
      title: 'Servicios de mantenimiento y reparación',
      description:
        'Además de la venta de productos, ofrecemos servicios de mantenimiento y reparación de equipos informáticos, calderas, y sistemas de seguridad, garantizando un funcionamiento óptimo y prolongando su vida útil.',
    },
  ];
  return (
    <div id="services" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-xl font-bold uppercase text-primary md:text-2xl">
          ¿Por qué Servicios Integrados?
        </h2>
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-3">
          {servicios.slice(0, 3).map((servicio, index) => (
            <div
              key={index}
              className="flex max-w-sm flex-col items-center rounded-lg bg-muted p-6 text-center shadow-md"
            >
              <div className="mb-4">{servicio.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{servicio.title}</h3>
              <p className="text-sm opacity-60">{servicio.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:mx-auto lg:max-w-4xl">
          {servicios.slice(3).map((servicio, index) => (
            <div
              key={index + 3}
              className="flex max-w-sm flex-col items-center rounded-lg bg-muted p-6 text-center shadow-md"
            >
              <div className="mb-4">{servicio.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{servicio.title}</h3>
              <p className="text-sm opacity-60">{servicio.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
