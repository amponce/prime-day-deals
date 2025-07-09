import Hero from '@/components/Hero';
import FeaturedDeals from '@/components/FeaturedDeals';
import TechnologyGuide from '@/components/TechnologyGuide';
// import RoomInspiration from '@/components/RoomInspiration';
import PinterestCTA from '@/components/PinterestCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDeals />
      <TechnologyGuide />
      {/* <RoomInspiration /> - Hidden until functional */}
      <PinterestCTA />
    </>
  );
}