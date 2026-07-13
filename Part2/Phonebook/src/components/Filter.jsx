import { useState } from 'react'

const Filter = ({input, handleInput}) => {
    
    return(
        <>
        filter Shown with <input value={input} onChange={handleInput} /> 
        </>
        )
}
export default Filter