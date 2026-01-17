
import React from "react";
import ProfileHeader from "@/features/profile/components/profile-header";
import ProfileStats from "@/features/profile/components/profile-stats";
import ProfileCharts from "@/features/profile/components/profile-charts";
import ProfileTabs from "@/features/profile/components/profile-tabs";

interface PageProps {
    params: Promise<{
        address: string;
    }>;
}

const ProfilePage = async ({ params }: PageProps) => {
    const { address } = await params;

    return (
        <main className="pb-20">
            {/* Header Section */}
            <ProfileHeader address={address} />

            <div className="md:px-58 px-6 mt-8">
                {/* Stats Grid */}
                <ProfileStats />

                {/* Charts Area */}
                <ProfileCharts />

                {/* Tabs Area */}
                <ProfileTabs />

                {/* Footer Links */}
                <div className="flex gap-6 justify-center md:justify-start text-xs font-bold text-gray-400 mt-12 pb-8">
                    <a href="#" className="hover:text-black transition-colors">Terms & Privacy</a>
                    <a href="#" className="hover:text-black transition-colors">Developers</a>
                    <a href="#" className="hover:text-black transition-colors">Docs</a>
                    <a href="#" className="hover:text-black transition-colors">Blog</a>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
