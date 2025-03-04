import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

type PaginationProps = {
    totalPages: number
    currentPage: number
    setCurrentPage: React.Dispatch<number>
}

export default function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const pageQuery = searchParams.get('page')

        if (!pageQuery) {
            return
        }

        if (Number(pageQuery) > totalPages) {
            setCurrentPage(1)
        } else {
            setCurrentPage(Number(pageQuery))
        }

    }, [searchParams])

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set("page", currentPage.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    }, [currentPage]);

    const getPageNumbers = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 3) return [1, 2, 3, 4, 5];
        if (currentPage >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    };

    return (
        <div className="flex justify-center items-center space-x-2">
            <button
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-surface shadow-sm hover:shadow-md transition duration-300 ease-in-out disabled:opacity-50"
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
                <ChevronLeft className="w-5 h-5 text-text-secondary" />
            </button>
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-full transition duration-300 ease-in-out ${page === currentPage ? "bg-primary text-white shadow-sm" : "bg-surface text-text-secondary hover:bg-gray-100"}`}
                >
                    {page}
                </button>
            ))}
            <button
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-surface shadow-sm hover:shadow-md transition duration-300 ease-in-out disabled:opacity-50"
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            >
                <ChevronRight className="w-5 h-5 text-text-secondary" />
            </button>
        </div>
    );
}
