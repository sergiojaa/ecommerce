import CategoryDisplay from "./components/CategoryDisplay";
import CustomSlider from "./components/CustomSlider";
import ImageSlider from "./components/ImageSlider";
import Products from "./components/products/Products";

export default function Home() {
  return (
    <div>
      <ImageSlider />
      <CustomSlider />
      <CategoryDisplay />
      <CustomSlider />

      {/* <Products /> */}
    </div>
  );
}
