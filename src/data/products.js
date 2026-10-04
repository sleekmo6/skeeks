// Placeholder Unsplash images — swap the IDs for your own photography.
export const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL']
const SNEAKER_SIZES = ['40', '41', '42', '43', '44', '45']

export const products = [
  { id: 1, name: 'Aero Runner', category: 'Sneakers', price: 149, tag: 'New',
    images: ['photo-1542291026-7eec264c27ff', 'photo-1491553895911-0055eca6402d', 'photo-1549298916-b41d501d3772'],
    description: 'A featherweight runner with a breathable knit upper and a responsive cushioned sole.', sizes: SNEAKER_SIZES },
  { id: 2, name: 'Court Classic White', category: 'Sneakers', price: 129,
    images: ['photo-1600185365926-3a2ce3cdb9eb', 'photo-1595950653106-6c9ebd614d3a', 'photo-1549298916-b41d501d3772'],
    description: 'Minimal full-grain leather court sneaker. Timeless, clean and built to last.', sizes: SNEAKER_SIZES },
  { id: 3, name: 'Street Hi-Top', category: 'Sneakers', price: 169, tag: 'Bestseller',
    images: ['photo-1595950653106-6c9ebd614d3a', 'photo-1542291026-7eec264c27ff', 'photo-1491553895911-0055eca6402d'],
    description: 'Bold high-top silhouette with padded collar and durable rubber cupsole.', sizes: SNEAKER_SIZES },
  { id: 4, name: 'Dune Trainer', category: 'Sneakers', price: 139,
    images: ['photo-1549298916-b41d501d3772', 'photo-1600185365926-3a2ce3cdb9eb', 'photo-1491553895911-0055eca6402d'],
    description: 'Sand-toned suede trainer with a soft sock liner for all-day comfort.', sizes: SNEAKER_SIZES },
  { id: 5, name: 'Essential Tee', category: 'Shirts', price: 45, tag: 'New',
    images: ['photo-1521572163474-6864f9cf17ab', 'photo-1576566588028-4147f3842f27', 'photo-1618354691373-d851c5c3a990'],
    description: 'Heavyweight organic cotton tee with a relaxed, boxy fit.', sizes: CLOTHING_SIZES },
  { id: 6, name: 'Noir Overshirt', category: 'Shirts', price: 119,
    images: ['photo-1551028719-00167b16eac5', 'photo-1489987707025-afc232f7ea0f', 'photo-1434389677669-e08b4cac3105'],
    description: 'Structured overshirt in washed cotton twill. Layer it or wear it alone.', sizes: CLOTHING_SIZES },
  { id: 7, name: 'Studio Hoodie', category: 'Hoodies', price: 95, tag: 'Bestseller',
    images: ['photo-1556905055-8f358a7a47b2', 'photo-1503342217505-b0a15ec3261c', 'photo-1618354691373-d851c5c3a990'],
    description: 'Brushed-fleece hoodie with a dropped shoulder and a clean, logo-free front.', sizes: CLOTHING_SIZES },
  { id: 8, name: 'Linen Day Dress', category: 'Shirts', price: 139,
    images: ['photo-1496747611176-843222e1e57c', 'photo-1515886657613-9f3515b0c78f', 'photo-1434389677669-e08b4cac3105'],
    description: 'Breezy linen-blend dress in warm beige, cut for effortless movement.', sizes: CLOTHING_SIZES },
]

export const categories = ['Hoodies', 'Shirts', 'Pants', 'Caps and headgear', 'Sneakers']
export const catLink = (c) => `/shop?category=${encodeURIComponent(c)}`

export const getProduct = (id) => products.find((p) => p.id === Number(id))
export const money = (n) => `$${n.toFixed(2)}`