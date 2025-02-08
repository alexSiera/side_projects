interface PageProps {
  params: {
    fileId: string;
  };
}

const Page = ({ params }: PageProps) => {
  // retrieve the file id
  const { fileId } = params;
  // make db call
  <div>{fileId}</div>;
};

export default Page;
