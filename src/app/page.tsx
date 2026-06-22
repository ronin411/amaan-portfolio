import Nav       from '@/components/Nav';
import Hero      from '@/components/Hero';
import About     from '@/components/About';
import Impact    from '@/components/Impact';
import Experience from '@/components/Experience';
import Stack     from '@/components/Stack';
import Projects  from '@/components/Projects';
import Contact   from '@/components/Contact';
import Footer    from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Impact />
      <Experience />
      <Stack />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
