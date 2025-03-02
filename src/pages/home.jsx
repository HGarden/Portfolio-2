import Cards from "../components/cards";
import MusicContainer from "../components/musicContainer";

const Home = () => { 
    return (
        <>
        <article className="container mx-auto p-4 prose lg:prose-xl mt-10">
        <h1>Hello</h1>
            <p className="text-lg text-content">
                I'm Marius Hagen, a Web Designer and a musician based in Norway. I love creating websites and music. I have a passion for creating clean and functional websites. I am always looking for new challenges and opportunities to learn and grow. I am currently looking for new opportunities to work on exciting projects. If you have a project you would like to discuss, feel free to get in touch with me. I would love to hear from you!
            </p>
            <div className="flex justify-center mt-4">
                <a href="https://github.com/hgarden" >
                <button className="btn btn-ghost">GitHub</button>
                </a>
                <a href="mailto:marius.h.hagen@gmail.com" >
                <button className="btn btn-ghost">Email</button>
                </a>
                <div className="tooltip" data-tip="username: hgarden" data-for="discord">
                <button className="btn btn-ghost">Discord</button></div>
            </div>
            </article>
            <div className="divider"></div>
            <section>
                <div className="prose lg:prose-xl p-4 mx-auto"><h2>My Web Projects</h2></div>
        <div className="container mx-auto p-4">
            <Cards />
        </div>
        <div className="divider"></div>
        </section>
        <section>
            <div className="container mx-auto p-4 prose lg:prose-xl p-4  "><h2>My Music</h2></div>
            <MusicContainer />
        </section>
        </>
    );
};

export default Home;