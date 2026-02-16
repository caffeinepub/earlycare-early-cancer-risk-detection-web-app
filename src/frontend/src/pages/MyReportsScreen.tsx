import { ArrowLeft, FileText, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useGetMyResults } from '../hooks/useQueries';
import { RiskLevel } from '../backend';
import type { Screen } from '../App';

interface MyReportsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function MyReportsScreen({ onNavigate }: MyReportsScreenProps) {
  const { data: result, isLoading } = useGetMyResults();

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.high:
        return 'bg-red-100 text-red-700 border-red-200';
      case RiskLevel.medium:
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case RiskLevel.low:
        return 'bg-green-100 text-green-700 border-green-200';
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
          <h1 className="text-2xl font-bold text-primary">My Reports</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-lg text-muted-foreground">Loading reports...</p>
            </div>
          </div>
        ) : !result ? (
          <div className="text-center py-12 animate-in fade-in duration-500">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              No Reports Yet
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Take your first health assessment to see your results here.
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate('test')}
              className="h-12 px-8"
            >
              Take Assessment
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Health Assessment Report
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(Number(result.timestamp) / 1000000).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <span className={`px-4 py-2 rounded-full border-2 font-semibold text-sm ${getRiskBadge(result.riskLevel)}`}>
                  {result.riskLevel.toUpperCase()} RISK
                </span>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Patient Name</p>
                    <p className="font-medium text-foreground">{result.submission.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Age</p>
                    <p className="font-medium text-foreground">{result.submission.age.toString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Gender</p>
                    <p className="font-medium text-foreground capitalize">{result.submission.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                    <p className="font-medium text-foreground capitalize">{result.riskLevel}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Risk Factors</p>
                  <div className="flex flex-wrap gap-2">
                    {result.submission.smoking && (
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                        Smoking
                      </span>
                    )}
                    {result.submission.alcohol && (
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                        Alcohol
                      </span>
                    )}
                    {result.submission.pain && (
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                        Pain
                      </span>
                    )}
                    {result.submission.lump && (
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                        Lump
                      </span>
                    )}
                    {result.submission.weightLoss && (
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                        Weight Loss
                      </span>
                    )}
                    {!result.submission.smoking && !result.submission.alcohol && !result.submission.pain && 
                     !result.submission.lump && !result.submission.weightLoss && (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        No risk factors
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground mb-1">Medical Advice</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {result.advice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button
                  className="w-full h-12"
                  onClick={() => onNavigate('result')}
                >
                  View Full Report
                </Button>
              </div>
            </div>

            <div className="bg-accent/10 rounded-xl p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Note:</strong> This report is based on your self-assessment 
                and should not replace professional medical advice. Please consult with a healthcare provider 
                for accurate diagnosis and treatment.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
