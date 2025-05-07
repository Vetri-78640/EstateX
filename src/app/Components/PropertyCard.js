export default function PropertyCard({ property }) {
  if (!property) return null

  return (
    <div>
      <img src={property.image} alt={property.title || 'Property'} />
      <h2>{property.title}</h2>
      <p>${property.price}</p>
    </div>
  )
}