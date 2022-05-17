import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap';

const Article = () => {

    const [article, setArticle] = useState('')
    const [comments, setComments] = useState('')
    const [show, setShow] = useState(false);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const objectid = params.get('objectid');

    const getArticle = async () => {
        const { data } = await axios.get('http://hn.algolia.com/api/v1/items/' + objectid)
        console.log(data)
        setArticle(data)
        setComments(data.children)
        setShow(true)
    }

    useEffect(() => {
        getArticle();
    }, [])

    return (
        <div className="news">
            {show &&
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title><strong><h3>{article.title}</h3></strong></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"><strong>{article.author} | {article.created_at}</strong></Card.Subtitle>
                        <Card.Text>
                            {article.url}
                        </Card.Text>

                        <ListGroup variant="flush">
                            <ListGroup.Item><strong><h4>COMMENTS</h4></strong></ListGroup.Item>
                        </ListGroup>

                        {comments.length > 0 &&
                            comments.map((comment, index) => (
                                <Card style={{ width: '100%' }}>
                                    <Card.Body>
                                        <ListGroup key={index} variant="flush">
                                            <ListGroup.Item dangerouslySetInnerHTML={{ __html: comment.text }}></ListGroup.Item>
                                            <ListGroup.Item><strong>By: {comment.author}. At: {comment.created_at}</strong></ListGroup.Item>
                                            {comment.children.length > 0 &&
                                                comment.children.map((child, i) => (
                                                    <ListGroup key={i} variant="flush" style={{ paddingLeft: 60 }}>
                                                        <ListGroup.Item style={{ color: 'blue' }} dangerouslySetInnerHTML={{ __html: child.text }}></ListGroup.Item>
                                                        {child.children.length > 0 &&
                                                            child.children.map((kid, j) => (
                                                                <ListGroup key={j} variant="flush" style={{ paddingLeft: 60 }}>
                                                                    <ListGroup.Item style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: kid.text }}></ListGroup.Item>
                                                                    {kid.children.length > 0 &&
                                                                        kid.children.map((todler, j) => (
                                                                            <ListGroup key={j} variant="flush" style={{ paddingLeft: 60 }}>
                                                                                <ListGroup.Item style={{ color: 'green' }} dangerouslySetInnerHTML={{ __html: todler.text }}></ListGroup.Item>
                                                                            </ListGroup>
                                                                        ))
                                                                    }
                                                                </ListGroup>
                                                            ))
                                                        }
                                                    </ListGroup>
                                                ))

                                            }
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            ))
                        }
                    </Card.Body>
                </Card>
            }

            {!show &&
                <p style={{textAlign: 'center'}}>Loading...</p>
            }

        </div>
    );
};

export default Article;