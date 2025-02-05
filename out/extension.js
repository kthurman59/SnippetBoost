"use strict";
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
const vscode = require("vscode");
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
//# sourceMappingURL=extension.js.map