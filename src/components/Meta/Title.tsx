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
  const url = link ? link : `${process.env.PUBLIC_URL}`;
  return (
    <>
      <Head>
        <title key="title">{`${title} - ${process.env.PUBLIC_NAME}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <meta property="og:image" content={picture} />
      <meta property="og:image:secure_url" content={title} />
      <meta property="og:title" content='Magnesium' />
      <meta property="og:description" content='Magnesium is an organization committed to creating and hosting exciting events and tournaments for gamers of all levels. Join us to showcase your skills, build lasting connections, and be a part of our thriving gaming community.' />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={process.env.PUBLIC_NAME} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:site" content="@mgtourneybs" />
      <meta name="theme-color" content="#7B52A4" />
    </>
  );
}
