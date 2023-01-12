export function classNames(...classes: Array<string | null>) {
  return classes.filter(Boolean).join(" ");
}
