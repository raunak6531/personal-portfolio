import { Projects } from "@/components/sections/Projects";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <CarouselNavigation />
      </div>
      
      {/* Page Content */}
      <div className="pt-24">
        <Projects />
      </div>
    </div>
  );
}
