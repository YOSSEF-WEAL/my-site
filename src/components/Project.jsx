import { useParams } from "react-router-dom";
import useProject from "../services/useProject";
import Spiner from "../ui/Spiner";
import Error from "../ui/Error";
import SliderProject from "../ui/SliderProject";
import { LuArrowUpRight, LuGithub } from "react-icons/lu";
import { FaBehance, FaWordpress } from "react-icons/fa";
import { useState } from "react";

function Project() {
  const { projectId } = useParams();
  const { project, isPending, error } = useProject(projectId);

  if (isPending)
    return (
      <div className=" pt-30 ">
        <Spiner />
      </div>
    );
  if (error) return <Error>An error occurred while loading This Project</Error>;

  return (
    <div className="text-white pt-30 relative">
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
      <div className="flex items-start justify-center gap-5 flex-col-reverse md:flex-row">
        <div className="w-full md:w-[50%]">
          <SliderProject projectImags={project?.images} />
        </div>
        <div className="w-full px-5 md:w-[50%] flex items-start justify-start gap-3 flex-col">
          <div className="w-full flex justify-start items-center">
            {project?.categories.map((cat, i) => (
              <p
                key={`${cat}-${i}`}
                className="text-primary text-[16px] font-semibold"
              >
                {cat},
              </p>
            ))}
          </div>
          <p className="text-3xl md:text-5xl">{project?.title}</p>
          <ShowMoreText text={project?.contentText} maxLength={200} />

          <p className="text-white pb-2 py-2 border-b-3 text-start border-primary text-2xl w-fit font-semibold">
            Technologys
          </p>
          <div className="flex flex-row flex-wrap gap-3 items-start mb-2.5">
            {project.selectedTechnologies.map((tec, i) => (
              <div
                key={i}
                className="w-15 h-15 p-2.5 transition-all hover:scale-[1.1] hover:bg-primary/20 hover:border-primary bg-white/15 border-2 border-white/50 rounded-full flex items-center justify-center "
              >
                <img src={tec} alt="" />
              </div>
            ))}
          </div>
          <p className="text-white pb-2 py-2 border-b-3 text-start border-primary text-2xl w-fit font-semibold">
            Links
          </p>
          <div className="flex flex-row gap-3 items-start mb-2.5">
            {project?.projectLink && (
              <LinkIcon link={project?.projectLink}>
                <LuArrowUpRight size={28} />
              </LinkIcon>
            )}
            {project?.designLink && (
              <LinkIcon link={project?.designLink}>
                <FaBehance size={28} />
              </LinkIcon>
            )}
            {project?.repositoriesLink && (
              <LinkIcon link={project?.repositoriesLink}>
                <LuGithub size={28} />
              </LinkIcon>
            )}
            {project?.wordpress && (
              <LinkIcon link={project?.wordpress}>
                <LuGithub size={28} />
                <FaWordpress size={28} />
              </LinkIcon>
            )}
          </div>
        </div>
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
          className="relative left-[80%] top-[40%] aspect-1155/678 w-[1000px] h-[54%] -translate-x-1/2 rotate-30 bg-linear-to-tr bg-primary/30 opacity-30"
        />
      </div>
    </div>
  );
}

export default Project;

function LinkIcon({ children, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-b from-green-400 to-teal-700 transition-all hover:scale-[1.1] border-3 border-white p-1"
    >
      {children}
    </a>
  );
}

function ShowMoreText({ text = "", maxLength = 200 }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;
  const isLong = text.length > maxLength;
  const displayText =
    expanded || !isLong ? text : text.slice(0, maxLength) + "...";
  return (
    <div>
      <p className="text-base content-preview {expanded ? 'expanded' : ''}">
        {displayText}
      </p>
      {isLong && (
        <button
          className="read-more-btn btn mt-2 px-3 py-1 bg-primary/50 transition-colors hover:bg-primary rounded-full cursor-pointer"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
