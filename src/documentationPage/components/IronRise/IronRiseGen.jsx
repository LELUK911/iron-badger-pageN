export const IronRiseGen = ({ setFunction }) => {
    return (
        <>
            <ul className='space-y-2 ms-2'>
                <li>
                    <button
                        onClick={() => setFunction(21)}
                    >
                        Introduction
                    </button>
                </li>
                <li>
                    <button onClick={() => setFunction(22)}>
                        Service Fee Structure
                    </button>
                </li>

            </ul>
        </>
    );
}
