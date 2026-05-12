export const SectionWrapper = ({ children }) => {
  return (
    <section className="grow mx-auto grid place-items-center w-full py-1 px-3 lg:text-2xl lg:w-5xl lg:py-2.5">
      <div className="flex flex-col items-center justify-center gap-8">
        {children}
      </div>
    </section>
  );
};
