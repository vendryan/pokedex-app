// import { useEffect, useState } from 'react'
import { useState } from 'react'
import Container from './components/Container'
import Filter from './components/Filter'
import usePokemonInfo from './hooks/pokemon_info'

const App = () => {
  const [filterValue, setFilterValue] = useState('')
  const info = usePokemonInfo()

  
  const pokemonToShow = info.pokemonNames
    ? info.pokemonNames.filter(name =>
        name.toLowerCase().includes(filterValue.toLowerCase()) 
      )
    : null

  return (
    <Container>
      <Filter
        value={filterValue}
        setFilterValue={setFilterValue} />
      <ul>
        {pokemonToShow ? pokemonToShow.map(name => <li>{name}</li>) : ''}
      </ul>
    </Container>
  )
}

export default App;