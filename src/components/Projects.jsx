import { useRef, useCallback, useState, useEffect } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import { useCategories, useInfiniteProjects } from "../services/useProjects";
import ProjectCard from "../ui/ProjectCard";
import Spiner from "../ui/Spiner";
import Error from "../ui/Error";

function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") || "all";
  const [selectedTab, setSelectedTab] = useState(activeCat);
  const observerRef = useRef();

  useEffect(() => {
    setSelectedTab(activeCat);
  }, [activeCat]);

  const { categories, isPending: categoriesLoading } = useCategories();
  const {
    projects,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: projectsLoading,
    error,
  } = useInfiniteProjects(activeCat);

  const lastElementRef = useCallback(
    (node) => {
      if (projectsLoading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [projectsLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  function handleTab(catName) {
    setSelectedTab(catName);
    setSearchParams(catName === "all" ? {} : { cat: catName });
  }

  if (categoriesLoading || projectsLoading) {
    return (
      <div className="text-white pt-35 flex items-center justify-center min-h-screen">
        <Spiner />
      </div>
    );
  }

  if (error) {
    return <Error>An error occurred while loading Projects</Error>;
  }

  return (
    <div className="text-white pt-35 relative">
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
      <div
        className="flex items-start md:items-center justify-center gap-5 flex-col md:flex-row w-full p-5 rounded-3xl md:rounded-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(74, 212, 147, 0) 0%, #007374 100%)",
        }}
      >
        <p className="text-2xl font-bold">Filter:</p>
        <ul className="flex overflow-y-auto w-full items-center gap-3 md:gap-5 flex-row">
          <li>
            <button
              onClick={() => handleTab("all")}
              className={`text-base font-bold rounded-full px-4 py-2 transition-all hover:bg-primary ${
                selectedTab === "all" ? "bg-primary" : "bg-white/20"
              }`}
            >
              All
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleTab(cat.name)}
                className={`text-base whitespace-nowrap font-bold rounded-full px-4 py-2 transition-all hover:bg-primary ${
                  selectedTab === cat.name ? "bg-primary" : "bg-white/20"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="flex flex-wrap gap-5 justify-center mt-10"
        key={activeCat}
      >
        <div className="px-4 w-full flex flex-row flex-wrap items-center justify-center gap-5 mt-5">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={project.id}
                ref={index === projects.length - 1 ? lastElementRef : null}
                className="w-full md:w-[31%] sm:w-[48%] min-h-[350px]"
                data-aos="fade-up"
                data-aos-easing="ease"
                data-aos-duration="1000"
              >
                <ProjectCard projects={[project]} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">
              There are no projects in this section.
            </p>
          )}
        </div>
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center mt-10">
          <Spiner />
        </div>
      )}

      {!hasNextPage && projects.length > 0 && (
        <div className="text-center mt-10 text-gray-400">
          <p> All projects are displayed </p>
        </div>
      )}
    </div>
  );
}

export default Projects;
