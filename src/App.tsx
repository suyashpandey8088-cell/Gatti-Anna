import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Mood } from './sections/Mood';
import { Menu } from './sections/Menu';
import { Praise } from './sections/Praise';
import { Visit } from './sections/Visit';
import { Closing } from './sections/Closing';
import { StructuredData } from './components/StructuredData';

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Mood />
        <Menu />
        <Praise />
        <Visit />
        <Closing />
      </main>
      <div className="grain" aria-hidden="true" />
      <StructuredData />
    </>
  );
}
