import React, { createContext, ReactNode, useState } from "react";


interface CodeBlockContextProps {
    selectedCodeBlock: string | null;
    setSelectedCodeBlock: (codeBlockId: string | null) => void;
}

const CodeBlockContext = createContext<CodeBlockContextProps>({
    selectedCodeBlock: null,
    setSelectedCodeBlock: () => {},
});

export const CodeBlockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedCodeBlock, setSelectedCodeBlock] = useState<string | null>(null);

    return (
        <CodeBlockContext.Provider value={{ selectedCodeBlock, setSelectedCodeBlock }}>
            {children}
        </CodeBlockContext.Provider>
    );
};

export default CodeBlockContext;