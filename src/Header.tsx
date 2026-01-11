import clsx from "clsx";
import { Link } from "./Link";
import { ResumeConfig } from "./types";
type HeaderProps = {
  links: ResumeConfig["links"];
};

export function Header({ links }: HeaderProps) {
  "use memo";
  return (
    <div className="top-0 sticky bg-white z-1 not-print:pt-4">
      <div className="flex flex-row content-center items-center">
        <span className="gray-900 max-header:text-2xl text-[30px] pr-2 font-light">
          <span>Nick Deis</span>
        </span>

        <span className="relative top-[1px] max-header:text-base   space-x-[2px] font-light  text-[18px] flex flex-row items-center">
          <a target="_blank" href="sms:6143153681">
            <span className="max-links:hidden">614.315.3681</span>
            <span className="min-links:hidden">Text</span>
          </a>
          <span>|</span>
          <a target="_blank" href="mailto:nickjdeis@gmail.com">
            <span className="max-links:hidden">nickjdeis@gmail.com</span>
            <span className="min-links:hidden">Email</span>
          </a>
          <span className="not-print:hidden">|</span>
          <a
            target="_blank"
            className="not-print:hidden"
            href="https://nickdeis.com"
          >
            <span>nickdeis.com</span>
          </a>
          <span>|</span>
          <a target="_blank" href="https://github.com/nickdeis">
            <span>Github</span>
          </a>
          <span>|</span>
          <a target="_blank" href="https://github.com/nickdeis">
            <span>LinkedIn</span>
          </a>
        </span>
      </div>
      <hr className="mt-0 border-t-[4px] border-t-std-gray" />
    </div>
  );
}
