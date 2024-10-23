// Look inside of the text string for the coloredText prop text in that string
// and color that part of the text
export const highlightText = (
  text: string,
  searchText?: string,
  color?: string
) => {
  if (!searchText) return [text];
  const parts = text.split(new RegExp(`(${searchText})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === searchText.toLowerCase() ? (
      <span key={index} style={{ color }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};
