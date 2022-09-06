import { Bsod } from "@ringozz/react-noesis";

export const Error = Bsod;

export function ErrorHandler(error: Error, info: { componentStack: string }) {
  console.error(error);
}
