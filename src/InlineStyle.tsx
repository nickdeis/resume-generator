import { memo, type HTMLAttributes } from "react";

type InlineStyleProps = HTMLAttributes<HTMLStyleElement> & { content: string };
export const InlineStyle = memo(({ content, ...restOf }: InlineStyleProps) => {
  return (
    <style {...restOf} dangerouslySetInnerHTML={{ __html: content }}></style>
  );
});
