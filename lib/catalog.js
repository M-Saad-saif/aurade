export const photos = {
  blue: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=1400&q=85',
  wrist:
    'https://images.unsplash.com/photo-1590995505834-e5380bba1865?auto=format&fit=crop&w=1400&q=85',
  grey: 'https://images.unsplash.com/photo-1664915620151-e585cdb114d3?auto=format&fit=crop&w=1400&q=85',
  sport:
    'https://images.unsplash.com/photo-1659875976926-6a0d5c2ed48e?auto=format&fit=crop&w=1400&q=85',
  heritage:
    'https://images.unsplash.com/photo-1717157197005-b851de4abc63?auto=format&fit=crop&w=1800&q=85',
};
export const collections = [
  {
    slug: 'dress',
    name: 'Dress',
    subtitle: 'Quiet confidence.',
    image: photos.heritage,
    description:
      'Clean lines and considered proportions for the moments that call for something special.',
  },
  {
    slug: 'sport',
    name: 'Sport',
    subtitle: 'Made for movement.',
    image: photos.sport,
    description: 'A bolder expression of time, selected for an active everyday rhythm.',
  },
  {
    slug: 'everyday',
    name: 'Everyday',
    subtitle: 'Your daily signature.',
    image: photos.blue,
    description:
      'Versatile silhouettes that move naturally from the first coffee to the last appointment.',
  },
  {
    slug: 'automatic',
    name: 'Automatic',
    subtitle: 'A mechanical perspective.',
    image: photos.grey,
    description:
      'Explore the appeal of mechanical timekeeping through our illustrative automatic collection.',
  },
];
export const products = [
  {
    id: 'a1-atlas',
    name: 'Atlas Blue',
    reference: 'A1',
    category: 'everyday',
    movement: 'Quartz',
    price: 6922200,
    image: photos.blue,
    images: [photos.blue],
    dial: 'Blue',
    caseSize: '40 mm',
    caseMaterial: 'Stainless steel',
    waterResistance: '5 ATM',
    straps: ['Blue leather', 'Black leather'],
    stock: 12,
    badge: 'Signature',
    description:
      'A deep blue dial, balanced proportions and a refined leather strap. Atlas is a considered companion for your everyday rhythm.',
  },
  {
    id: 'c1-heritage',
    name: 'Heritage Classic',
    reference: 'C1',
    category: 'dress',
    movement: 'Quartz',
    price: 8034200,
    image: photos.heritage,
    images: [photos.heritage],
    dial: 'Silver',
    caseSize: '39 mm',
    caseMaterial: 'Stainless steel',
    waterResistance: '3 ATM',
    straps: ['Black leather', 'Brown leather'],
    stock: 8,
    badge: 'The classic',
    description:
      'An understated silver-tone face meets the warmth of leather. Heritage brings a timeless sensibility to a modern wardrobe.',
  },
  {
    id: 's1-mono',
    name: 'Mono Graphite',
    reference: 'S1',
    category: 'automatic',
    movement: 'Automatic',
    price: 11092200,
    image: photos.grey,
    images: [photos.grey],
    dial: 'Graphite',
    caseSize: '41 mm',
    caseMaterial: 'Stainless steel',
    waterResistance: '5 ATM',
    straps: ['Graphite', 'Black leather'],
    stock: 6,
    badge: 'New perspective',
    description:
      'Tonal details and a sculptural profile create a watch with a quietly distinctive presence. A study in restraint.',
  },
  {
    id: 'r1-summit',
    name: 'Summit Chronograph',
    reference: 'R1',
    category: 'sport',
    movement: 'Quartz chronograph',
    price: 9146200,
    image: photos.sport,
    images: [photos.sport],
    dial: 'White',
    caseSize: '42 mm',
    caseMaterial: 'Stainless steel',
    waterResistance: '10 ATM',
    straps: ['Black strap', 'Steel bracelet'],
    stock: 10,
    badge: 'Explore more',
    description:
      'A crisp dial and confident sporting silhouette. Summit brings an adventurous spirit to the collection.',
  },
];

export const getProduct = (id) => products.find((product) => product.id === id);

export const getCollection = (slug) => collections.find((collection) => collection.slug === slug);

export const formatMoney = (paisa) => {
  const value = Number(paisa) / 100;
  const [whole, fraction] = Math.abs(value).toFixed(2).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = value < 0 ? '-' : '';

  return `${sign}Rs ${grouped}.${fraction}`;
};
export const shippingFor = (subtotal) => (subtotal === 0 || subtotal >= 8340000 ? 0 : 417000);
