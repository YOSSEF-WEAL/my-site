import useContact from "../services/useContact";
import Error from "./Error";
import Spiner from "./Spiner";

function FollowMe() {
  const { contact, isPending, error } = useContact();
  return (
    <div className="w-full flex flex-col items-start gap-5 md-[49%] text-white">
      <p className="text-2xl font-bold">Follow Me</p>

      <div className="w-full flex items-center justify-start flex-row flex-wrap gap-5">
        {isPending && (
          <div className="w-full">
            <Spiner />
          </div>
        )}
        {error && <Error>An error occurred while loading My Contact</Error>}

        {Array.isArray(contact) &&
          contact.map((contact, i) => (
            <a
              data-aos="fade-up"
              data-aos-easing="ease"
              data-aos-delay={50 * i}
              href={contact.contactUrl}
              target={contact.target}
              key={i}
              className="w-[46%] md:w-[22%] flex flex-col items-center gap-3 bg-white/15 p-5 rounded-xl border-3 border-white/60 transition-colors hover:bg-primary/30 hover:border-primary"
            >
              <img
                src={contact.contactImgUrl}
                alt={contact.contactName}
                className="w-12 transition-all hover:scale-[1.1]"
              />
              <p className="text-2xl">{contact.contactName}</p>
            </a>
          ))}
      </div>
    </div>
  );
}

export default FollowMe;
