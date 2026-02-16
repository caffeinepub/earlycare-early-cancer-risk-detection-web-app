import { Activity, FileText, Lightbulb, Phone } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import LoginButton from '../components/LoginButton';
import type { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  const cards = [
    {
      icon: Activity,
      title: 'Check My Health',
      description: 'Take a quick health assessment',
      color: 'from-primary to-primary/80',
      screen: 'test' as Screen,
      requiresAuth: true,
    },
    {
      icon: FileText,
      title: 'My Reports',
      description: 'View your test results',
      color: 'from-secondary to-secondary/80',
      screen: 'reports' as Screen,
      requiresAuth: true,
    },
    {
      icon: Lightbulb,
      title: 'Health Tips',
      description: 'Learn about prevention',
      color: 'from-accent to-accent/80',
      screen: 'tips' as Screen,
      requiresAuth: false,
    },
    {
      icon: Phone,
      title: 'Emergency Help',
      description: 'Get immediate assistance',
      color: 'from-destructive to-destructive/80',
      screen: 'emergency' as Screen,
      requiresAuth: false,
    },
  ];

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background to-muted/20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/earlycare-logo-transparent.dim_200x200.png" 
              alt="EarlyCare" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold text-primary">EarlyCare</h1>
          </div>
          <LoginButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isAuthenticated && userProfile && (
          <div className="mb-8 animate-in slide-in-from-top duration-500">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {userProfile.name}! 👋
            </h2>
            <p className="text-muted-foreground text-lg">
              How can we help you today?
            </p>
          </div>
        )}

        {!isAuthenticated && (
          <div className="mb-8 animate-in slide-in-from-top duration-500">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome to EarlyCare 👋
            </h2>
            <p className="text-muted-foreground text-lg">
              Your partner in early cancer risk detection
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isDisabled = card.requiresAuth && !isAuthenticated;
            
            return (
              <button
                key={card.title}
                onClick={() => !isDisabled && onNavigate(card.screen)}
                disabled={isDisabled}
                className="group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms`, animationDuration: '500ms' }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-white/90 text-base">
                      {card.description}
                    </p>
                  </div>

                  {isDisabled && (
                    <div className="text-sm text-white/80 font-medium">
                      🔒 Login required
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 animate-in slide-in-from-bottom duration-700">
          <img 
            src="/assets/generated/hero-medical.dim_800x600.jpg" 
            alt="Medical Care" 
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Early Detection Saves Lives
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our comprehensive health assessment tool helps identify potential cancer risks early. 
            Take control of your health journey with personalized insights and recommendations.
          </p>
        </div>
      </main>
    </div>
  );
}
