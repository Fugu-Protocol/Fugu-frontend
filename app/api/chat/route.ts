import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { loadDocuments, searchDocuments, extractRelevantSections, Document } from '@/lib/chat/knowledge-base';
import { filterQuestion, generateFilterResponse } from '@/lib/chat/question-filter';

// Types
interface Message {
    role: 'user' | 'assistant' | 'system';
    content?: string;
    text?: string;
    parts?: { text: string }[];
}

interface UserContext {
    walletAddress?: string | null;
    balance?: number;
    activePredictions?: any[];
    userPreferences?: {
        language?: string;
        riskLevel?: string;
    };
}

interface ChatRequest {
    messages: Message[];
    userContext?: UserContext;
    timestamp?: string;
}

// System Prompt
const SYSTEM_PROMPT = `You are a professional AI assistant for Fugu Protocol (Fugu Prediction Market).

## ROLE:
- If information is not found in the documentation, USE YOUR OWN KNOWLEDGE to answer
  (especially related to prediction market)

## CAPABILITIES & DATA:
1. 💰 Guide users on deposit and withdrawal processes (Transak, Banxa)
2. 🎯 Explain how to participate in predictions on Fugu
3. 📊 Analyze crypto markets and price action
4. 📚 Provide information about Fugu Protocol and the Sui Blockchain

## RULES:
- Prioritize questions related to Fugu Protocol and Prediction Markets
- REJECT questions that are completely unrelated
  (e.g. weather, cooking, non-economic politics, etc.)`;

// Initialize documents
let documents: Document[] = [];
let openai: OpenAI | null = null;

function initializeService() {
    if (documents.length === 0) {
        console.log('📚 Loading knowledge base...');
        documents = loadDocuments();
        console.log(`✅ Loaded ${documents.length} documents`);
    }

    if (!openai && process.env.OPENROUTER_API_KEY) {
        openai = new OpenAI({
            apiKey: process.env.OPENROUTER_API_KEY,
            baseURL: 'https://openrouter.ai/api/v1',
            defaultHeaders: {
                'HTTP-Referer': 'https://fugu-protocol.com',
                'X-Title': 'Fugu Prediction Chatbot',
            }
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        initializeService();

        const body: ChatRequest = await request.json();
        const { messages, userContext } = body;

        console.log(`📥 Received messages: ${messages?.length}`);

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Messages array is required' },
                { status: 400 }
            );
        }

        // Format messages
        const formattedMessages = messages
            .filter((msg) => msg && (msg.role === 'user' || msg.role === 'assistant'))
            .map((msg) => {
                let content = '';
                if (typeof msg.content === 'string') {
                    content = msg.content;
                } else if (msg.text) {
                    content = msg.text;
                } else if (msg.parts && Array.isArray(msg.parts)) {
                    content = msg.parts[0]?.text || '';
                }
                return {
                    role: msg.role as 'user' | 'assistant',
                    content: content.trim()
                };
            })
            .filter((msg) => msg.content.length > 0);

        if (formattedMessages.length === 0) {
            return NextResponse.json(
                { error: 'No valid messages received' },
                { status: 400 }
            );
        }

        const lastUserMessage = formattedMessages[formattedMessages.length - 1].content;
        console.log(`🤖 Processing: ${lastUserMessage}`);

        // Step 1: Filter question
        const filterResult = filterQuestion(lastUserMessage);
        if (!filterResult.isValid) {
            console.log(`🚫 Question rejected: ${filterResult.reason}`);
            const rejectedResponse = generateFilterResponse(filterResult);

            // Stream the rejection response
            return streamResponse(rejectedResponse);
        }

        // Step 2: Search Knowledge Base
        const relevantDocs = searchDocuments(lastUserMessage, documents);
        console.log(`📖 Found ${relevantDocs.length} relevant documents`);

        let knowledgeContext = '';
        if (relevantDocs.length > 0) {
            knowledgeContext = '\n\n## REFERENCE DOCUMENTS:\n\n';
            relevantDocs.forEach(doc => {
                const section = extractRelevantSections(doc, 5000);
                knowledgeContext += section + '\n---\n';
            });
        }

        const systemMessage = `${SYSTEM_PROMPT}


${knowledgeContext}

## RESPONSE GUIDELINES:
- Question Category: ${filterResult.category}
  - **IGNORE** the "Language" field in USER INFORMATION if it conflicts with the detected language of the message.
- PRIORITY 1: Find the answer in "REFERENCE DOCUMENTS" above.
- PRIORITY 2: If the documentation is insufficient, use your general knowledge to provide the most accurate answer possible.
- PRIORITY 3: Rejected any question that is completely unrelated to Fugu Protocol or Prediction Markets.`;

        // Step 4: Call AI API or use fallback
        if (!openai) {
            console.log('⚠️ OpenRouter API key not configured, using knowledge base fallback');
            return createKnowledgeBasedResponse(lastUserMessage, documents, filterResult.category || 'general');
        }

        console.log('🚀 Calling AI via OpenRouter...');

        try {
            const chatCompletion = await openai.chat.completions.create({
                model: 'deepseek/deepseek-chat',
                messages: [
                    { role: 'system', content: systemMessage },
                    ...formattedMessages
                ],
                temperature: 0.7,
                stream: true,
            });

            // Create streaming response
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                async start(controller) {
                    try {
                        for await (const chunk of chatCompletion) {
                            const content = chunk.choices[0]?.delta?.content || '';
                            if (content) {
                                controller.enqueue(encoder.encode(content));
                            }
                        }
                    } catch (error) {
                        console.error('Stream error:', error);
                    } finally {
                        controller.close();
                    }
                },
            });

            return new Response(stream, {
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Transfer-Encoding': 'chunked',
                },
            });
        } catch (aiError) {
            console.error('OpenRouter AI call failed:', aiError);
            console.log('⚠️ Falling back to knowledge base response');
            return createKnowledgeBasedResponse(lastUserMessage, documents, filterResult.category || 'general');
        }

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Helper function to stream response
function streamResponse(text: string) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            const words = text.split(' ');
            for (const word of words) {
                controller.enqueue(encoder.encode(word + ' '));
                await new Promise(resolve => setTimeout(resolve, 15));
            }
            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
        },
    });
}

// Knowledge-based response - reads from loaded documents
function createKnowledgeBasedResponse(question: string, docs: Document[], category: string) {
    const lowerQuestion = question.toLowerCase();
    let responseText = '';

    // Get knowledge base content
    const knowledgeContent = docs.length > 0 ? docs[0].content : '';

    // Search for relevant Q&A in the knowledge base
    const findAnswer = (keywords: string[]): string | null => {
        for (const keyword of keywords) {
            // Find the question containing this keyword
            const regex = new RegExp(`\\*\\*Q:[^*]*${keyword}[^*]*\\*\\*[\\s\\S]*?(?=\\*\\*Q:|## |$)`, 'gi');
            const match = knowledgeContent.match(regex);
            if (match && match[0]) {
                return match[0].trim();
            }
        }
        return null;
    };

    // Check for greeting first
    if (/^(hi|hello|xin chào|chào|hey|hola)/i.test(question.trim())) {
        responseText = `## 👋 Xin chào!

Mình là **Fugu AI** - trợ lý thông minh của nền tảng Fugu Prediction Market! 🐠

Mình có thể giúp bạn với các câu hỏi về:
- 💰 Nạp tiền / Rút tiền (Deposit / Withdraw)
- 🎯 Cách tham gia dự đoán (YES/NO shares)
- 📊 Trading & Positions
- 🏆 Resolution & Rewards
- 🔒 Fees & Security
- ⛓️ Sui Blockchain & USDC

Hãy hỏi mình bất cứ điều gì về Fugu Protocol! 😊`;
    }
    // Deposit questions
    else if (lowerQuestion.match(/deposit|nạp tiền|nạp|how.*deposit/)) {
        const answer = findAnswer(['deposit', 'nạp']);
        if (answer) {
            responseText = `## 💰 Hướng dẫn Nạp tiền\n\n${formatKnowledgeAnswer(answer)}`;
        } else {
            responseText = `## 💰 Cách nạp tiền vào Fugu

Click nút **"Deposit"** trên thanh navigation. Bạn có 2 lựa chọn:

1. **💳 Fiat (Card):** Mua USDC trực tiếp bằng thẻ Credit/Debit qua **Transak** hoặc **Banxa**.

2. **🔗 Crypto (On-Chain):** Gửi USDC (Sui native) từ ví cá nhân hoặc sàn giao dịch.

⚠️ **Lưu ý:** Chỉ hỗ trợ **Sui Network** và **USDC**. Phí: 0.1%`;
        }
    }
    // Withdraw questions
    else if (lowerQuestion.match(/withdraw|rút tiền|rút|how.*withdraw/)) {
        const answer = findAnswer(['withdraw', 'rút']);
        if (answer) {
            responseText = `## 💸 Hướng dẫn Rút tiền\n\n${formatKnowledgeAnswer(answer)}`;
        } else {
            responseText = `## 💸 Cách rút tiền từ Fugu

1. 👤 Vào trang **Profile**
2. 🔘 Click nút **"Withdraw"**
3. 📝 Nhập địa chỉ ví nhận (trên Sui Network)
4. 💰 Nhập số tiền muốn rút
5. ✅ Xác nhận giao dịch

⚠️ Phí rút: **0.1%** được trừ tự động`;
        }
    }
    // YES/NO shares questions
    else if (lowerQuestion.match(/yes|no|share|cổ phần|dự đoán|prediction|bet|cược/)) {
        const answer = findAnswer(['YES', 'NO', 'share']);
        if (answer) {
            responseText = `## 🎯 YES/NO Shares\n\n${formatKnowledgeAnswer(answer)}`;
        } else {
            responseText = `## 🎯 YES/NO Shares là gì?

- ✅ **YES Share:** Trả $1.00 USDC nếu sự kiện XẢY RA
- ❌ **NO Share:** Trả $1.00 USDC nếu sự kiện KHÔNG xảy ra

📈 Giá phản ánh xác suất thị trường ước tính:
- Giá YES = $0.60 → 60% khả năng xảy ra
- Giá NO = $0.40 → 40% khả năng không xảy ra

Bạn có thể bán shares trước khi market kết thúc để chốt lời hoặc cắt lỗ.`;
        }
    }
    // Trading questions
    else if (lowerQuestion.match(/buy|sell|mua|bán|trade|trading|price|giá/)) {
        const answer = findAnswer(['buy', 'sell', 'price', 'trading']);
        if (answer) {
            responseText = `## 📊 Trading\n\n${formatKnowledgeAnswer(answer)}`;
        } else {
            responseText = `## 📊 Trading trên Fugu

**Cách mua shares:**
1. 💳 Nạp USDC vào tài khoản
2. 🎯 Chọn market bạn muốn tham gia
3. ✅ Click "Buy YES" hoặc "Buy NO"

**Giá thay đổi như thế nào?**
- Giá được xác định bởi **AMM (Automated Market Maker)**
- Khi nhiều người mua YES → giá YES tăng, giá NO giảm
- Đảm bảo luôn có thanh khoản ngay lập tức`;
        }
    }
    // Reward/Resolution questions
    else if (lowerQuestion.match(/reward|thưởng|claim|redeem|win|thắng|resolution/)) {
        const answer = findAnswer(['reward', 'claim', 'redeem', 'resolution']);
        if (answer) {
            responseText = `## 🏆 Rewards & Resolution\n\n${formatKnowledgeAnswer(answer)}`;
        } else {
            responseText = `## 🏆 Claim Rewards

**Cách nhận thưởng:**
1. 👤 Vào trang **Profile**
2. 📋 Chọn tab **"History"** hoặc **"Winning Markets"**
3. 🎁 Tìm market đã resolved và click **"Redeem"**
4. 💰 Tiền thưởng sẽ được cộng vào balance ngay lập tức

**Resolution:** Sử dụng **Pyth Network** oracle để xác định kết quả trustlessly.`;
        }
    }
    // Fee questions
    else if (lowerQuestion.match(/fee|phí|cost|chi phí|safe|an toàn|security|bảo mật/)) {
        const answer = findAnswer(['fee', 'safe', 'security']);
        if (answer) {
            responseText = `## 🔒 Fees & Security\n\n${formatKnowledgeAnswer(answer)}`;
        } else {
            responseText = `## 🔒 Fees & Security

**Phí giao dịch:** 0.1% cho mua, bán và rút tiền

**Bảo mật:**
- 🔐 **Non-custodial** - Chúng tôi không giữ funds của bạn
- 💼 Assets nằm trong ví hoặc smart contract escrow
- 🔑 Chỉ bạn có quyền truy cập private keys`;
        }
    }
    // Blockchain/Sui questions
    else if (lowerQuestion.match(/sui|blockchain|network|usdc|token|crypto/)) {
        const answer = findAnswer(['Sui', 'blockchain', 'USDC']);
        if (answer) {
            responseText = `## ⛓️ Blockchain Info\n\n${formatKnowledgeAnswer(answer)}`;
        } else {
            responseText = `## ⛓️ Sui Blockchain

**Fugu chạy trên Sui Network:**
- 🌊 Chỉ hỗ trợ **Sui-native USDC**
- ⚡ Gas fee cực thấp
- 🚀 Giao dịch nhanh chóng

⚠️ **Lưu ý:** Gửi funds từ chain khác (Ethereum, Solana) mà không bridge có thể mất coins vĩnh viễn!

*🗺️ Roadmap: Multi-chain support (EVM, Aptos) coming late 2026*`;
        }
    }
    // Default - guide user to valid topics
    else {
        responseText = `## 🐠 Fugu AI

Mình có thể hỗ trợ bạn các câu hỏi về **Fugu Prediction Market**:

**📚 Các chủ đề hỗ trợ:**
- 💰 Nạp tiền / Rút tiền
- 🎯 Cách mua YES/NO shares
- 📊 Trading & Positions
- 🏆 Resolution & Rewards
- 🔒 Fees & Security
- ⛓️ Sui Blockchain & USDC

**💡 Ví dụ câu hỏi:**
- "How to deposit?"
- "What is YES/NO share?"
- "How to claim rewards?"

Hãy hỏi cụ thể hơn để mình hỗ trợ bạn! 🚀`;
    }

    return streamResponse(responseText);
}

// Format knowledge base answer for display
function formatKnowledgeAnswer(rawAnswer: string): string {
    // Clean up the raw answer from knowledge base
    let formatted = rawAnswer
        .replace(/\*\*Q:[^*]*\*\*/g, '') // Remove Q: header
        .replace(/\*\*A:\*\*/g, '') // Remove A: header
        .replace(/\r\n/g, '\n')
        .trim();

    return formatted;
}

export async function GET() {
    initializeService();

    return NextResponse.json({
        status: 'ok',
        message: 'Fugu AI Chat API is running',
        version: '2.0',
        documentsLoaded: documents.length,
        aiEnabled: !!openai,
        features: [
            'Knowledge Base Integration',
            'Question Filtering',
            'OpenRouter AI (DeepSeek)',
            'Streaming Responses',
            'Multi-language Support',
        ],
    });
}
