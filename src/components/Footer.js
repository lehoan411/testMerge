import React from "react";
import { Container } from "react-bootstrap";
import './components.css'
const Footer = () => {
    return(
        <div className="footer" style={{backgroundColor:'#f3f3f3',}}>
            <Container>
            <a className="conduitfooter"  href="https://conduit.realworld.how/" style={{}}>conduit</a>
            <span class="attribution">  An interactive learning project from <a className="thinkster" href="https://thinkster.io">Thinkster</a>. Code licensed under MIT.</span>
            </Container>
        </div>
    )
}
export default Footer