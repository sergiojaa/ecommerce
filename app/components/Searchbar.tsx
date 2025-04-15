import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faX, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface IProps {
    inputOpen: boolean;
    setInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Searchbar({ inputOpen, setInputOpen }: IProps) {
    const pathname = usePathname();
    const router = useRouter();

    const desktopSearchbarRef = useRef<HTMLDivElement>(null);
    const mobileSearchbarRef = useRef<HTMLDivElement>(null);

    const [search, setSearch] = useState('');
    const [searchedProducts, setSearchedProducts] = useState<any[]>([]);
    const [searchPromptOpen, setSearchPromptOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setSearch('');
        setSearchedProducts([]);
        setSearchPromptOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                desktopSearchbarRef.current?.contains(event.target as Node) ||
                mobileSearchbarRef.current?.contains(event.target as Node)
            ) {
                setSearchPromptOpen(true);
            } else {
                setSearchPromptOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        if (value.length < 3) {
            setSearchedProducts([]);
            setSearchPromptOpen(false);
            return;
        }

        setLoading(true);

        searchTimeout.current = setTimeout(async () => {
            try {
                const response = await axios.get(`https://trulaila-api-production.up.railway.app//products?name=${value}`);
                setSearchedProducts(response.data.products.slice(0, 5));
                setSearchPromptOpen(true);
            } catch (error) {
                console.error(error);
                setSearchedProducts([]);
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    const redirectToSearch = () => {
        router.push(`/products/search?name=${search}`)
    }

    return (
        <>
            {/* Desktop Searchbar */}
            <div className="h-[40px] text-sm mx-[35px] relative md:block hidden" ref={desktopSearchbarRef}>
                <input
                    type="text"
                    onChange={handleSearch}
                    value={search}
                    className="w-[342px] lg:w-[500px] xl:w-[600px] h-full px-3 border-none outline-none bg-[#F8F8F8] rounded-xl"
                    placeholder="რას ეძებთ?"
                />
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    onClick={redirectToSearch}
                    className="absolute right-4 text-[18px] top-[50%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />

                {searchPromptOpen && (
                    <div className="mt-[10px] absolute w-full z-10 bg-white shadow-md rounded-lg">
                        {loading ? (
                            <div className="w-full border-gray-200 flex items-center px-4 py-2">
                                <p className="text-gray-500 text-sm">Loading...</p>
                            </div>
                        ) : searchedProducts.length > 0 ? (
                            searchedProducts.map((product) => (
                                <Link key={product._id} href={`/products/${product._id}`} className="block">
                                    <div className="w-full border-gray-200 flex items-center px-4 py-2 hover:bg-gray-100">
                                        <div onClick={redirectToSearch} className="w-[28px] h-[28px] bg-[#f5f6f6] flex items-center justify-center rounded-lg group-hover:bg-secondary">
                                            <FontAwesomeIcon icon={faSearch} className="text-primary group-hover:text-white" />
                                        </div>
                                        <span className="text-xs ml-3">{product.name}</span>
                                    </div>
                                </Link>
                            ))
                        ) : search.length >= 3 ? (
                            <div className="w-full border-gray-200 flex items-center px-4 py-2">
                                <p className="text-gray-500 text-sm">პროდუქტი არ მოიძებნა</p>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>

            {/* Mobile Searchbar */}
            <div ref={mobileSearchbarRef} className={`md:hidden w-full h-[40px] text-sm mx-[15px] relative ${inputOpen ? 'block' : 'hidden'}`}>
                <input
                    type="text"
                    onChange={handleSearch}
                    value={search}
                    className="w-full h-full px-3 border-none outline-none bg-[#F8F8F8] rounded-xl"
                    placeholder="რას ეძებთ?"
                />
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute right-4 text-[18px] top-[50%] transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />

                {searchPromptOpen && (
                    <div className="mt-[10px] absolute w-full z-10 bg-white shadow-md rounded-lg">
                        {loading ? (
                            <div className="w-full border-gray-200 flex items-center px-4 py-2">
                                <p className="text-gray-500 text-sm">Loading...</p>
                            </div>
                        ) : searchedProducts.length > 0 ? (
                            searchedProducts.map((product) => (
                                <Link key={product._id} href={`/products/${product._id}`} className="block">
                                    <div className="w-full border-gray-200 flex items-center px-4 py-2 hover:bg-gray-100">
                                        <div className="w-[28px] h-[28px] bg-[#f5f6f6] flex items-center justify-center rounded-lg group-hover:bg-secondary">
                                            <FontAwesomeIcon icon={faSearch} className="text-primary group-hover:text-white" />
                                        </div>
                                        <span className="text-xs ml-3">{product.name}</span>
                                    </div>
                                </Link>
                            ))
                        ) : search.length >= 3 ? (
                            <div className="w-full border-gray-200 flex items-center px-4 py-2">
                                <p className="text-gray-500 text-sm">პროდუქტი არ მოიძებნა</p>
                            </div>
                        ) : null}
                    </div>
                )}
            </div>

            {/* Close Button */}
            {inputOpen && (
                <div onClick={() => setInputOpen(false)}>
                    <FontAwesomeIcon icon={faX} className="text-secondary translate-y-[10%] text-xl cursor-pointer md:hidden block" />
                </div>
            )}
        </>
    );
}
