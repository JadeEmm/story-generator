//This file contains the character management (CRUD) functionality. 

import { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';

// Character management page
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', personality: '' });

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add a new character
  const addCharacter = () => {
    setCharacters([...characters, { ...form, id: Date.now() }]);
    setForm({ name: '', description: '', personality: '' });
  };

  // Delete a character
  const deleteCharacter = (id) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  return (
    <Container>
      <h1>Character List</h1>
      <form>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} />
        <TextField label="Personality" name="personality" value={form.personality} onChange={handleChange} />
        <Button onClick={addCharacter}>Add Character</Button>
      </form>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Personality</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters.map((char) => (
            <TableRow key={char.id}>
              <TableCell>{char.name}</TableCell>
              <TableCell>{char.description}</TableCell>
              <TableCell>{char.personality}</TableCell>
              <TableCell>
                <Button onClick={() => deleteCharacter(char.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Characters;
