const PropertyList = () => {
    const properties = [
      { id: 1, name: "Modern Villa", location: "Chennai", price: "₹3.5 Cr", image: "/villa.jpg" },
      // Add more test data...
    ]
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(p => (
          <div key={p.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-2">{p.name}</h2>
            <p>{p.location}</p>
            <p className="text-blue-600 font-bold">{p.price}</p>
          </div>
        ))}
      </div>
    )
  }

export default PropertyList