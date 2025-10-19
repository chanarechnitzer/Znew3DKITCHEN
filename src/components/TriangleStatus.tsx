import React from 'react';
import { Check, X } from 'lucide-react';
import { TriangleValidation } from '../store/KitchenContext';

interface TriangleStatusProps {
  validation: TriangleValidation;
  isComplete: boolean;
}

const TriangleStatus: React.FC<TriangleStatusProps> = ({ validation, isComplete }) => {
  const { isValid, sides } = validation;
  
  const formatDistance = (distance: number) => {
    return distance.toFixed(2);
  };
  
  const isValidSide = (distance: number) => {
    return distance > 1.2 && distance < 5;
  };

  const getValidationMessage = () => {
    if (isComplete) {
      return (
        <div className="bg-success/10 border border-success rounded p-3 mb-4">
          <p className="flex items-center gap-2 text-success font-medium">
            <Check size={18} className="text-success" />
            כל הכבוד! המשולש תקין
          </p>
        </div>
      );
    }

    const invalidSides = [];
    if (!isValidSide(sides.sinkToStove)) invalidSides.push('כיור - כיריים');
    if (!isValidSide(sides.sinkToRefrigerator)) invalidSides.push('כיור - מקרר');
    if (!isValidSide(sides.stoveToRefrigerator)) invalidSides.push('כיריים - מקרר');

    if (invalidSides.length > 0) {
      return (
        <div className="bg-danger/10 border border-danger rounded p-3 mb-4">
          <p className="flex items-center gap-2 text-danger font-medium">
            <X size={18} className="text-danger" />
            המרחקים הבאים אינם תקינים:
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-danger">
            {invalidSides.map((side) => (
              <li key={side}>{side}</li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-6 ${isComplete ? 'border-2 border-primary animate-pulse-gold' : ''}`}>
      <h2 className="text-xl font-bold mb-2 text-primary-dark">המשולש הזהב</h2>
      
      {getValidationMessage()}
      
      <div className="space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <p>כיור - כיריים:</p>
          <div className="flex items-center gap-2">
            <span className={isValidSide(sides.sinkToStove) ? 'text-success' : 'text-danger'}>
              {formatDistance(sides.sinkToStove)} מ'
            </span>
            {isValidSide(sides.sinkToStove) ? (
              <Check size={16} className="text-success" />
            ) : (
              <X size={16} className="text-danger" />
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center border-b pb-2">
          <p>כיור - מקרר:</p>
          <div className="flex items-center gap-2">
            <span className={isValidSide(sides.sinkToRefrigerator) ? 'text-success' : 'text-danger'}>
              {formatDistance(sides.sinkToRefrigerator)} מ'
            </span>
            {isValidSide(sides.sinkToRefrigerator) ? (
              <Check size={16} className="text-success" />
            ) : (
              <X size={16} className="text-danger" />
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p>כיריים - מקרר:</p>
          <div className="flex items-center gap-2">
            <span className={isValidSide(sides.stoveToRefrigerator) ? 'text-success' : 'text-danger'}>
              {formatDistance(sides.stoveToRefrigerator)} מ'
            </span>
            {isValidSide(sides.stoveToRefrigerator) ? (
              <Check size={16} className="text-success" />
            ) : (
              <X size={16} className="text-danger" />
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-blue-50 p-3 rounded text-sm">
        <p>כל צלע של המשולש חייבת להיות ארוכה מ-1.2 מטר וקצרה מ-5 מטר</p>
      </div>
    </div>
  );
};

export default TriangleStatus;