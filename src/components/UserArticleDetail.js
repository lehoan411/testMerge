import React from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";

const UserArticleDetail = () => {
    return (
        <div className="article-page">
            <div className="banner2">
                <Container>
                    <h1>DSaoe</h1>
                    <div className="article-meta">
                        <a href=""><img src="https://api.realworld.io/images/smiley-cyrus.jpeg" alt="image"/></a>
                        <div className="info">
                            <a className="author" href="" >lehoan</a>
                            <span className="date">July 9, 2024</span>
                        </div>
                        <a className="btn btn-sm btn-outline-secondary"><i className="ion-edit"> </i> Edit Article</a>
                        <Button className="btn btn-sm" variant="outline-danger"><i className="ion-trash-a"> </i> Delete Article</Button>
                    </div>
                </Container>
            </div>

            <Container className="page">
                <Row className="article-content">
                    <Col xs={12}>
                    <p>Miaw</p>
                    <div>
                        <p>Miaw miaw miaw</p>
                    </div>
                    <ul className="tag-list">
                    <li className="tag-default tag-pill tag-outline" >efswda</li>
                    </ul>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col xs={12} md={8} className="offset-md-2">
                    <Form className="card comment-form">
                        <div className="card-block">
                        <Form.Control as="textarea" placeholder="Write a comment" rows={4} />
                        </div>
                        <div className="card-footer">
                            <img src="https://api.realworld.io/images/smiley-cyrus.jpeg" className="comment-author-img" alt="image"/>
                            <button type="submit" className="btn btn-sm btn-success">Post Comment</button>
                        </div>
                    </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserArticleDetail