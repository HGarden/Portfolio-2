import cardContents from "./cardContent";

export default function Card() { 
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cardContents.map((card, index) => (
                <div key={index} className="bg-neutral rounded p-4 card ">
                    <h2 className="text-xl font-bold text-accent card-title">{card.title}</h2>
                    <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover mt-2" />
                    <p className="text-content mt-2">{card.description}</p>
                    <a href={card.link} className="btn btn-ghost text-info mt-2">To Project</a>
                </div>
            ))}
        </div>
    );
}
