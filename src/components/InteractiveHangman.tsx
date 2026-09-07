import React, { useEffect, useState } from 'react';
import { RefreshCw, X, AlertCircle } from 'lucide-react';

interface InteractiveHangmanProps {
  onClose: () => void;
}

const WORD_CORPUS = [
  'ALGORITHM',
  'SOCKET',
  'STREAMLIT',
  'PARQUET',
  'DATABASE',
  'COMPILER',
  'PIPELINE',
  'THREAD',
  'LATENCY',
  'SERIALIZE',
  'DISTRIBUTED',
  'CONSENSUS',
];

const HANGMAN_ASCII = [
  `
  +---+
  |   |
      |
      |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
========= [GAME OVER]`,
];

export const InteractiveHangman: React.FC<InteractiveHangmanProps> = ({ onClose }) => {
  const [targetWord, setTargetWord] = useState<string>(() => {
    return WORD_CORPUS[Math.floor(Math.random() * WORD_CORPUS.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [inputChar, setInputChar] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Body scroll control for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    const scrollControl = (window as any).PortfolioScrollControl;
    scrollControl?.openModal();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      scrollControl?.closeModal?.();
    };
  }, [onClose]);

  const wrongGuesses = Array.from(guessedLetters).filter(
    (char) => !targetWord.includes(char)
  );
  const strikes = wrongGuesses.length;
  const isGameOver = strikes >= 6;
  const isWon = targetWord.split('').every((char) => guessedLetters.has(char));

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGameOver || isWon) return;

    const char = inputChar.trim().toUpperCase();
    if (!/^[A-Z]$/.test(char)) {
      setErrorMsg('REGEX REJECT: Only single alphabetic characters [A-Z] accepted.');
      setInputChar('');
      return;
    }

    if (guessedLetters.has(char)) {
      setErrorMsg(`STATE DUPLICATE: Letter '${char}' has already been evaluated.`);
      setInputChar('');
      return;
    }

    setErrorMsg('');
    setGuessedLetters((prev) => new Set([...prev, char]));
    setInputChar('');
  };

  const handleRestart = () => {
    const nextWord = WORD_CORPUS[Math.floor(Math.random() * WORD_CORPUS.length)];
    setTargetWord(nextWord);
    setGuessedLetters(new Set());
    setInputChar('');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#080808]/90 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="hangman-title">
      <div
        className="relative w-full max-w-2xl bg-[#0E0E0E] border border-white/20 shadow-2xl flex flex-col font-['JetBrains_Mono'] overflow-hidden"
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {/* CLI Window Title Bar */}
        <div className="p-3 bg-[#141414] border-b border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#F27D26] rounded-full inline-block"></span>
            <span className="text-xs text-white uppercase font-bold tracking-wider">
              <span id="hangman-title">INTERACTIVE TERMINAL · JAVA HANGMAN</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-[#F27D26] transition-colors"
            title="Terminate Terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Body */}
        <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          <div className="text-white/50 text-[10px] sm:text-[11px] leading-relaxed border-b border-white/10 pb-3 tracking-wider">
            SYSTEM BOOT: Loaded dictionary corpus (500+ items).
            <br />
            REGEX FILTER: ^[A-Za-z]$ · DETERMINISTIC BUFFER ACTIVE.
          </div>

          {/* ASCII Scaffold Art */}
          <div className="bg-[#080808] p-3 border border-white/15 text-[#F27D26] whitespace-pre font-mono leading-none select-none text-[12px] sm:text-xs">
            {HANGMAN_ASCII[Math.min(strikes, 6)]}
          </div>

          {/* Word Masked View */}
          <div className="py-2 flex items-center justify-center gap-2 sm:gap-3">
            {targetWord.split('').map((char, index) => {
              const revealed = guessedLetters.has(char) || isGameOver;
              return (
                <div
                  key={index}
                  className={`w-7 sm:w-9 h-9 sm:h-11 flex items-center justify-center border-b-2 font-bold text-base sm:text-lg ${
                    revealed
                      ? !guessedLetters.has(char) && isGameOver
                        ? 'border-[#F27D26] text-[#F27D26]'
                        : 'border-white text-white'
                      : 'border-white/20 text-transparent'
                  }`}
                >
                  {revealed ? char : '_'}
                </div>
              );
            })}
          </div>

          {/* Strikes & Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#141414] p-2 border border-white/15 flex justify-between">
              <span className="text-white/50">STRIKES:</span>
              <span className="text-[#F27D26] font-bold">{strikes} / 6</span>
            </div>
            <div className="bg-[#141414] p-2 border border-white/15 flex justify-between">
              <span className="text-white/50">DISCARD BANK:</span>
              <span className="text-white max-w-[120px]">
                {wrongGuesses.join(', ') || 'NONE'}
              </span>
            </div>
          </div>

          {/* Status Banners */}
          {isWon && (
            <div className="p-3 bg-[#141414] border border-[#22C55E] text-[#22C55E] text-xs font-semibold uppercase flex items-center justify-between">
              <span>CONSENSUS ACHIEVED: TARGET WORD RESOLVED!</span>
              <button
                onClick={handleRestart}
                className="px-2 py-1 bg-[#22C55E] text-[#080808] font-bold flex items-center gap-1 text-[11px]"
              >
                <RefreshCw className="w-3 h-3" /> NEXT WORD
              </button>
            </div>
          )}

          {isGameOver && (
            <div className="p-3 bg-[#141414] border border-[#F27D26] text-[#F27D26] text-xs font-semibold uppercase flex items-center justify-between">
              <span>EXECUTION HALTED: OUT OF STRIKES.</span>
              <button
                onClick={handleRestart}
                className="px-2 py-1 bg-[#F27D26] text-[#080808] font-bold flex items-center gap-1 text-[11px]"
              >
                <RefreshCw className="w-3 h-3" /> RESTART
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="p-2 bg-[#141414] border border-[#F27D26]/50 text-[#F27D26] text-xs flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Command Prompt Input */}
          {!isGameOver && !isWon && (
            <form onSubmit={handleGuess} className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-[#F27D26] font-bold">&gt;</span>
                <input
                  type="text"
                  maxLength={1}
                  value={inputChar}
                  onChange={(e) => setInputChar(e.target.value)}
                  placeholder="GUESS LETTER [A-Z]..."
                  className="w-full pl-7 pr-3 py-2 bg-[#141414] border border-white/15 text-white text-xs focus:border-[#F27D26] focus:outline-none uppercase"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#F27D26] text-[#080808] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#FF9142] transition-colors"
              >
                SUBMIT
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
