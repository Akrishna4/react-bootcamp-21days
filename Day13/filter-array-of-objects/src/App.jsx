import React, { useState } from "react";
import "./App.css";

const PLANET_DATA = [
  { id: "01", name: "Mercury", size: "2440", unit: "Km" },
  { id: "02", name: "Venus", size: "6052", unit: "Km" },
  { id: "03", name: "Earth", size: "6371", unit: "Km" },
  { id: "04", name: "Mars", size: "3390", unit: "Km" },
  { id: "05", name: "Jupiter", size: "69911", unit: "Km" },
  { id: "06", name: "Saturn", size: "58232", unit: "Km" },
  { id: "07", name: "Uranus", size: "25362", unit: "Km" },
  { id: "08", name: "Neptune", size: "24622", unit: "Km" },
  { id: "09", name: "Pluto", size: "1188", unit: "Km" },
  { id: "10", name: "Eris", size: "2326", unit: "Km" },
  { id: "11", name: "Haumea", size: "1632", unit: "Km" },
  { id: "12", name: "Makemake", size: "1430", unit: "Km" },
  { id: "13", name: "Sedna", size: "1000", unit: "Km" },
];

const App = () => {
  const [filteredList, setFilteredList] = useState(PLANET_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    applyFilters(query, sizeFilter);
  };

  const onFilterChange = (event) => {
    const selectedSize = event.target.value;
    setSizeFilter(selectedSize);
    applyFilters(searchQuery, selectedSize);
  };

  const applyFilters = (query, size) => {
    let result = [...PLANET_DATA];

    // Apply search filter
    if (query) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply size filter
    if (size) {
      const sizeNum = Number(size);
      result = result.filter((item) => Number(item.size) > sizeNum);
    }

    setFilteredList(result);
  };

  return (
    <div className="container">
      <h2>Search Filter Array of Objects</h2>

      <div className="list-wrapper">
        <div className="filter-container">
          <input
            type="text"
            name="search"
            placeholder="Search planets..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <div className="select-container">
            <select
              name="size"
              onChange={onFilterChange}
              value={sizeFilter}
              className="size-select"
            >
              <option value="">Filter by Size</option>
              <option value="2000">Greater than 2000Km</option>
              <option value="5000">Greater than 5000Km</option>
              <option value="10000">Greater than 10000Km</option>
              <option value="20000">Greater than 20000Km</option>
            </select>
          </div>
        </div>

        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <div className="card" key={item.id}>
              <p className="num-text">{item.id}</p>
              <div className="card-content">
                <p className="title">{item.name}</p>
                <p className="description">
                  Size: {item.size} {item.unit}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No planets match your filters</div>
        )}
      </div>
    </div>
  );
};

export default App;
