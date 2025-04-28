import tassoForgeHero from '../assets/TassoForgiatore.png'; // Immagine per Iron Forge
import tassoTools from '../assets/tassoTools.png'; // Immagine rappresentativa del lancio
import tassoSafe from '../assets/builtIsSecurity.png'; // Immagine per la sicurezza
import tassoCustom from '../assets/tassoCustomizable.webp'; // Immagine per la flessibilità
import { Link } from 'react-router-dom';

export const BodyIronForgePage = () => {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(90deg, rgba(20,60,60,1) 0%, rgba(15,90,15,1) 100%)'
    }}>
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
        <div className="max-w-lg md:pl-10">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Iron Forge Protocol
          </h1>
          <p className="text-xl text-gray-200 mb-6">
            The leading platform for issuing blockchain-based financial instruments.
            Design and deploy structured digital pacts with transparent and automated execution.
          </p>
          <button
            className="relative w-40 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg overflow-hidden group"
          >
            <Link to={'/app.ironForge/board'} className="relative z-10">
              Launch Pacts
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </button>
        </div>
        <img
          src={tassoForgeHero}
          alt="Iron Forge Interface"
          className="rounded-2xl border-2 border-green-500/30 shadow-2xl w-full md:w-2/5 mt-8 md:mt-0"
        />
      </section>

      {/* Features Section */}
      <section className="py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          <span className="border-b-4 border-green-400 pb-2">
            Primary Issuance Features
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Feature 1 */}
          <div
            className="p-6 rounded-2xl border-2 border-green-500/20 hover:border-green-500/40 transition-colors min-h-[400px]"
            style={{
              backgroundImage: `url(${tassoTools})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="bg-black/70 rounded-lg p-6 h-full flex flex-col justify-end">
              <h3 className="text-2xl font-semibold mb-2 text-green-400">Issuance Tools</h3>
              <p className="text-gray-300">
                Configure digital pact parameters with precision using our intuitive issuance interface.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className="p-6 rounded-2xl border-2 border-green-500/20 hover:border-green-500/40 transition-colors min-h-[400px]"
            style={{
              backgroundImage: `url(${tassoSafe})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="bg-black/70 rounded-lg p-6 h-full flex flex-col justify-end">
              <h3 className="text-2xl font-semibold mb-2 text-green-400">Secure Issuance</h3>
              <p className="text-gray-300">
                Smart contract-powered issuance with full transparency and automated risk management.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className="p-6 rounded-2xl border-2 border-green-500/20 hover:border-green-500/40 transition-colors min-h-[400px]"
            style={{
              backgroundImage: `url(${tassoCustom})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="bg-black/70 rounded-lg p-6 h-full flex flex-col justify-end">
              <h3 className="text-2xl font-semibold mb-2 text-green-400">Custom Terms</h3>
              <p className="text-gray-300">
                Define reward schedules, maturity periods, and collateral requirements with full flexibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black/20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6 text-white">Start Your Pact Issuance</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the future of decentralized finance. Launch your structured digital pacts with full transparency and efficiency.
          </p>
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300">
            <Link to={'/app.ironForge/market'}>
              Begin Issuance Process
            </Link>
          </button>
          <div className="mt-8 text-sm text-gray-400">
            <p></p>
          </div>
        </div>
      </section>

    </div>
  );
};