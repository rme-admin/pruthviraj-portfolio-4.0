import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import References from "@/components/References";
import MediaGallery from "@/components/MediaGallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getProjects,
  getExperience,
  getAchievements,
  getEducation,
  getReferences,
  getMedia,
  getSiteSettings,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, experience, achievements, education, references, media, site] =
    await Promise.all([
      getProjects(),
      getExperience(),
      getAchievements(),
      getEducation(),
      getReferences(),
      getMedia(),
      getSiteSettings(),
    ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero hero={site.hero} contact={site.contact} />
        <About about={site.about} />
        <Experience experience={experience} />
        <Projects projects={projects} />
        <Education education={education} />
        <Achievements achievements={achievements} />
        <References references={references} />
        <MediaGallery media={media} />
        <Contact contact={site.contact} />
      </main>
      <Footer contact={site.contact} />
    </>
  );
}
