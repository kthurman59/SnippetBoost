// src/extension.ts 

import { SnippetStorageManager } from './storage/SnippetStorageManager';
import { Snippet } from './models/Snippet';
import { v4 as uuidv4 } from 'uuid'; // For unique ID generation

// Initialize the storage manager (optionally passing a custom storage directory)
const snippetStorage = new SnippetStorageManager();

// Create a new snippet
const newSnippet: Snippet = {
    id: uuidv4(),
    title: 'Example Snippet',
    language: 'typescript',
    content: 'console.log("Hello, World!");',
    createdAt: 0, // Will be set inside addSnippet
    updatedAt: 0  // Will be set inside addSnippet
};

// Add the snippet
snippetStorage.addSnippet(newSnippet);
console.log('Snippet added!');

// Retreive and display the snippet
const retrievedSnippet = snippetStorage.getSnippetById(newSnippet.id);
console.log('Retrieved Snippet:', retrievedSnippet);

// Update the snippet
snippetStorage.updateSnippet(newSnippet.id, { content: 'console.log("Updated Content);' });
console.log('Snippet updated!');

// Delete the snippet
snippetStorage.deleteSnippet(newSnippet.id)
console.log('Snippet deleted!');
