import { Link } from 'react-router-dom'

const pageLink = (page, num, maxPage) => {
  const style = {
    padding: 3
  }

  return page + num <= 0 || page + num > maxPage
    ? null
    : <Link style={style} to={`/pokemons/${page + num}`}>{page + num}</Link>
}

const Paging = ({ page, maxPage }) => {
  console.log(maxPage)

  if (page <= 3) {
    return (
      <div>
        {pageLink(page, -2, maxPage)}
        {pageLink(page, -1, maxPage)}
        {pageLink(page, 0, maxPage)}
        {pageLink(page, 1, maxPage)}
        {pageLink(page, 2, maxPage, maxPage)}
        ...
        {pageLink(maxPage, 0)}
      </div>
    )
  }
  else if (page >= maxPage - 2) {
    return (
      <div>
        {pageLink(1, 0, maxPage)}
        ...
        {pageLink(page, -2, maxPage)}
        {pageLink(page, -1, maxPage)}
        {pageLink(page, 0, maxPage)}
        {pageLink(page, 1, maxPage)}
        {pageLink(page, 2, maxPage)}
      </div>
    )
  }
  return (
    <div>
      {pageLink(1, 0, maxPage)}
      ...
      {pageLink(page, -2, maxPage)}
      {pageLink(page, -1, maxPage)}
      {pageLink(page, 0, maxPage)}
      {pageLink(page, 1, maxPage)}
      {pageLink(page, 2, maxPage)}
      ...
      {pageLink(maxPage, 0, maxPage)}
    </div>
  )
}

export default Paging