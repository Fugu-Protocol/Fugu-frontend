import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Filter, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROFILE_MOCK_DATA } from "@/lib/constants";

const ProfileTabs = () => {
    return (
        <div className="bg-white rounded-2xl border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] mb-12">
            <Tabs defaultValue="positions" className="w-full">
                <div className="flex items-center justify-between px-2 pt-2 pb-4 border-b border-gray-100">
                    <TabsList className="bg-gray-100/50 p-1 h-auto gap-1">
                        {['Positions', 'Open Orders', 'Activity'].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab.toLowerCase().replace(' ', '-')}
                                className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:border-black/10 border border-transparent rounded-lg px-4 py-2 text-sm font-bold text-gray-500"
                            >
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* Content Area - Min Height for smooth layout */}
                <div className="min-h-[400px]">
                    <TabsContent value="positions" className="m-0 p-0">
                        {/* Filter Bar */}
                        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold shadow-sm hover:border-blue-500 transition-colors">
                                All <span className="ml-2">▼</span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold shadow-sm hover:border-blue-500 transition-colors">
                                <Filter size={14} /> Value <span className="ml-2">▼</span>
                            </button>
                        </div>

                        {/* Positions List */}
                        {PROFILE_MOCK_DATA.positions.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {PROFILE_MOCK_DATA.positions.map((pos) => (
                                    <div key={pos.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors group">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors mb-1">{pos.market}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${pos.side === 'YES' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {pos.side}
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium">Avg: {pos.avgPrice}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm">
                                            <div className="text-right">
                                                <p className="text-gray-400 text-xs font-bold uppercase">Shares</p>
                                                <p className="font-bold">{pos.shares}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-400 text-xs font-bold uppercase">Value</p>
                                                <p className="font-bold">{pos.value}</p>
                                            </div>
                                            <div className="text-right min-w-[80px]">
                                                <p className="text-gray-400 text-xs font-bold uppercase">PNL</p>
                                                <p className={`font-black ${pos.pnl.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{pos.pnl}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No Positions Found" />
                        )}
                    </TabsContent>

                    <TabsContent value="open-orders" className="m-0 p-0">
                        {PROFILE_MOCK_DATA.openOrders.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {PROFILE_MOCK_DATA.openOrders.map((order) => (
                                    <div key={order.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors group">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors mb-1">{order.market}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${order.side === 'YES' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {order.side}
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium">Price: {order.price}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm">
                                            <div className="text-right">
                                                <p className="text-gray-400 text-xs font-bold uppercase">Shares</p>
                                                <p className="font-bold">{order.shares}</p>
                                            </div>
                                            <div className="text-right min-w-[80px]">
                                                <p className="text-gray-400 text-xs font-bold uppercase">Total</p>
                                                <p className="font-bold">{order.total}</p>
                                            </div>
                                            <div className="text-right">
                                                <button className="px-3 py-1 bg-white border border-gray-200 text-xs font-bold text-red-500 rounded hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No Open Orders" />
                        )}
                    </TabsContent>



                    <TabsContent value="activity" className="m-0 p-0">
                        {PROFILE_MOCK_DATA.activity.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {PROFILE_MOCK_DATA.activity.map((act) => (
                                    <div key={act.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${act.action === 'Bought' ? 'bg-green-100 text-green-700' : act.action === 'Sold' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                                <List size={16} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">
                                                    <span className={`${act.action === 'Bought' ? 'text-green-600' : 'text-red-500'}`}>{act.action}</span> {act.target} shares
                                                </p>
                                                <p className="text-xs text-gray-500">{act.market}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">{act.amount}</p>
                                            <p className="text-xs text-gray-400">{act.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No events yet" />
                        )}
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <HelpCircle size={32} className="text-gray-300" />
        </div>
        <p className="font-bold text-lg">{message}</p>
    </div>
);

export default ProfileTabs;
