import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';
const NOTES_FILE = 'notes.json';
const readRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => resolve(body));
        req.on('error', reject);
    });
};
http.createServer(async (req, res) => {
    try {
        // Delete note
        if (req.method === 'POST' && req.url === '/api/deleteNote') {
            const body = await readRequestBody(req);
            // Parse request body
            let data;
            try {
                data = JSON.parse(body);
            }
            catch {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
            const { noteName } = data;
            if (!noteName) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Missing noteName' }));
            }
            // Read notes
            let notes = [];
            try {
                const fileContents = await fs.readFile(NOTES_FILE, 'utf-8');
                notes = JSON.parse(fileContents);
            }
            catch {
                // If the file doesn't exist or is empty, we can't delete a note
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Note not found' }));
            }
            // Find the Note
            const noteIndex = notes.findIndex((note) => note.name === noteName);
            if (noteIndex === -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: `Note ${noteName} not found` }));
            }
            // Delete the note
            notes.splice(noteIndex, 1);
            await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf-8');
            console.log(`Deleted note: ${noteName}`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: true,
                message: 'Note deleted successfully',
            }));
        }
        // Reset notes
        if (req.method === 'POST' && req.url === '/api/resetNotes') {
            await fs.unlink(NOTES_FILE);
            console.log('Reset notes');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end();
        }
        // Get note
        if (req.method === 'POST' && req.url === '/api/getNotes') {
            let fileContents;
            try {
                fileContents = await fs.readFile(NOTES_FILE, 'utf-8');
            }
            catch {
                // If the file doesn't exist
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'No notes found' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(fileContents);
        }
        // Create note
        if (req.method === 'POST' && req.url === '/api/createNote') {
            const body = await readRequestBody(req);
            let data;
            try {
                data = JSON.parse(body);
            }
            catch {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
            const { noteName, textContent } = data;
            if (!noteName || !textContent) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Missing required fields' }));
            }
            // Read existing notes
            let notes = [];
            try {
                const fileContents = await fs.readFile(NOTES_FILE, 'utf-8');
                notes = JSON.parse(fileContents);
            }
            catch {
                // In case file doesn't exist
                notes = [];
            }
            // Create the note
            const newNote = {
                name: noteName,
                content: textContent,
                createdAt: Date.now()
            };
            notes.push(newNote);
            // Write into file
            await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: true,
                message: 'Note created successfully',
                note: newNote,
            }));
        }
        // Fallback
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
    catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}).listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
