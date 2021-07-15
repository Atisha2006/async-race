const MODELS = [
  'Tesla',
  'Mersedes',
  'Tayota',
  'Opel',
  'Renault',
  'Porshe',
  'Audi',
  'BMW',
  'Chevrolet',
  'Chrysler',
  'Citroen',
  'Dodge',
  'Fiat'
];
const SUB_MODELS = [
  'Model S',
  'Camry',
  'Corsa',
  'Cayenne',
  'Xsara',
  'Logan',
  'TT',
  'E-tron',
  'S7',
  'I8',
  'X6',
  'Bolt',
  'Captiva'
];

function getRandomHelper(list: Array<string>): string {
  const i: number = Math.floor(Math.random() * list.length);
  return list[i];
}

export function generateRandomName(): string {
  return `${getRandomHelper(MODELS)} ${getRandomHelper(SUB_MODELS)}`;
}
