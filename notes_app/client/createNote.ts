type CreateNoteResponse = {
  success: boolean;
  message: string;
};

const API_URL = 'http://localhost:8080/api/createNote';

export async function createNote(
  noteName: string,
  textContent: string
): Promise<CreateNoteResponse> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      noteName,
      textContent,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create note (${response.status})`);
  }

  return (await response.json()) as CreateNoteResponse;
}