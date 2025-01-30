import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const apiResponse = await fetch("/api/whatever");
  const data = apiResponse.json();

  // api/whatever
  // {}
};

export default Page;
