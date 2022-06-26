import { Link } from 'react-router-dom'

const PokemonList = ({ page, pokemonList }) => {
  return (
    <ul>
      {pokemonList.map(poke =>
        <li key={poke.name}><Link to={`/pokemon/${poke.name}`}>{poke.name}</Link></li>  
      )}
    </ul>
  )
}

export default PokemonList