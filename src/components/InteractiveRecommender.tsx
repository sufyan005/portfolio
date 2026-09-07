import React, { useState, useId } from 'react';
import { Star, X, GitFork, Github, MoreVertical, Crown, Film } from 'lucide-react';
import { MOVIE_DATABASE } from '../data/movieDatabase';

interface InteractiveRecommenderProps {
  onClose: () => void;
}

const DATABASE = MOVIE_DATABASE;
const MOVIE_KEYS = Object.keys(DATABASE);

// Fallback image component to guarantee posters render crisply without zoom or blur
const MoviePoster: React.FC<{
  src: string;
  alt: string;
  year?: number;
  rating?: number;
  className?: string;
}> = ({ src, alt, year, rating, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-[#1c1f2b] via-[#14161f] to-[#0c0e14] flex flex-col items-center justify-between p-3 text-center border border-white/10 select-none ${className}`}
      >
        <div className="w-full flex items-center justify-between text-[10px] text-white/50 font-mono">
          <span>{year || 'FILM'}</span>
          {rating && <span className="text-[#f5c518] font-semibold">★ {rating}</span>}
        </div>
        <div className="flex flex-col items-center gap-1.5 my-auto px-1">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
            <Film className="w-4 h-4 text-white/70" />
          </div>
          <span className="text-xs text-white font-medium line-clamp-3 leading-snug tracking-tight text-center">
            {alt}
          </span>
        </div>
        <div className="w-full text-center">
          <span className="text-[9px] uppercase tracking-wider text-white/30 font-mono">
            CINEMA
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`${className} object-cover object-center`}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
};

export const InteractiveRecommender: React.FC<InteractiveRecommenderProps> = ({ onClose }) => {
  const [selectedMovie, setSelectedMovie] = useState<string>('Batman Begins');
  const [sliderValue, setSliderValue] = useState<number>(10);
  const [activeRecCount, setActiveRecCount] = useState<number>(10);
  const [activeSeedMovie, setActiveSeedMovie] = useState<string>('Batman Begins');
  const [hasRecommended, setHasRecommended] = useState<boolean>(true);
  const selectId = useId();

  const currentSeedData = DATABASE[activeSeedMovie] || DATABASE['Batman Begins'];
  const displayedRecs = currentSeedData.recommendations.slice(0, activeRecCount);

  // Percentage for the custom slider track and floating indicator
  const sliderPercentage = ((sliderValue - 5) / (20 - 5)) * 100;

  const handleRecommendClick = () => {
    setActiveSeedMovie(selectedMovie);
    setActiveRecCount(sliderValue);
    setHasRecommended(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div
        id="streamlit-movie-recommender-window"
        className="relative w-full max-w-5xl bg-[#0e1117] text-[#fafafa] font-sans rounded-xl shadow-2xl border border-white/10 flex flex-col max-h-[96vh] overflow-hidden my-auto"
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Streamlit Top Nav / App Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#0e1117] text-white/70 select-none">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎬</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              movie-recommender.streamlit.app
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-normal">
            <a
              href="https://movie-recommender-for-all.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Fork app"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Fork</span>
            </a>

            <a
              href="https://github.com/sufyan-19/Movie-recommender-system"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-1"
              title="GitHub repository"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              type="button"
              className="hover:text-white transition-colors p-1"
              title="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              type="button"
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              title="Close simulator"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Streamlit App Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-10 py-6 sm:py-8 space-y-7">
          {/* Main Title: 🎬 Movie Recommender */}
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl select-none" role="img" aria-label="movie clapper">
              🎬
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Movie Recommender
            </h1>
          </div>

          {/* Form Controls Section */}
          <div className="space-y-6 max-w-3xl">
            {/* Choose a movie */}
            <div className="space-y-2">
              <label
                htmlFor={selectId}
                className="block text-sm text-[#fafafa] font-normal"
              >
                Choose a movie
              </label>
              <div className="relative">
                <select
                  id={selectId}
                  value={selectedMovie}
                  onChange={(e) => setSelectedMovie(e.target.value)}
                  className="w-full appearance-none bg-[#262730] border border-white/20 text-white text-sm rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-[#ff4b4b] cursor-pointer transition-colors"
                >
                  {MOVIE_KEYS.map((key) => (
                    <option key={key} value={key} className="bg-[#262730] text-white">
                      {key}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/60">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Number of recommendations Slider */}
            <div className="space-y-2">
              <label className="block text-sm text-[#fafafa] font-normal">
                Number of recommendations
              </label>

              {/* Slider Track with Floating Number Indicator */}
              <div className="relative pt-6 pb-2">
                {/* Floating Red Number directly above the thumb */}
                <div
                  className="absolute top-0 -translate-x-1/2 text-xs font-semibold text-[#ff4b4b] pointer-events-none select-none transition-all duration-75"
                  style={{ left: `${sliderPercentage}%` }}
                >
                  {sliderValue}
                </div>

                {/* Range Input with Streamlit Red Track and Thumb */}
                <input
                  type="range"
                  min={5}
                  max={20}
                  step={5}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full cursor-pointer appearance-none bg-transparent focus:outline-none"
                  style={{
                    height: '4px',
                    borderRadius: '9999px',
                    background: `linear-gradient(to right, #ff4b4b 0%, #ff4b4b ${sliderPercentage}%, #31333F ${sliderPercentage}%, #31333F 100%)`,
                  }}
                />

                {/* Left (5) and Right (20) Labels */}
                <div className="flex justify-between text-xs text-white/60 pt-1.5 font-normal select-none">
                  <span>5</span>
                  <span>20</span>
                </div>
              </div>
            </div>

            {/* Recommend Button */}
            <div>
              <button
                type="button"
                onClick={handleRecommendClick}
                className="bg-transparent hover:bg-[#262730] active:bg-[#ff4b4b]/10 border border-white/20 hover:border-white/40 active:border-[#ff4b4b] text-white text-sm font-medium px-5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Recommend
              </button>
            </div>
          </div>

          {/* Recommendation Results (Matches Image 2 & Image 3) */}
          {hasRecommended && (
            <div className="space-y-6 pt-2 border-t border-white/5">
              {/* Seed Movie Banner (Image 2) */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Seed Movie Poster Column */}
                <div className="shrink-0 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#fafafa] font-normal">
                    <Star className="w-3.5 h-3.5 fill-[#f5c518] text-[#f5c518]" />
                    <span>{currentSeedData.baseRating}/10</span>
                  </div>
                  <div className="w-28 sm:w-36 md:w-40 aspect-[2/3] rounded-lg overflow-hidden shadow-xl bg-[#262730]">
                    <MoviePoster
                      src={currentSeedData.basePoster}
                      alt={activeSeedMovie}
                      year={currentSeedData.baseYear}
                      rating={currentSeedData.baseRating}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Seed Movie Heading Column */}
                <div className="pt-2 sm:pt-6 space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                    Because you liked <span className="italic font-normal">{activeSeedMovie}</span>
                  </h2>
                  <p className="text-sm text-[#fafafa] font-normal">
                    Showing {activeRecCount} similar titles:
                  </p>
                </div>
              </div>

              {/* 5-Column Grid of Recommendations (Image 3) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5 pt-2">
                {displayedRecs.map((rec) => (
                  <div key={rec.id} className="flex flex-col space-y-1.5 group">
                    {/* Rating at top with gold star */}
                    <div className="flex items-center gap-1 text-xs text-[#fafafa] font-normal">
                      <Star className="w-3 h-3 fill-[#f5c518] text-[#f5c518] shrink-0" />
                      <span>{rec.rating}/10</span>
                    </div>

                    {/* Movie Poster */}
                    <div className="aspect-[2/3] w-full rounded-lg overflow-hidden bg-[#262730] shadow-md transition-transform duration-200 group-hover:scale-[1.02]">
                      <MoviePoster
                        src={rec.poster}
                        alt={rec.title}
                        year={rec.year}
                        rating={rec.rating}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Movie Title Underneath */}
                    <h3 className="text-sm font-normal text-white line-clamp-2 leading-snug">
                      {rec.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Streamlit Footer Bar / Floating Watermark */}
        <div className="px-5 py-2.5 bg-[#0e1117] border-t border-white/5 flex items-center justify-between text-xs text-white/40">
          <a
            href="https://movie-recommender-for-all.streamlit.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors flex items-center gap-1.5 font-mono text-[11px]"
          >
            <span>LIVE DEMO: movie-recommender-for-all.streamlit.app</span>
          </a>

          {/* Streamlit Cloud Badges */}
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow"
              title="Streamlit App"
            >
              <span className="text-[9px] font-black text-[#0e1117]">T</span>
            </div>
            <div
              className="px-2 py-0.5 rounded bg-[#ff4b4b] text-white flex items-center gap-1 font-bold text-[10px] shadow"
              title="Hosted on Streamlit Community Cloud"
            >
              <Crown className="w-3 h-3 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
