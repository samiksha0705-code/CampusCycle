import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white/95 backdrop-blur-md border border-emerald-100 shadow-xl shadow-emerald-950/10 rounded-2xl p-4 flex items-start gap-3.5"
        >
          <div className={`p-2 rounded-xl shrink-0 ${
            toastMessage.type === 'eco' 
              ? 'bg-lime-100 text-lime-700' 
              : toastMessage.type === 'info' 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-emerald-600 text-white'
          }`}>
            {toastMessage.type === 'eco' ? (
              <Sparkles className="w-5 h-5" />
            ) : toastMessage.type === 'info' ? (
              <Info className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-emerald-950 truncate">
              {toastMessage.title}
            </h4>
            <p className="text-xs text-emerald-800/80 mt-0.5 leading-relaxed">
              {toastMessage.desc}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
