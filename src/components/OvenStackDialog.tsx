import React, { useState } from 'react';
import { X, Layers, Check, AlertTriangle } from 'lucide-react';
import { useKitchen } from '../store/KitchenContext';
import { Vector3 } from 'three';

interface OvenStackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ovenId: string;
  position: Vector3;
  rotation: number;
  baseOven: any;
}

const OvenStackDialog: React.FC<OvenStackDialogProps> = ({
  isOpen,
  onClose,
  ovenId,
  position,
  rotation,
  baseOven
}) => {
  const { placeItem, updateOvenStack } = useKitchen();
  const [selectedOption, setSelectedOption] = useState<'stack' | 'replace'>('stack');

  const handleConfirm = () => {
    if (selectedOption === 'stack') {
      // ✅ FIXED: Place oven at same X,Z position but mark as stacked
      const stackedPosition = new Vector3(
        baseOven.position.x,
        0, // ✅ CRITICAL: Keep Y at 0, stacking is handled in DraggableObject
        baseOven.position.z
      );
      
      placeItem(ovenId, stackedPosition, rotation);
      
      // Mark both ovens as stacked
      setTimeout(() => {
        updateOvenStack(baseOven.id, ovenId);
      }, 100);
      
    } else {
      // Replace existing oven
      // This would remove the base oven and place the new one
      // For now, we'll just place normally
      placeItem(ovenId, position, rotation);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Layers className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">הנחת תנור</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6 border border-orange-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-orange-600 mt-1" size={20} />
            <div>
              <h3 className="font-bold text-orange-800 mb-1">זוהה תנור קיים במיקום זה</h3>
              <p className="text-orange-700 text-sm">
                ניתן להניח תנור מעל התנור הקיים או להחליף אותו
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selectedOption === 'stack'
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="ovenPlacement"
              value="stack"
              checked={selectedOption === 'stack'}
              onChange={(e) => setSelectedOption(e.target.value as any)}
              className="text-orange-500 focus:ring-orange-500"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Layers size={16} className="text-orange-600" />
                הנח מעל התנור הקיים
              </div>
              <div className="text-sm text-gray-600">
                יוצר מגדל תנורים - התנור החדש יוקם מעל הקיים
              </div>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selectedOption === 'replace'
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="radio"
              name="ovenPlacement"
              value="replace"
              checked={selectedOption === 'replace'}
              onChange={(e) => setSelectedOption(e.target.value as any)}
              className="text-orange-500 focus:ring-orange-500"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900">החלף את התנור הקיים</div>
              <div className="text-sm text-gray-600">
                התנור הקיים יוסר והחדש יוקם במקומו
              </div>
            </div>
          </label>
        </div>
        
        <div className="flex gap-3 pt-6">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            ביטול
          </button>
          <button 
            onClick={handleConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Check size={16} />
            אישור
          </button>
        </div>
      </div>
    </div>
  );
};

export default OvenStackDialog;