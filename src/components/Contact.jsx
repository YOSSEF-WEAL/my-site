import ContactForm from "../ui/ContactForm";
import FollowMe from "../ui/FollowMe";
import Heding from "../ui/Heding";

function Contact() {
  return (
    <section id="contact" className="relative mt-20 px-10 mb-10">
      <Heding textWhite={"Contact"} textPrimary={"Me"} />
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

      <div className="w-full flex items-start justify-between flex-col md:flex-row gap-5">
        <FollowMe />
        <ContactForm />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-90 left-[0%] -z-10 w-full h-[60vh] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath: "polygon(0% 0%, 30% 0%, 100% 80%, 0% 80%)",
          }}
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-delay="600"
          className="relative left-[95%] top-[15%] aspect-1155/678 w-[1000px] h-[54%] -translate-x-1/2 rotate-30 bg-linear-to-tr bg-primary/30 opacity-30"
        />
      </div>
    </section>
  );
}

export default Contact;
