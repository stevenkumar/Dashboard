import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, User, BookOpen, MessageSquare, Clock, Trash2, CheckCircle2 } from 'lucide-react';

const InquiryList = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/inquiry');
            setInquiries(res.data);
        } catch (err) {
            console.error('Error fetching inquiries:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return (
        <div className="space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-[#0a0a0a] border border-[#222] rounded-xl animate-pulse"></div>
            ))}
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Recent Submissions</span>
                <button onClick={fetchInquiries} className="text-[10px] text-primary hover:underline">Refresh</button>
            </div>

            {inquiries.length === 0 ? (
                <div className="p-12 border border-dashed border-[#222] rounded-2xl flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-gray-600">
                        <MessageSquare size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">No inquiries yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="bg-[#1a1a1a] rounded-xl border border-[#222] p-4 space-y-3 hover:border-primary/50 transition-colors group relative">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-primary/10 text-primary rounded-md">
                                        <User size={12} />
                                    </div>
                                    <span className="text-xs font-bold text-white">{inquiry.fullName}</span>
                                </div>
                                <span className="text-[9px] text-gray-500 font-bold">{formatDate(inquiry.createdAt)}</span>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-400 font-bold flex items-center gap-2">
                                    <BookOpen size={10} className="text-primary" /> {inquiry.subject}
                                </p>
                                <p className="text-[11px] text-gray-300 leading-relaxed bg-[#0a0a0a] p-2 rounded-lg border border-[#222]/50 italic">
                                    "{inquiry.message}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                    <Mail size={10} />
                                    <span>{inquiry.email}</span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:bg-[#222] rounded text-gray-500" title="Mark as Read">
                                        <CheckCircle2 size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InquiryList;
