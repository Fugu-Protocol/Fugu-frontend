"use client";

import React, { useState } from "react";
import {
    Heart,
    MoreHorizontal,
    ChevronDown,
    Flag,
} from "lucide-react";

interface Comment {
    id: string;
    user: {
        name: string;
        avatarUrl?: string;
        color?: string; // for gradient avatars
        position?: {
            type: "Yes" | "No";
            amount: string;
        };
    };
    timeAgo: string;
    text: string;
    likes: number;
    isLiked?: boolean;
    replies?: Comment[];
}

const INITIAL_COMMENTS: Comment[] = [
    {
        id: "c1",
        user: {
            name: "yowwy",
            color: "bg-gradient-to-tr from-violet-500 to-fuchsia-500",
        },
        timeAgo: "51m ago",
        text: "Anybody can tip me $1 please so I can withdraw it to my Crypto Wallet? I'm trying to deposit money but i need to have some ETH for gas fees so I can withdraw the funds from Phantom to Polymarket. It's mean a lot to me I'll tip you $2 back, just reply to my comment and you'll see a tip",
        likes: 0,
        isLiked: false,
        replies: [
            {
                id: "r1",
                user: {
                    name: "GoNoGo",
                    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=GoNoGo",
                    position: { type: "Yes", amount: "1.6K" },
                },
                timeAgo: "45m ago",
                text: "@yowwy Report 👆",
                likes: 0,
                isLiked: false,
            },
        ],
    },
    {
        id: "c2",
        user: {
            name: "MEPP",
            avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=MEPP",
            position: { type: "No", amount: "5.1K" },
        },
        timeAgo: "2h ago",
        text: "who else like the odds? https://x.com/MEPPOnPM/status/2011661155245461569",
        likes: 0,
        isLiked: false,
    },
    {
        id: "c3",
        user: {
            name: "Lordpoor",
            avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Lordpoor",
        },
        timeAgo: "2h ago",
        text: "does anyonne have a spare dollars",
        likes: 0,
        isLiked: false,
    },
];

const CommentsSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Comments");
    const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");

    const handlePostComment = () => {
        if (!newComment.trim()) return;

        const newCommentObj: Comment = {
            id: `new_${Date.now()}`,
            user: {
                name: "You",
                color: "bg-gradient-to-r from-cyan-500 to-blue-500",
            },
            timeAgo: "Just now",
            text: newComment,
            likes: 0,
            isLiked: false,
            replies: []
        };

        setComments([newCommentObj, ...comments]);
        setNewComment("");
    };

    const toggleLike = (commentId: string) => {
        const updateLikes = (list: Comment[]): Comment[] => {
            return list.map(comment => {
                if (comment.id === commentId) {
                    const isLiked = comment.isLiked;
                    return {
                        ...comment,
                        likes: isLiked ? comment.likes - 1 : comment.likes + 1,
                        isLiked: !isLiked
                    };
                }
                if (comment.replies) {
                    return { ...comment, replies: updateLikes(comment.replies) };
                }
                return comment;
            });
        };
        setComments(updateLikes(comments));
    };

    const handleReplySubmit = (parentId: string) => {
        if (!replyText.trim()) return;

        const newReply: Comment = {
            id: `reply_${Date.now()}`,
            user: {
                name: "You",
                color: "bg-gradient-to-r from-cyan-500 to-blue-500",
            },
            timeAgo: "Just now",
            text: replyText,
            likes: 0,
            isLiked: false
        };

        const addReply = (list: Comment[]): Comment[] => {
            return list.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        replies: comment.replies ? [...comment.replies, newReply] : [newReply]
                    };
                }
                if (comment.replies) {
                    return { ...comment, replies: addReply(comment.replies) };
                }
                return comment;
            });
        };

        setComments(addReply(comments));
        setReplyingTo(null);
        setReplyText("");
    };

    return (
        <div className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {/* Tabs */}
            <div className="flex border-b-2 border-black overflow-x-auto no-scrollbar">
                {[`Comments (${comments.length})`].map((tab) => {
                    const isActive = activeTab === tab.split(" ")[0];
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.split(" ")[0])}
                            className={`
                whitespace-nowrap px-6 py-4 font-black text-sm uppercase tracking-wide transition-all relative
                ${isActive
                                    ? "bg-white text-black"
                                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border-r-2 border-black"
                                }
              `}
                        >
                            {tab}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="p-6">
                {/* Input Area */}
                <div className="mb-8">
                    <div className="relative">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full h-28 p-4 bg-slate-50 border-2 border-black rounded-xl resize-none focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-slate-400 font-medium text-sm"
                        />
                        <div className="absolute bottom-3 right-3">
                            <button
                                onClick={handlePostComment}
                                disabled={!newComment.trim()}
                                className="bg-blue-600 text-white font-black px-5 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter / Sort bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronDown size={14} strokeWidth={3} />
                            </div>
                            <select className="appearance-none bg-white border-2 border-black rounded-lg py-1.5 pl-3 pr-8 font-black text-sm cursor-pointer hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] transition-all">
                                <option>Newest</option>
                                <option>Top</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-300">
                        <Flag size={12} strokeWidth={3} />
                        Beware of external links
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-8">
                    {comments.map((comment) => (
                        <div key={comment.id} className="group">
                            <div className="flex gap-4">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    {comment.user.avatarUrl ? (
                                        <img
                                            src={comment.user.avatarUrl}
                                            alt={comment.user.name}
                                            className="w-10 h-10 rounded-full border-2 border-black bg-slate-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                        />
                                    ) : (
                                        <div
                                            className={`w-10 h-10 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${comment.user.color || "bg-slate-300"}`}
                                        ></div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center flex-wrap gap-2 mb-1.5">
                                        <span className="font-black text-black">
                                            {comment.user.name}
                                        </span>
                                        {comment.user.position && (
                                            <span
                                                className={`text-[10px] font-black px-1.5 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${comment.user.position.type === "Yes"
                                                    ? "bg-emerald-300 text-black"
                                                    : "bg-rose-300 text-black"
                                                    }`}
                                            >
                                                {comment.user.position.amount}{" "}
                                                {comment.user.position.type}
                                            </span>
                                        )}
                                        <span className="text-xs font-bold text-slate-400 ml-1">
                                            {comment.timeAgo}
                                        </span>
                                    </div>

                                    <p className="text-slate-800 font-medium leading-relaxed text-sm mb-3">
                                        {comment.text}
                                    </p>

                                    <div className="flex items-center gap-5">
                                        <button
                                            onClick={() => toggleLike(comment.id)}
                                            className={`flex items-center gap-1.5 transition-colors group/like ${comment.isLiked ? "text-rose-500" : "text-slate-400 hover:text-rose-500"}`}
                                        >
                                            <Heart
                                                size={16}
                                                strokeWidth={3}
                                                className={comment.isLiked ? "fill-rose-500" : "group-hover/like:fill-rose-500"}
                                            />
                                            <span className="text-xs font-bold">{comment.likes}</span>
                                        </button>
                                        <button
                                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                            className="text-xs font-bold text-slate-400 hover:text-black flex items-center gap-1"
                                        >
                                            Reply
                                        </button>
                                        <button className="ml-auto text-slate-300 hover:text-black">
                                            <MoreHorizontal size={16} strokeWidth={3} />
                                        </button>
                                    </div>

                                    {/* Reply Input */}
                                    {replyingTo === comment.id && (
                                        <div className="mt-4 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <textarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder={`Reply to ${comment.user.name}...`}
                                                className="flex-1 p-3 bg-slate-50 border-2 border-black rounded-xl resize-none focus:outline-none focus:bg-white transition-all text-sm h-20"
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => handleReplySubmit(comment.id)}
                                                className="bg-black text-white px-4 rounded-lg font-bold text-xs h-10 self-end hover:bg-slate-800 transition-colors"
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    )}

                                    {/* Nested Replies */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="mt-5 pl-5 border-l-4 border-slate-200 space-y-5">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="flex gap-3">
                                                    <div className="flex-shrink-0">
                                                        {reply.user.avatarUrl ? (
                                                            <img
                                                                src={reply.user.avatarUrl}
                                                                alt={reply.user.name}
                                                                className="w-8 h-8 rounded-full border-2 border-black bg-slate-100 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                                            />
                                                        ) : (
                                                            <div
                                                                className={`w-8 h-8 rounded-full border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${reply.user.color || "bg-slate-300"}`}
                                                            ></div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center flex-wrap gap-2 mb-1">
                                                            <span className="font-black text-black text-sm">
                                                                {reply.user.name}
                                                            </span>
                                                            {reply.user.position && (
                                                                <span
                                                                    className={`text-[10px] font-black px-1.5 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${reply.user.position.type === "Yes"
                                                                        ? "bg-emerald-300 text-black"
                                                                        : "bg-rose-300 text-black"
                                                                        }`}
                                                                >
                                                                    {reply.user.position.amount}{" "}
                                                                    {reply.user.position.type}
                                                                </span>
                                                            )}
                                                            <span className="text-xs font-bold text-slate-400 ml-1">
                                                                {reply.timeAgo}
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-800 font-medium leading-relaxed text-sm mb-2">
                                                            {reply.text.startsWith("@") ? (
                                                                <>
                                                                    <span className="text-blue-600 font-bold bg-blue-50 px-1 rounded">
                                                                        {reply.text.split(" ")[0]}
                                                                    </span>{" "}
                                                                    {reply.text.substring(
                                                                        reply.text.indexOf(" ") + 1
                                                                    )}
                                                                </>
                                                            ) : (
                                                                reply.text
                                                            )}
                                                        </p>
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={() => toggleLike(reply.id)}
                                                                className={`flex items-center gap-1.5 transition-colors group/like ${reply.isLiked ? "text-rose-500" : "text-slate-400 hover:text-rose-500"}`}
                                                            >
                                                                <Heart
                                                                    size={14}
                                                                    strokeWidth={3}
                                                                    className={reply.isLiked ? "fill-rose-500" : "group-hover/like:fill-rose-500"}
                                                                />
                                                                <span className="text-xs font-bold">
                                                                    {reply.likes}
                                                                </span>
                                                            </button>
                                                            <button className="ml-auto text-slate-300 hover:text-black">
                                                                <MoreHorizontal size={14} strokeWidth={3} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="mt-10 text-center">
                    <button className="bg-white hover:bg-slate-50 text-black font-black py-2.5 px-6 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 mx-auto text-sm">
                        Show more comments
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentsSection;
