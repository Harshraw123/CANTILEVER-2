import { useNavigate } from "react-router-dom";
import Button from "./Button/HeroButton";
import { ArrowRight, CheckCircle2 } from "lucide-react";


const Hero = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Sophisticated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.4]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero content */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-scale-in">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Task management redefined</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              Organize your{" "}
              <span className="gradient-text">workflow</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              A minimalist task manager that helps you focus on what matters. Clean, fast, and beautifully designed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={handleClick}/>
            </div>
          </div>
          
          {/* Hero image with enhanced styling */}
          <div className="relative animate-fade-in-up">
            {/* Gradient fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            
            {/* Glass effect container */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-border/50 shadow-large group">
              {/* Image with subtle scaling on hover */}
              <div className="overflow-hidden">
                <img 
                  src={'/heroMockup.jpg'} 
                  alt="Task manager interface showing organized lists and clean design" 
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-primary-foreground/5 to-transparent" />
            </div>
            
            {/* Enhanced floating elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 -right-12 w-24 h-24 bg-muted/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero