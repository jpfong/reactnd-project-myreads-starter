import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component{

  static propTypes = {
    updateBookShelf: PropTypes.func.isRequired,
    booksInShelves: PropTypes.array.isRequired
  }

  state = {
    books: []
  }

  updateQuery = (query) => {
    if (query) {
      BooksAPI.search(query, 1000).then((books) => {
        this.setState({
          books
        })
      })
    } else {
      this.setState({
        books: []
      })
    }
  }

  render() {
    const {books} = this.state
    const {booksInShelves, updateBookShelf} = this.props
    books.map((book) => {
      const bookInShelf = booksInShelves.find(b => b.id === book.id)
      if (bookInShelf) {
        book.shelf = bookInShelf.shelf
      } else {
        book.shelf = 'none'
      }
      return book
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
             NOTES: The search from BooksAPI is limited to a particular set of search terms.
             You can find these search terms here:
             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
             you don't find a specific author or title. Every search is limited by search terms.
             */}
            <input type="text" placeholder="Search by title or author"
                   onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <Book key={book.id} book={book} onChangeShelf={updateBookShelf}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks