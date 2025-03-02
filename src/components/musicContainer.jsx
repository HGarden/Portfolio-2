import songs from "./songs";

export default function MusicContainer() {
    return (
        <div className="grid grid-cols-1 gap-4">
            {songs.map((song, index) => (
                <div key={index} className="card bg-base-100 shadow-md rounded-box p-4">
                    <div className="card-body">
                        <div className="card-title">{song.artist}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{song.title}</div>
                        <audio controls className="mt-2">
                            <source src={song.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            ))}
        </div>
    );
}
