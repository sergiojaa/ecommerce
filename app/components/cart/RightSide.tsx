'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function RightSide({
    totalItems,
    price,
    products
}: {
    totalItems: number;
    price: number;
    products: CartItem[];
}) {
    const router = useRouter();

    return (
        <div className="flex-[1] flex items-start justify-center">
            <div className="px-4 py-6 rounded-xl shadow-lg border border-gray-200 mx-[25px] w-full">
                <div className="flex flex-col gap-[20px]">
                    <h1 className="font-bold text-xl">გადახდა</h1>
                    <span className="flex items-center justify-between font-[300] text-xs">
                        <p>პროდუქტები ({totalItems})</p>
                        <p>${price}</p>
                    </span>
                    <span className="flex items-center justify-between font-[300] text-xs">
                        <p>ფასდაკლება</p>
                        <p>-$0.00</p>
                    </span>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <span className="flex items-center justify-between font-[300] text-xs">
                        <h1>ჯამური ღირებულება</h1>
                        <h1>${price}</h1>
                    </span>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <button
                        onClick={() => {
                            localStorage.setItem("invoiceData", JSON.stringify(products));
                            localStorage.setItem("invoiceTotal", JSON.stringify(price));
                            router.push("/invoice");
                        }}
                        className="px-3 py-5 rounded-md text-sm text-white w-full bg-secondary font-bold"
                    >
                        შეკვეთის გაფორმება
                    </button>
                </div>
            </div>
        </div>
    );
}
