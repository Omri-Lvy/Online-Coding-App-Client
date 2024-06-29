import { useContext, useEffect, useState } from "react";
import CodeBlockContext from "../../context/CodeBlockContext.tsx";
import { fetchData } from "../../utils/fetch.ts";
import CodeBlock from "../../types/CodeBlock.ts";
import { useNavigate } from "react-router-dom";
import CodeBlockItem from "./code-block-item.tsx";

const Lobby = () => {
    const navigate = useNavigate();
    const { setSelectedCodeBlock } = useContext(CodeBlockContext);
    const [codeBlocks, setCodeBlocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData("/code-blocks").then((data) => {
            setCodeBlocks(data);
        }).catch((error) => {
            console.error("Error fetching code blocks:", error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleCodeBlockClick = async (codeBlock: CodeBlock) => {
        const data = await fetchData(`/code-blocks/id/${codeBlock._id}`);
        setSelectedCodeBlock(data);
        navigate(`/code-block/${codeBlock.title.toLowerCase().replace(/\s/g, "-")}`);
    }

    const codeBlockListRender = () => {
        if (codeBlocks.length === 0) {
            return <p>No code blocks found</p>;
        }
        return (
            <div
                className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-12 w-5/6 md:max-w-4xl">
                {codeBlocks.map((codeBlock: CodeBlock) => {
                    return (
                        <CodeBlockItem codeBlock={codeBlock} onClick={handleCodeBlockClick} key={codeBlock._id}/>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="flex w-dvw h-dvh justify-start items-center py-12 md:py-24 flex-col gap-4 md:gap-16">
            <div className="relative mb-12 md:mb-0">
                <h1 className="relative z-10 text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500 text-center font-sans font-bold drop-shadow-lg">
                    Choose Code Block
                </h1>
                <div className="w-[40rem] relative">
                    <div
                        className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"/>
                    <div
                        className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"/>
                    <div
                        className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"/>
                    <div
                        className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"/>
                </div>
            </div>

            {loading ? <p>Loading...</p> : codeBlockListRender()}
        </div>
    );
};

export default Lobby;