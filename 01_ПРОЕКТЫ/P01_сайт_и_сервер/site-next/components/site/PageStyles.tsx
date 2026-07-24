type PageStylesProps = {
  stylesheets: string[];
};

export default function PageStyles({ stylesheets }: PageStylesProps) {
  return (
    <>
      {stylesheets.map((href, index) =>
        index < 2 ? (
          <link key={href} rel="preload" href={href} as="style" />
        ) : null
      )}
      {stylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
