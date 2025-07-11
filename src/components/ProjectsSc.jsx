import { Link } from "react-router-dom";
import useLastProjects from "../services/useLastProjects";
import Error from "../ui/Error";
import Heding from "../ui/Heding";
import ProjectCard from "../ui/ProjectCard";
import Spiner from "../ui/Spiner";

function ProjectsSc() {
  const { LastProjects, isPending, error } = useLastProjects();

  return (
    <section className="relative mt-20">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath: "polygon(0% 0%, 30% 0%, 100% 80%, 0% 80%)",
          }}
          data-aos="fade-right"
          data-aos-duration="1500"
          data-aos-delay="200"
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-22 bg-linear-to-tr bg-primary/30 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>
      <Heding textWhite={"Explore My"} textPrimary={"Last Projects"} />
      {isPending && <Spiner />}
      {error && <Error>An error occurred while loading Last Projects</Error>}
      <div className="px-4 w-full flex flex-row flex-wrap items-center justify-center gap-5 mt-5">
        {LastProjects && LastProjects.length > 0
          ? LastProjects.map((project) => (
              <div
                key={project.id}
                className="w-full md:w-[31%] sm:w-[48%] h-[350px]"
                data-aos="fade-up"
                data-aos-easing="ease"
                data-aos-duration="1000"
              >
                <ProjectCard projects={[project]} />
              </div>
            ))
          : ""}
      </div>

      <div className="m-8 flex items-center justify-center">
        <Link
          to="/projects"
          className="px-8 py-2 rounded-full bg-primary/20 border-2 border-primary text-2xl text-white transition-colors hover:bg-primary"
        >
          Browse All Projects
        </Link>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-90 left-[0%] -z-10 w-full h-screen transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath: "polygon(0% 0%, 30% 0%, 100% 80%, 0% 80%)",
          }}
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-delay="600"
          className="relative left-[95%] top-[54%] aspect-1155/678 w-[1000px] h-[54%] -translate-x-1/2 rotate-30 bg-linear-to-tr bg-primary/30 opacity-30"
        />
      </div>
    </section>
  );
}

export default ProjectsSc;
