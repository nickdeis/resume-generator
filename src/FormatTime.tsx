export type FormatTimeProps = {
  start?: number;
  end?: number | "Present";
};

export function FormatTime({ start, end }: FormatTimeProps) {
  let result = "";
  if (start) result += start;
  if (end && start) {
    result += " – ";
  }
  if (end) {
    result += end;
  }
  return result;
}
