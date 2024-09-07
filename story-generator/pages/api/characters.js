//This is the core page where characters are created, edited, deleted, and the story is generated. It uses state for managing characters and includes a form for input, a table for displaying characters, and buttons for adding, editing, deleting, and generating the story.
import { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', personality: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCharacter = () => {
    setCharacters([...characters, { ...form, id: Date.now() }]);
    setForm({ name: '', description: '', personality: '' });
  };

  const editCharacter = (char) => {
    setForm({ name: char.name, description: char.description, personality: char.personality });
    setEditMode(true);
    setCurrentId(char.id);
  };

  const updateCharacter = () => {
    setCharacters(
      characters.map((char) => (char.id === currentId ? { ...form, id: currentId } : char))
    );
    setEditMode(false);
    setForm({ name: '', description: '', personality: '' });
  };

  const deleteCharacter = (id) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  const generateStory = async () => {
    const res = await fetch('/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characters }),
    });
    const data = await res.json();
    if (data.story) {
      alert(data.story); // Show the generated story
    } else {
      alert('Failed to generate story. Try again.');
    }
  };

  return (
    <Container>
      <h1>Character List</h1>
      <form>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Personality"
          name="personality"
          value={form.personality}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          onClick={editMode ? updateCharacter : addCharacter}
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
        >
          {editMode ? 'Update Character' : 'Add Character'}
        </Button>
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
                <Button onClick={() => editCharacter(char)} variant="contained" color="secondary">
                  Edit
                </Button>
                <Button
                  onClick={() => deleteCharacter(char.id)}
                  variant="contained"
                  color="error"
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {characters.length > 0 && (
        <Button
          onClick={generateStory}
          variant="contained"
          color="success"
          style={{ marginTop: '20px' }}
        >
          Generate Story
        </Button>
      )}
    </Container>
  );
};

export default Characters;
