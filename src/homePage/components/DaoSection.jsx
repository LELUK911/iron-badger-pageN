export const DaoSection = () => {
    return (
        <div className="bg-gray-900 text-white px-4 py-12 md:px-16 md:py-24">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-300">
                    Iron Badger Collective
                </h2>
                <div className="inline-block px-4 py-2 bg-purple-900/30 rounded-full border border-purple-500 mb-8">
                    <span className="text-purple-300 font-medium text-lg">Coming Soon</span>
                </div>

                <div className="max-w-3xl mx-auto">
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                        The <span className="text-white font-semibold">decentralized governance core</span> of the Iron Badger ecosystem,
                        designed for <span className="text-white font-semibold">transparent collaboration</span> and
                        <span className="text-white font-semibold"> community-driven evolution</span>.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto my-8 rounded-full" />
                </div>
            </div>

            {/* Governance Structure */}
            <div className="max-w-6xl mx-auto mb-20">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                    Three-Tier Governance System
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Community of Badgers */}
                    <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-indigo-400 transition-all">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center mr-4">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <h4 className="text-xl font-bold text-white">Community of Badgers</h4>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Open to all participants in the ecosystem. Propose ideas, discuss improvements, and help shape the community's direction.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <div className="text-indigo-400 mr-2">•</div>
                                <span className="text-gray-300 text-sm">Open discussions</span>
                            </div>
                            <div className="flex items-start">
                                <div className="text-indigo-400 mr-2">•</div>
                                <span className="text-gray-300 text-sm">Proposal submissions</span>
                            </div>
                            <div className="flex items-start">
                                <div className="text-indigo-400 mr-2">•</div>
                                <span className="text-gray-300 text-sm">Consensus building</span>
                            </div>
                        </div>
                    </div>

                    {/* Council of Badgers */}
                    <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-teal-400 transition-all">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center mr-4">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <h4 className="text-xl font-bold text-white">Council of Badgers</h4>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Experienced contributors who review proposals, provide guidance, and help coordinate community initiatives.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <div className="text-teal-400 mr-2">•</div>
                                <span className="text-gray-300 text-sm">Proposal review</span>
                            </div>
                            <div className="flex items-start">
                                <div className="text-teal-400 mr-2">•</div>
                                <span className="text-gray-300 text-sm">Community guidance</span>
                            </div>
                            <div className="flex items-start">
                                <div className="text-teal-400 mr-2">•</div>
                                <span className="text-gray-300 text-sm">Initiative coordination</span>
                            </div>
                        </div>
                    </div>

                    {/* Circle of Guardians */}
                    <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-purple-400 transition-all">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-4">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <h4 className="text-xl font-bold text-white">Circle of Guardians</h4>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Respected leaders ensuring alignment with core principles and providing strategic oversight.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <div className="text-purple-400 mr-2">•</div>
                                <span className="text-gray-300 text-sm">Strategic oversight</span>
                            </div>
                            <div className="flex items-start">
                                <div className="text-purple-400 mr-2">•</div>
                                <span className="text-gray-300 text-sm">Principle alignment</span>
                            </div>
                            <div className="flex items-start">
                                <div className="text-purple-400 mr-2">•</div>
                                <span className="text-gray-300 text-sm">Long-term vision</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Features */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                    Core Governance Features
                </h3>

                <div className="space-y-8">
                    {/* Feature 1 */}
                    <div className="flex flex-col md:flex-row gap-6 bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2">Progressive Participation</h4>
                            <p className="text-gray-300">
                                Start as a community member and grow your influence through consistent contributions.
                                The more you participate, the greater your role in shaping the ecosystem.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col md:flex-row gap-6 bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-teal-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2">Transparent Proposals</h4>
                            <p className="text-gray-300">
                                Every proposal is publicly visible, with clear voting mechanisms and discussion periods.
                                Track the entire decision-making process from idea to implementation.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col md:flex-row gap-6 bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2">Value Distribution</h4>
                            <p className="text-gray-300">
                                Earn rewards for meaningful contributions. The treasury allocates resources to fund community initiatives
                                and reward active participants.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex flex-col md:flex-row gap-6 bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2">Open Access</h4>
                            <p className="text-gray-300">
                                No barriers to entry. Anyone can participate at any level, with clear pathways to take on more responsibility
                                through demonstrated commitment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};