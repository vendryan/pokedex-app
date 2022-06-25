// import { useEffect, useState } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'
import Container from './components/Container'
import Filter from './components/Filter'
import Paging from './components/Paging'
import usePokemonInfo from './hooks/pokemon_info'

const pageLimit = 50
const defaultPage = 1

const calculateLowHigh = (page) => {
  const low = (page * pageLimit) - 50
  const high = low + pageLimit - 1
  return [low, high]
}

const App = () => {
  // Search for pokemon value
  const [filterValue, setFilterValue] = useState('')
  const navigate = useNavigate()
  const info = usePokemonInfo()

  const match = useMatch('/pokemons/:page')
  const page = match 
    ? Number(match.params.page)
    : defaultPage

  // Redirect to /pokemons/1 if in base url
  useEffect(() => {
    if (window.location.origin + '/' === window.location.href) {
      navigate('/pokemons/1')
    }
  }, [navigate])

  const pokemonToShow = info.pokemonNames !== null
    ? info.pokemonNames
        .filter(name =>
          name.toLowerCase().includes(filterValue.toLowerCase()) 
        )
        .slice(...calculateLowHigh(page))
    : null

  return (
    <Container>
      <Filter
        value={filterValue}
        setFilterValue={setFilterValue} />
      <ul>
        {pokemonToShow !== null 
          ? pokemonToShow.map(name => <li key={name}>{name}</li>) 
          : ''
        }
      </ul>
      {pokemonToShow !== null
        ? 
        <Paging
          page={page}
          maxPage={Math.ceil(info.pokemonNames.length / pageLimit)} />
        : ''
      }
    </Container>
  )
}

export default App;