import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx and tailwind-merge for optimal class merging.
 * @param inputs - Class names or conditional class values.
 * @returns A single string with merged class names.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export function getPlainText(node: any): string {
  if (node.type === "text") return node.attributes.content;
  if (node.children) {
    return node.children.map(getPlainText).join(" ");
  }
  return "";
}
