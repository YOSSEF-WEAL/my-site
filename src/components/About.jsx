import { FiCheck } from "react-icons/fi";

function About() {
  const positions = [
    "WordPress Development",
    "Front-end Development",
    "UI / UX Design",
  ];

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      data-aos-delay="100"
      className="text-white mt-15 px-3 md:px-10 py-2 md:py-5"
      id="about"
    >
      <div className="relative isolate px-0 lg:px-8 flex items-center justify-center h-full">
        <div className="absolute top-0 -z-10 blur-3xl right-10 transform-gpu">
          <div
            style={{
              clipPath: "polygon(0% 0%, 30% 0%, 100% 80%, 0% 80%)",
            }}
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="200"
            className=" left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-22 bg-linear-to-tr bg-primary/30 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>

        <div className="mx-auto md:max-w-1xl max-w-fit md:max-h-screen gap-3 border-2 border-white/50 flex items-center bg-white/15 p-2 md:p-10 rounded-xl justify-center flex-col-reverse md:flex-row ">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="w-[100%] md:w-[50%] p-3 md:p-0 flex flex-col justify-start gap-3"
          >
            <p className="text-sm text-gray-300 mb-4 font-semibold">About me</p>
            <h1 className="text-4xl font-bold">I'm Yossef Weal</h1>
            <p className="text-lg text-white ">
              I'm UI / UX Designes and WordPress Development and Front-end
              Development
            </p>
            <p className="text-gray-300 text-base">
              I am very interested in UI and UX experience to help companies and
              individuals develop applications and websites.
            </p>
            <div className="flex flex-row flex-wrap gap-2">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="flex flex-row w-[48%] items-center justify-start gap-3"
                >
                  <FiCheck className="text-primary text-xl" />
                  {position}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="px-3 py-1.5 w-full rounded-full bg-primary/50 border-2 border-primary text-base text-white transition-colors hover:bg-primary"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="w-[100%] md:w-[50%]">
            <img
              data-aos="fade-left"
              data-aos-duration="1000"
              src="./about.png"
              alt="About"
              className="w-full scale-[1.1]"
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute scale-[0.6] md:scale-[1] inset-x-0 top-90 left-[0%] -z-10 w-full h-screen transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath: "polygon(0% 0%, 30% 0%, 100% 80%, 0% 80%)",
            }}
            data-aos="fade-left"
            data-aos-duration="1500"
            className="relative left-[95%] top-[54%] aspect-1155/678 w-[1000px] h-[54%] -translate-x-1/2 rotate-30 bg-linear-to-tr bg-primary/30 opacity-30"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
