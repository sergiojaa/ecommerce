export default function SortDropdown() {
    return (
        <select className="p-3 pr-8 border-none bg-surface rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 ease-in-out appearance-none text-text-secondary">
            <option value="relevance">Relevance</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
            <option value="newest">Newest</option>
        </select>
    )
}