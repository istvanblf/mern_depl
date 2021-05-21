import React, {useState, useEffect} from "react";
import {Router} from "@reach/router";
import 'bootstrap/dist/css/bootstrap.min.css';
import io from "socket.io-client";

import {Container, Navbar} from "react-bootstrap";
import './App.css';
import Pets from "./views/Pets"
import NewPet from "./views/NewPet"
import EditPet from "./views/EditPet"
import AdoptPet from "./views/AdoptPet"

function App() {
  const [socket] = useState(() => io(':8000'));

  socket.on("hello", (msg) => {
    console.log("Received msg inside App.js", msg);
  })
  socket.emit("listen", "message from App.js");

  useEffect(() => {
    console.log("Is this running? Inside useEffect for SOCKET");
    socket.on("Welcome", (data) => console.log(data));
    return () => socket.disconnect(true);
    // eslint-disable-next-line
  },[]);

  return (
      <Container>
        <Navbar className="justify-content-left" bg="dark" variant="dark" sticky="top">
            <Navbar.Brand >Pet Shelter</Navbar.Brand>
        </Navbar>  
        <Router>
            <Pets path="/" />
            <NewPet path="pets/new" />
            <EditPet path="pets/edit/:id" />
            <AdoptPet path="pets/:id" />

        </Router> 
    </Container>
  );
}

export default App;
