import cn from "../../utils/cn.ts";

interface PageTitleProps {
    title: string;
    className?: string;
}

const PageTitle = ({ title, className }: PageTitleProps) => {
    return (
        <h1 className={cn("capitalize relative z-10 text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500 text-center font-sans font-bold drop-shadow-lg min-h-max", className)}>
            {title}
        </h1>
    );
};

export default PageTitle;