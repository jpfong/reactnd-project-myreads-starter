import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBookShelf = (event, book) => {
    if (event.target.value) {
      book.shelf = event.target.value
      // update in DB
      BooksAPI.update(book, book.shelf).then(() => {
        const {books} = this.state
        const bookInShelf = books.find(b => book.id === b.id)
        if (!bookInShelf) {
          books.concat(book)
        }
        this.setState({
          books
        })
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            updateBookShelf={this.updateBookShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks updateBookShelf={this.updateBookShelf} booksInShelves={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
