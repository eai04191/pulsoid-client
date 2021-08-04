import ApexCharts, { Props } from "react-apexcharts";
import { memo } from "react";

export type Data = [number,number];

export const Chart: React.VFC<{ data: Data[] }> = ({ data }) => {
    return (
        <ApexCharts
            height="100%"
            options={{
                chart: {
                    height: "100%",
                    sparkline: {
                        enabled: true,
                    },
                    type: "area",
                    zoom: {
                        enabled: false,
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        gradientToColors: ["white"], // optional, if not defined - uses the shades of same color in series
                    },
                },
                grid: {
                    show: false,
                },
                legend: {
                    show: false,
                },
                markers: {
                    size: 0,
                    colors: undefined,
                    strokeColors: "#fff",
                    strokeWidth: 2,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    discrete: [
                        {
                            seriesIndex: 0,
                            dataPointIndex: 10,
                            fillColor: "#e3e3e3",
                            strokeColor: "#fff",
                            size: 50,
                        },
                    ],
                    shape: "circle",
                    radius: 2,
                    offsetX: 0,
                    offsetY: 0,
                    onClick: undefined,
                    onDblClick: undefined,
                    showNullDataPoints: true,
                    hover: {
                        size: undefined,
                        sizeOffset: 3,
                    },
                },
                stroke: {
                    show: true,
                    curve: "smooth",
                    lineCap: "round",
                    colors: ["#404040"],
                },
                xaxis: {
                    type: "datetime",
                },
                yaxis: {
                    forceNiceScale: true,
                    labels: {
                        show: false,
                    },
                },
                tooltip: {
                    enabled: false,
                },
            }}
            series={[{ name: "heart rate", data: data }]}
        />
    );
};

export const MorizedChart = memo(Chart);
