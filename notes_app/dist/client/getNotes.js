const API_URL = 'http://localhost:8080/api/getNotes';
export async function getNotes() {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.log('Error getting notes');
    }
    const data = (await response.json());
    return data;
}
