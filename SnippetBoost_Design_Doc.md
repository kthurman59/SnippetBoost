# SnippetBoost Design Document

## **1. Overview**
**SnippetBoost** is a VS Code extension that allows developers to save, organize, and quickly insert code snippets. The goal is to provide a seamless workflow for managing reusable code across different projects.

## **2. Features (MVP Scope)**
1. **Snippet Storage** – Save snippets locally using JSON or SQLite.
2. **Quick Insert** – Insert snippets into files using commands or right-click.
3. **Search & Filter** – Locate snippets based on tags, names, or languages.
4. **UI Panel** – A sidebar to manage and categorize snippets.
5. **Keyboard Shortcuts** – Assignable commands for efficiency.

## **3. Architecture**
### **3.1 Technology Stack**
- **TypeScript** – Core development language.
- **VS Code API** – Used for UI components, commands, and storage.
- **SQLite or JSON** – Local snippet storage.
- **Webpack** – Bundling and extension packaging.

### **3.2 Component Breakdown**
- **Storage Manager** – Handles saving, loading, and deleting snippets.
- **Command Handlers** – Executes user actions (e.g., insert snippet, open panel).
- **UI Panel** – Displays saved snippets and allows interaction.
- **Keybinding Manager** – Registers shortcuts for quick snippet insertion.

## **4. Data Model**
```json
{
  "snippets": [
    {
      "id": "uuid",
      "title": "Fetch API Request",
      "language": "JavaScript",
      "content": "fetch('url').then(res => res.json());",
      "tags": ["api", "fetch"],
      "created_at": "2025-02-03T12:00:00Z"
    }
  ]
}
```

## **5. User Workflow**
1. **Save a Snippet** – User highlights code, runs `Save Snippet`, enters metadata.
2. **Search for a Snippet** – Open panel, search by tag or keyword.
3. **Insert a Snippet** – User selects snippet from panel or types shortcut.
4. **Manage Snippets** – Delete or edit stored snippets from UI panel.

## **6. Development Roadmap**
### **Phase 1: Core Features**
- [ ] Implement storage system (JSON/SQLite)
- [ ] Create command handlers
- [ ] Develop UI panel for snippet management

### **Phase 2: Enhancements**
- [ ] Add cloud sync support
- [ ] Improve search capabilities with fuzzy matching
- [ ] Implement multi-device synchronization

## **7. Testing Plan**
- Unit tests for snippet storage and retrieval
- Integration tests for UI panel
- Manual testing for usability

## **8. Deployment & Maintenance**
- Package and publish to the VS Code Marketplace
- Collect user feedback and iterate on features
- Provide documentation for new users

---
### **Next Steps:**
- Set up the project structure
- Begin implementation of storage system


