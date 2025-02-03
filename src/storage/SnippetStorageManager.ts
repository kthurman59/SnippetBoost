// src/storage/SnippetStorageManager.ts 

import * as fs from 'fs';
import * as path from 'path';
import { Snippet } from '../models/Snippet';

export class SnippetStorageManager {
    private filePath: string;
    private snippets: Snippet[];

    constructor(storageDir?: string) {
        // Determine the storage directory; default to a "dta" folder in the project root.
        const dir = storageDir || path.join(__dirname, '..', '..', 'data');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        this.filePath = path.join(dir, 'snippets.json');
        this.snippets = this.loadSnippets();
    }

    // Load snippets from the JSON file
    private loadSnippets(): Snippet[] {
        try {
            if (fs.existsSync(this.filePath)) {
                const fileContent = fs.readFileSync(this.filePath, 'utf-8');
                return JSON.parse(fileContent) as Snippet[];
            }
            return [];
        } catch (error) {
            console.error('Error loading snippets:', error);
            return [];
        }
    }

    // Save snippets to the JSON file
    
}
