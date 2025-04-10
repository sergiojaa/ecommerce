"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, CreditCard, Download, Printer } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import { checkTokenValidity } from "../components/utils/checkTokenValidity"
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
    const [userData, setUserData] = useState({
        userName: '', email: '', mobileNumber: ""
    });
    const [invoiceItems, setInvoiceItems] = useState<CartItem[]>([]);
    const [error, setError] = useState<string>('')
    const [totalPrice, setTotalPrice] = useState(0);
    const [order, setOrder] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState({ number: '' })
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem('token');

        checkTokenValidity(String(token)).then((isValid) => {
            if (!isValid) {
                router.push('/login')
            }
        });

        axios
            .get('http://localhost:3001/account', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            })
            .then((res) => {
                setUserData({
                    userName: res.data.username,
                    email: res.data.email,
                    mobileNumber: res.data.mobileNumber,
                });
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [router]);
    const sendInvoice = () => {
        const token = localStorage.getItem('token')
        if (phoneNumber.number.length !== 9) {
            setError("ნომერი უნდა შედგებოდეს 9 ციფრისგან");

            setTimeout(() => {
                setError("");

            }, 3000)
            return;
        }
        axios.post('YOUR_ENDPOINT_URL_HERE', {
            phoneNumber: phoneNumber.number
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                console.log('Invoice sent:', res.data);
            })
            .catch((err) => {
                console.error('Error sending invoice:', err);
            });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendInvoice();
    }



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
            </div>

            <div className="border rounded-lg p-6 shadow-md">
                <div className="flex justify-between mb-6">
                    <div>
                        <h2 className="text-2xl text-secondary font-semibold">ინვოისი</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-secondary text-white flex items-center justify-center rounded-full">
                            <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-primary">თარიღი</p>
                            <p className="text-gray-500 text-sm">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <hr className="mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="font-semibold text-secondary">ვინ უკვეთავს:</h3>
                        <p className="mt-2 text-primary">{userData.userName}</p>
                        <p className="mt-2 text-primary">{userData.email}</p>

                        <p className="mt-2 text-primary">{userData.mobileNumber}</p>
                    </div>
                    <div className="text-right">
                        <h3 className="font-semibold text-secondary">გადახდის დეტალები:</h3>
                        <p className="text-primary">შეკვეთის დღე: {new Date().toLocaleDateString()} </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-secondary">პროდუქტები</th>
                                <th className="p-3 text-secondary">აღწერა</th>
                                <th className="p-3 text-secondary text-right">რაოდენობა</th>
                                <th className="p-3 text-secondary text-right">ფასი</th>
                                <th className="p-3 text-secondary text-right">ჯამი</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceItems.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3">
                                        <Image src={item.product.image} alt={item.product.name} width={80} height={80} className="rounded-md" />
                                    </td>
                                    <td className="p-3 font-medium text-primary">{item.product.name}</td>
                                    <td className="p-3 text-right text-primary">{item.quantity}</td>
                                    <td className="p-3 text-right text-primary">{item.product.price.toFixed(2)}</td>
                                    <td className="p-3 text-right text-primary">{(item.product.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t">
                                <td colSpan={3}></td>
                                <td className="p-3 text-right font-semibold text-secondary">ჯამური ღირებულება:</td>
                                <td className="p-3 text-right text-primary">{totalPrice} ლარი</td>
                            </tr>

                        </tfoot>
                    </table>
                </div>

                <hr className="my-6" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">გმადლობთ შეძენისთვის! თუ  გაქვთ რაიმე შეკითხვა, გთხოვთ, დაუკავშირდეთ +995557210626</p>
                    <Link href={''}>
                        <button onClick={(() => setOrder(!order))} className="mt-4 md:mt-0 bg-secondary text-white px-6 py-2 rounded-xl"> შესყიდვა</button>

                    </Link>
                </div>
            </div>
            {order && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-[425px] w-full relative">
                        <button
                            onClick={() => setOrder(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold text-secondary mb-2">შეკვეთის დადასტურება!</h2>
                        <p className="text-primary mb-6">
                            შეკვეთის დასადასტურებლად გთხოვთ ჩაწეროთ თქვენი ნომერი!
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex  text-primary flex-col">
                                <label htmlFor="phone-number" className="mb-1 font-medium text-md">
                                    ტელეფონის ნომერი:
                                </label>

                                <input
                                    id="phone-number"
                                    type="number"

                                    placeholder="5XX XXX XXX"
                                    className="border mt-3 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                                    required
                                    value={phoneNumber.number}
                                    onChange={(e) =>
                                        setPhoneNumber({ number: e.target.value })
                                    }
                                />

                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-secondary text-white py-2 rounded transition-colors"
                                >
                                    დადასტურება
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div>


            </div>


        </div>
    )
}