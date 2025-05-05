
import React from 'react';
import { Star, Gift, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const LoyaltySystem: React.FC = () => {
  // Données fictives pour le système de fidélité
  const userPoints = 350;
  const nextRewardThreshold = 500;
  const progressPercentage = (userPoints / nextRewardThreshold) * 100;
  
  const userLevel = "Silver";
  const nextLevel = "Gold";
  
  const availableRewards = [
    { id: 1, name: "Réduction de 10%", points: 200, icon: <Gift size={16} className="text-autowise-blue" /> },
    { id: 2, name: "Surclassement gratuit", points: 500, icon: <Award size={16} className="text-amber-500" /> },
    { id: 3, name: "Location journée offerte", points: 1000, icon: <Star size={16} className="text-yellow-500" /> },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Star className="mr-2 text-yellow-500" />
        Programme de fidélité
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 shadow-sm border">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Vos points</h3>
            <span className="text-xl font-bold text-autowise-blue">{userPoints}</span>
          </div>
          <p className="text-sm text-gray-600">Continuez à louer pour gagner plus de points!</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 shadow-sm border">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Niveau actuel</h3>
            <span className="text-base font-semibold px-3 py-1 bg-gray-100 rounded-full">
              {userLevel}
            </span>
          </div>
          <p className="text-sm text-gray-600">Prochain niveau: {nextLevel}</p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 shadow-sm border">
          <h3 className="font-medium mb-2">Progression</h3>
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <p className="text-sm text-gray-600">{userPoints} / {nextRewardThreshold} points pour la prochaine récompense</p>
        </div>
      </div>
      
      <h3 className="text-lg font-medium mb-3">Récompenses disponibles</h3>
      <div className="space-y-3">
        {availableRewards.map(reward => (
          <div key={reward.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center">
              {reward.icon}
              <span className="ml-2">{reward.name}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3 font-medium">{reward.points} points</span>
              <button 
                className={`px-3 py-1 rounded text-sm font-medium ${userPoints >= reward.points ? 'bg-autowise-blue text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                disabled={userPoints < reward.points}
              >
                Échanger
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoyaltySystem;
