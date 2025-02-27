'use client'
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
    _id: string;
    name: string;
    subcategories: string[]
}

type Props = {
    maxPrice: string;
    setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>
    categories: Category[]
    highestPrice: number;
};

export default function Filters({ maxPrice, setMaxPrice, category, setCategory, categories, highestPrice }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    const handleCategoryChange = (name: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        setCategory(name)

        if (name !== category) {
            searchParams.set("category", name);
            router.push(`${pathname}?${searchParams.toString()}`);
        } else {
            setCategory('')
            searchParams.delete("category")
            router.push(`${pathname}?${searchParams.toString()}`)
        }

    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchParams = new URLSearchParams(window.location.search);

        setMaxPrice(event.target.value)
        searchParams.set("maxPrice", event.target.value);
        router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
    }

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
                            checked={category === name}
                            className="mr-3 form-checkbox text-primary rounded"
                            onChange={() => handleCategoryChange(name)}
                        />
                        <label htmlFor={_id} className="text-text-secondary">{name}</label>
                    </div>
                ))}
                <h3 className="font-semibold mb-3 mt-6 text-text-primary">Price Range</h3>
                <input
                    type="range"
                    min="0"
                    max={highestPrice}
                    className="w-full"
                    value={maxPrice}
                    onChange={(event) => handlePriceChange(event)}
                />
                <div className="flex justify-between mt-2 text-text-secondary">
                    <span>{0} ₾</span>
                    <span>{highestPrice} ₾</span>
                </div>
                {category}
            </div>
        </div>
    );
}

