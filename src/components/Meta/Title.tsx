import Head from "next/head";

export default function Header({
  title,
  image,
  link,
  contents,
}: {
  title: string;
  image?: string;
  link?: string;
  contents?: string;
}) {
  const picture = image ? image : "/assets/images/base/Logo.png";
  const description = contents ? contents : `${process.env.NEXT_PUBLIC_NAME}`;
  const url = link ? link : `${process.env.NEXT_PUBLIC_URL}`;
  return (
    <>
      <Head>
        <title key="title">{`${title} - ${process.env.NEXT_PUBLIC_NAME}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <meta property="og:image" content={picture} />
      <meta property="og:image:secure_url" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_NAME} />
    </>
  );
}
