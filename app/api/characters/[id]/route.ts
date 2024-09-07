// app/api/characters/[id]/route.ts
import { NextResponse } from 'next/server';
import { Character } from '../../../types';

let characters: Character[] = [];

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, description, personality }: Partial<Character> = await request.json();
  const index = characters.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    characters[index] = { id: parseInt(id), name: name || '', description: description || '', personality: personality || '' };
    return NextResponse.json(characters[index]);
  }
  return NextResponse.error();
}

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;
  characters = characters.filter(c => c.id !== parseInt(id));
  return NextResponse.json({ message: 'Deleted' });
}
