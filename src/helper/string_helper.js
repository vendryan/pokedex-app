/**
 * Capitalize every single word in a sentence
 * @param {String} words 
 * @returns capitalized words
 */
const capitalize = (words) => {
  const capitalizeFirstLetter = (str) => {
    return str[0].toUpperCase() + str.slice(1)
  }
  
  return words.split(' ').map(capitalizeFirstLetter).join(' ')
}


// eslint-disable-next-line
export {
  capitalize
}