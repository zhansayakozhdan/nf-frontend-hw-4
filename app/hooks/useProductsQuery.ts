import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../types/types";
import { productsApiAxiosInstance } from "../api/apiClient";
import { getAllProducts } from "../api/services/products";
import { toast } from "react-toastify";


  
  const useProducts = () => {
    return useQuery<IProduct[]>({
      queryKey: ["products"],
      queryFn: getAllProducts,
    });
  };
  
export default useProducts;

  
