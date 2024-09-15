interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    // Contenedor principal del título con posibilidad de aplicar una clase personalizada
    <div className={`${className ? className : ''}`}>
      {/* Título principal con estilos de fuente específicos */}
      <h1 className={`mb-3 text-xl font-semibold antialiased md:text-2xl`}>
        {title}
      </h1>

      {/* Subtítulo opcional con estilos de fuente específicos */}
      {subtitle && <h3 className="mb-5 text-base md:text-xl">{subtitle}</h3>}
    </div>
  );
};
