import { Link } from 'react-router-dom';
//import tassoPact from '../assets/Tasso Pact.png'
import { NewPactForm } from './components/NewPactForm/NewPactForm';

export default function BodyNewPact() {


    return (
        <div className="flex flex-col justify-center p-8 ">
            <h1 className='text-6xl text-center font-bold text-white'>New Pact Section</h1>
            <div className='flex flex-col p-6 space-y-2 '>
                <h4 className='text-white font-semibold text-2xl mb-4'>Instruction Life Cycle Pact</h4>
                <div className='flex-row'>
                    <ul className='text-gray-200 space-y-3'>
                        <li className='flex items-center space-x-2'>
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span>Create new pact by filling out this form</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Admins can view your pact on the dashboard section in the Pact Card</span>
                        </li>
                        <li className='flex items-center space-x-2'>
                            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span>Sell your Pacts on <Link className='underline font-semibold text-blue-400 hover:text-blue-300' to={'/app.ironForge/board'}>Iron Forge</Link> to collect liquidity</span>
                        </li>
                    </ul>
                </div>
            </div>
            <NewPactForm />
        </div>
    );
}
