// Flash Sale items. Linked from the Home page; the product page and cart look these up too.
const CLOTHING = ['XS', 'S', 'M', 'L', 'XL']
const WAIST = ['28', '30', '32', '34', '36']
const SHOES = ['40', '41', '42', '43', '44', '45']

const item = (id, name, category, oldPrice, price, photo, sizes) => ({
  id, name, category, price, oldPrice, sizes,
  images: [photo],
  description: `${name} at a limited-time price while stock lasts.`,
})

export const saleProducts = [
  item(101, 'Grey Wash Hoodie', 'Hoodies', 95, 76, 'photo-1489987707025-afc232f7ea0f', CLOTHING),
  item(102, 'Court Hoodie', 'Hoodies', 110, 88, 'photo-1512436991641-6745cdb1723f', CLOTHING),
  item(103, 'Signal Crew', 'Hoodies', 88, 70, 'photo-1618354691373-d851c5c3a990', CLOTHING),
  item(104, 'Fold Knit', 'Hoodies', 92, 74, 'photo-1551028719-00167b16eac5', CLOTHING),
  item(105, 'Essential Tee', 'Shirts', 45, 32, 'photo-1503341504253-dff4815485f1', CLOTHING),
  item(106, 'Rail Tee', 'Shirts', 42, 30, 'photo-1489987707025-afc232f7ea0f', CLOTHING),
  item(107, 'Mark Tee', 'Shirts', 48, 36, 'photo-1618354691373-d851c5c3a990', CLOTHING),
  item(108, 'Stack Denim', 'Pants', 120, 96, 'photo-1525507119028-ed4c629a60a3', WAIST),
  item(109, 'Road Trouser', 'Pants', 98, 79, 'photo-1539533018447-63fcce2678e3', WAIST),
  item(110, 'Wash Jean', 'Pants', 115, 92, 'photo-1525507119028-ed4c629a60a3', WAIST),
  item(111, 'Aero Runner', 'Sneakers', 149, 119, 'photo-1606107557195-0e29a4b5b4aa', SHOES),
  item(112, 'Court Classic', 'Sneakers', 139, 109, 'photo-1608231387042-66d1773070a5', SHOES),
  item(113, 'Street Hi-Top', 'Sneakers', 169, 129, 'photo-1556906781-9a412961c28c', SHOES),
  item(114, 'Dune Trainer', 'Sneakers', 155, 124, 'photo-1491553895911-0055eca6402d', SHOES),
  item(115, 'Low Knit', 'Sneakers', 129, 99, 'photo-1608231387042-66d1773070a5', SHOES),
]

export const getSaleProduct = (id) => saleProducts.find((p) => p.id === Number(id))