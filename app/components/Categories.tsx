import React from 'react';
import { Category } from '../layout'; // Make sure Category type is correctly imported

// Define the props type for Categories component
type CategoriesProps = {
  data: Category[];
};

export const data = [
  { name: "ავტომატები", url: "/categories/circuit-breakers" },
  { name: "ელ. მაგნიტური გამშვი", url: "/categories/electric-magnetic-starter" },
  { name: "ელ. სამონტაჟო ყუთები", url: "/categories/electrical-installation-boxes" },
  { name: "ნათურები", url: "/categories/lightbulbs" },
  { name: "რელე", url: "/categories/relays" },
  { name: "სადენები", url: "/categories/wires" },
  { name: "ტრანსფორმატორები", url: "/categories/transformers" },
  { name: "ფანრები", url: "/categories/flashlights" },
  { name: "ქუჩის სანათები", url: "/categories/street-lights" },
  { name: "ჩამრთველები და როზეტები", url: "/categories/switches-and-sockets" },
  { name: "ძაბვის სტაბილიზატორი", url: "/categories/voltage-stabilizer" },
];

const Categories: React.FC<CategoriesProps> = ({ data }) => {
  return (
    <div>
      {/* Render data here */}
      {data.map((category) => (
        <div key={category.url}>
          <h3>{category.name}</h3>
          <a href={category.url}>Go to category</a>
        </div>
      ))}
    </div>
  );
};

export default Categories;
