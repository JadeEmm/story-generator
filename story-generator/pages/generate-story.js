// This file contains the backend logic for generating stories using GPT-based models. 
import { HfInference } from '@huggingface/inference';

// Initialize Hugging Face API Client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY); // Add your Hugging Face API Key to the .env.local file

export default async function handler(req, res) {
  const { characters } = req.body;

  // Combine the character details into a prompt
  const characterDetails = characters
    .map((char) => `${char.name}, a ${char.personality} person.`)
    .join(' ');
  const prompt = `Generate a story using the following characters: ${characterDetails}`;

  try {
    // Use GPT-2 model hosted on Hugging Face
    const response = await hf.textGeneration({
      model: 'gpt2', // Model name on Hugging Face
      inputs: prompt,
      parameters: {
        max_new_tokens: 200, // Control the length of generated text
        temperature: 0.7, // Adjust randomness, lower is more focused output
      },
    });

    // Return generated story to the frontend
    res.status(200).json({ story: response.generated_text });
  } catch (error) {
    res.status(500).json({ error: 'Error generating story' });
  }
}
