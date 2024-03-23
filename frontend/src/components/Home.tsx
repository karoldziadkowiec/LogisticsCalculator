import React from 'react';
import { Link as RouterLink, useNavigate  } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import { Button } from 'react-bootstrap';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLinkClick = (id: string) => {
    scroller.scrollTo(id, {
      smooth: true,
      duration: 100
    });
  };

  const moveToCPMPage = () => {
    navigate('/cpm');
  };

  const moveToMediatorPage = () => {
    navigate('/mediator');
  };

  return (
    <div className="Home">
      <div className="links">
        <RouterLink onClick={() => handleLinkClick("cpm")} to="#" className="link" style={{ cursor: "pointer" }}>CPM</RouterLink>
        <div className="sign"> | </div>
        <RouterLink onClick={() => handleLinkClick("mediator")} to="#" className="link" style={{ cursor: "pointer" }}>Mediator issue</RouterLink>
      </div>
      <Element name="home" className="startSection">
        <h1><span className="logisticsCalculator">LogisticsCalculator</span></h1>
        <img src={require('../img/logo.png')} alt="logo" className="logo" />
        <h2>Your one-stop solution for efficient path planning and optimization. </h2>
        <h4>With our algorithms, we streamline your logistics operations by calculating CPM and Mediator methods with precision and speed.</h4>
      </Element>
      <Element name="cpm" className="blackSection">
        <h1>CPM</h1>
        <h5>Critical Path Method (CPM) is a project management technique used to identify the longest sequence of dependent tasks.</h5>
        <h5>By utilizing CPM, you can specify the most crucial tasks in your project timeline.</h5>
        <p></p>
        <Button variant="danger" onClick={moveToCPMPage}>Solve CPM issue</Button>
      </Element>
      <Element name="mediator" className="whiteSection">
        <h1>Mediator issue</h1>
        <h5>The Mediator Method is a strategic approach in logistics management that optimizes routes by considering intermediary points.</h5>
        <h5>Effectively minimizes transportation distances, reduces costs and increases overall logistics efficiency.</h5>
        <p></p>
        <Button variant="danger" onClick={moveToMediatorPage}>Solve Mediator issue</Button>
      </Element>
    </div>
  );
}

export default Home;