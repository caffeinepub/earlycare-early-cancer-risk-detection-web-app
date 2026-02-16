import { ArrowLeft, Cigarette, Apple, Dumbbell, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useGetAllHealthTips } from '../hooks/useQueries';
import type { Screen } from '../App';

interface HealthTipsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const defaultTips = [
  {
    title: 'Quit Smoking',
    description: 'Smoking is a leading cause of cancer. Quitting smoking significantly reduces your risk of developing various types of cancer and improves overall health.',
    icon: 'cigarette',
  },
  {
    title: 'Eat Healthy',
    description: 'A balanced diet rich in fruits, vegetables, and whole grains can help prevent cancer. Limit processed foods and red meat consumption.',
    icon: 'apple',
  },
  {
    title: 'Exercise Regularly',
    description: 'Regular physical activity helps maintain a healthy weight and reduces cancer risk. Aim for at least 30 minutes of moderate exercise daily.',
    icon: 'dumbbell',
  },
  {
    title: 'Regular Checkups',
    description: 'Early detection through regular health screenings can save lives. Schedule annual checkups and follow recommended screening guidelines.',
    icon: 'calendar',
  },
];

export default function HealthTipsScreen({ onNavigate }: HealthTipsScreenProps) {
  const { data: backendTips, isLoading } = useGetAllHealthTips();
  
  const tips = backendTips && backendTips.length > 0 ? backendTips : defaultTips;

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'cigarette':
        return Cigarette;
      case 'apple':
        return Apple;
      case 'dumbbell':
        return Dumbbell;
      case 'calendar':
        return Calendar;
      default:
        return Apple;
    }
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
          <h1 className="text-2xl font-bold text-primary">Health Tips</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Prevention is Better Than Cure
          </h2>
          <p className="text-muted-foreground text-lg">
            Follow these evidence-based tips to reduce your cancer risk and maintain optimal health.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="w-16 h-16 bg-muted rounded-xl mb-4" />
                <div className="h-6 bg-muted rounded mb-3 w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => {
              const Icon = getIcon(tip.icon);
              
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {tip.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl p-8 animate-in slide-in-from-bottom duration-700">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Remember
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            These tips are general guidelines for cancer prevention. Always consult with healthcare 
            professionals for personalized advice based on your individual health status and risk factors.
          </p>
        </div>
      </main>
    </div>
  );
}
