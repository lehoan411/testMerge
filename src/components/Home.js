import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const Home = ({ token, userData }) => {
    const [articles, setArticles] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedTag, setSelectedTag] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [comments, setComments] = useState([]);
    const [article, setArticle] = useState(null);  
    const { slug } = useParams();
    
    const config = useMemo(() => ({
        headers: { Authorization: "Bearer " + token },
    }), [token]);

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

    const fetchArticle = useCallback(() => {
        axios.get('https://api.realworld.io/api/articles/' + slug, config)
            .then(res => {
                setArticle(res.data.article);
            })
            .catch(err => console.log(err));
    }, [slug, config]);

    const fetchComment = useCallback(() => {
        axios
            .get(`https://api.realworld.io/api/articles/${slug}/comments`, config)
            .then((res) => setComments(res.data.comments))
            .catch((err) => console.log("error fetching comments " + err));
    }, [slug, config]);

    useEffect(() => {
        fetchArticles(currentPage, selectedTag);
        fetchTags();
    }, [currentPage, selectedTag]);

    useEffect(() => {
        if (!article) {
            fetchArticle();
        }
        fetchComment();
    }, [userData, article, fetchArticle, fetchComment]);

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
                        <Col md={9}>
                            <div className="feed-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${!selectedTag ? 'active' : ''}`}
                                            onClick={() => setSelectedTag("")}
                                        >
                                            Global Feed
                                        </button>
                                    </li>
                                    {selectedTag && (
                                        <li className="nav-item">
                                            <button className="nav-link active">
                                                #{selectedTag}
                                            </button>
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
                                            <Link to={`/profile/${article.author.username}`}>
                                                <img src={article.author.image} alt="author avatar" />
                                            </Link>
                                            <div className="info">
                                                <Link to={`/profile/${article.author.username}`} className="author">
                                                    {article.author.username}
                                                </Link>
                                                <span className="date">{new Date(article.createdAt).toDateString()}</span>
                                            </div>
                                            <button className="btn btn-outline-success btn-sm pull-xs-right">
                                                <i className="ion-heart"></i> {article.favoritesCount}
                                            </button>
                                        </div>
                                        <Link to={`/post/${article.slug}`} className="preview-link" style={{ textDecoration: 'none' }}>
                                            <h1 style={{ color: 'black' }}>{article.title}</h1>
                                            <p>{article.description}</p>
                                            <span>Read more...</span>
                                            <ul className="tag-list">
                                                {article.tagList.map((tag, index) => (
                                                    <li className="tag-default tag-pill tag-outline" key={index}>{tag}</li>
                                                ))}
                                            </ul>
                                        </Link>
                                    </div>
                                ))
                            )}
                            <nav>
                                <ul className="pagination">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li
                                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                            key={index}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </Col>
                        <Col md={3}>
                            <div className="sidebar">
                                <p>Popular Tags</p>
                                <div className="tag-list">
                                    {tags.map((tag, index) => (
                                        <button
                                            className="tag-default tag-pill"
                                            key={index}
                                            onClick={() => handleTagClick(tag)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
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
