import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useAgent } from '../../providers/AgentProvider'
import { ProfileViewBasic } from '@atproto/api/dist/client/types/app/bsky/actor/defs'

export const Navbar = ({ handleSetData }: { handleSetData: (value: string) => void }) => {
    const [handle, setHandle] = useState('')
    const [actors, setActors] = useState<ProfileViewBasic[]>([])
    const { agent } = useAgent()

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const eventHandleValue = e.target.value
        setHandle(eventHandleValue)
        getActors(eventHandleValue)

    }
    
    const getActors = async (query: string) => {
        if (!agent) return
        try {
            if (query != '') {
                const response = await agent.searchActorsTypeahead({
                    q: query
                })
                if (response.success) {
                    setActors(response.data.actors)
                }
            } else {
                setActors([])
            }

        } catch (e) {
            console.error(e)
        }
    }
    
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const eventHandleValue = (e.target as HTMLInputElement).value
            handleSetData(eventHandleValue)
            setActors([])
        }
    }

    const handleClick = (value: ProfileViewBasic) => {
        setHandle(value.handle)
        handleSetData(value.did)
        setActors([])
    }

    const actorsList = actors.map(actor =>
        <li key={actor.handle} onClick={() => handleClick(actor)} className='flex items-center'>
            <div className='px-[var(--space-3)]'>
                <MagnifyingGlassIcon height="16" width="16" />
            </div>
            <div className='text-xl'>{actor.handle}</div>
        </li>
    )

    return (
        <div className='flex height-[48px] p-4 bg-blue-500 relative'>
            <div className='flex flex-col w-[400px]'>
                <div>
                    <input
                        className="w-full inline-flex items-center justify-center rounded h-[35px] text-[15px] leading-none text-[white] px-2.5 py-0;"
                        type="text"
                        placeholder='Search handles...'
                        value={handle}
                        onChange={(e) => handleChange(e)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className='relative mt-2'>
                    <div className={`absolute w-full bg-white ${actors.length != 0 && 'border-1'}`} >
                        <ul>
                            {actorsList}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

