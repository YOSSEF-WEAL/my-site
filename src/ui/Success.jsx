import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="relative max-h-[62vh] grid place-items-center px-4 py-10 sm:py-32 lg:px-8">
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
        data-aos="fade-up"
        data-aos-duration="1000"
        className="bg-primary rounded-full p-3 w-25 h-25 flex justify-center items-center "
      >
        <FaCheck className="text-white text-7xl" />
      </div>

      <div className="text-center">
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          The form has been sent successfully.
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-200 sm:text-xl/8">
          Thank you for sending the form. We will contact you as soon as
          possible.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-full bg-primary/50 border-2 border-primary text-base text-white transition-colors hover:bg-primary"
          >
            Go back home
          </Link>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 scale-[0.7] md:scale-1 top-[0%] md:top-90 left-[60%] md:left-[0%] -z-10 w-full h-screen transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
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
    </main>
  );
}

export default PageNotFound;
