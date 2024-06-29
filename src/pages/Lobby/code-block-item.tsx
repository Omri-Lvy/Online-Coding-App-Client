import CodeBlock from "../../types/CodeBlock.ts";
import { HoverBorderGradient } from "../../components/ui/hover-border-gradient.tsx";

interface CodeBlockItemProps {
    codeBlock: CodeBlock;
    onClick: (codeBlock: CodeBlock) => void;
}

const CodeBlockItem = ({ codeBlock, onClick }: CodeBlockItemProps) => {
    return (
        <div
            className="flex justify-center text-center w-full md:w-fit relative group hover:scale-105  transition duration-500">
            <div
                className="absolute inset-0 rounded-full blur bg-gradient-to-b from-indigo-500 to-sky-500 opacity-0 group-hover:opacity-100 transition duration-500">
            </div>
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="text-white flex items-center space-x-2 w-full md:w-max"
                onClick={() => onClick(codeBlock)}
            >
                <span className="capitalize">{codeBlock.title.replaceAll('-', ' ')}</span>
            </HoverBorderGradient>
        </div>
    );
};

export default CodeBlockItem;