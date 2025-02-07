import { productService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const productsQuery = {
  queryKey: ["products"],
  queryFn: productService.list,
};

export function useProductsQuery() {
  return useQuery({
    ...productsQuery,
  });
}
