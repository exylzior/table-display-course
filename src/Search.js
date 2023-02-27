import React from 'react'

const Search = ({ searchQuery, handleOnchange }) => {
  return (
    <div>
      <input value={searchQuery} className='search' onChange={handleOnchange} />
    </div>
  )
}

export default Search
