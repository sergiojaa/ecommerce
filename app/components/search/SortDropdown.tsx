interface Props {
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>
}

export default function SortDropdown({ sortBy, setSortBy }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value)
    }

    return (
        <select onChange={(e) => handleChange(e)} className="p-3 pr-8 border-none bg-surface rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 ease-in-out appearance-none text-text-secondary">
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
        </select>
    )
}