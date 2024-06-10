"use client"
import Image from "next/image";
import ProductsList from "./components/ProductsList";

export default function Home() {

  // useEffect(() => {
  //   getProducts;
  // }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProductsList/>
    </main>
  );
}
