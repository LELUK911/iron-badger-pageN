

export const IronForgeGen = ({ setfunction }) => {
    return (
        <>
            <ul className='space-y-2 ms-2'>
                <li>
                    <button
                        onClick={() => setfunction(17)}
                    >
                        Introduction
                    </button>
                </li>
            </ul>
        </>
    )
}
