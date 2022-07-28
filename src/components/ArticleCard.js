import React from "react";

// use prop to get data for the ArticleCard component from App through states
// {} around prop article is so that the article info can be converted to jsx
export default function ArticleCard({article}) {
    const formatDate = s => new Date(s).toLocaleDateString(); // helps to format date
    return (
        <li className="card style-card">
            {article.image && <img className="style-img" alt="" src={article.image?.thumbnail?.contentUrl }/> }
            <h2>
                <a className="card-title fs-5" href={article.url}>{article.name}</a>
            </h2>
            <p className="card-text">{article.description}</p>
            <div className="card-text">
                <span>{formatDate(article.datePublished)}</span>
                <span>
                    {article.provider[0].image?.thumbnail &&
                        <img alt="" src={article.provider[0].image.thumbnail.contentUrl + '&w=16&h=16'}/>}
                    {article.provider[0].name}
                </span> 
            </div>
        </li>
    )
    
}