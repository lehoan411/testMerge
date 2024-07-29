import React from "react";
import { Button, Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedTag, setSelectedTag] = useState("");

    const fetchArticles = async (page = 1, tag = "") => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.realworld.io/api/articles?limit=10&offset=${(page - 1) * 10}${tag ? `&tag=${tag}` : ""}`);
            setArticles(response.data.articles);
            setTotalPages(Math.ceil(response.data.articlesCount / 10));
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await axios.get("https://api.realworld.io/api/tags");
            setTags(response.data.tags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    useEffect(() => {
        fetchArticles(currentPage, selectedTag);
        fetchTags();
    }, [currentPage, selectedTag]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
        setCurrentPage(1); 
    };

    return (
        <div style={{ fontFamily: 'source sans pro, sans-serif' }}>
            <div className="home-page">
                <div className="banner">
                    <Container>
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </Container>
                </div>
                <Container style={{ marginTop: '1.5rem' }}>
                    <Row>
                        <Col md={10}>
                            <div className="feed-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item"> 
                                        <a href="#" className={`nav-link ${!selectedTag ? 'active' : ''}`} onClick={() => setSelectedTag("")}>Global Feed</a>
                                    </li>
                                    {selectedTag && (
                                        <li className="nav-item">
                                            <a href="#" className="nav-link active">#{selectedTag}</a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            {loading ? (
                                <div className="article-preview">Loading articles...</div>
                            ) : (
                                articles.map((article, index) => (
                                    <div className="article-preview" key={index}>
                                        <div className="article-meta">
                                            <a style={{ color: '#5cb85c', textDecoration: 'none' }} href={`profile.html/${article.author.username}`}>
                                                <img src={article.author.image} alt="author avatar" />
                                            </a>
                                            <div className="info">
                                                <a href="#" className="author">{article.author.username}</a>
                                                <span className="date">{new Date(article.createdAt).toDateString()}</span>
                                            </div>
                                            <button className="btn btn-outline-success btn-sm pull-xs-right">
                                                <i className="ion-heart"></i> {article.favoritesCount}
                                            </button>
                                        </div>
                                        <a href="/userarticle" className="preview-link" style={{ textDecoration: 'none' }}>
                                            <h1 style={{ color: 'black' }}>{article.title}</h1>
                                            <p>{article.description}</p>
                                            <span>Read more...</span>
                                            <ul className="tag-list">
                                                {article.tagList.map((tag, index) => (
                                                    <li className="tag-default tag-pill tag-outline" key={index}>{tag}</li>
                                                ))}
                                            </ul>
                                        </a>
                                    </div>
                                ))
                            )}
                            <nav>
                                <ul className="pagination justify-content-start flex-wrap">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li
                                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            <a href="#" className="page-link">{index + 1}</a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </Col>
                        <Col md={2}>
                            <div className="sidebar">
                                <p>Popular Tags</p>
                                <div className="tag-list">
                                    {loading ? (
                                <div    >Loading tags...</div>
                            ) : (tags.map((tag, index) => (
                                        <a href="#" className="tag-pill tag-default" key={index} onClick={() => handleTagClick(tag)}>{tag}</a>
                                    )))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Home;