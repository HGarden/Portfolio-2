import cardContents from "./cardContent";

export default function Card() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardContents.map((card, index) => (
            <article key={index} className="card p-6">
                    {/* Media */}
                    {card.imageUrl && (
                        <div className="ratio-16-9 mb-4 elevation">
                            <img
                                src={card.imageUrl}
                                alt={card.title}
                                className="transition-transform duration-500 hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/15 to-transparent pointer-events-none"></div>
                        </div>
                    )}

                    {/* Title */}
                                <h2 className="text-xl md:text-2xl font-semibold mb-2 heading heading-teal clamp-2">
                        {card.title}
                    </h2>

                    {/* Description */}
                      <p className="text-gray-400 leading-relaxed mb-4 clamp-3">
                        {card.description}
                    </p>

                    {/* Tags */}
                    {Array.isArray(card.tags) && card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                            {card.tags.map((tag, i) => (
                                <span key={i} className="tag">{tag}</span>
                            ))}
                        </div>
                    )}

                                        {/* CTAs */}
                                        {(card.repo || card.live) && (
                                            <div className="grid grid-cols-2 gap-2">
                                                {card.repo && (
                                                    <a href={card.repo} target="_blank" rel="noopener noreferrer">
                                                        <button className="button w-full" aria-label={`Open ${card.title} GitHub repository`}>
                                                            Repo ↗
                                                        </button>
                                                    </a>
                                                )}
                                                {card.live && (
                                                    <a href={card.live} target="_blank" rel="noopener noreferrer">
                                                        <button className="button w-full" aria-label={`Open ${card.title} live site`}>
                                                            Live ↗
                                                        </button>
                                                    </a>
                                                )}
                                            </div>
                                        )}
                </article>
            ))}
        </div>
    );
}
