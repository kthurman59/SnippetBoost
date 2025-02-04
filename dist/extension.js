"use strict";
// src/extension.ts
Object.defineProperty(exports, "__esModule", { value: true });
const SnippetStorageManager_1 = require("./storage/SnippetStorageManager");
const uuid_1 = require("uuid"); // For unique ID generation
// Initialize the storage manager (optionally passing a custom storage directory)
const snippetStorage = new SnippetStorageManager_1.SnippetStorageManager();
// Create a new snippet
const newSnippet = {
    id: (0, uuid_1.v4)(),
    title: 'Example Snippet',
    language: 'typescript',
    content: 'console.log("Hello, World!");',
    createdAt: 0, // Will be set inside addSnippet
    updatedAt: 0 // Will be set inside addSnippet
};
// Add the snippet
snippetStorage.addSnippet(newSnippet);
console.log('Snippet added!');
// Retrieve and display the snippet
const retrievedSnippet = snippetStorage.getSnippetById(newSnippet.id);
console.log('Retrieved Snippet:', retrievedSnippet);
// Update the snippet
snippetStorage.updateSnippet(newSnippet.id, { content: 'console.log("Updated content");' });
console.log('Snippet updated!');
// Delete the snippet
snippetStorage.deleteSnippet(newSnippet.id);
console.log('Snippet deleted!');
