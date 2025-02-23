"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const SnippetStorageManager_1 = require("./storage/SnippetStorageManager");
const uuid_1 = require("uuid"); // For unique ID generation
const snippetStorageManager = new SnippetStorageManager_1.SnippetStorageManager();
function activate(context) {
    console.log('SnippetBoost extension is now active.');
    // Command to add a snippet from the selected text
    let addSnippetCommand = vscode.commands.registerCommand('snippetBoost.addSnippet', () => __awaiter(this, void 0, void 0, function* () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found.');
            return;
        }
        const selectedText = editor.document.getText(editor.selection);
        if (!selectedText) {
            vscode.window.showErrorMessage('No text selected to save as a snippet.');
            return;
        }
        const title = yield vscode.window.showInputBox({ prompt: 'Enter snippet title' });
        if (!title)
            return;
        const language = editor.document.languageId;
        const newSnippet = {
            id: (0, uuid_1.v4)(),
            title,
            language,
            content: selectedText,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        snippetStorageManager.addSnippet(newSnippet);
        vscode.window.showInformationMessage(`Snippet "${title}" saved.`);
    }));
    // Command to retrieve all snippets for a language
    let listSnippetsCommand = vscode.commands.registerCommand('snippetBoost.listSnippets', () => __awaiter(this, void 0, void 0, function* () {
        const language = yield vscode.window.showQuickPick([...new Set(snippetStorageManager.getAllSnippets().map(snippet => snippet.language))], { placeHolder: 'Select a language to filter snippets' });
        if (!language)
            return;
        const snippets = snippetStorageManager.getAllSnippets(language);
        if (snippets.length === 0) {
            vscode.window.showInformationMessage(`No snippets found for ${language}.`);
            return;
        }
        const selectedSnippet = yield vscode.window.showQuickPick(snippets.map(snippet => snippet.title), { placeHolder: 'Select a snippet to copy to clipboard' });
        if (!selectedSnippet)
            return;
        const snippet = snippets.find(snippet => snippet.title === selectedSnippet);
        if (snippet) {
            vscode.env.clipboard.writeText(snippet.content);
            vscode.window.showInformationMessage(`Snippet "${snippet.title}" copied to clipboard.`);
        }
    }));
    context.subscriptions.push(addSnippetCommand, listSnippetsCommand);
}
function deactivate() {
    console.log('SnippetBoost extension deactivated.');
}
