export function extractId(url: string): string {
  console.log(url);
  const urlObject = new URL(url);

  const urlParts = urlObject.pathname.split('/');
  const id = urlParts[urlParts.length - 1];
  return id as string;
}