export interface LoadingProps {
  tip: string;
  size: SizeEnum;
  absolute: boolean;
  loading: boolean;
  background: string;
  theme: "dark" | "light";
}
export enum SizeEnum {
  DEFAULT = "default",
  SMALL = "small",
  LARGE = "large"
}
