import axios from 'axios'

const baseUrl = 'https://pokeapi.co/api/v2'

const getAllPokemon = async () => {
  const response = await axios.get(`${baseUrl}/pokemon?limit=10000`)
  return response.data
}

const getByPokemonName = async (name) => {
  name = name.toLowerCase()
  const response = await axios.get(`${baseUrl}/pokemon/${name.toLowerCase()}`)
  return response.data
}

const getPokemonVersion = async () => {
  const response = await axios.get(`${baseUrl}/version-group?limit=1000`)
  return response.data
}

// eslint-disable-next-line
export default {
  getAllPokemon,
  getByPokemonName
}