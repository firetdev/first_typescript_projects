type DeleteNoteResponse = {
  success: boolean;
  message: string;
};

const API_URL = 'http://localhost:8080/api/deleteNote';

export async function deleteNote(
  noteName: string
): Promise<DeleteNoteResponse> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      noteName
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to delete note (${response.status})`);
  }

  return (await response.json()) as DeleteNoteResponse;
}