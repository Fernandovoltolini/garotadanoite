
import AgeVerificationModal from "@/components/AgeVerificationModal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import QuickSearch from "@/components/home/QuickSearch";
import FeaturedProfiles from "@/components/home/FeaturedProfiles";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <AgeVerificationModal />
      <Navbar />
      
      <main className="flex-grow">
        <HeroBanner />
        <QuickSearch />
        <FeaturedProfiles />
        <WhyChooseUs />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
