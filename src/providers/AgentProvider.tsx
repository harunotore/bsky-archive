import { AtpAgent } from "@atproto/api"
import React from "react"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface AgentContextType {
    agent: AtpAgent | null
    setAgent: React.Dispatch<React.SetStateAction<AtpAgent | null>>
}

export const AgentContext = createContext<AgentContextType | null>(null)

export function AgentProvider({ children }: { children: ReactNode }) {
    const [agent, setAgent] = useState<AtpAgent | null>(null)

    useEffect(() => {
        setAgent(new AtpAgent({
            service: "https://api.bsky.app",
        }))
    }, [])
    
    return (
        <AgentContext.Provider value={{ agent, setAgent }}>
            {children}
        </AgentContext.Provider>
    )
}

export const useAgent = () => {
    const context = useContext(AgentContext)
    if (!context) {
        throw new Error('useAgent must be used within a AgentProvider')
    }
    return context
}
