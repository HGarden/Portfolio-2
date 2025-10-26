import songs from "./songs";

export default function MusicContainer() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {songs.map((song, index) => (
                <div key={index} className="card p-6 elevation">
                    <div className="flex items-center mb-4">
                        <div className="w-4 h-4 rounded-full mr-3 sheen decoration"></div>
                        <div className="text-xl font-bold heading">
                            <span className="decoration">🎵</span> {song.artist}
                        </div>
                    </div>
                    <div className="text-lg subheading mb-4 font-medium">
                        "{song.title}" <span className="decoration">✨</span>
                    </div>
                    <div className="glass rounded-2xl p-4 mb-4">
                        <div className="text-sm text-gray-500 mb-2 font-medium">
                            <span className="decoration">🎧</span> Now Playing...
                        </div>
                        <audio 
                            controls 
                            className="w-full rounded-lg"
                            style={{
                                background: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: '12px'
                            }}
                        >
                            <source src={song.url} type="audio/mpeg" />
                            Your browser doesn't support audio playback 
                        </audio>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 font-medium">
                            <span className="decoration">💫</span> Enjoy the vibes! <span className="decoration">🌊</span>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
