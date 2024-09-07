// app/page.tsx
import CharacterForm from './character';
import StoryGenerator from './story';

const HomePage = () => {
  return (
    <div>
      <h1>Story Generator</h1>
      <CharacterForm />
      <StoryGenerator />
    </div>
  );
};

export default HomePage;
