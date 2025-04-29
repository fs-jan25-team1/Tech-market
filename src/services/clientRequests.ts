import { CategoryType } from '@/types/CategoryType';
import { ProductCardType } from '@/types/ProductCardType';
import { ProductDetails } from '@/types/ProductDetails';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error while receiving response`);
    }

    await sleep(500);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

const filterByCategory = (
  category: CategoryType,
  products: ProductCardType[],
) => {
  return products.filter((product) => product.category === category);
};
export const getProducts = async (
  category: CategoryType,
): Promise<ProductCardType[]> => {
  const allProducts: ProductCardType[] = await fetchData('/api/products.json');
  return filterByCategory(category, allProducts);
};

export const getProductDetails = async (
  id: number,
): Promise<ProductDetails | null> => {
  const allProducts: ProductCardType[] = await fetchData('/api/products.json');

  const prod = allProducts.find((p) => p.id === id);

  const categoryProducts: ProductDetails[] = await fetchData(
    `/api/${prod?.category}.json`,
  );

  const res = categoryProducts.find((p) => p.id === prod?.itemId);

  return res ? res : null;
};


