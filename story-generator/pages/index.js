//This is your main landing page, where you add navigation to the Characters page.
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Story Generator</h1>
      <Link href="/characters">
        <a>Go to Character Management</a>
      </Link>
    </div>
  );
}
