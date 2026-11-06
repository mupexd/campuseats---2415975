import { Link } from 'react-router'
import { useCountdown } from '../hooks/useCountdown.js'

// Feature: today's specials with a live countdown; each links to its vendor page.
function SpecialsSection({ vendors }) {
  const timeLeft = useCountdown()
  const specials = vendors.flatMap((vendor) =>
    vendor.menu
      .filter((item) => item.special && item.available)
      .map((item) => ({ item, vendor })))

  if (specials.length === 0) return null

  return (
    <section>
      <h2 className="section-title">Today's specials</h2>
      <p className="muted" role="timer">Ends in {timeLeft}</p>
      <div className="grid">
        {specials.map(({ item, vendor }) => (
          <Link key={item.id} to={`/vendor/${vendor.id}`} className="card menu-card">
            <p className="tag">Special</p>
            <h3>{item.name}</h3>
            <p className="muted">{vendor.name}</p>
            <p className="price">
              <s className="muted">RM {item.price.toFixed(2)} </s>
              RM {item.specialPrice.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
export default SpecialsSection
