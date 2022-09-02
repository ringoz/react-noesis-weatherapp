import { Bsod } from "@ringozz/react-noesis";

export const Error = Bsod;

export const ErrorHandler = (
  error: Error,
  info: { componentStack: string }
) => {
  console.error(error);
};
