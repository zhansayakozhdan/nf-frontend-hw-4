"use client"
import Image from "next/image"
import React from "react";
import { IProduct } from "../types/types";
import { Spinner } from "@chakra-ui/spinner";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProductsQuery";



const ProductsList = () => {
    // const { data, isLoading, isSuccess } = useQuery({
    //     queryKey: ['products'],
    //     queryFn: getProducts
    // })
    const { data, isLoading, isSuccess } = useProducts();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </div>
        )
    };

    if (!isSuccess || !data.length) {
        return (
            <div className="text-white text-center py-16">
                No products available.
            </div>
        );
    }


    return (
        <div>
            <div className="text-center p-10">
                <h1 className="font-bold text-4xl mb-4">Объявления</h1>
                <h1 className="text-3xl">У нас можно найти всё!</h1>
            </div>

            <section id="Products"
                className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-9 mt-10 mb-5">

                {data.map((product: IProduct) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </section>
        </div>

    )
};

export default ProductsList;
