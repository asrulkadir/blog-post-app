export const truncateText = (title: string, maxLength: number): string => {
  return title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;
};
