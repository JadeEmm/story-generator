// app/story.tsx
'use client'; // Mark as a Client Component

import { useState } from 'react';
import axios from 'axios';

const StoryGenerator = () => {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStory = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const { data } = await axios.post('/api/generate-story');
      setStory(data.story);
    } catch (err) {
      setError('Failed to generate story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Story</h2>
      <button onClick={generateStory} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Story'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h3>Generated Story:</h3>
        <p>{story}</p>
      </div>
    </div>
  );
};

export default StoryGenerator;
