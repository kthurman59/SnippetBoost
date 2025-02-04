"use strict";
// src/storage/SnippetStorageManager.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnippetStorageManager = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
        this.snippets.push(snippet);
        this.saveSnippets();
    }
    // Retrieve a snippet by ID
    getSnippetById(id) {
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
