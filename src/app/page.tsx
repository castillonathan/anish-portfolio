import Navbar from "@/src/app/components/Navbar"
import Hero from "@/src/app/components/Hero"
import Work from "@/src/app/components/Work"
import Footer from "@/src/app/components/Footer"
import PageTransition from "@/src/app/components/PageTransition"

export default function Home() {
  return (
  <>
    <Navbar />

    <PageTransition>
      <main>
        <Hero />

        <Work />

        {/* Temporary Profile Section */}
        <section
  id="profile"
  className="px-6 py-32 md:px-10"
>
  <div className="mx-auto max-w-7xl">

    <div className="mb-16">
      <p className="text-sm uppercase tracking-[0.25em] text-black/50">
        Profile
      </p>

      <h2 className="mt-5 max-w-5xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] md:text-8xl">
  A multidisciplinary designer creating visuals that connect.
</h2>
    </div>

    <div className="grid gap-12 md:grid-cols-2">

      <div>
        <p className="max-w-xl text-xl leading-[1.6] tracking-[-0.01em] text-black/65 md:text-2xl">
          I'm Anish Singhal, a multidisciplinary graphic and visual
          designer focused on creating meaningful visual experiences
          across branding, social media, merchandise, digital design,
          and creative communication.
        </p>
      </div>

      <div className="space-y-12">

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-black/40">
            Expertise
          </p>

          <p className="mt-4 text-base leading-[1.7] text-black/65 md:text-lg">
            Branding & Logo Design · Social Media Creatives · Poster &
            Flyer Design · Merchandise & T-shirt Graphics · Presentation
            & Pitch Deck Design · Vector Illustration · Typography &
            Layout · Event & Campaign Visuals
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-black/40">
            Tools
          </p>

          <p className="mt-4 text-base leading-[1.7] text-black/65 md:text-lg">
            Adobe Illustrator · Photoshop · Figma · Blender · After
            Effects · Premiere Pro
          </p>
        </div>

      </div>

    </div>

  </div>
</section>

        {/* Temporary Contact Section */}
<section
  id="contact"
  className="min-h-screen px-6 py-40 md:px-10"
>
  <div className="mx-auto max-w-7xl">

    <p className="text-sm uppercase tracking-[0.25em] text-black/50">
      Get in touch
    </p>

    <h2 className="mt-5 max-w-5xl text-6xl font-bold leading-[0.9] tracking-[-0.06em] md:text-9xl">
      Let's work
      <br />
      together.
    </h2>

    <p className="mt-8 max-w-lg text-lg leading-[1.6] text-black/55 md:text-xl">
      Have a project, collaboration, or opportunity in mind?
      I'd love to hear about it.
    </p>

    <div className="mt-10">
  <a
    href="mailto:anishsinghal2901@gmail.com"
    className="text-2xl font-medium tracking-[-0.02em] underline decoration-black/20 underline-offset-8 transition-all duration-300 hover:decoration-black md:text-4xl"
  >
    anishsinghal2901@gmail.com
  </a>

  <p className="mt-3 text-sm text-black/40">
    Available for freelance projects, collaborations, and opportunities.
  </p>
</div>

    <div className="mt-24 flex flex-wrap gap-x-10 gap-y-5 border-t border-black/10 pt-10">

      <a
        href="https://www.behance.net/art3mis_berlin"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-black/60 transition-colors hover:text-black"
      >
        Behance ↗
      </a>

      <a
        href="https://www.instagram.com/_vision.with.variety_/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-black/60 transition-colors hover:text-black"
      >
        Instagram ↗
      </a>

      <a
        href="https://www.linkedin.com/in/anish-singhal-291437191/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-black/60 transition-colors hover:text-black"
      >
        LinkedIn ↗
      </a>

    </div>

  </div>
</section>
          </main>
    </PageTransition>
<Footer />
</>
)
}