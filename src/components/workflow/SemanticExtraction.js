import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SEMANTIC_NODES, SEMANTIC_EDGES, INCIDENT_TEXT } from '@/data/mockData';
import GlassPanel from '@/components/ui/GlassPanel';
import { Network } from 'lucide-react';
export default function SemanticExtraction() {
    const [nodesVisible, setNodesVisible] = useState(0);
    useEffect(() => {
        if (nodesVisible < SEMANTIC_NODES.length) {
            const t = setTimeout(() => setNodesVisible(v => v + 1), 600);
            return () => clearTimeout(t);
        }
    }, [nodesVisible]);
    return (_jsxs("div", { className: "w-full max-w-4xl flex flex-col items-center gap-8", children: [_jsxs(GlassPanel, { className: "w-full p-6 text-center", children: [_jsxs("h3", { className: "text-xs font-mono text-gray-500 mb-4 flex items-center justify-center gap-2", children: [_jsx(Network, { className: "w-4 h-4" }), " SEMANTIC EXTRACTION"] }), _jsx("p", { className: "text-sm text-gray-300 leading-relaxed font-sans max-w-2xl mx-auto", children: INCIDENT_TEXT })] }), _jsxs("div", { className: "relative w-full h-[300px] border border-gray-800 rounded-2xl bg-black/50 overflow-hidden", children: [_jsx("svg", { className: "absolute inset-0 w-full h-full", children: SEMANTIC_EDGES.map((edge, i) => {
                            const source = SEMANTIC_NODES.find(n => n.id === edge.source);
                            const target = SEMANTIC_NODES.find(n => n.id === edge.target);
                            if (!source || !target)
                                return null;
                            const isVisible = SEMANTIC_NODES.findIndex(n => n.id === source.id) < nodesVisible &&
                                SEMANTIC_NODES.findIndex(n => n.id === target.id) < nodesVisible;
                            return (_jsx(motion.line, { x1: `${source.x}%`, y1: `${source.y}%`, x2: `${target.x}%`, y2: `${target.y}%`, stroke: "rgba(6, 182, 212, 0.3)", strokeWidth: "2", initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }, transition: { duration: 0.5, delay: 0.2 } }, i));
                        }) }), SEMANTIC_NODES.map((node, i) => {
                        const isVisible = i < nodesVisible;
                        return (_jsx(motion.div, { style: { left: `${node.x}%`, top: `${node.y}%` }, initial: { scale: 0, opacity: 0 }, animate: { scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }, transition: { type: 'spring', damping: 12, stiffness: 200 }, className: `absolute flex items-center justify-center px-4 py-2 rounded-full border text-xs font-mono whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2 shadow-lg backdrop-blur-md ${node.type === 'intent' ? 'bg-purple-900/50 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]' :
                                node.type === 'entity' ? 'bg-cyan-900/50 border-cyan-500 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)]' :
                                    'bg-gray-800 border-gray-600 text-gray-300'}`, children: node.label }, node.id));
                    })] })] }));
}
