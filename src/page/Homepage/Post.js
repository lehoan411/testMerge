import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.realworld.io/api/articles/${slug}`
      );
      setArticle(response.data.article);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  // Function to replace new lines with <br /> tags
  const formatArticleBody = (body) => {
    if (!body) return "";
    return body.replace(/\n/g, "<br />");
  };

  return (
    <div style={{ fontFamily: "source sans pro, sans-serif" }}>
      <Container>
        {loading ? (
          <div>Loading...</div>
        ) : (
          article && (
            <Row>
              <Col>
                <div className="article-page">
                  <div className="banner">
                    <Container>
                      <h1>{article.title}</h1>
                      <div className="article-meta">
                        <Link to={`/profile/${article.author.username}`}>
                          <img
                            src={article.author.image}
                            alt={article.author.username}
                            width="40" // Adjust width as needed
                            height="40" // Adjust height as needed
                          />
                        </Link>
                        <div className="info">
                          <Link
                            to={`/profile/${article.author.username}`}
                            className="author"
                          >
                            {article.author.username}
                          </Link>
                          <span className="date">
                            {new Date(article.createdAt).toDateString()}
                          </span>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="ion-plus-round"></i> Follow {article.author.username}
                        </button>

                        <button className="btn btn-outline-success btn-sm btnfl">
                          <i className="ion-heart"></i> Favorite Article ({article.favoritesCount})
                        </button>
                      </div>
                    </Container>
                  </div>
                  <Container className="page">
                    <Row className="article-content">
                      <Col md={12}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: formatArticleBody(article.body),
                          }}
                        ></div>
                      </Col>
                    </Row>
                    
                    <ul className="tag-list">
                      {article.tagList.map((tag, index) => (
                        <li className="tag-default tag-pill tag-outline" key={index}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Container>
                </div>
              </Col>
            </Row>
          )
        )}
      </Container>
    </div>
  );
};

export default Post;
