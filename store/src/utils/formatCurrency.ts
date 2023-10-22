export function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency', // Estou formatando uma moeda
      currency: 'BRL' // Defini que a moeda é o Real
    }).format(value);
  }