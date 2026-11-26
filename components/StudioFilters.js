"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { categories } from "@/lib/categories";

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "rating", label: "Top rated" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
];

export default function StudioFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "newest";
  const hasFilters = searchValue || category !== "all" || sort !== "newest";

  const updateParams = (changes) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) => {
      if (!value || value === "all" || value === "newest") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("search") || "").trim();
    updateParams({ search: value });
  };

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_200px_200px_auto]">
      <form key={searchValue} onSubmit={handleSearch} className="join w-full">
        <input
          name="search"
          defaultValue={searchValue}
          placeholder="Search studios by name"
          className="input join-item w-full"
          aria-label="Search studios by name"
        />
        <button type="submit" className="btn btn-primary join-item" aria-label="Search">
          <FiSearch className="h-4 w-4" />
        </button>
      </form>

      <select
        value={category}
        onChange={(event) => updateParams({ category: event.target.value })}
        className="select w-full"
        aria-label="Filter by category"
      >
        <option value="all">All categories</option>
        {categories.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(event) => updateParams({ sort: event.target.value })}
        className="select w-full"
        aria-label="Sort studios"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="btn btn-ghost">
          Clear
        </button>
      )}
    </div>
  );
}