
"use client";

import React from "react";
import { Clock } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { PROFILE_MOCK_DATA } from "@/lib/constants";

/**
 * Mock Charts component for Profile Page
 * 
 * TODO: Replace with real Recharts implementation when data is available
 */
const ProfileCharts = () => {
    const [timeframe, setTimeframe] = React.useState<'1D' | '7D' | '30D' | 'ALL'>('1D');
    const { pnlHistory } = PROFILE_MOCK_DATA;
    const data = pnlHistory[timeframe];

    const currentPnl = data[data.length - 1].value;
    const isPositive = currentPnl >= 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* PNL Chart Area (Takes up 2/3 width) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] min-h-[350px] flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-sm font-bold text-gray-500 mb-1">PNL</p>
                        <h2 className={`text-3xl font-black ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                            {isPositive ? '+' : ''}${currentPnl.toLocaleString()}
                        </h2>
                    </div>

                    {/* Time Range Selector */}
                    <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                        {(['1D', '7D', '30D', 'ALL'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeframe(range)}
                                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${timeframe === range
                                    ? 'bg-black text-white shadow-sm'
                                    : 'text-gray-500 hover:text-black hover:bg-white/50'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recharts Implementation */}
                <div className="flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={isPositive ? "#16a34a" : "#ef4444"} stopOpacity={0.1} />
                                    <stop offset="95%" stopColor={isPositive ? "#16a34a" : "#ef4444"} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#6b7280' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#6b7280' }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-white border-2 border-black rounded-lg p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                                                <p className="font-bold text-sm mb-1">{payload[0].payload.fullDate || label}</p>
                                                <p className={`text-lg font-black ${String(payload[0].value).startsWith('-') ? 'text-red-500' : 'text-green-600'}`}>
                                                    ${Number(payload[0].value).toLocaleString()}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={isPositive ? "#16a34a" : "#ef4444"}
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorPnl)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Predictions Donut Chart (Takes up 1/3 width) */}
            <div className="bg-white rounded-2xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] min-h-[350px] flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                    <Clock size={16} className="text-gray-500" />
                    <h3 className="font-bold text-gray-500 text-sm">Predictions (12)</h3>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-48 h-48 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Won', value: 8, fill: '#22c55e' },
                                        { name: 'Lost', value: 4, fill: '#ef4444' },
                                    ]}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    <Cell key="cell-0" fill="#22c55e" />
                                    <Cell key="cell-1" fill="#ef4444" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                            <span className="text-3xl font-black text-gray-900">12</span>
                            <span className="text-xs font-bold text-gray-400 uppercase">Total</span>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-sm font-bold text-gray-600">8 Won</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-sm font-bold text-gray-600">4 Lost</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCharts;
