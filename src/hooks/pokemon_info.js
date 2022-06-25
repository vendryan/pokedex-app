import { useState, useEffect } from 'react'

import { capitalize } from '../helper/string_helper'
import { lastItem } from '../helper/list_helper'
import pokeService from '../services/pokemon'

const filterVersion = (version) => (move) => {
  return move.version_group_details.find(group => 
    group.version_group.name === version
  )
}

/**
 * Extract the moves from the resulting API
 * I'm studying the JSON format to do this
 */
const extractMove = (version) => (move) => {
  const moveDetail = move.version_group_details.find(group =>
    group.version_group.name === version
  )

  return {
    move: move.name,
    level: moveDetail.level_learned_at,
    method: moveDetail.move_learn_method.name,
    version
  }
}

const extractPokemonDataByName = async (name) => {
  const info = await pokeService.getByPokemonName(name)
  const moveVersionName = info.moves.length !== 0 &&
    lastItem(info.moves[0].version_group_details).version_group.name

  // Studying documentation of the API
  return {
    id: info.id,
    name: capitalize(info.name),
    abilities: info.abilities,
    sprite_url: info.sprites.front_default,
    moves: moveVersionName && info.moves
      .filter(filterVersion(moveVersionName))
      .map(extractMove(moveVersionName)),
    stats: info.stats.map(stat => {
      return { name: capitalize(stat.stat.name), stat: stat.base_stat }
    }),
    types: info.types.map(type => capitalize(type.type.name))
  }
}

const allPokemonName = async () => {
  const data = await pokeService.getAllPokemon()
  return data.results.map(p => p.name[0].toUpperCase() + p.name.slice(1))
}

const usePokemonInfo = () => {
  const [loading, setLoading] = useState(true)
  const [pokemonNames, setPokemonNames] = useState(null)
  const [pokemonInfos, setPokemonInfos] = useState(null)

  // Get all pokemon name
  useEffect(() => {
    const cachedPokemonInfos = window.localStorage.getItem('pokemonInfos')

    if (!cachedPokemonInfos) {
      allPokemonName()
        .then(result => setPokemonNames(result))
    }
    else {
      const parsedJSON = JSON.parse(cachedPokemonInfos)
      setPokemonNames(parsedJSON.map(info => info.name))
      setPokemonInfos(parsedJSON)
      setLoading(false)
    }
  }, [])

  // Get all pokemon data if not cached
  useEffect(() => {
    const cachedPokemonInfos = window.localStorage.getItem('pokemonInfos')

    if (!cachedPokemonInfos && pokemonNames) {
      const main = async () => {
        const promiseArray = pokemonNames.map(extractPokemonDataByName)
        const pokemonInfos = await Promise.all(promiseArray)
        // console.log(pokemonInfos)
        window.localStorage.setItem('pokemonInfos', JSON.stringify(pokemonInfos))
        setPokemonInfos(pokemonInfos)
        setLoading(false)
      }
      main()
    }
  }, [pokemonNames])

  return { pokemonNames, pokemonInfos, loading }
}

export default usePokemonInfo