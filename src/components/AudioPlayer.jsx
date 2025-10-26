import { useState, useRef, useEffect, useCallback } from 'react';
import songs from './songs';

export default function AudioPlayer() {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const audioRef = useRef(null);

    const currentSong = songs[currentSongIndex];

    // Next track handler (supports shuffle)
    const handleNext = useCallback(() => {
        setCurrentSongIndex((prev) => {
            if (!isShuffle) return (prev + 1) % songs.length;
            if (songs.length <= 1) return prev;
            let next;
            do {
                next = Math.floor(Math.random() * songs.length);
            } while (next === prev);
            return next;
        });
        setIsPlaying(true);
    }, [isShuffle]);

    // Update current time
    useEffect(() => {
        const audio = audioRef.current;
        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        if (audio) {
            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);
            audio.addEventListener('ended', handleNext);

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
                audio.removeEventListener('ended', handleNext);
            };
        }
    }, [currentSongIndex, handleNext]);

    // Update volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Open player on global event
    useEffect(() => {
        const openPlayer = () => {
            setIsVisible(true);
            setIsExpanded(true);
        };
        window.addEventListener('open-player', openPlayer);
        return () => window.removeEventListener('open-player', openPlayer);
    }, []);

    // Play a specific song when requested globally
    useEffect(() => {
        const playSong = (e) => {
            try {
                const idx = e?.detail?.index;
                if (typeof idx === 'number' && idx >= 0 && idx < songs.length) {
                    setCurrentSongIndex(idx);
                    setIsPlaying(true);
                    setIsVisible(true);
                    setIsExpanded(true);
                }
            } catch (err) {
                console.error('Failed to handle play-song event', err);
            }
        };
        window.addEventListener('play-song', playSong);
        return () => window.removeEventListener('play-song', playSong);
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePrevious = () => {
        setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(true);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const clickX = e.nativeEvent.offsetX;
        const width = e.currentTarget.offsetWidth;
        const newTime = (clickX / width) * duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Auto-play when song changes
    useEffect(() => {
        const audio = audioRef.current;
        if (audio && isPlaying) {
            audio.play().catch(console.error);
        }
    }, [currentSongIndex, isPlaying]);

    return (
        <>
            {/* Playlist Panel (appears to the left) */}
            {showPlaylist && isExpanded && (
                <div className="fixed bottom-6 right-[28rem] z-50 transition-all duration-500 ease-in-out">
                    <div className="card p-4 w-80 h-96 flex flex-col elevation">
                        <div className="flex justify-between items-center mb-4 flex-shrink-0">
                            <h4 className="text-lg font-bold heading">Playlist</h4>
                            <button 
                                onClick={() => setShowPlaylist(false)}
                                className="text-white/60 hover:text-white/90 text-sm px-2 py-1 rounded transition-colors"
                            >
                                Close
                            </button>
                        </div>
                        
                        {/* Scrollable playlist area */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 pr-1">
                            {songs.map((song, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setCurrentSongIndex(index);
                                        setIsPlaying(true);
                                    }}
                                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                        index === currentSongIndex 
                                            ? 'bg-teal-500/15 border border-teal-400/50 shadow-md' 
                                            : 'bg-white/5 hover:bg-white/10 hover:shadow-sm'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                            index === currentSongIndex && isPlaying 
                                                ? 'bg-green-400 animate-pulse' 
                                                : 'bg-white/40'
                                        }`}></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-white/90 truncate text-sm">{song.title}</div>
                                            <div className="text-xs text-white/70 truncate">{song.artist}</div>
                                        </div>
                                        <div className="text-xs text-white/60 font-medium flex-shrink-0">
                                            #{String(index + 1).padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Footer with track count */}
                        <div className="mt-4 pt-3 border-t border-gray-200/30 flex-shrink-0">
                            <div className="text-xs subheading">
                                <span className="decoration">🎶</span> {songs.length} tracks total <span className="decoration">✨</span>
                            </div>
                            {songs.length > 8 && (
                                <div className="text-xs text-gray-400 mt-1">
                                    <span className="decoration">📜</span> Scroll to see more tracks
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Audio Player */}
            <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
                
                {/* Collapsed Mini Player */}
                {!isExpanded && (
                    <div className="glass rounded-full p-4 elevation cursor-pointer hover:scale-105 transition-all duration-300"
                         onClick={() => setIsExpanded(true)}>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlayPause();
                                }}
                                aria-label={isPlaying ? 'Pause' : 'Play'}
                                className={`button w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isPlaying ? 'ring-1 ring-teal-500/40' : ''}`}
                            >
                                {isPlaying ? (
                                    // Pause icon
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <rect x="6" y="5" width="4" height="14"></rect>
                                        <rect x="14" y="5" width="4" height="14"></rect>
                                    </svg>
                                ) : (
                                    // Play icon
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M8 5v14l11-7z"></path>
                                    </svg>
                                )}
                            </button>
                            <div className="text-sm font-medium text-gray-700 max-w-32 truncate">{currentSong.title}</div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsVisible(false);
                                    setShowPlaylist(false);
                                }}
                                className="text-gray-400 hover:text-gray-600 text-lg"
                                aria-label="Close player"
                            >
                                ✖️
                            </button>
                        </div>
                    </div>
                )}

                {/* Expanded Full Player */}
                {isExpanded && (
                    <div className="card p-6 w-96 max-h-[28rem] overflow-y-auto elevation">
                        {/* Header with collapse button */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold heading">
                                Now Playing
                            </h3>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setShowPlaylist(false);
                                    }}
                                    className="text-gray-400 hover:text-gray-600 text-sm px-2 py-1 rounded"
                                >
                                    ➖
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsVisible(false);
                                        setShowPlaylist(false);
                                    }}
                                    className="text-gray-400 hover:text-gray-600 text-sm px-2 py-1 rounded"
                                >
                                    ✖️
                                </button>
                            </div>
                        </div>

                        {/* Current Song Display */}
                        <div className="glass rounded-2xl p-4 mb-4 sheen">
                            <div className="mb-4">
                                <div className="text-lg font-bold heading">{currentSong.artist}</div>
                                <div className="text-sm subheading">"{currentSong.title}"</div>
                                <div className="text-xs text-gray-500">
                                    Track {currentSongIndex + 1} of {songs.length}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div 
                                    className="w-full h-2 bg-white/30 rounded-full cursor-pointer relative overflow-hidden"
                                    onClick={handleSeek}
                                >
                                    <div 
                                        className="h-full rounded-full transition-all duration-300"
                                        style={{ 
                                            width: `${(currentTime / duration) * 100 || 0}%`, 
                                            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)'
                                        }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600 mt-1">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <button onClick={handlePrevious} className="button px-3 py-2 text-sm">Prev</button>
                                
                                <button
                                    onClick={togglePlayPause}
                                    className={`button px-6 py-2 ${isPlaying ? 'ring-1 ring-teal-500/40' : ''}`}
                                >
                                    {isPlaying ? 'Pause' : 'Play'}
                                </button>
                                
                                <button onClick={handleNext} className="button px-3 py-2 text-sm">Next</button>
                            </div>

                            {/* Volume Control */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs">Vol</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="flex-1 h-1 appearance-none bg-white/30 rounded cursor-pointer"
                                />
                                <span className="text-xs w-8">{Math.round(volume * 100)}%</span>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center justify-between gap-2 mt-2">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setCurrentSongIndex(0);
                                        setIsPlaying(true);
                                    }}
                                    className="button px-3 py-2 text-sm"
                                >
                                    Play all
                                </button>
                                <button 
                                    onClick={() => setIsShuffle(v => !v)}
                                    className={`${isShuffle ? 'bg-blue-200 text-blue-700' : 'button'} px-3 py-2 text-sm rounded-full`}
                                >
                                    Shuffle {isShuffle ? 'On' : 'Off'}
                                </button>
                            </div>
                            <button 
                                onClick={() => setShowPlaylist(!showPlaylist)}
                                className={`${
                                    showPlaylist 
                                        ? 'bg-blue-200 text-blue-700' 
                                        : 'button'
                                } px-4 py-2 rounded-full transition-all duration-300`}
                            >
                                {showPlaylist ? 'Hide' : 'Show'} Playlist
                            </button>
                        </div>
                    </div>
                )}

                {/* Hidden Audio Element */}
                <audio
                    ref={audioRef}
                    src={currentSong.url}
                    preload="metadata"
                />
            </div>

            {/* Show/Hide Toggle Button (when player is hidden) */}
            {!isVisible && (
                <button
                    onClick={() => setIsVisible(true)}
                    className="fixed bottom-6 right-6 z-40 glass rounded-full px-4 py-3 elevation hover:scale-110 transition-all duration-300 text-sm font-medium"
                >
                    Player
                </button>
            )}
        </>
    );
}
