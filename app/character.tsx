// app/character.tsx
'use client'; // Mark as a Client Component

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Character } from './types';

const CharacterForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [personality, setPersonality] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  const fetchCharacters = async () => {
    try {
      const { data } = await axios.get('/api/characters');
      setCharacters(data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const addCharacter = async () => {
    try {
      if (editingCharacter) {
        await axios.put(`/api/characters/${editingCharacter.id}`, { name, description, personality });
      } else {
        await axios.post('/api/characters', { name, description, personality });
      }
      fetchCharacters();
      setEditingCharacter(null);
      setName('');
      setDescription('');
      setPersonality('');
    } catch (error) {
      console.error('Error adding/updating character:', error);
    }
  };

  const startEdit = (character: Character) => {
    setName(character.name);
    setDescription(character.description);
    setPersonality(character.personality);
    setEditingCharacter(character);
  };

  const deleteCharacter = async (id: number) => {
    try {
      await axios.delete(`/api/characters/${id}`);
      fetchCharacters();
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div>
      <h2>Manage Characters</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Personality"
        value={personality}
        onChange={(e) => setPersonality(e.target.value)}
      />
      <button onClick={addCharacter}>
        {editingCharacter ? 'Update Character' : 'Add Character'}
      </button>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            {character.name} - {character.description} - {character.personality}
            <button onClick={() => startEdit(character)}>Edit</button>
            <button onClick={() => deleteCharacter(character.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterForm;
