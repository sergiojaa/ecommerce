'use client'
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
    _id: string;
    name: string;
    subcategories: string[]
}

type Props = {
    categories: Category[];
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    highestPrice: number;
    maxPrice: number;
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
    setHighestPrice: React.Dispatch<React.SetStateAction<number>>;
};

export default function Filters({
    categories,
    selectedCategory,
    setSelectedCategory,
    setCurrentPage,
    highestPrice,
    maxPrice,
    setMaxPrice,
    setHighestPrice
}: Props) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (selectedCategory) {
            params.set("category", selectedCategory);
        } else {
            params.delete("category");
        }
        params.set("maxPrice", maxPrice.toString());


        router.push(`?${params.toString()}`);
        setCurrentPage(1);
    }, [selectedCategory, maxPrice]);

    return (
        <div className="bg-surface p-6 rounded-lg shadow-sm mb-6 lg:mb-0">
            <div className="flex justify-between items-center cursor-pointer lg:cursor-default" onClick={() => setIsOpen(!isOpen)}>
                <h2 className="text-2xl font-semibold text-text-primary">Filters</h2>
                <button className="lg:hidden">
                    {isOpen ? <ChevronUp className="text-text-secondary" /> : <ChevronDown className="text-text-secondary" />}
                </button>
            </div>
            <div className={`mt-6 ${isOpen ? "block" : "hidden lg:block"}`}>
                <h3 className="font-semibold mb-3 text-text-primary">Categories</h3>
                {categories.map(({ _id, name }) => (
                    <div key={_id} className="flex items-center mb-3">
                        <input
                            type="checkbox"
                            id={_id}
                            className="mr-3 form-checkbox text-primary rounded"
                            checked={selectedCategory === _id}
                            onChange={() => {
                                setSelectedCategory(selectedCategory === _id ? null : _id);
                                setCurrentPage(1);
                            }}
                        />
                        <label htmlFor={_id} className="text-text-secondary">{name}</label>
                    </div>
                ))}
                <h3 className="font-semibold mb-3 mt-6 text-text-primary">Price Range</h3>
                <input
                    type="range"
                    min="0"
                    max={highestPrice}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full"
                />
                <div className="flex justify-between mt-2 text-text-secondary">
                    <span>$0</span>
                    <span>${maxPrice}</span>
                </div>
            </div>
        </div>
    );
}

