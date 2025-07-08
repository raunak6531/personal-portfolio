import { Projects } from "@/components/sections/Projects";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Projects />
      <CarouselNavigation />
    </div>
  );
}
