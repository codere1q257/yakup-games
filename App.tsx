import React, { useState } from 'react';
import { Header } from './components/Header';
import { GameCard } from './components/GameCard';
import { AvatarModal } from './components/AvatarModal';
import { SnakeGame } from './games/SnakeGame';
import { ClickerGame } from './games/ClickerGame';
import { Game2048 } from './games/Game2048';
import { GameConfig, GameState } from './types';
import { ArrowLeft, Gamepad2, Stars } from 'lucide-react';

const GAMES: GameConfig[] = [
  {
    id: 'avatar-creator',
    title: 'Face Recognition Avatar',
    category: 'AI Tools',
    image: 'https://picsum.photos/seed/tech/600/400',
    isBeta: true,
    isHot: true
  },
  {
    id: 'snake',
    title: 'Neon Snake Legacy',
    category: 'Arcade',
    image: 'https://picsum.photos/seed/snake/600/400',
    isNew: true,
    component: <SnakeGame />
  },
  {
    id: 'clicker',
    title: 'Yakup Coin Miner',
    category: 'Simulation',
    image: 'https://picsum.photos/seed/money/600/400',
    component: <ClickerGame />
  },
  {
    id: '2048',
    title: '2048: Brain Edition',
    category: 'Puzzle',
    image: 'https://picsum.photos/seed/puzzle/600/400',
    component: <Game2048 />
  },
  // Filler cards for grid aesthetics
  { id: 'filler1', title: 'Cyber Racer 3000', category: 'Racing', image: 'https://picsum.photos/seed/car/600/400' },
  { id: 'filler2', title: 'Dungeon Master', category: 'RPG', image: 'https://picsum.photos/seed/fantasy/600/400' },
  { id: 'filler3', title: 'Space Invaders Redux', category: 'Shooter', image: 'https://picsum.photos/seed/space/600/400' },
  { id: 'filler4', title: 'Farm Valley', category: 'Casual', image: 'https://picsum.photos/seed/farm/600/400' },
];

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameConfig | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleGameClick = (game: GameConfig) => {
    if (game.id === 'avatar-creator') {
      setShowAvatarModal(true);
    } else if (game.component) {
      setActiveGame(game);
    } else {
      // Placeholder interaction
      alert("Coming soon to Yakup Games!");
    }
  };

  const closeGame = () => setActiveGame(null);

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-800 font-sans">
      <Header />
      
      {showAvatarModal && (
        <AvatarModal onClose={() => setShowAvatarModal(false)} />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeGame ? (
          // Game View
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={closeGame}
              className="mb-4 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors font-medium"
            >
              <ArrowLeft size={20} /> Back to Portal
            </button>
            <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden h-[80vh] w-full border border-gray-200">
               {/* Embed game component */}
               <div className="w-full h-full p-4">
                 {activeGame.component}
               </div>
            </div>
          </div>
        ) : (
          // Portal Grid View
          <div className="space-y-10 animate-in fade-in duration-700">
            
            {/* Hero / Welcome Section */}
            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[30px] p-8 md:p-12 overflow-hidden shadow-2xl text-white">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Gamepad2 size={300} />
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4 bg-white/20 backdrop-blur-sm w-fit px-3 py-1 rounded-full text-sm font-medium">
                  <Stars size={16} className="text-yellow-300" /> 
                  <span>Welcome back, Yakup</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                  Ready to level up? <br/>
                  Your exclusive portal awaits.
                </h1>
                <p className="text-indigo-100 text-lg mb-8 max-w-lg">
                  Access premium games, create your AI avatar, and dominate the leaderboards in style.
                </p>
                <button 
                   onClick={() => setShowAvatarModal(true)}
                   className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20"
                >
                  Create Avatar
                </button>
              </div>
            </div>

            {/* Grid Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                   <Gamepad2 className="text-indigo-600" />
                   Trending Now
                 </h2>
                 <span className="text-sm font-semibold text-indigo-600 cursor-pointer hover:underline">View All</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {GAMES.map((game) => (
                  <GameCard key={game.id} game={game} onClick={handleGameClick} />
                ))}
              </div>
            </div>
            
            {/* Footer-ish content */}
            <div className="mt-12 text-center text-gray-400 text-sm pb-8">
              <p>&copy; 2024 Yakup Games Inc. All rights reserved. Premium Experience.</p>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default App;