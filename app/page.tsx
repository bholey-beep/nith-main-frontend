import Aboutus from './homepage/aboutus/page';
// import Event from './homepage/event/page';
import Placement from './homepage/placement/page';
import Director from './homepage/directormessage/page';
import Gallery from './homepage/gallery/page';
import Hero from './homepage/hero/page';
import {
  AcademicsPreview,
  AdmissionsPreview,
  NewsPreview,
  AchievementsPreview,
  EventsPreview,
} from './components/SectionPreviews';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="flex-1 relative z-0">
        <Hero />
      </div>

      {/* Main content sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          <section>
            <EventsPreview />
          </section>

          <section>
            <AcademicsPreview />
          </section>

          <section>
            <AdmissionsPreview />
          </section>

          <section>
            <NewsPreview />
          </section>
        </div>

        {/* About Us */}
        <section>
          <Aboutus />
        </section>

        {/* Placement */}
        <section>
          <Placement />
        </section>

        {/* Achievements */}
        <section>
          <AchievementsPreview />
        </section>

        {/* Director */}
        <section>
          <Director />
        </section>

        {/* Gallery */}
        <section>
          <Gallery />
        </section>
      </main>
    </div>
  );
}
