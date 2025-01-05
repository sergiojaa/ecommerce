import Image from "next/image";
import Products from "./components/products/Products";
import CategorySlider from "./components/CategorySlider";

export default function Home() {
  return (
    <div>
      <CategorySlider/>

      <Products/>
    </div>
  );
}
