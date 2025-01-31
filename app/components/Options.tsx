'use client'
import { useState } from "react";

type TypeDetail = {
    type: string;
    price: string;
};

type OptionsProps = {
    types: TypeDetail[];
    selectedType: TypeDetail | null;
    setSelectedType: (type: TypeDetail) => void;
};

export default function Options({ types, selectedType, setSelectedType }: OptionsProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleTypeSelection = (type: TypeDetail) => {
        setSelectedType(type);
        setDropdownOpen(false);
    };

    return (
        <div className="relative mt-4 w-full max-w-[400px]">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border w-full px-4 py-2 rounded-lg bg-gray-100 shadow-md hover:bg-gray-200 flex justify-between items-center"
            >
                <span className="text-[10px]">{selectedType?.type || "აირჩიე ტიპი"}</span>
                <svg
                    className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg border rounded-lg z-10">
                    {types.map((type, index) => (
                        <div
                            key={index}
                            onClick={() => handleTypeSelection(type)}
                            className="px-2 py-2  hover:bg-gray-100 cursor-pointer"
                        >
                            {`${type.type} | ფასი: ${type.price}`}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
