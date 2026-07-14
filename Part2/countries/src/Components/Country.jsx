const Country = ({Data}) => {

    if(!Data){
        return null
    }
    else{
        return(
        <div>
            <h1>{Data.name.common}</h1>
            <p>Capital {Data.capital}</p>
            <p>Area {Data.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(Data.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={Data.flags.png} alt="" width={'600px'} border={'1px'}/>
        </div>)
    }
}
export default Country