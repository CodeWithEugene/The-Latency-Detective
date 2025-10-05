const Footer = () => {
  return (
    <footer className="mt-16 border-t-4 border-foreground/10 bg-card">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://codewitheugene.top/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            Eugenius
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
