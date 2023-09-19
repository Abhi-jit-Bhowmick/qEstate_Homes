import React from 'react'

const locations = ["Sintra", "Amper", "Swinna", "Hanji"]
const prices = ["0-300000", "300001-600000", "600001-1000000"]

function CheckboxFilter({
    handleLocationFilterChange,
    handlePriceRangeFilterChange,
    locationFilter,
    priceRangeFilter,

}) {
    return (
        <div className='checkbox-filter-container'>
            {/* location Based Filter */}
            <div className='filter'>
                <h2>Location</h2>
                {
                    locations.map((location, idx) => (
                        <div key={idx}>
                            <label>
                                <input
                                    type='checkbox'
                                    value={location}
                                    onChange={handleLocationFilterChange}
                                    checked={locationFilter.includes(location)}
                                />
                                {location}
                            </label>
                        </div>
                    ))
                }
            </div>

            {/* Price Based Filter */}
            <div className='filter'>
                <h2>Price Range</h2>
                {
                    prices.map((price, idx) => (
                        <div key={idx}>
                            <label>
                                <input
                                    type='checkbox'
                                    value={price}
                                    onChange={handlePriceRangeFilterChange}
                                    checked={priceRangeFilter.includes(price)}
                                />
                                {price}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CheckboxFilter