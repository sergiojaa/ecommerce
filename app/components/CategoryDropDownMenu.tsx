import React from 'react';

interface CategoryDropDownMenuProps {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

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

const CategoryDropDownMenu: React.FC<CategoryDropDownMenuProps> = ({ selectedCategory, setSelectedCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <label htmlFor="category-select" className="block text-lg mb-2">აირჩიე კატეგორია</label>
      <select
        id="category-select"
        value={selectedCategory || ''}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
      >
        <option value="">კატეგორიის არჩევა </option>
        {data.map((item) => (
          <option key={item.url} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropDownMenu;
