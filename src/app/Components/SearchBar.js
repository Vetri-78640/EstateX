'use client'

export default function SearchBar() {
  return (
    <div className="mb-6">
      <input
        className="w-full p-3 border border-gray-300 rounded-md"
        placeholder="Search properties by name, location, or type"
      />
    </div>
  )
}