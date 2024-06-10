import axios from "axios";
import { IProduct } from "../../types/types";
import { productsApiAxiosInstance } from "../apiClient";


// export async function getProducts(): Promise<IProduct[]> {
//     const response = await productsApiAxiosInstance.get(`/posts`, {
//         //params: { limit: 10 }
//         //headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
//     });
//     return response.data;
// }

export const getAllProducts = async (): Promise<IProduct[]> => {
    const res = await productsApiAxiosInstance.get("/products");
    return res.data;
};




export const createProduct = async (productData: {
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
}): Promise<IProduct | undefined> => {
    try {
        const response = await productsApiAxiosInstance.post<IProduct>(`/products`, productData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.message, 'error');
        } else {
            console.log(error);
        }
    }
}




