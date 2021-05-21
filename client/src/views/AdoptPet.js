import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from 'react-bootstrap';

import { navigate } from "@reach/router";
import axios from "axios";

const AdoptPet = (props) => {
    console.log("PROPS:", props.id);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [descr, setDescr] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");


    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets/" + props.id)
            .then((res) => {
                setName(res.data.name);
                setType(res.data.type);
                setDescr(res.data.descr);
                setSkill1(res.data.skill1);
                setSkill2(res.data.skill2);
                setSkill3(res.data.skill3);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.id]);
        
    const deletePet = () => {
        axios
            .delete("http://localhost:8000/api/pets/"+ props.id)
            .then((res) => {
                navigate("/");
            })
            .catch((err) => {
            console.log(err);
            });
        };



return (
    <Container>
        <div className="w-250 p-4 rounded mx-auto shadow">
            <h3 className="text-left">Details about: <b>{name}</b></h3>
            <hr />
                    <Row xs={1} md={4}>
                        <Col className="text-right"><h5>Pet Type:</h5></Col>
                        <Col className="text-left">{type}</Col>
                    </Row>
                    <Row xs={1} md={4}>
                        <Col className="text-right"><h5>Description:</h5></Col>
                        <Col className="text-left">{descr}</Col>
                    </Row>
                    <Row xs={1} md={4}>
                        <Col className="text-right"><h5>Skills:</h5></Col>
                        <Col className="text-left">{skill1}</Col>
                    </Row>
                    <Row xs={1} md={4}>
                        <Col className="text-right"></Col>
                        <Col className="text-left">{skill2}</Col>
                    </Row>
                    <Row xs={1} md={4}>
                        <Col className="text-right"></Col>
                        <Col className="text-left">{skill3}</Col>
                    </Row>
                    <hr />
                <Button onClick={(e) => {
                    console.log("Event inside adopt button", name);
                    deletePet();
                    }}
                    className="ml-4" 
                    variant="danger" size="sm">Adopt <b>{name}</b>
                </Button>
                <Button onClick={(event) => {
                    navigate("/");
                    }}
                    className="ml-4" variant="secondary" size="sm">
                    Return Home
                </Button>
        </div>
    </Container>
    )
};

export default AdoptPet;
