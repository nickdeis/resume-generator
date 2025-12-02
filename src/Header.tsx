export function Header() {
  "use memo";
  return (
    <>
      <div className="flex flex-row content-center items-center">
        <span
          className="gray-900 max-sm:text-2xl text-[32px] pr-3"
          style={{ fontWeight: 300 }}
        >
          <span>Nick Deis</span>
        </span>

        <span className="relative top-[3px] font-light max-sm:text-base text-lg flex flex-row items-center">
          <a className="text-blue-500" href="tel:6143153681">
            614.315.3681
          </a>
          <span className="px-1">|</span>
          <a className="text-blue-500" href="mailto:nickjdeis@gmail.com">
            nickjdeis@gmail.com
          </a>
        </span>
      </div>
      <hr
        className="mt-0 border-t-[3px]"
        style={{ borderTopColor: "#6c757d" }}
      />
    </>
  );
}
