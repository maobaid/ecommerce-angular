export interface Category {
  id: number;
  name: string;
  slug: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
  },
  {
    id: 2,
    name: 'Furniture',
    slug: 'furniture',
  },
  {
    id: 3,
    name: 'Clothing',
    slug: 'clothing',
  },
];
