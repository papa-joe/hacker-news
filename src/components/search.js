import React, { useState, useEffect } from "react";
import { ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Search = () => {
    const [news, setNews] = useState([])

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const query = params.get('query');

    const getNews = async () => {
        const response = await axios.get('http://hn.algolia.com/api/v1/search?query='+query)
        console.log(response.data.hits)
        setNews(response.data.hits)
    }

    useEffect(() => {
        getNews();
    }, [])

    return (
        <div className="news">
            <ListGroup as="ol" numbered>
                {news.length > 0 &&
                    news.map((article, index) => (
                        <ListGroup.Item
                            key={index}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{article.title}</div>
                                <p>Author: {article.author}</p>
                                <Link to={{
                                    pathname: "/article",
                                    search: "?objectid=" + article.objectID
                                }} variant="primary">Read more</Link>
                            </div>
                            <Badge bg="primary" pill>
                                {article.points}
                            </Badge>
                        </ListGroup.Item>
                    ))
                }

                {news.length <= 0 &&
                    <p style={{textAlign: 'center'}}>Loading...</p>
                }
            </ListGroup>
        </div>
    );
};

export default Search;