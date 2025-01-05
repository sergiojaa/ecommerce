import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IProps {
    inputOpen: boolean;
    setInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Searchbar({ inputOpen, setInputOpen }: IProps) {
    const pathname = usePathname();
    const desktopSearchbarRef = useRef<HTMLDivElement>(null);
    const mobileSearchbarRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = React.useState('');
    const [searchedProducts, setSearchedProducts] = React.useState([]);
    const [searchPromptOpen, setSearchPromptOpen] = React.useState(false);

    useEffect(() => {
        setSearchPromptOpen(false);
        setSearchedProducts([]);
        setSearch('');
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                (desktopSearchbarRef.current && desktopSearchbarRef.current.contains(event.target as Node)) ||
                (mobileSearchbarRef.current && mobileSearchbarRef.current.contains(event.target as Node))
            ) {
                setSearchPromptOpen(true);
                return;
            } else {
                setSearchPromptOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);

        if (e.target.value === '') {
            setSearchedProducts([]);
            return;
        }

        if (e.target.value.length < 3) {
            return;
        }

        try {
            const products = await axios.get('http://localhost:3001/products?name=' + e.target.value);
            setSearchPromptOpen(true);
            setSearchedProducts(products.data.splice(0, 5));
        } catch (err) {
            setSearchedProducts([]);
            setSearchPromptOpen(false);
            console.log(err);
        }
    };

    return (
        <>
            {/* Desktop Searchbar */}
            <div
                className="w-[70%] h-[40px] text-sm mx-[35px] relative md:block hidden"
                ref={desktopSearchbarRef}
            >
                <input
                    type="text"
                    onChange={handleSearch}
                    className="w-full h-full px-3 border-none outline-none bg-[#F8F8F8] rounded-xl"
                    value={search}
                    placeholder="რას ეძებთ?"
                />
                <div>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute right-4 text-[18px] top-[50%] transform translate-y-[-50%] text-gray-500 cursor-pointer"
                    />
                </div>

                <div>
                    {searchPromptOpen && searchedProducts.map((product: any) => (
                        <div key={product._id}>
                            <Link href={`/products/${product._id}`}>
                                <div className="w-full px-[10px] py-[10px] bg-white border-b border-gray-200 flex items-center justify-between group">
                                    <div className="flex items-center gap-[10px]">
                                        <div className="w-[28px] h-[28px] bg-[#f5f6f6] flex items-center justify-center rounded-lg transition-all delay-75 group-hover:bg-secondary">
                                            <FontAwesomeIcon icon={faSearch} className="text-primary group-hover:text-white transition-all delay-75" />
                                        </div>
                                        <span className="text-xs">{product.name}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Searchbar */}
            <div
                ref={mobileSearchbarRef}
                className={`w-[100%] h-[40px] text-sm mx-[15px] relative md:hidden ${inputOpen ? 'block' : 'hidden'}`}
            >
                <input
                    type="text"
                    onChange={handleSearch}
                    value={search}
                    className="w-full h-full px-3 border-none outline-none bg-[#F8F8F8] rounded-xl"
                    placeholder="რას ეძებთ?"
                />

                <div>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute right-4 text-[18px] top-[50%] transform translate-y-[-50%] text-gray-500 cursor-pointer"
                    />
                </div>

                <div>
                    {searchPromptOpen && searchedProducts.map((product: any) => (
                        <Link key={product._id} href={`/products/${product._id}`} >
                            <div className="w-full px-[10px] py-[10px] bg-white border-b border-gray-200 flex items-center justify-between group">
                                <div className="flex items-center gap-[10px]">
                                    <div className="w-[28px] h-[28px] bg-[#f5f6f6] flex items-center justify-center rounded-lg transition-all delay-75 group-hover:bg-secondary">
                                        <FontAwesomeIcon icon={faSearch} className="text-primary group-hover:text-white transition-all delay-75" />
                                    </div>
                                    <span className="text-xs">{product.name}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Close Button */}
            <div className={`${inputOpen ? 'block' : 'hidden'}`} onClick={() => setInputOpen(false)}>
                <FontAwesomeIcon
                    icon={faX}
                    className="text-secondary translate-y-[10%] text-xl cursor-pointer md:hidden block"
                />
            </div>
        </>
    );
}
