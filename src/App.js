// import { useEffect, useState } from 'react'
import { useState } from 'react'

import {  
  useMatch,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Container from './components/Container'
import Filter from './components/Filter'
import Paging from './components/Paging'
import PokemonInfo from './components/PokemonInfo'
import PokemonList from './components/PokemonList'
import usePokemonInfo, { mapper } from './hooks/pokemon_info'

const pageLimit = 50
const defaultPage = 1

const renderIf = (cond, thunk) => {
  if (cond) {
    return thunk()
  }
  return null
}

const calculateLowHigh = (page) => {
  const low = (page * pageLimit) - 50
  const high = low + pageLimit - 1
  return [low, high]
}

const App = () => {
  // Search for pokemon value
  const [filterValue, setFilterValue] = useState('')
  const info = usePokemonInfo()

  const matchPage = useMatch('/pokemons/:page')
  const page = matchPage
    ? Number(matchPage.params.page)
    : defaultPage
    
  const matchId = useMatch('/pokemon/:id')
  const id = matchId
    ? matchId.params.id.toLowerCase()
    : null

  // replace(path, [state]) - (function) Replaces the current entry on the history stack
  if (isNaN(page)) {
    return <Navigate replace to='/pokemons/1' />
  }

  if (window.location.origin + '/' === window.location.href) {
    return <Navigate replace to='/pokemons/1' />
  }

  const pokemonToShow = info.pokemonNames !== null
    ? info.pokemonInfos
        .filter(info =>
          info.name.toLowerCase().includes(filterValue.toLowerCase()) 
        )
        .slice(...calculateLowHigh(page))
    : null

  return (
    <Container>
      <Filter
        value={filterValue}
        setFilterValue={setFilterValue} />
      {renderIf(
        pokemonToShow !== null,
        () =>
          <Routes>
            <Route 
              path='/pokemons/:page' 
              element={
                <>
                  <PokemonList page={page} pokemonList={pokemonToShow} />
                  <Paging
                    page={page}
                    maxPage={Math.ceil(info.pokemonNames.length / pageLimit)} />
                </>
              }
            />
            <Route
              path='/pokemon/:id'
              element={
                <PokemonInfo 
                  mapper={mapper} 
                  pokemonInfos={info.pokemonInfos}
                  id={id}
                />
              }
            />
          </Routes>  
      )}
    </Container>
  )
}

export default App;