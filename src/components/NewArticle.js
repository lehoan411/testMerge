import React from "react";
import { Button, Container, Nav, Navbar, Row, Col, Form, } from "react-bootstrap";
import './components.css'

const NewArticle = () => {
    return (
        <div>
            <div className="editor-page">
                <Container className="page">
                    <Row>
                        <Col md={10} xs={12} className="offset-md-1">
                            <Form >
                                <Form.Group className="mb-3" >
                                    <Form.Control size="lg" type="text" placeholder="Article Title" />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="What's this article about?" />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Control as="textarea" rows={8} placeholder="Write your article (in markdown)" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" placeholder="Enter tags" />
                                </Form.Group>
                                <button className="publish pull-xs-right" type="submit">
                                    Public Article
                                </button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default NewArticle