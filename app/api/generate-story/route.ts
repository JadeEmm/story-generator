// app/api/generate-story/route.ts
import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import { Character } from '../../types'; // Import the Character type

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY!);

export async function POST() {
  try {
    // Fetch characters from the API
    const charactersResponse = await fetch('http://localhost:3000/api/characters');
    if (!charactersResponse.ok) throw new Error('Failed to fetch characters');
    const characters: Character[] = await charactersResponse.json(); // Explicitly type characters

    // Generate a prompt based on characters
    const prompt = `Create a story with the following characters: ${characters.map(c => `${c.name} (${c.personality})`).join(', ')}.`;

    // Generate story using Hugging Face model
    const { generated_text } = await hf.textGeneration({
      model: 'distilgpt2',
      inputs: prompt,
    });

    return NextResponse.json({ story: generated_text });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
  }
}
