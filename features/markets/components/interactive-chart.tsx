"use client";

import React, { useState, useRef, useCallback } from "react";

interface ChartDataPoint {
    time: string;
    value: number;
}

interface InteractiveChartProps {
    data: ChartDataPoint[];
    currentPercentage: number;
    change: number;
}

const InteractiveChart: React.FC<InteractiveChartProps> = ({
    data,
    currentPercentage,
    change,
}) => {
    const [hoveredPoint, setHoveredPoint] = useState<{
        x: number;
        y: number;
        data: ChartDataPoint;
    } | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

    // Calculate interpolated value at a given x position
    const getInterpolatedValue = useCallback(
        (xPercent: number): ChartDataPoint => {
            const totalPoints = data.length - 1;
            const exactIndex = xPercent * totalPoints;
            const lowerIndex = Math.floor(exactIndex);
            const upperIndex = Math.ceil(exactIndex);

            if (lowerIndex === upperIndex || upperIndex >= data.length) {
                return data[Math.min(lowerIndex, data.length - 1)];
            }

            const fraction = exactIndex - lowerIndex;
            const lowerPoint = data[lowerIndex];
            const upperPoint = data[upperIndex];

            const interpolatedValue =
                lowerPoint.value + (upperPoint.value - lowerPoint.value) * fraction;

            // Interpolate time display
            const lowerHour = parseInt(lowerPoint.time.split(":")[0]);
            const upperHour = parseInt(upperPoint.time.split(":")[0]);
            const interpolatedHour = Math.round(
                lowerHour + (upperHour - lowerHour) * fraction
            );
            const interpolatedTime = `${String(interpolatedHour).padStart(2, "0")}:00`;

            return {
                time: interpolatedTime,
                value: Math.round(interpolatedValue),
            };
        },
        [data]
    );

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!chartRef.current) return;

            const rect = chartRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const xPercent = Math.max(0, Math.min(1, x / rect.width));

            // Get interpolated data point
            const interpolatedData = getInterpolatedValue(xPercent);

            // Calculate y position based on value
            const yPercent = 1 - interpolatedData.value / 100;
            const y = yPercent * rect.height;

            setHoveredPoint({
                x: x,
                y: y,
                data: interpolatedData,
            });
        },
        [getInterpolatedValue]
    );

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        setIsHovering(false);
        setHoveredPoint(null);
    };

    // Generate SVG path
    const generatePath = () => {
        const width = 400;
        const height = 200;

        const points = data.map((d, i) => ({
            x: (i * width) / (data.length - 1),
            y: height - d.value * 2,
        }));

        const linePath = `M${points[0].x},${points[0].y} ${points.map((p) => `L${p.x},${p.y}`).join(" ")}`;
        const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

        return { linePath, areaPath };
    };

    const { linePath, areaPath } = generatePath();

    return (
        <div className="h-80 bg-white border-2 border-black rounded-xl overflow-hidden relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {/* Stats Overlay */}
            <div className="absolute top-6 left-6 z-10">
                <div className="text-5xl font-black text-black">{currentPercentage}%</div>
                <div
                    className={`font-bold text-lg px-2 rounded mt-1 inline-block ${change >= 0
                            ? "text-emerald-600 bg-emerald-100"
                            : "text-rose-600 bg-rose-100"
                        }`}
                >
                    {change >= 0 ? "+" : ""}
                    {Math.abs(change)}% Today
                </div>
            </div>

            {/* Interactive Chart Container */}
            <div
                ref={chartRef}
                className="w-full h-full cursor-crosshair relative"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* SVG Chart */}
                <svg
                    className="w-full h-full"
                    viewBox="0 0 400 200"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path d={areaPath} fill="url(#chartGradient)" />
                    {/* Line */}
                    <path d={linePath} fill="none" stroke="#000" strokeWidth="3" />
                </svg>

                {/* Vertical Indicator Line */}
                {isHovering && hoveredPoint && (
                    <>
                        {/* Vertical Line */}
                        <div
                            className="absolute top-0 bottom-0 w-0.5 bg-black pointer-events-none z-20"
                            style={{ left: hoveredPoint.x }}
                        />

                        {/* Circle dot on the line */}
                        <div
                            className="absolute w-3 h-3 bg-white border-2 border-black rounded-full pointer-events-none z-30 transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: hoveredPoint.x,
                                top: hoveredPoint.y,
                            }}
                        />

                        {/* Tooltip */}
                        <div
                            className="absolute bg-white border-2 border-black rounded-lg p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] pointer-events-none z-40 min-w-[100px]"
                            style={{
                                left: Math.min(
                                    hoveredPoint.x + 15,
                                    chartRef.current?.offsetWidth
                                        ? chartRef.current.offsetWidth - 120
                                        : hoveredPoint.x
                                ),
                                top: Math.max(hoveredPoint.y - 30, 10),
                            }}
                        >
                            <p className="text-sm font-bold text-slate-500 mb-1">
                                {hoveredPoint.data.time}
                            </p>
                            <p className="text-2xl font-black text-black leading-none">
                                {hoveredPoint.data.value}%
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InteractiveChart;
