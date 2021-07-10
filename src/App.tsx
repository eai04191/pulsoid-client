import clsx from "clsx";
import React from "react";
import useWebSocket from "react-use-websocket";

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

const Card: React.VFC<{ socketUrl: string }> = ({ socketUrl }) => {
    const { lastMessage } = useWebSocket(socketUrl);

    if (lastMessage === null) return <div>no message</div>;

    const parsed = JSON.parse(lastMessage.data);
    const heartRate = parsed.data.heartRate as number;

    const green = 0 <= heartRate && heartRate < 100;
    const yellow = 100 <= heartRate && heartRate < 140;
    const red = 140 <= heartRate;

    return (
        <div className="flex p-4 pr-3">
            <div
                className={clsx(
                    "relative flex rounded-lg shadow-lg ml-auto",
                    "bg-white text-gray-800 text-xl font-bold uppercase leading-none"
                )}
            >
                <div className="relative flex flex-col p-4 overflow-hidden">
                    <div
                        className={clsx(
                            "absolute -bottom-4 w-2/6 opacity-0 transition-opacity duration-500",
                            red && "opacity-60"
                        )}
                    >
                        <img src="https://media.stellaria.network/custom_emojis/images/000/013/273/original/4aa472b7fe843dd6.png" />
                    </div>

                    <span className={"text-left"}>heart rate</span>
                    <span className={"text-right text-6xl py-1"}>
                        {heartRate}
                    </span>
                    <span className={"text-right text-gray-500"}>bpm</span>
                </div>
            </div>
        </div>
    );
};
