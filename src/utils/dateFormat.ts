export const dateFormat = (date: Date): string => {
  return new Date(date).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const timeFormat = (date: Date): string => {
  return (
    new Date(date).toLocaleTimeString('es-AR', {
      hour: '2-digit', // 2 dígitos para la hora
      minute: '2-digit', // 2 dígitos para los minutos
      hour12: false, // Desactiva el formato de 12 horas (esto usa el formato de 24 horas)
    }) + ` ${new Date(date).getHours() >= 12 ? 'PM' : 'AM'}`
  );
};
