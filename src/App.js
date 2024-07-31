

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import img from './Images/nopreview.jpg'
import userdata from './userdata.json'

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 8; // Number of articles per page

  useEffect(() => {
    fetchNews(currentPage);
    setLoading(false);
  }, [currentPage]);

  const fetchNews = (page) => {
    setLoading(true);
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const paginatedArticles = userdata.articles.slice(startIndex, startIndex + pageSize);
      setArticles(paginatedArticles);
      setTotalResults(20);
     
    },1000)
  };
  

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalResults / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Top Headlines</h1>
      <div className="articles">
        {articles.map((article, index) => (
          <div key={index} className="article">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            {<img src={article.urlToImage ? article.urlToImage: img} alt={article.title} />}
            <a href={article.url} target="_blank" rel="noopener noreferrer"><button>Read more</button></a>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {Math.ceil(totalResults / pageSize)}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(totalResults / pageSize)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

