// This file contains the backend logic for generating stories using GPT-based models. 
import { Configuration, OpenAIApi } from 'openai';

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Set your OpenAI API Key in the environment
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // Extract the list of characters from the request body
  const { characters } = req.body;

  // Prepare the prompt by listing all character names, descriptions, and personalities
  const characterDetails = characters
    .map((char) => `${char.name}, a ${char.personality} person.`)
    .join(' ');

  // Create the prompt for story generation
  const prompt = `Generate a story using the following characters: ${characterDetails}`;

  // Use OpenAI to generate a story
  const response = await openai.createCompletion({
    model: 'text-davinci-003', // You can experiment with different models here
    prompt,
    max_tokens: 500,           // Limit on the length of the response
  });

  // Send the generated story back to the client
  res.status(200).json({ story: response.data.choices[0].text });
}
