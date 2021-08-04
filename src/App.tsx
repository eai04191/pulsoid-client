import clsx from "clsx";
import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { Chart, Data } from "./Chart";
import useDebounce from "./useDebounce";
import { Heading } from "./components/Heading";

export const App = () => {
    const socketUrl = new URL(document.URL).searchParams.get("ws");

    if (socketUrl) {
        return <Card socketUrl={socketUrl} />;
    }

    return (
        <div>
            /?ws=<code>websocket url here</code>
        </div>
    );
};

export default App;

const Disconnected = () => {
    return (
        <div className="flex h-[135px] text-gray-800 relative rounded-3xl overflow-hidden">
            <Heading className="opacity-50" />
            <div className="self-center w-full text-4xl font-bold tracking-wider text-center">
                <p>DISCONNECTED</p>
            </div>
        </div>
    );
};

const Connected: React.VFC<{ data: Data[] }> = ({ data }) => {
    const lastData = data.slice(-1)[0];
    const heartRate = lastData[1];

    const green = 0 <= heartRate && heartRate < 100;
    const yellow = 100 <= heartRate && heartRate < 140;
    const red = 140 <= heartRate;

    return (
        <div className="flex h-[135px] text-gray-800 relative rounded-3xl overflow-hidden">
            <div className="relative flex-1 overflow-hidden">
                <Chart data={data} />
            </div>

            <Heading />
            <div
                className={clsx(
                    "relative flex",
                    "bg-transparent text-xl font-bold uppercase leading-none",
                    "p-4"
                )}
            >
                <div className="relative flex flex-col w-[145px] h-[103px] overflow-hidden">
                    <div
                        className={clsx(
                            "absolute -bottom-4 right-20 w-14 opacity-0 transition-opacity duration-500",
                            red && "opacity-60"
                        )}
                    >
                        <img src="https://media.stellaria.network/custom_emojis/images/000/013/273/original/4aa472b7fe843dd6.png" />
                    </div>

                    <span className={"text-right text-[80px] text-gray-800"}>
                        {heartRate}
                    </span>
                    <span
                        className={
                            "text-right text-gray-500 text-2xl leading-none"
                        }
                    >
                        bpm
                    </span>
                </div>
            </div>
        </div>
    );
};

const Card: React.VFC<{ socketUrl: string }> = ({ socketUrl }) => {
    const onMessage = (event: WebSocketEventMap["message"]) => {
        type Response = {
            timestamp: number;
            data: {
                heartRate: number;
            };
        };
        const response = JSON.parse(event.data) as Response;

        // @ts-ignore
        setData((data) => {
            const d = [
                ...data,
                [response.timestamp, response.data.heartRate],
            ].slice(-60);
            return d;
        });
    };

    const [data, setData] = useState<Data[]>([]);
    useWebSocket(socketUrl, { onMessage });

    if (data.length === 0) return <Disconnected />;

    return <Connected data={data} />;
};
