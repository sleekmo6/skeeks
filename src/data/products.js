// Placeholder Unsplash images — swap the IDs for your own photography.
export const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL']
const SNEAKER_SIZES = ['40', '41', '42', '43', '44', '45']

export const products = [
  { id: 1, name: 'Grey Wash Hoodie', category: 'Hoodies', price: 95, tag: 'Bestseller',
    images: ['photo-1556821840-3a63f95609a7', 'photo-1578587018452-892bacefd3f2'],
    description: 'Brushed fleece hoodie with a dropped shoulder and a clean front.', sizes: CLOTHING_SIZES },
  { id: 2, name: 'Court Hoodie', category: 'Hoodies', price: 110, tag: 'New',
    images: ['photo-1515886657613-9f3515b0c78f', 'photo-1556821840-3a63f95609a7'],
    description: 'Cropped court hoodie in a heavy loopback cotton.', sizes: CLOTHING_SIZES },
  { id: 3, name: 'Signal Crew', category: 'Hoodies', price: 88,
    images: ['photo-1578587018452-892bacefd3f2', 'photo-1556905055-8f358a7a47b2'],
    description: 'Relaxed crew in a dry hand-feel, cut to sit over a tee.', sizes: CLOTHING_SIZES },
  { id: 4, name: 'Fold Knit', category: 'Hoodies', price: 92,
    images: ['photo-1556905055-8f358a7a47b2', 'photo-1556821840-3a63f95609a7'],
    description: 'Soft knit layer for cooler evenings. Logo-free.', sizes: CLOTHING_SIZES },

  { id: 5, name: 'Essential Tee', category: 'Shirts', price: 45, tag: 'New',
    images: ['photo-1521572163474-6864f9cf17ab', 'photo-1523381210434-271e8be1f52b'],
    description: 'Heavyweight cotton tee with a relaxed, boxy fit.', sizes: CLOTHING_SIZES },
  { id: 6, name: 'Rail Tee', category: 'Shirts', price: 42,
    images: ['photo-1523381210434-271e8be1f52b', 'photo-1521572163474-6864f9cf17ab'],
    description: 'Everyday tee in a slightly longer body.', sizes: CLOTHING_SIZES },
  { id: 7, name: 'Mark Tee', category: 'Shirts', price: 48,
    images: ['photo-1576566588028-4147f3842f27', 'photo-1521572163474-6864f9cf17ab'],
    description: 'Printed tee on a midweight cotton base.', sizes: CLOTHING_SIZES },
  { id: 8, name: 'Plain Crew', category: 'Shirts', price: 40,
    images: ['photo-1521572163474-6864f9cf17ab', 'photo-1576566588028-4147f3842f27'],
    description: 'Plain crew neck. The one that goes with everything.', sizes: CLOTHING_SIZES },

  { id: 9, name: 'Stack Denim', category: 'Pants', price: 120,
    images: ['photo-1542272604-787c3835535d', 'photo-1473966968600-fa801b869a1a'],
    description: 'Straight denim with a clean wash and a regular rise.', sizes: CLOTHING_SIZES },
  { id: 10, name: 'Road Trouser', category: 'Pants', price: 98,
    images: ['photo-1473966968600-fa801b869a1a', 'photo-1542272604-787c3835535d'],
    description: 'Tapered trouser in a cotton twill. Easy through the thigh.', sizes: CLOTHING_SIZES },
  { id: 11, name: 'Wash Jean', category: 'Pants', price: 115, tag: 'Bestseller',
    images: ['photo-1542272604-787c3835535d', 'photo-1556905055-8f358a7a47b2'],
    description: 'Washed jean with a straight leg and a soft break.', sizes: CLOTHING_SIZES },
  { id: 12, name: 'Day Chino', category: 'Pants', price: 90,
    images: ['photo-1473966968600-fa801b869a1a', 'photo-1556905055-8f358a7a47b2'],
    description: 'Light chino for warm days. No crease.', sizes: CLOTHING_SIZES },

  { id: 13, name: 'Court Cap', category: 'Caps and headgear', price: 35,
    images: ['photo-1588850561407-ed78c282e89b', 'photo-1556905055-8f358a7a47b2'],
    description: 'Unstructured cap with a soft brim.', sizes: ['One size'] },
  { id: 14, name: 'Mesh Cap', category: 'Caps and headgear', price: 32,
    images: ['photo-1588850561407-ed78c282e89b', 'photo-1523381210434-271e8be1f52b'],
    description: 'Mesh-back cap. One size.', sizes: ['One size'] },

  { id: 15, name: 'Aero Runner', category: 'Sneakers', price: 149, tag: 'New',
    images: ['photo-1542291026-7eec264c27ff', 'photo-1600185365926-3a2ce3cdb9eb'],
    description: 'Lightweight runner with a knit upper and a cushioned sole.', sizes: SNEAKER_SIZES },
  { id: 16, name: 'Court Classic', category: 'Sneakers', price: 139,
    images: ['photo-1600185365926-3a2ce3cdb9eb', 'photo-1542291026-7eec264c27ff'],
    description: 'Clean court sneaker. Leather upper, cupsole.', sizes: SNEAKER_SIZES },
  { id: 17, name: 'Street Hi-Top', category: 'Sneakers', price: 169, tag: 'Bestseller',
    images: ['photo-1595950653106-6c9ebd614d3a', 'photo-1549298916-b41d501d3772'],
    description: 'High-top with a padded collar and a durable cupsole.', sizes: SNEAKER_SIZES },
  { id: 18, name: 'Dune Trainer', category: 'Sneakers', price: 155,
    images: ['photo-1549298916-b41d501d3772', 'photo-1595950653106-6c9ebd614d3a'],
    description: 'Sand-toned trainer with a soft sock liner.', sizes: SNEAKER_SIZES },
  { id: 19, name: 'Low Knit', category: 'Sneakers', price: 129,
    images: ['photo-1460353581641-37baddab0fa2', 'photo-1600185365926-3a2ce3cdb9eb'],
    description: 'Low knit sneaker for daily wear.', sizes: SNEAKER_SIZES },
  { id: 20, name: 'Pastel Court', category: 'Sneakers', price: 159,
    images: ['photo-1595950653106-6c9ebd614d3a', 'photo-1460353581641-37baddab0fa2'],
    description: 'Court shoe in a pale color block.', sizes: SNEAKER_SIZES },
]

export const categories = ['Hoodies', 'Shirts', 'Pants', 'Caps and headgear', 'Sneakers']
export const catLink = (c) => `/shop?category=${encodeURIComponent(c)}`

export const getProduct = (id) => products.find((p) => p.id === Number(id))
export const money = (n) => `$${n.toFixed(2)}`