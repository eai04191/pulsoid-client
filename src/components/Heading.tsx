import clsx from "clsx";

export const Heading: React.VFC<{
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
}> = ({ className }) => {
    return (
        <div
            className={clsx(
                "absolute top-0 left-0 p-4 rounded-br-lg bg-white/50",
                className
            )}
        >
            <h2 className="text-3xl font-bold">HEART RATE CHART</h2>
        </div>
    );
};
