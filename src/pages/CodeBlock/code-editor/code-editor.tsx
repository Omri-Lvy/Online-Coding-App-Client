import React, { useCallback, useContext, useEffect } from 'react';
import { SocketContext } from "../../../context/SocketContext.tsx";
import CodeMirror from '@uiw/react-codemirror';
import { githubDark } from '@uiw/codemirror-theme-github';
import CodeBlock from "../../../types/CodeBlock.ts";
import { javascript } from "@codemirror/lang-javascript";
import "./code-editor.css"
import cn from "../../../utils/cn.ts";
import { Role } from "../../../types/Role.ts";

interface CodeEditorProps {
    role: Role | null;
    selectedCodeBlock: CodeBlock | null;
    className?: string;
    onChange?: (value: string) => void;
}

const CodeEditor = ({ role, selectedCodeBlock, className, onChange }: CodeEditorProps) => {
    const socket = useContext(SocketContext);
    const [code, setCode] = React.useState(selectedCodeBlock?.code || "// Write your code here");

    const handleChange = useCallback((value: string) => {
        if (role === 'student') {
            setCode(value);
            if (onChange) {
                onChange(value);
            }
            if (selectedCodeBlock) {
                socket.emit('codeChange', { codeBlockId: selectedCodeBlock._id, code: value });
            }
        }

    }, [role, selectedCodeBlock, socket, onChange]);

    useEffect(() => {
        socket.on('codeUpdate', (data) => {
            if (data.codeBlockId === selectedCodeBlock?._id) {
                setCode(data.code);
            }
        });

        return () => {
            socket.off('codeUpdate');
        };
    }, [selectedCodeBlock, socket]);

    useEffect(() => {
        if (selectedCodeBlock) {
            setCode(selectedCodeBlock.code);
        }
    }, [selectedCodeBlock]);

    const isEditable = role === 'student';
    const extensions = [javascript()];

    return (
        <div
            className={cn("w-11/12 shadow-2xl rounded-xl h-full max-h-[32rem] bg-black border-black mx-auto", className)}>
            <div
                className="flex items-center h-6 rounded-t bg-[#3c3c3c] border-b border-black text-center text-black"
                id="headerTerminal">
                <div
                    className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"
                    id="closebtn">
                </div>
                <div className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3" id="minbtn">
                </div>
                <div className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3" id="maxbtn">
                </div>
                <div className="mx-auto pr-16" id="terminaltitle">
                    <p className="text-center text-neutral-400 ">Terminal</p>
                </div>
            </div>
            <CodeMirror
                value={code}
                extensions={extensions}
                theme={githubDark}
                onChange={handleChange}
                editable={isEditable}
                className="rounded-b-lg h-full w-full"
            />
        </div>
    );
}

export default CodeEditor;
