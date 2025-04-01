import CategoryDisplay from "./components/CategoryDisplay";
import CustomSlider from "./components/CustomSlider";
import ImageSlider from "./components/ImageSlider";

export default function Home() {
  return (
    <>
      <div>

        <ImageSlider />
        <CategoryDisplay />

        <CustomSlider />
        <CustomSlider />

        {/* <Products /> */}
      </div>
    </>

  );
}
