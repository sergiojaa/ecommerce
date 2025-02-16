import { Search } from "lucide-react"

export default function SearchBar() {
    return (
        <div className="relative mb-8">
            <input
                type="text"
                placeholder="Search products..."
                className="w-full p-4 pl-12 rounded-full border-none bg-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 ease-in-out"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
        </div>
    )
}

