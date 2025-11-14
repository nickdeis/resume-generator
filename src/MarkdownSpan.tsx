import { marked } from "marked";
import { memo, PropsWithChildren } from "react";
export type MarkdownSpanProps = PropsWithChildren<{}>;
const MarkdownSpan = memo(({ children }: MarkdownSpanProps) => {
  "use memo";
  if (typeof children === "string") {
    return (
      <span
        className="md-span"
        dangerouslySetInnerHTML={{
          __html: marked(children, { async: false }),
        }}
      ></span>
    );
  } else {
    return <>{children}</>;
  }
});

export default MarkdownSpan;
