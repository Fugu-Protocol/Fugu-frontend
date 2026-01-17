// Knowledge Base for Fugu AI Chatbot
import fs from 'fs';
import path from 'path';

export interface Document {
    title: string;
    content: string;
    category: string;
}

// Document files configuration
const DOC_FILES = [
    { file: 'HUONG_DAN_SU_DUNG_APP.txt', title: 'Hướng Dẫn Sử Dụng Fugu App', category: 'guide' },
    // Add more documents here as needed
];

// Load documents from public/knowledge folder
export function loadDocuments(): Document[] {
    const documents: Document[] = [];

    // In Next.js, we need to use process.cwd() to get the root directory
    const knowledgePath = path.join(process.cwd(), 'public', 'knowledge');

    for (const { file, title, category } of DOC_FILES) {
        try {
            const filePath = path.join(knowledgePath, file);

            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf-8');
                documents.push({
                    title,
                    content,
                    category,
                });
                console.log(`✅ Loaded knowledge: ${file}`);
            } else {
                console.warn(`⚠️ Knowledge file not found: ${filePath}`);
            }
        } catch (error) {
            console.warn(`⚠️ Could not load ${file}:`, error);
        }
    }

    return documents;
}

// Search documents (returns all for full context)
export function searchDocuments(query: string, documents: Document[]): Document[] {
    // Always return all documents to give AI full context
    return documents;
}

// Extract relevant sections with max length
export function extractRelevantSections(doc: Document, maxLength: number = 5000): string {
    const lines = doc.content.split('\n');
    let result = `## ${doc.title}\n\n`;
    let currentLength = result.length;

    for (const line of lines) {
        if (currentLength + line.length > maxLength) break;
        result += line + '\n';
        currentLength += line.length + 1;
    }

    return result;
}
