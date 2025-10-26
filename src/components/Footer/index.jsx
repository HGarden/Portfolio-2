function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20">
      <hr className="divider" />
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm subheading">© {year} Marius Hagen</div>
        <div className="flex items-center gap-3">
          <a href="#about" className="button px-4 py-2 text-sm">Contact</a>
          <a href="https://github.com/HGarden" target="_blank" rel="noreferrer" className="button px-4 py-2 text-sm">GitHub ↗</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer