import { ArrowLeft, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import type { Screen } from '../App';

interface EmergencyScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function EmergencyScreen({ onNavigate }: EmergencyScreenProps) {
  const handleEmergencyCall = () => {
    window.location.href = 'tel:108';
  };

  const handleFindHospitals = () => {
    window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank');
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background to-muted/20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('home')}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-primary">Emergency Help</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <div className="bg-destructive/10 border-2 border-destructive/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-destructive mb-2 flex items-center gap-2">
              <Phone className="w-6 h-6" />
              Emergency Services
            </h2>
            <p className="text-muted-foreground text-base">
              If you're experiencing a medical emergency, please call immediately or visit the nearest hospital.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleEmergencyCall}
            className="w-full group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-in slide-in-from-bottom"
            style={{ animationDelay: '100ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-destructive to-destructive/80 opacity-90 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Call 108
                </h3>
                <p className="text-white/90 text-base">
                  Emergency ambulance service - Available 24/7
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={handleFindHospitals}
            className="w-full group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-in slide-in-from-bottom"
            style={{ animationDelay: '200ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 opacity-90 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Nearby Hospitals
                </h3>
                <p className="text-white/90 text-base">
                  Find hospitals and clinics near your location
                </p>
              </div>
            </div>
          </button>

          <div className="relative overflow-hidden rounded-2xl p-8 bg-muted/50 animate-in slide-in-from-bottom" style={{ animationDelay: '300ms' }}>
            <div className="space-y-4 opacity-60">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Doctor Chat
                </h3>
                <p className="text-muted-foreground text-base">
                  Coming soon - Connect with healthcare professionals online
                </p>
              </div>
            </div>
            
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                Future Feature
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-bottom duration-700">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Important Numbers
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
              <span className="font-medium text-foreground">Ambulance</span>
              <span className="text-primary font-bold">108</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
              <span className="font-medium text-foreground">Police</span>
              <span className="text-primary font-bold">100</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
              <span className="font-medium text-foreground">Fire</span>
              <span className="text-primary font-bold">101</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
