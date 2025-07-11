import Error from "../ui/Error";
import Heding from "../ui/Heding";
import SliderTechStack from "../ui/SliderTechStack";
import Spiner from "../ui/Spiner";
import useTechStack from "../services/useTechStack";

function TechStack() {
  const { techStack, isPending, error } = useTechStack();

  return (
    <section id="tech-stack">
      <Heding textWhite={"My Tech"} textPrimary={"Stack"} />
      {isPending && <Spiner />}
      {error && <Error>An error occurred while loading My Tech Stack</Error>}

      <div className="flex flex-row flex-wrap items-center justify-center gap-3 px-3">
        <SliderTechStack
          techStack={Array.isArray(techStack) ? techStack : []}
        />
      </div>
    </section>
  );
}

export default TechStack;
