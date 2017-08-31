import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
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
         books.concat([book])
          this.setState(state => ({
            books: state.books.concat([book])
          }))
        } else {
          this.setState({
            books
          })
        }
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
