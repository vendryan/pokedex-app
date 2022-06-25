const Filter = ({ value, setFilterValue }) => {  
  return (
    <div>
      <input 
        type="text" 
        name="poke-query" 
        value={value}
        placeholder="Search for pokemon"
        onChange={event => setFilterValue(event.target.value)} />
    </div>
  )
}

export default Filter