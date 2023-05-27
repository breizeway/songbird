import { useTheme } from "@/hooks/use-theme";
import Image from "next/image";

export interface IIconProps {
  srcLight?: string;
  srcDark?: string;
  alt: string;
  className?: string;
}

export const Icon = ({
  alt,
  srcLight,
  srcDark,
  className,
}: IIconProps): JSX.Element => {
  const { isLight } = useTheme();
  const src = isLight ? srcLight || srcDark || "" : srcDark || srcLight || "";

  return <Image {...{ alt, className, src }} />;
};
