import React, { createContext, ReactNode, useState } from "react";
import CodeBlock from "../types/CodeBlock.ts";


interface CodeBlockContextProps {
    selectedCodeBlock: CodeBlock | null;
    setSelectedCodeBlock: (codeBlock: CodeBlock | null) => void;
}

const CodeBlockContext = createContext<CodeBlockContextProps>({
    selectedCodeBlock: null,
    setSelectedCodeBlock: () => {
    },
});

export const CodeBlockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedCodeBlock, setSelectedCodeBlock] = useState<CodeBlock | null>(null);

    return (
        <CodeBlockContext.Provider value={{ selectedCodeBlock, setSelectedCodeBlock }}>
            {children}
        </CodeBlockContext.Provider>
    );
};

export default CodeBlockContext;