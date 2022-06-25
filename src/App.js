// import { useEffect, useState } from 'react'
import Container from './components/Container'
import usePokemonInfo from './hooks/pokemon_info'

const App = () => {
  const info = usePokemonInfo()

  return (
    <Container>
      <h1>Hello World</h1>
    </Container>
  )
}

export default App;