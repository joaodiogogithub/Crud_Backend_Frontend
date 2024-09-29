interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Cafeteira Elétrica",
    desc: "Prepare café fresco e aromático todas as manhãs com nossa cafeteira elétrica de fácil uso. Capacidade para 12 xícaras.",
    price: 149.99
  },
  {
    id: 2,
    name: "Liquidificador Potente",
    desc: "Liquidificador multifuncional com 5 velocidades e função pulsar. Ideal para smoothies, sopas e molhos.",
    price: 199.90
  },
  {
    id: 3,
    name: "Panela de Pressão Elétrica",
    desc: "Cozinhe feijão, carnes e outros alimentos rapidamente com nossa panela de pressão elétrica digital. Capacidade de 6 litros.",
    price: 349.00
  },
  {
    id: 4,
    name: "Ferro de Passar a Vapor",
    desc: "Deixe suas roupas impecáveis com nosso ferro a vapor de alta potência. Possui função de spray e controle de temperatura.",
    price: 129.99
  },
  {
    id: 5,
    name: "Ventilador de Coluna",
    desc: "Refresque seu ambiente com este ventilador de coluna ajustável. Possui 3 velocidades e modo oscilante.",
    price: 179.90
  },
  {
    id: 6,
    name: "Aspirador de Pó Portátil",
    desc: "Prático aspirador de pó sem fio, ideal para limpezas rápidas. Bateria de longa duração e filtro lavável.",
    price: 299.00
  },
  {
    id: 7,
    name: "Sanduicheira Grill",
    desc: "Prepare sanduíches deliciosos e grelhados perfeitos com nossa sanduicheira grill antiaderente. Fácil de limpar.",
    price: 89.90
  },
  {
    id: 8,
    name: "Mixer de Mão",
    desc: "Versatilidade na cozinha com este mixer de mão. Perfeito para preparar sopas, molhos e vitaminas diretamente na panela ou copo.",
    price: 79.99
  },
  {
    id: 9,
    name: "Torradeira Automática",
    desc: "Torradas no ponto ideal todas as manhãs. Com controle de tostagem e bandeja de migalhas removível.",
    price: 69.90
  },
  {
    id: 10,
    name: "Purificador de Água",
    desc: "Água pura e refrescante direto da torneira. Nosso purificador remove impurezas e cloro, mantendo os minerais essenciais.",
    price: 599.00
  }
];