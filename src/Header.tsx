export function Header() {
  return (
    <>
      <div className="flex flex-row content-center items-center">
        <span
          className="gray-900"
          style={{ fontWeight: 300, fontSize: 32, paddingRight: 12 }}
        >
          <span>Nick Deis</span>
        </span>

        <span className="hyperlinks">
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
      <div
        className="flex flex-row items-center py-1"
        style={{ fontSize: 24 }}
      ></div>
    </>
  );
}
