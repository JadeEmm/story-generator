// app/api/characters/route.ts
import { NextResponse } from 'next/server';
import { Character } from '../../types';

let characters: Character[] = [];

export async function GET() {
  return NextResponse.json(characters);
}

export async function POST(request: Request) {
  const { name, description, personality }: Partial<Character> = await request.json();
  const newCharacter: Character = {
    id: Date.now(),
    name: name || '',
    description: description || '',
    personality: personality || '',
  };
  characters.push(newCharacter);
  return NextResponse.json(newCharacter);
}
