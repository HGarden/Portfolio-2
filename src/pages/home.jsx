import Cards from "../components/cards";
import AudioPlayer from "../components/AudioPlayer";
import songs from "../components/songs";

const Home = () => { 
    return (
        <>
        <article className="container mx-auto p-8 mt-10">
            <div className="">
                <div className="flex items-start justify-between gap-8">
                    {/* Text column */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-5xl font-bold mb-4 heading">
                            Hello
                        </h1>
                        <p className="text-lg leading-relaxed text-white/80 max-w-3xl">
                    I'm Marius Hagen, a Web Designer and a musician based in Norway. I love creating websites and music.
                    I have a passion for creating clean and functional websites. I am always looking for new challenges and opportunities to learn and grow. 
                    I am currently looking for new opportunities to work on exciting projects. 
                    If you have a project you would like to discuss, feel free to get in touch with me. I would love to hear from you!
                        </p>
                    </div>

                    {/* Vertical icon actions (right side on md+) */}
                    <div className="hidden md:flex flex-col gap-3">
                        <a href="#projects" title="View projects" aria-label="View projects">
                            <button className="button w-12 h-12 rounded-full flex items-center justify-center transition-shadow" aria-hidden="false">
                                {/* Grid icon */}
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                                </svg>
                            </button>
                        </a>
                        <a
                            href="#player"
                            title="Listen"
                            aria-label="Listen"
                            onClick={() => {
                                window.dispatchEvent(new Event('open-player')); 
                            }}
                        >
                            <button className="button w-12 h-12 rounded-full flex items-center justify-center transition-shadow">
                                {/* Music note icon */}
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M9 18V5l12-2v13"/>
                                    <circle cx="6" cy="18" r="3"/>
                                    <circle cx="18" cy="16" r="3"/>
                                </svg>
                            </button>
                        </a>
                        <a href="mailto:marius.h.hagen@gmail.com" title="Contact" aria-label="Contact">
                            <button className="button w-12 h-12 rounded-full flex items-center justify-center transition-shadow">
                                {/* Mail icon */}
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>

                {/* Mobile icon actions (below on small screens) */}
                <div className="flex md:hidden justify-start gap-3 mt-8">
                    <a href="#projects" title="View projects" aria-label="View projects">
                        <button className="button w-12 h-12 rounded-full flex items-center justify-center transition-shadow">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="3" y="3" width="7" height="7" rx="1"/>
                                <rect x="14" y="3" width="7" height="7" rx="1"/>
                                <rect x="3" y="14" width="7" height="7" rx="1"/>
                                <rect x="14" y="14" width="7" height="7" rx="1"/>
                            </svg>
                        </button>
                    </a>
                    <a
                        href="#player"
                        title="Listen"
                        aria-label="Listen"
                        onClick={() => {
                            window.dispatchEvent(new Event('open-player'));
                        }}
                    >
                        <button className="button w-12 h-12 rounded-full flex items-center justify-center transition-shadow">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M9 18V5l12-2v13"/>
                                <circle cx="6" cy="18" r="3"/>
                                <circle cx="18" cy="16" r="3"/>
                            </svg>
                        </button>
                    </a>
                    <a href="mailto:marius.h.hagen@gmail.com" title="Contact" aria-label="Contact">
                        <button className="button w-12 h-12 rounded-full flex items-center justify-center transition-shadow">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                        </button>
                    </a>
                </div>
        </div>
    </article>
        
    <div className="divider"></div>
        
        <section id="projects" className="container mx-auto p-8">
            <div className="mb-8">
                <h2 className="text-4xl font-bold mb-2 heading">Selected projects</h2>
            </div>
            <Cards />
        </section>
        
    <div className="divider"></div>
        
        <section id="music" className="container mx-auto p-8">
            <div className="mb-8">
                <h2 className="text-4xl font-bold mb-2 heading">Music</h2>
            </div>
            {/* About my music */}
            <div className="glass rounded-3xl p-6 mb-8 elevation">
                <h3 className="text-2xl font-semibold mb-3 heading">About my music</h3>
                <p className="text-white/80 leading-relaxed max-w-3xl mb-5">
                    I create music using both digital and analog tools, mixing live-recorded instruments, synths, and samples with digital production techniques.
                </p>
                <p className="text-white/80 leading-relaxed max-w-3xl">
                    For production I use Ableton Live or Bitwig Studio depending on the project. Underneath are some example tracks produced in Bitwig. My most recent
                    tracks can be found on my YouTube channel linked below.
                </p>
            </div>
                <div className="glass rounded-3xl p-6 mb-8 elevation">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {songs.map((song, index) => (
                        <div
                            key={index}
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                                // Open/expand player and play the selected track
                                window.dispatchEvent(new CustomEvent('play-song', { detail: { index } }));
                                window.dispatchEvent(new Event('open-player'));
                                // Smooth scroll to the player area
                                const el = document.getElementById('player');
                                if (el && 'scrollIntoView' in el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    window.dispatchEvent(new CustomEvent('play-song', { detail: { index } }));
                                    window.dispatchEvent(new Event('open-player'));
                                    const el = document.getElementById('player');
                                    if (el && 'scrollIntoView' in el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                    }
                                }
                            }}
                            className="glass rounded-xl p-4 hover:border-white/20 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full sheen flex items-center justify-center text-sm font-semibold text-white/90">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-white truncate">{song.title}</div>
                                    <div className="text-sm text-white/70 truncate">{song.artist}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-right text-sm text-white/60">{songs.length} tracks</div>
            </div>
            
            <div id="player" className="scroll-mt-24">
                <AudioPlayer />
            </div>

            {/* YouTube channel */}
            <div className="glass rounded-3xl p-6 mt-8 elevation">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-semibold mb-1 heading">More on YouTube</h3>
                    </div>
                    <a
                        href="https://www.youtube.com/@Hagen-c7b"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visit my YouTube channel"
                        aria-label="Visit my YouTube channel"
                        className="inline-flex"
                    >
                        <button className="button inline-flex items-center gap-2">
                            {/* YouTube icon */}
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M23.5 6.2a4 4 0 0 0-2.8-2.8C18.6 3 12 3 12 3s-6.6 0-8.7.4A4 4 0 0 0 .5 6.2 41.4 41.4 0 0 0 0 12a41.4 41.4 0 0 0 .5 5.8 4 4 0 0 0 2.8 2.8C5.4 21 12 21 12 21s6.6 0 8.7-.4a4 4 0 0 0 2.8-2.8A41.4 41.4 0 0 0 24 12a41.4 41.4 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                            </svg>
                            <span>Visit channel</span>
                        </button>
                    </a>
                </div>
            </div>
        </section>

    <div className="divider"></div>

        <section id="about" className="container mx-auto p-8">
            <div className="glass p-8 elevation">
                <h2 className="text-3xl font-bold mb-3 heading">About</h2>
                <p className="text-white/80 leading-relaxed max-w-3xl mb-5">
                    I am a web designer and musician from Norway. In my free time I enjoy music, games, and coding. 
                    I specialize in creating clean, functional, and visually appealing websites using modern web technologies like React, Vite, and Sass.
                </p>
                  <p className="text-white/80 leading-relaxed max-w-3xl">
                    Tailwind and Daisy Ui are my go-to tools for quickly building responsive and accessible user interfaces. However i find Sass to be indispensable for
                    custom projects that require more control over styling.
                </p>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3 heading">Tech stack</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="tag">HTML</span>
                        <span className="tag">CSS</span>
                        <span className="tag">Sass</span>
                        <span className="tag">JavaScript</span>
                        <span className="tag">React</span>
                        <span className="tag">Vite</span>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Home;