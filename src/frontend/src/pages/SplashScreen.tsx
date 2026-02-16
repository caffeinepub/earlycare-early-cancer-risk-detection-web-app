import { Heart } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-6 animate-in fade-in duration-700">
      <div className="text-center space-y-8 animate-in slide-in-from-bottom-4 duration-1000">
        <div className="flex items-center justify-center mb-6">
          <img 
            src="/assets/generated/earlycare-logo-transparent.dim_200x200.png" 
            alt="EarlyCare Logo" 
            className="w-32 h-32 drop-shadow-2xl animate-in zoom-in duration-700"
          />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            EarlyCare
          </h1>
          <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-white/90 font-medium">
            <Heart className="w-6 h-6 fill-white animate-pulse" />
            <p>Detect Early. Live Long.</p>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
