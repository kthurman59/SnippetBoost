import * as vscode from 'vscode';
import { SnippetStorageManager } from './storage/SnippetStorageManager';
import { Snippet } from './models/Snippet';
import { v4 as uuidv4 } from 'uuid';  // For unique ID generation

const snippetStorageManager = new SnippetStorageManager();

export function activate(context: vscode.ExtensionContext) {
    console.log('SnippetBoost extension is now active.');

    // Command to add a snippet from the selected text
    let addSnippetCommand = vscode.commands.registerCommand('snippetBoost.addSnippet', async () => {
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

        const title = await vscode.window.showInputBox({ prompt: 'Enter snippet title' });
        if (!title) return;

        const language = editor.document.languageId;

        const newSnippet: Snippet = {
            id: uuidv4(),
            title,
            language,
            content: selectedText,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        snippetStorageManager.addSnippet(newSnippet);
        vscode.window.showInformationMessage(`Snippet "${title}" saved.`);
    });

    // Command to retrieve all snippets for a language
    let listSnippetsCommand = vscode.commands.registerCommand('snippetBoost.listSnippets', async () => {
        const language = await vscode.window.showQuickPick(
            [...new Set(snippetStorageManager.getAllSnippets().map(snippet => snippet.language))],
            { placeHolder: 'Select a language to filter snippets' }
        );

        if (!language) return;

        const snippets = snippetStorageManager.getAllSnippets(language);
        if (snippets.length === 0) {
            vscode.window.showInformationMessage(`No snippets found for ${language}.`);
            return;
        }

        const selectedSnippet = await vscode.window.showQuickPick(
            snippets.map(snippet => snippet.title),
            { placeHolder: 'Select a snippet to copy to clipboard' }
        );

        if (!selectedSnippet) return;

        const snippet = snippets.find(snippet => snippet.title === selectedSnippet);
        if (snippet) {
            vscode.env.clipboard.writeText(snippet.content);
            vscode.window.showInformationMessage(`Snippet "${snippet.title}" copied to clipboard.`);
        }
    });

    context.subscriptions.push(addSnippetCommand, listSnippetsCommand);
}

export function deactivate() {
    console.log('SnippetBoost extension deactivated.');
}

