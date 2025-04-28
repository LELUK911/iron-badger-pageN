import { FaTwitter, FaGithub, FaDiscord, FaMedium } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 py-8 md:py-12 mt-16 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Sezione Superiore: Link e Informazioni */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sezione 1: Descrizione */}
                    <div className="space-y-4">
                        <h3 className="text-lg md:text-xl font-bold text-white">
                            Iron Badger Brotherhood
                        </h3>
                        <p className="text-sm md:text-base text-gray-400">
                            Decentralized financial solutions for the future.
                            Join us in revolutionizing the digital asset space with blockchain technology.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://x.com/Iron_Badger_Bro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-500 transition-colors"
                            >
                                <FaTwitter className="w-5 h-5 md:w-6 md:h-6" />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-100 transition-colors"
                            >
                                <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
                            </a>
                            <a
                                href="https://discord.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-indigo-500 transition-colors"
                            >
                                <FaDiscord className="w-5 h-5 md:w-6 md:h-6" />
                            </a>
                            <a
                                href="https://medium.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                            >
                                <FaMedium className="w-5 h-5 md:w-6 md:h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Sezione 2: Link Utili */}
                    {/*
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    */}
                    {/* Sezione 3: Risorse */}
                    {/*

                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Whitepaper
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-400 hover:text-blue-500 transition-colors">
                                    Roadmap
                                </a>
                            </li>
                        </ul>
                    </div>
                    */}
                </div>

                {/* Sezione Inferiore: Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center">
                    <p className="text-sm md:text-base text-gray-400">
                        &copy; {new Date().getFullYear()} Iron Protocol. All rights reserved.
                    </p>
                    <p className="text-xs md:text-sm text-gray-400 mt-2">
                        Built with ❤️ by the Iron Badger Protocol team.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
