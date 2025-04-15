import React from 'react';

const FilterSidebar = ({ categories, filters, setFilters }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category === category}
                onChange={() => setFilters({ ...filters, category })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-700 mb-2">Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.rating === rating}
                onChange={() => setFilters({ ...filters, rating })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">
                {rating} Stars & Up
              </span>
            </label>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => setFilters({})}
        className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;