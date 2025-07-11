import { LuArrowUpRight, LuGithub } from "react-icons/lu";
import { FaBehance, FaWordpress } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProjectCard({ projects }) {
  return (
    <>
      {Array.isArray(projects) &&
        projects.map((project) => (
          <div
            className="relative overflow-hidden w-full min-h-[350px] rounded-[20px]"
            key={project.id}
          >
            <img
              className="w-full h-full object-cover -z-8 min-h-[350px]"
              src={project.imageUrl}
              alt={project.title}
            />
            <div className="absolute p-3 z-10 h-full top-0 right-0 w-full bg-gradient-to-b from-teal-950/0 to-teal-950/90 flex flex-col justify-end items-start text-white gap-2">
              <div className="flex flex-row gap-1 items-start">
                {project.categories.map((cat, i) => (
                  <p
                    key={`${cat}-${i}`}
                    className="text-primary text-[16px] font-semibold"
                  >
                    {cat},
                  </p>
                ))}
              </div>
              <Link
                to={`/project/${project.id}`}
                className="text-4xl font-bold transition-all hover:text-primary"
              >
                {project.title}
              </Link>
              <p className="text-1xl font-semibold text-gray-200">
                {project.excerpt}
              </p>
              <div className="flex flex-row gap-3 items-start mb-2.5">
                {project.projectLink && (
                  <LinkIcon link={project.projectLink}>
                    <LuArrowUpRight size={28} />
                  </LinkIcon>
                )}
                {project.designLink && (
                  <LinkIcon link={project.designLink}>
                    <FaBehance size={28} />
                  </LinkIcon>
                )}
                {project.repoLink && (
                  <LinkIcon link={project.repoLink}>
                    <LuGithub size={28} />
                  </LinkIcon>
                )}
                {project.wordpress && (
                  <LinkIcon link={project.wordpress}>
                    <LuGithub size={28} />
                    <FaWordpress size={28} />
                  </LinkIcon>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default ProjectCard;

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
