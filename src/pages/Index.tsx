import UrlShortener from "@/components/UrlShortener";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Link Shortener
          </h1>
          <p className="text-xl text-muted-foreground">
            Make your long URLs short and beautiful
          </p>
        </div>
        <UrlShortener />
      </div>
    </div>
  );
};

export default Index;
