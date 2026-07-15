const Country = ({data}) => {

    if(!data){
        return null
    }
    else{
        return(
        <div>
            <h1>{data.name.common}</h1>
            <p>Capital {data.capital}</p>
            <p>Area {data.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(data.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={data.flags.png} alt="" width={'600px'} border={'1px'}/>
        </div>)
    }
}
export default Country