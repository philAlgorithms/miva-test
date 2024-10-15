export async function customFetch(url: string, init?: any) {
  const res = await fetch(url, init);

  if (!res.ok) {
    console.log(res.statusText);
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
