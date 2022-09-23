export const convertDate = (date: Date) => {
  const tempDate = new Date(`${date} 00:00`);
  return tempDate.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const convertPrice = (moeda: string) => {
  const floatMoeda = parseFloat(moeda);
  return floatMoeda.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
