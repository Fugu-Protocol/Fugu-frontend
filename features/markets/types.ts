// Market types for the application

export interface Outcome {
    id: string;
    name: string;
    party?: string; // e.g., (IND), (PS)
    imageUrl: string;
    volume: string; // Formatted string e.g. "$1,952,116"
    percentage: number; // 0-100
    change: number; // Positive or negative percentage change
    yesPrice: number; // Cents
    noPrice: number; // Cents
}

export interface MarketEvent {
    id: string;
    slug: string; // URL-friendly version of the title
    title: string;
    volume: string;
    endDate: string;
    description: string;
    outcomes: Outcome[];
    category: string;
    icon: string;
    mainIcon: string;
    color: string;
    isHot: boolean;
}

export interface Market {
    id: number;
    slug: string;
    category: string;
    icon: string;
    mainIcon: string;
    color: string;
    question: string;
    yes: number;
    no: number;
    volume: string;
    isHot: boolean;
}
