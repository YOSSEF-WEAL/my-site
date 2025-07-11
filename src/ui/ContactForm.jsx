function ContactForm() {
  return (
    <div className="w-full flex flex-col items-start gap-5 md-[49%] text-white">
      <p className="text-2xl font-bold">
        Fill out the form and I will contact you
      </p>

      <form
        method="post"
        action="https://api.sheetmonkey.io/form/rqriycmiVXAkwz5V57pPvE"
        className="flex flex-col items-center justify-between gap-5"
      >
        <div className="w-full flex items-center justify-between flex-row flex-wrap gap-5">
          <input
            data-aos="fade-up"
            data-aos-easing="ease"
            data-aos-delay={100}
            className="w-[48%] transition-all bg-white/15 border-2 border-white/80 block min-w-0 grow py-3 px-4 rounded-full text-base text-gray-200 placeholder:text-gray-300 outline-none focus:border-primary focus:bg-primary/15 sm:text-sm/6"
            type="text"
            placeholder="Full name"
            name="name"
            required
          />
          <input
            data-aos="fade-up"
            data-aos-easing="ease"
            data-aos-delay={150}
            className="w-[48%] transition-all bg-white/15 border-2 border-white/80 block min-w-0 grow py-3 px-4 rounded-full text-base text-gray-200 placeholder:text-gray-300 outline-none focus:border-primary focus:bg-primary/15 sm:text-sm/6"
            type="text"
            placeholder="E-mail"
            name="mail"
            required
          />
          <input
            data-aos="fade-up"
            data-aos-easing="ease"
            data-aos-delay={200}
            className="w-[48%] transition-all bg-white/15 border-2 border-white/80 block min-w-0 grow py-3 px-4 rounded-full text-base text-gray-200 placeholder:text-gray-300 outline-none focus:border-primary focus:bg-primary/15 sm:text-sm/6"
            type="text"
            placeholder="Phone number"
            name="phone"
            required
          />
          <input
            data-aos="fade-up"
            data-aos-easing="ease"
            data-aos-delay={250}
            className="w-[48%] transition-all bg-white/15 border-2 border-white/80 block min-w-0 grow py-3 px-4 rounded-full text-base text-gray-200 placeholder:text-gray-300 outline-none focus:border-primary focus:bg-primary/15 sm:text-sm/6"
            type="text"
            placeholder="Subject"
            name="subject"
          />
        </div>
        <textarea
          data-aos="fade-up"
          data-aos-easing="ease"
          data-aos-delay={300}
          name="massege"
          rows="10"
          placeholder="Your massege Here..."
          required
          className="w-full min-h-[150px] transition-all bg-white/15 border-2 border-white/80 block min-w-0 grow py-3 px-4 rounded-4xl text-base text-gray-200 placeholder:text-gray-300 outline-none focus:border-primary focus:bg-primary/15 sm:text-sm/6"
        ></textarea>
        <div className="w-full flex items-center justify-center flex-row flex-wrap gap-5">
          <button
            type="submit"
            data-aos="fade-right"
            data-aos-easing="ease"
            data-aos-delay={310}
            className="px-4 py-2 w-full md:w-[48%] rounded-full bg-primary/50 border-2 border-primary text-base text-white transition-colors hover:bg-primary cursor-pointer"
          >
            Send Massege
          </button>
          <button
            data-aos="fade-left"
            data-aos-easing="ease"
            data-aos-delay={310}
            type="reset"
            className="px-4 py-2 w-full md:w-[48%] rounded-full bg-white/15 border-2 border-wibg-white text-base text-white transition-colors hover:bg-red-500/90 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
