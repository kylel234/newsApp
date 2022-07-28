//import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import Header from './components/Header.js';
import ArticleCard from './components/ArticleCard.js'

// calls the news api and fetches the news article jsons
async function searchNews(q, category) {
  // encodes the URI-string so that it can be passed into the url
  q = encodeURIComponent(q);
  category = encodeURIComponent(category);
  const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=%3CREQUIRED%3Ecount=20&textFormat=Raw&safeSearch=Strict&q=${q}`, {
    "method": 'GET',
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
  });

  const body = await response.json();
  return body.value;
}

export default function App() {
  const [query, setQuery] = useState("Permaculture"); // state that stores query before user searches, default query is permaculture
  const [articleList, setArticleList] = useState(null); // state that stores the articles, default is null  

  // calls searchNews to pass the current query and date so that articles based on those parameters can be fetched, 
  // setSearch will change the value in search
  const getSearch = (e) => {
    e.preventDefault(); // prevents page from refreshing when user hits search
    searchNews(query).then(setArticleList);
  }


  return (
    <div className="App">
      <Header />
      <form onSubmit={getSearch}>
        <input className="style-searchbar" value={query} onChange={e => setQuery(e.target.value)} type="search" placeholder="Enter Topic"></input>
        <button className="btn btn-success btn-sm rounded-3" type="submit">Search</button>
      </form>
      {!articleList ? null : articleList.length === 0 ? <p><i>No results</i></p> // checks if there are results for the search and if so outputs them 
        : <ul> 
          {articleList.map((article, i) => ( // i assigns a unique key to each article, map will help output all the relevant articles
            <ArticleCard
            key={i}
            article={article}
            />
          ))}
        </ul>
      }
    </div>
  )
}
