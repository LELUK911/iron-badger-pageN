import gameIMG from '../../assets/Gamemap.png'
export const GameSection = () => {
    return (
        <div className="w-full py-16 md:py-24 bg-gradient-to-b ">
            {/* Game Hero */}
            <div className="max-w-5xl mx-auto px-4 text-center mb-16">
                <div className="inline-block px-6 py-2 bg-amber-900/30 rounded-full border border-amber-400 mb-8">
                    <span className="text-amber-300 font-medium">Coming Soon</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                    The Forgotten Badger Knights
                </h2>
                
                <div className="max-w-3xl mx-auto">
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                        In the ancient lands of DeFi, the Badger Knights wandered aimlessly... until a signal called them back to duty.
                        The Brotherhood needs its knights once more.
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto rounded-full"/>
                </div>
            </div>

            {/* Game Features */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-20">
                {/* Feature 1 */}
                <div className="bg-gray-800/40 p-8 rounded-xl border border-gray-700 hover:border-amber-400 transition-all">
                    <div className="text-4xl mb-4 text-amber-400">🗡️</div>
                    <h3 className="text-xl font-bold text-white mb-3">Epic Quests</h3>
                    <p className="text-gray-300">
                        Explore forsaken lands, complete missions and prove your worth to the Brotherhood.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-gray-800/40 p-8 rounded-xl border border-gray-700 hover:border-amber-400 transition-all">
                    <div className="text-4xl mb-4 text-amber-400">🛡️</div>
                    <h3 className="text-xl font-bold text-white mb-3">Turn-Based Combat</h3>
                    <p className="text-gray-300">
                        Strategic battles against other knights and NPCs using your Badger Knight NFT.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-gray-800/40 p-8 rounded-xl border border-gray-700 hover:border-amber-400 transition-all">
                    <div className="text-4xl mb-4 text-amber-400">🏆</div>
                    <h3 className="text-xl font-bold text-white mb-3">DAO Prestige</h3>
                    <p className="text-gray-300">
                        Earn points and recognition that boost your status in the Iron Badger ecosystem.
                    </p>
                </div>
            </div>

            {/* Game Preview & CTA */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700">
                    <div className="p-8 md:p-10 md:w-1/2">
                        <h3 className="text-2xl font-bold text-white mb-4">Prepare for Battle</h3>
                        <p className="text-gray-300 mb-6">
                            A strategic 2D pixel-art style game where every move counts. 
                            Connect your wallet and prepare your Badger Knight for the first mission.
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-medium hover:scale-105 transition-transform">
                            Notify Me at Launch
                        </button>
                    </div>
                    <div className="md:w-1/2 p-4 bg-gray-900/50 flex justify-center">
                        <div className="w-full h-64 bg-gray-800 rounded-lg border-2 border-dashed border-amber-400/30 flex items-center justify-center text-gray-500">
                            <img src={gameIMG} alt="Game Preview" className="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};