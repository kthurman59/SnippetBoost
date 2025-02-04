// src/extension.ts

import { SnippetStorageManager } from './storage/SnippetStorageManager';
import { Snippet } from './models/Snippet';
import { v4 as uuidv4 } from 'uuid';  // For unique ID generation

// Initialize the storage manager (optionally passing a custom storage directory)
const snippetStorageManager = new SnippetStorageManager();

// Create a new snippet
const newSnippet: Snippet = {
  id: uuidv4(),
  title: 'Example Snippet',
  language: 'typescript',
  content: 'console.log("Hello, World!");',
  createdAt: 0,  // Will be set inside addSnippet
  updatedAt: 0   // Will be set inside addSnippet
};

// Add the snippet
snippetStorageManager.addSnippet({
  id: "test123",
  title: "Hello World",
  language: "javascript",
  content: "console.log('Hello, World!');",
  createdAt: 0,  // Will be set inside addSnippet()
  updatedAt: 0
});
console.log("Snippet added!");


// Retrieve and display the snippet
const retrievedSnippet = snippetStorageManager.getSnippetById(newSnippet.id);
console.log('Retrieved Snippet:', retrievedSnippet);

// Update the snippet
snippetStorageManager.updateSnippet(newSnippet.id, { content: 'console.log("Updated content");' });
console.log('Snippet updated!');

// Delete the snippet
snippetStorageManager.deleteSnippet(newSnippet.id);
console.log('Snippet deleted!');

