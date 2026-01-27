const API_URL = 'http://localhost:8080/api/resetNotes';
export async function resetNotes() {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to reset notes`);
    }
}
