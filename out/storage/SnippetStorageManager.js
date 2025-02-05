"use strict";
// src/storage/SnippetStorageManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnippetStorageManager = void 0;
const fs = require("fs");
const path = require("path");
class SnippetStorageManager {
    constructor(storageDir) {
        // Determine the storage directory; default to a "data" folder in the project root.
        const dir = storageDir || path.join(__dirname, '..', '..', 'data');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        this.filePath = path.join(dir, 'snippets.json');
        this.snippets = this.loadSnippets();
    }
    // Load snippets from the JSON file
    loadSnippets() {
        try {
            if (fs.existsSync(this.filePath)) {
                const fileContent = fs.readFileSync(this.filePath, 'utf-8');
                return JSON.parse(fileContent);
            }
            return [];
        }
        catch (error) {
            console.error('Error loading snippets:', error);
            return [];
        }
    }
    // Save snippets to the JSON file
    saveSnippets() {
        try {
            console.log("Saving snippets to:", this.filePath);
            fs.writeFileSync(this.filePath, JSON.stringify(this.snippets, null, 2), "utf-8");
            console.log("Snippets saved successfully!");
        }
        catch (error) {
            console.error("Error saving snippets:", error);
        }
    }
    // Add a new snippet
    addSnippet(snippet) {
        const now = Date.now();
        snippet.createdAt = now;
        snippet.updatedAt = now;
        console.log('Adding snippet:', snippet);
        this.snippets.push(snippet);
        this.saveSnippets();
    }
    // Retrieve a snippet by ID
    getSnippetById(id) {
        console.log('Retrieving snippet with ID:', id);
        return this.snippets.find(snippet => snippet.id === id);
    }
    // Retrieve all snippets, optionally filtered by language
    getAllSnippets(language) {
        if (language) {
            return this.snippets.filter(snippet => snippet.language === language);
        }
        return this.snippets;
    }
    // Update an existing snippet
    updateSnippet(id, updatedData) {
        const snippetIndex = this.snippets.findIndex(snippet => snippet.id === id);
        if (snippetIndex === -1) {
            return false;
        }
        const snippet = this.snippets[snippetIndex];
        this.snippets[snippetIndex] = Object.assign(Object.assign(Object.assign({}, snippet), updatedData), { updatedAt: Date.now() });
        this.saveSnippets();
        return true;
    }
    // Delete a snippet by ID
    deleteSnippet(id) {
        const initialLength = this.snippets.length;
        this.snippets = this.snippets.filter(snippet => snippet.id !== id);
        if (this.snippets.length < initialLength) {
            this.saveSnippets();
            return true;
        }
        return false;
    }
}
exports.SnippetStorageManager = SnippetStorageManager;
//# sourceMappingURL=SnippetStorageManager.js.map