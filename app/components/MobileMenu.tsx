import Link from "next/link";
import { categoryData } from "../data";

export default function MobileMenu({ open }: { open: () => void }) {
    return (
        <div className="bg-[#FFFFFF] top-[83px] w-full text-black md:hidden h-[100vh] right-0 fixed">
            <ul className="flex gap-1 font-bold cursor-pointer w-full flex-col items-start justify-center">
                {categoryData.map((category) => (
                    <Link key={category.name} href={category.url} className="w-full border-b" onClick={open}>
                        <li
                            className="py-3 px-4 font-normal"
                            key={category.name}
                        >
                            {category.name}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
