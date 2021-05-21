import React, {useState, useEffect} from "react";
import { Container, Button, Table } from 'react-bootstrap';
import axios from "axios";
import { navigate } from "@reach/router";


const Pets = (props) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/pets")
        .then((res) => {
            console.log("From API:", res.data);
            let newPets = res.data.sort((a, b) => (a.type > b.type) ? 1 : -1)
            console.log(newPets);
            setPets(newPets);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <Container>
            <Button 
                onClick={(event) => {
                    navigate("pets/new");
                    }}
                    className="mt-2 mb-2" 
                    variant="primary" 
                    size="sm">Add a pet
            </Button>
            <h4>These pets are looking for a good home</h4>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet) => {
                        return (
                        <tr key={pet._id}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td>
                            <Button onClick={(e) => {
                                console.log("Event inside details button", pet)
                                navigate(`/pets/${pet._id}`)
                                }}
                            className="ml-4" variant="primary" size="sm">Details</Button>
                            <Button onClick={(event) => {
                                navigate(`pets/edit/${pet._id}/`);
                                }}
                            className="ml-4" variant="primary" size="sm">Edit <b>{pet.name}</b></Button>
                            
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    );
        
};

export default Pets;

