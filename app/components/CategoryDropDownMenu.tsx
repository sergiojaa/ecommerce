import React from 'react';

interface CategoryDropDownMenuProps {
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const data = [
  { name: "circuit-breakers", url: "/categories/circuit-breakers" },
  { name: "electric-magnetic-starter", url: "/categories/electric-magnetic-starter" },
  { name: "electrical-installation-boxes", url: "/categories/electrical-installation-boxes" },
  { name: "lightbulbs", url: "/categories/lightbulbs" },
  { name: "relays", url: "/categories/relays" },
  { name: "wires", url: "/categories/wires" },
  { name: "transformers", url: "/categories/transformers" },
  { name: "flashlights", url: "/categories/flashlights" },
  { name: "street-lights", url: "/categories/street-lights" },
  { name: "switches-and-sockets", url: "/categories/switches-and-sockets" },
  { name: "voltage-stabilizer", url: "/categories/voltage-stabilizer" },
];

const CategoryDropDownMenu: React.FC<CategoryDropDownMenuProps> = ({ selectedCategory, setSelectedCategory }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
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
