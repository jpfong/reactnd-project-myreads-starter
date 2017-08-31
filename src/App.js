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

  updateBookShelf = (event, book) => {
    if (event.target.value) {
      book.shelf = event.target.value
      const {books} = this.state
      this.setState({
        books
      })
      // update in DB
      BooksAPI.update(book, book.shelf)
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            updateBookShelf={this.updateBookShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks updateBookShelf={this.updateBookShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
