
import React from "react";
import MarketNavbar from "@/components/layout/market-navbar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <MarketNavbar />
            {children}
            {/* Footer could go here */}
        </div>
    );
};

export default ProfileLayout;
