import React, { useState, useEffect } from "react";
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

import { navigate } from "@reach/router";
import axios from "axios";

const EditPet = (props) => {
    console.log("PROPS:", props.id);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [descr, setDescr] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState("");


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

        const handleEditPetSubmit = (event) => {
            event.preventDefault();

        const editedPet = {
            name, 
            type : type.toLowerCase(),
            descr, skill1, skill2, skill3
        };

        axios
            .put(
            "http://localhost:8000/api/pets/" + props.id,
            editedPet
            )
            .then((res) => {
            console.log("EditPet response:", res);
            navigate("/");
            })
            .catch((err) => {
                console.log(err.response?.data?.errors)
                // console.log("Error msg at submission:" + err.response.data?.errors?.message);
                setErrors(err.response?.data?.errors);
                console.log(err.response);
            });
        };
    

return (
    <Container>
        <div className="w-250 p-4 rounded mx-auto shadow">
            <h3 className="text-left">Know a pet needing a home?</h3>
        </div>   
        

        
            <Form onSubmit ={(e) => {
                handleEditPetSubmit(e);
                }}> 
                <Container className="display-flex">
                    <Row>
                        <Col>
                        <div className="w-100  p-4">
                            <Form.Group controlId="formBasicLabel">
                                <Form.Label>Name</Form.Label>
                                {errors?.name && (
                                <span className="text-danger">
                                {" "}
                                - {errors?.name?.message}
                                </span>
                                )}
                                <Form.Control onChange={(e)=> {
                                    setName(e.target.value)
                                }}
                                type="text" placeholder="Pet's name" value={name}/>
                                <Form.Text className="text-muted" >
                                    Must be min 3 characters long
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicLabel">
                                <Form.Label>Type</Form.Label>
                                {errors?.type && (
                                <span className="text-danger">
                                {" "}
                                - {errors?.type?.message}
                                </span>
                                )}
                                <Form.Control onChange={(e)=> {
                                    // let modifiedType = e.target.value.toLowerCase()
                                    setType(e.target.value)
                                }}
                                type="text" placeholder="Pet's type" value={type}/>
                                <Form.Text className="text-muted" >
                                    Must be min 3 characters long
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicLabel">
                                <Form.Label>Description</Form.Label>
                                {errors?.descr && (
                                <span className="text-danger">
                                {" "}
                                - {errors?.descr.message}
                                </span>
                                )}
                                <Form.Control onChange={(e)=> {
                                    setDescr(e.target.value)
                                }}
                                type="text" placeholder="Pet's description" value={descr}/>
                                <Form.Text className="text-muted" >
                                    Must be min 3 characters long
                                </Form.Text>
                            </Form.Group>
                        </div>
                        </Col>

                    <Col>

                        <div className="w-100  p-4">
                            <h5>Optional Skills</h5>
                            <Form.Group controlId="formBasicLabel">
                                <Form.Label>Skill 1:</Form.Label>
                                <Form.Control onChange={(e)=> {
                                    setSkill1(e.target.value)
                                }}
                                type="text" value={skill1}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicLabel">
                                <Form.Label>Skill 2:</Form.Label>
                                <Form.Control onChange={(e)=> {
                                    setSkill2(e.target.value)
                                }}
                                type="text" value={skill2}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicLabel">
                                <Form.Label>Skill 3:</Form.Label>
                                <Form.Control onChange={(e)=> {
                                    setSkill3(e.target.value)
                                }}
                                type="text" value={skill3}/>
                            </Form.Group>
                        </div>   

                    </Col>
                    </Row>
                </Container>
                <div className="w-80  p-4 rounded shadow ">
                    <Button className="ml-4" variant="primary" size="sm" type="submit">
                        Edit Pet - <b>{name}</b>
                    </Button>
                    <Button onClick={(event) => {
                        navigate("/");
                        }}
                        className="ml-4" variant="secondary" size="sm">
                        Return Home
                    </Button>
                </div>
            </Form>
    </Container>
    )
};

export default EditPet;
