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
      <main>
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <section className="flex-1">
            <EventsPreview />
          </section>

          <section className="flex-1">
            <AcademicsPreview />
          </section>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <section className="flex-1">
            <AdmissionsPreview />
          </section>

          <section className="flex-1">
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
