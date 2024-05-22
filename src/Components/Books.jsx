import React, { useEffect, useState } from 'react';
import './Books.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Books() {

  const [B, setBookData] = useState([]);
  const [srch, setSearchText] = useState('');
  const [sort, setFilteredBooks] = useState([]);


  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await axios.get('https://reactnd-books-api.udacity.com/books', {
          headers: { Authorization: 'whatever-you-want' }
        });

        setBookData(response.data.books);
        setFilteredBooks(response.data.books);

      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInput = (event) => {
    const userInput = event.target.value;
    setSearchText(userInput);

    const filtered = B.filter(
      item => item.title.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredBooks(filtered);
  };


  return (
    <div className="main">

      <div className="nav">

        <h2>Kalvium</h2>

        <input className="input"
          type="text"
          placeholder="Enter book name"
          list="suggestions"
          onChange={handleInput}
          value={srch}
          
        />

        <Link to="/form">
          <button className="btn">Register</button>
        </Link>

      </div>

      <div className="contain">
    
        {sort.map(book => (
          <div key={book.id} className="bk">


            <img src={book.imageLinks.smallThumbnail} alt="" />

            <h2>{book.title}</h2>

            <p>Rating : {book.averageRating} ★</p>
            <p>Free</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
