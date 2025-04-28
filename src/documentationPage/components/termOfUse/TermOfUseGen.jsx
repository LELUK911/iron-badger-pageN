export const TermOfUseGen = ({ setFunction }) => {
    return (
        <>
            <ul className="space-y-2 ms-2">
                <li>
                    <button onClick={() => setFunction(31)}>
                        Term of use
                    </button>
                </li>
            </ul>
        </>
    );

}
