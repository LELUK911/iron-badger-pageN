export const IronFallGen = ({ setFunction }) => {
    return (
        <>
            <ul className="space-y-2 ms-2">
                <li>
                    <button onClick={() => setFunction(26)}>
                        Introduction
                    </button>
                </li>
                <li>
                    <button onClick={() => setFunction(27)}>
                        Service Fee Structure
                    </button>
                </li>
            </ul>
        </>
    );

}
