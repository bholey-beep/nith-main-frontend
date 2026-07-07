



import Link from 'next/link';
import Aboutus from './homepage/aboutus/page';

import Event from './homepage/event/page';
import Placement from './homepage/placement/page';
import News from './homepage/news/page';
import Achieve from './homepage/achievements/page';
import Director from './homepage/directormessage/page';
import Gallery from './homepage/gallery/page';
import Hero from './homepage/hero/page';
import Academics from './homepage/academics/page';
import Admissions from './homepage/admissions/page';

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
        <Link href="/homepage/event" className="block h-full hover:scale-[1.01] transition-transform">
          <Event />
        </Link>
      </section>

      <section className="flex-1">
        <Link href="/homepage/academics" className="block h-full hover:scale-[1.01] transition-transform">
          <Academics />
        </Link>
      </section>
    </div>

    {/* Row 2 */}
    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
      <section className="flex-1">
        <Link href="/homepage/admissions" className="block h-full hover:scale-[1.01] transition-transform">
          <Admissions />
        </Link>
      </section>

      <section className="flex-1">
        <Link href="/homepage/news" className="block h-full hover:scale-[1.01] transition-transform">
          <News />
        </Link>
      </section>
    </div>

    {/* About Us */}
    <section>
      <Link href="/homepage/aboutus" className="block hover:scale-[1.01] transition-transform">
        <Aboutus />
      </Link>
    </section>

    {/* Placement */}
    <section>
      <Link href="/homepage/placement" className="block hover:scale-[1.01] transition-transform">
        <Placement />
      </Link>
    </section>

    {/* Achievements */}
    <section>
      <Link href="/homepage/achievements" className="block hover:scale-[1.01] transition-transform">
        <Achieve />
      </Link>
    </section>

    {/* Director */}
    <section>
      <Link href="/homepage/directormessage" className="block hover:scale-[1.01] transition-transform">
        <Director />
      </Link>
    </section>

    {/* Gallery */}
    <section>
      <Link href="/homepage/gallery" className="block hover:scale-[1.01] transition-transform">
        <Gallery />
      </Link>
    </section>
  </main>
</div>
  );
}
