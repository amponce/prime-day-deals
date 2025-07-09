import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import FeaturedDeals from '@/components/FeaturedDeals';
import TechnologyGuide from '@/components/TechnologyGuide';
// import RoomInspiration from '@/components/RoomInspiration';
import EmailCapture from '@/components/EmailCapture';
import BlogPreview from '@/components/BlogPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDeals />
      <EmailCapture />
      <TechnologyGuide />
      <BlogPreview />
    </>
  );
}