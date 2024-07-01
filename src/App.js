// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './App.css';

// const App = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const fetchNews = async () => {
//     try {
//       const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=2aeadb34b95f4769a3691bfd6b18af63`);
//       setArticles(response.data.articles);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching news:', error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="App">Loading...</div>;
//   }

//   return (
//     <div className="App">
//       <h1>Top Headlines</h1>
//       <div className="articles">
//         {articles.map((article, index) => (
//           <div key={index} className="article">
//             <h2>{article.title}</h2>
//             <p>{article.description}</p>
//             {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
//             <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import img from './Images/nopreview.jpg'
const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 8; // Number of articles per page

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const fetchNews = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=2aeadb34b95f4769a3691bfd6b18af63`, {
        params: {
          country: 'in',
          apiKey: '2aeadb34b95f4769a3691bfd6b18af63',
          page: page,
          pageSize: pageSize,
        },
      });
      setArticles(response.data.articles);
      setTotalResults(response.data.totalResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
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
