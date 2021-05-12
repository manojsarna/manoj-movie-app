import React from 'react'

export const SearchBox = (props) => {
    return (
        <div className='col col-sm-4'>
            <input className='form-control' 
            value={props.searchVal} 
            onChange={(event) => props.setSearchVal(event.target.value)} 
            placeholder='Type to search For Movies, TV Shows ... ' />
        </div>
    )
}
