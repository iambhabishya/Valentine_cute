import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const { width, height } = useWindowSize();
  
  // Calculate button size - grows with each 'No'
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  // Dynamic text based on how many times 'No' has been clicked
  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Pookie please?",
      "Don't do this to me :(",
      "I'm gonna cry...",
      "You're breaking my heart 💔",
      "I'll give you cookies!",
      "I'll give you a massage!",
      "I'll do the dishes!",
      "Pretty please?",
      "Have a heart!",
      "Don't be so cold!",
      "Is that your final answer?",
      "I am dying inside...",
      "Just say YES already! 😠",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // Dynamic GIF based on state
  const getBearGif = () => {
    if (yesPressed) {
      return "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"; // Kissing/Hugging
    }
    if (noCount === 0) {
      return "https://media.tenor.com/brd8C0hNqDcAAAAi/bear-love.gif"; // Cute staring/waiting
    }
    if (noCount > 0 && noCount < 5) {
      return "https://media.tenor.com/f1xnRxTRxLAAAAAi/bear-wallow-sad.gif"; // Sad/Shocked
    }
    if (noCount >= 5) {
      return "https://media.tenor.com/j1v2iT4zYfIAAAAi/bear-cry-crying.gif"; // Crying hard
    }
    return "https://media.tenor.com/brd8C0hNqDcAAAAi/bear-love.gif";
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 p-4 overflow-hidden selection:bg-rose-300">
      
      {/* Celebration Confetti */}
      {yesPressed && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}

      {/* Background Floating Elements */}
      <FloatingBackground />

      <div className="z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {yesPressed ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex flex-col items-center justify-center space-y-6 rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur-sm border-4 border-rose-200"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative"
              >
                <img
                  src={getBearGif()}
                  alt="Bears kissing"
                  className="h-64 rounded-xl shadow-lg border-4 border-rose-100"
                />
                <motion.div 
                  className="absolute -top-6 -right-6 text-rose-500"
                  animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Stars size={48} fill="currentColor" />
                </motion.div>
              </motion.div>

              <div className="space-y-4 text-center">
                <h1 className="font-handwriting text-5xl font-bold text-rose-600 drop-shadow-sm">
                  Yayyy! I knew it! ❤️
                </h1>
                <p className="text-xl text-rose-800 font-medium">
                   You just made me the happiest bear alive!
                </p>
                <p className="text-lg text-rose-600">
                   Happy Valentine's Day!
                </p>
              </div>

              <div className="flex gap-4 text-rose-500">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ delay: i * 0.1, repeat: Infinity, duration: 1.5 }}
                  >
                    <Heart fill="currentColor" size={32} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex flex-col items-center space-y-8 rounded-3xl bg-white/60 p-8 shadow-xl backdrop-blur-sm border-2 border-white"
            >
              <motion.div
                  key={noCount} // Re-animate when image changes
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative"
              >
                  <img
                    src={getBearGif()}
                    alt="Cute bear asking"
                    className="h-64 rounded-xl shadow-lg mix-blend-multiply filter contrast-110"
                  />
              </motion.div>
              
              <h1 className="font-handwriting text-4xl font-bold text-rose-600 md:text-6xl text-center leading-tight drop-shadow-sm">
                Will you be my Valentine?
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 w-full">
                <motion.button
                  className="rounded-xl bg-gradient-to-r from-green-400 to-green-600 px-8 py-4 font-bold text-white shadow-lg hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 whitespace-nowrap z-20"
                  style={{ fontSize: Math.min(yesButtonSize, 100) }} // Cap size to prevent breaking layout too much
                  onClick={() => setYesPressed(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: ["0px 10px 15px -3px rgba(0,0,0,0.1)", "0px 20px 25px -5px rgba(0,0,0,0.1)", "0px 10px 15px -3px rgba(0,0,0,0.1)"]
                   }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                   }}
                >
                  YES <span className="text-[0.8em]">❤️</span>
                </motion.button>
                
                <motion.button
                  onClick={handleNoClick}
                  className="rounded-xl bg-rose-400 px-6 py-3 font-bold text-white shadow-md hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-200"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ x: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {getNoButtonText()}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="fixed bottom-4 text-rose-400 text-sm font-medium opacity-80">
        Made with ❤️ for you
      </div>
    </div>
  );
}

// Separate component for background to keep App clean
function FloatingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: "110vh", 
            x: Math.random() * 100 + "vw",
            rotate: Math.random() * 360
          }}
          animate={{ 
            opacity: [0, 0.4, 0], 
            y: "-10vh",
            rotate: Math.random() * 360 + 360
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute text-rose-200"
          style={{
             scale: Math.random() * 1 + 0.5
          }}
        >
          <Heart fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
