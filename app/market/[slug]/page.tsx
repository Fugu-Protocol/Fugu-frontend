import MarketDetailView from "@/features/markets/components/market-detail-view";

interface MarketDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function MarketDetailPage({ params }: MarketDetailPageProps) {
    const { slug } = await params;

    return <MarketDetailView slug={slug} />;
}
