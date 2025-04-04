"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, CreditCard, Download, Printer } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
interface Product {
    _id: string;
    image: string;
    name: string;
    price: number;
}

interface CartItem {
    product: Product;
    quantity: number;
    totalPrice: number;
}
export default function InvoicePage() {
    const [invoiceItems, setInvoiceItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const storedItems = localStorage.getItem("invoiceData");
        const storedTotal = localStorage.getItem("invoiceTotal");

        if (storedItems && storedTotal) {
            setInvoiceItems(JSON.parse(storedItems));
            setTotalPrice(JSON.parse(storedTotal));
        }
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <Link href="/cart" className="text-sm font-medium text-gray-600 hover:text-black flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to cart
                </Link>
                <div className="flex gap-2">
                    <button className="hidden md:flex items-center border px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100">
                        <Printer className="h-4 w-4 mr-2" /> Print
                    </button>
                    <button className="flex items-center border px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-100">
                        <Download className="h-4 w-4 mr-2" /> Download
                    </button>
                </div>
            </div>

            <div className="border rounded-lg p-6 shadow-md">
                <div className="flex justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold">ინვოისი</h2>
                        {/* <p className="text-gray-500">Invoice #INV-2024-0042</p> */}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                            <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold">თარიღი</p>
                            <p className="text-gray-500 text-sm">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <hr className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="font-semibold">ვინ უკვეთავს:</h3>
                        <p>John Smith</p>
                        <p>123 Main Street, Anytown, CA 12345</p>
                        <p>United States</p>
                        <p className="mt-2">john.smith@example.com</p>
                    </div>
                    <div className="text-right">
                        <h3 className="font-semibold">გადახდის დეტალები:</h3>
                        <p>შეკვეთის დღე: {new Date().toLocaleDateString()} </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3">პროდუქტები</th>
                                <th className="p-3">აღწერა</th>
                                <th className="p-3 text-right">რაოდენობა</th>
                                <th className="p-3 text-right">ფასი</th>
                                <th className="p-3 text-right">ჯამი</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceItems.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3">
                                        <Image src={item.product.image} alt={item.product.name} width={80} height={80} className="rounded-md" />
                                    </td>
                                    <td className="p-3 font-medium">{item.product.name}</td>
                                    <td className="p-3 text-right">{item.quantity}</td>
                                    <td className="p-3 text-right">{item.product.price.toFixed(2)}</td>
                                    <td className="p-3 text-right">{(item.product.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t">
                                <td colSpan={3}></td>
                                <td className="p-3 text-right font-semibold">ჯამური ღირებულება:</td>
                                <td className="p-3 text-right">{totalPrice} ლარი</td>
                            </tr>

                        </tfoot>
                    </table>
                </div>

                <hr className="my-6" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">გმადლობთ შეძენისთვის! თუ  გაქვთ რაიმე შეკითხვა, გთხოვთ, დაუკავშირდეთ +995557210626</p>
                    <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"> შესყიდვა</button>
                </div>
            </div>
        </div>
    )
}