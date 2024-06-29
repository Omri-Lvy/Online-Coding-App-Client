import CodeBlockContext from "../../context/CodeBlockContext.tsx";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext.tsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/fetch.ts";
import PageTitle from "../../components/ui/page-title.tsx";
import CodeEditor from "./code-editor/code-editor.tsx";

const CodeBlock = () => {
    const { selectedCodeBlock, setSelectedCodeBlock } = useContext(CodeBlockContext);
    const codeBlock = selectedCodeBlock;
    const socket = useContext(SocketContext);
    const [role, setRole] = useState<'mentor' | 'student' | 'watcher' | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!codeBlock) {
            console.log('fetching code block')
            const codeBlockTitle = location.pathname.split('/').pop();
            fetchData(`/code-blocks/title/${codeBlockTitle}`).then((data) => {
                setSelectedCodeBlock(data);
            }).catch((error) => {
                console.error("Error fetching code block:", error);
                navigate('/');
            });
        }
    }, [codeBlock, location.pathname, navigate, selectedCodeBlock, setSelectedCodeBlock]);

    useEffect(() => {
        if (!codeBlock) {
            return;
        }
        socket.emit('joinCodeBlock', selectedCodeBlock?._id);
        socket.on('role', (role) => {
            setRole(role);
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            socket.emit('leaveCodeBlock', selectedCodeBlock?._id);
            setIsConnected(false);
        });

        socket.on('codeChange', (data) => {
            if (data.codeBlockId === selectedCodeBlock?._id) {
                setSelectedCodeBlock({ ...selectedCodeBlock, code: data.code });
            }
        });

        return () => {
            socket.emit('leaveCodeBlock', selectedCodeBlock?._id);
        }

    }, [codeBlock, selectedCodeBlock, selectedCodeBlock?._id, selectedCodeBlock?.title, setSelectedCodeBlock, socket]);

    return (
        <div
            className="flex w-dvw h-dvh justify-start items-center py-12 md:py-24 flex-col gap-8 relative">
            <span className="absolute top-12 left-12">
            <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
            </Link>
            </span>
            <PageTitle title={selectedCodeBlock?.title.replaceAll('-', ' ') || ''}/>
            <div className="flex justify-center items-center flex-col gap-4">
                <span className="text-lg font-semibold">
                    {
                        role === 'mentor' ? 'You are the mentor' :
                            role === 'student' ? 'You are the student' :
                                role === 'watcher' ? 'You are a watcher' :
                                    'Connecting...'
                    }
                </span>
                <div className="w-10/12">
                    <span className="text-lg font-semibold">Instructions</span>
                    <p className="italic">
                        {selectedCodeBlock?.instructions}
                    </p>
                </div>
            </div>
            <div className="w-full h-full flex flex-col justify-start items-center gap-2">
                <div className="w-11/12">
                    <span className={`${isConnected ? "text-green-600" : "text-red-600"}`}>
                        {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                </div>
                <CodeEditor role={role} selectedCodeBlock={selectedCodeBlock}/>
            </div>
        </div>
    );
};

export default CodeBlock;