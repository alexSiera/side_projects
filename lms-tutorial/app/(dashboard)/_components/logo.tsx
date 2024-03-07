import Image from "next/image";

export const Logo = () => {
  return <Image alt="logo" width={130} height={130} src="/logo.svg" priority />;
};
