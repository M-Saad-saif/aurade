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

export const getProduct = (id) => products.find((product) => product.id === id);

export const getCollection = (slug) => collections.find((collection) => collection.slug === slug);

export const formatMoney = (amount) => {
  const value = Number(amount);
  const [whole, fraction] = Math.abs(value).toFixed(2).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = value < 0 ? '-' : '';

  return `${sign}Rs ${grouped}.${fraction}`;
};
