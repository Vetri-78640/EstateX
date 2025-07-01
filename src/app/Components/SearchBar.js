'use client'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6">
      <input
        className="w-full p-3 border border-gray-300 rounded-md bg-glass backdrop-blur"
        style={{ borderRadius: '9999px' }}
        placeholder="Search properties by name, location, or type"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}