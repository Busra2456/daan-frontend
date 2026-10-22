
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Heart,
  HeartHandshake,
  HeartPulse,
  House,
  ShieldCheck,
  Sparkles,
  Utensils,
  Users,
  Video,
} from "lucide-react";

import HeroSlider from "./_components/HeroSlider";
import FeaturedRequests from "./_components/FeaturedRequests";
import WhyDaan from "./_components/withTrust";
import OurMission from "./_components/OurMission";
import HowItWorks from "./how-it-works/page";
import AreasOfSupport from "./_components/AreasOfSupport";
import ForDonors from "./_components/ForDonors";
import ForNeedy from "./_components/ForNeedy";
import OurPrinciples from "./_components/OurPrinciples";
import VerificationNotice from "./_components/VerificationNotice";
import DaanCommunity from "./_components/DaanCommunity";
import DaanFAQs from "./_components/DaanFAQs";
import FinalCTA from "./_components/FinalCTA";

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Featured verified requests from the API */}
      <FeaturedRequests />

      {/* 3. Trust points */}
     <WhyDaan />

      {/* 4. Mission */}
    <OurMission />

      {/* 5. How it works */}
      <HowItWorks />
 

      {/* 6. Support categories */}
     <AreasOfSupport />

      {/* 7. For donors */}
      <ForDonors />

      {/* 8. For people seeking help */}
      <ForNeedy />

      {/* 9. Values */}
     <OurPrinciples />

      {/* 10. Verification and safety */}
     <VerificationNotice />

      {/* 11. Community and shared purpose */}
     <DaanCommunity/>

      {/* 12. FAQ */}
     <DaanFAQs />

      {/* 13. Final CTA */}
     
     <FinalCTA />
    </main>
  );
}
