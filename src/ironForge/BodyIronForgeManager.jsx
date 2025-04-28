import { ManagmentForge } from "./components/componets/forgeManagerElement/ManagmentForge"


export const BodyIronForgeManager = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  text-gray-100 p-8 space-y-10">
            {/* Titolo */}
            <h1 className="text-5xl font-bold text-center text-white">
                Forge Hub: Streamline Your Pact Creation
            </h1>
            {/* Tabella o Lista */}
            <div className="w-full max-w-6xl">
                <ManagmentForge />
            </div>
        </div>

    )
}
