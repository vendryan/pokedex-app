import { capitalize } from "../helper/string_helper"

const PokemonInfo = ({mapper, pokemonInfos, id}) => {
  const pokemonInfo = pokemonInfos[mapper[id]]
  console.log(pokemonInfo)

  const eggMoves = pokemonInfo.moves && [...pokemonInfo.moves.filter(move => move.method === 'egg')].sort((a, b) => a.level - b.level)
  const levelUpMoves = pokemonInfo.moves && [...pokemonInfo.moves.filter(move => move.method === 'level-up')].sort((a, b) => a.level - b.level)
  const machineMoves = pokemonInfo.moves && [...pokemonInfo.moves.filter(move => move.method === 'machine')].sort((a, b) => a.level - b.level)

  return (
    <div>
      <h1>{pokemonInfo.name}</h1>
      <img src={pokemonInfo.sprite_url} alt={pokemonInfo.name} />
      <br />
      <h2>Types</h2>
      <ul>
        {pokemonInfo.types.map(type =>
          <li key={type}>{type}</li>
        )}
      </ul>
      <br />
      <h2>Stats</h2>
      <ul>
      {pokemonInfo.stats.map(stat =>
          <li key={stat.name}>{stat.name} {stat.stat}</li>
        )}
      </ul>
      <br />
      <h2>Abilities</h2>
      <ul>
        {pokemonInfo.abilities.map(ability =>
          <li key={ability.ability.name}>
            {capitalize(ability.ability.name)}
          </li>
        )}
      </ul>
      <br />
      <h2>Egg moves</h2>
      <ul>
        {eggMoves && eggMoves.map(move =>
          <li key={move.move}>
            {capitalize(move.move)} {move.level}
          </li>
        )}
      </ul>
      <br />
      <h2>Level-up Moves</h2>
      <ul>
      {levelUpMoves && levelUpMoves.map(move =>
          <li key={move.move}>
            {capitalize(move.move)} {move.level}
          </li>
        )}
      </ul>
      <br />
      <h2>Machine Moves</h2>
      <ul>
      {machineMoves && machineMoves.map(move =>
          <li key={move.move}>
            {capitalize(move.move)} 
          </li>
        )}
      </ul>
    </div>
  )
}

export default PokemonInfo