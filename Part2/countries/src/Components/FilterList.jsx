const FilterList = ({ListItems, clickHandler}) => {
    

    if(ListItems === null || ListItems.length === 0){
        return null
    }
    else if(ListItems.length > 1 && ListItems.length < 11){
        return(
            <div>
                <ul>
                    {ListItems.map(country => 
                    <li key={country.cca3}>{country.name.common}
                     <button onClick={() => clickHandler(country)}>Show</button>
                    </li>)}
                </ul>
            </div>
        )
    }
    else if(ListItems.length === 1){
        return null
    }
    else{
        return <p>Too many matches, specify another filter</p>
    }
}
export default FilterList