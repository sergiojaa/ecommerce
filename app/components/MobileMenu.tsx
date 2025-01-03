import Link from "next/link";
import { categoryData } from "../data";

export default function MobileMenu() {
    return (
        <div className="bg-white top-[50px] w-full mt-6 text-black z-10 lg:hidden h-[100vh] right-0 fixed">
            <ul className="flex gap-1 font-bold cursor-pointer w-full flex-col items-start justify-center">
                {categoryData.map((category) => (
                    <Link key={category.name} href={category.url}>
                        <li
                            className="border-b  w-[1000%]  p-2 box-border"
                            key={category.name}
                        >
                            {category.name}
                            hello
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
