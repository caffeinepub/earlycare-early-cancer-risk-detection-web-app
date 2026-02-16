import { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Progress } from '../components/ui/progress';
import { useSubmitTest } from '../hooks/useQueries';
import { Gender, ExternalBlob } from '../backend';
import { toast } from 'sonner';
import type { Screen } from '../App';

interface TestScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function TestScreen({ onNavigate }: TestScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: Gender.male,
    smoking: false,
    alcohol: false,
    pain: false,
    lump: false,
    weightLoss: false,
    image: null as File | null,
  });

  const submitTest = useSubmitTest();
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.age)) {
      toast.error('Please fill in all fields');
      return;
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setFormData({ ...formData, image: file });
      toast.success('Image uploaded successfully');
    }
  };

  const handleSubmit = async () => {
    try {
      let imageBlob: ExternalBlob | undefined;
      
      if (formData.image) {
        const arrayBuffer = await formData.image.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array);
      }

      const submission = {
        name: formData.name,
        age: BigInt(formData.age),
        gender: formData.gender,
        smoking: formData.smoking,
        alcohol: formData.alcohol,
        pain: formData.pain,
        lump: formData.lump,
        weightLoss: formData.weightLoss,
        image: imageBlob,
      };

      await submitTest.mutateAsync(submission);
      toast.success('Test submitted successfully!');
      onNavigate('result');
    } catch (error) {
      console.error('Error submitting test:', error);
      toast.error('Failed to submit test. Please try again.');
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
          <h1 className="text-2xl font-bold text-primary">Health Assessment</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 animate-in slide-in-from-right duration-300">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-base font-medium">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">Gender</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value as Gender })}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value={Gender.male} id="male" />
                    <Label htmlFor="male" className="flex-1 cursor-pointer text-base">Male</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value={Gender.female} id="female" />
                    <Label htmlFor="female" className="flex-1 cursor-pointer text-base">Female</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value={Gender.other} id="other" />
                    <Label htmlFor="other" className="flex-1 cursor-pointer text-base">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Lifestyle Factors</h2>
              
              <div className="flex items-center justify-between p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="space-y-1">
                  <Label htmlFor="smoking" className="text-lg font-medium cursor-pointer">
                    Do you smoke?
                  </Label>
                  <p className="text-sm text-muted-foreground">Regular tobacco use</p>
                </div>
                <Switch
                  id="smoking"
                  checked={formData.smoking}
                  onCheckedChange={(checked) => setFormData({ ...formData, smoking: checked })}
                  className="scale-125"
                />
              </div>

              <div className="flex items-center justify-between p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="space-y-1">
                  <Label htmlFor="alcohol" className="text-lg font-medium cursor-pointer">
                    Do you consume alcohol?
                  </Label>
                  <p className="text-sm text-muted-foreground">Regular alcohol consumption</p>
                </div>
                <Switch
                  id="alcohol"
                  checked={formData.alcohol}
                  onCheckedChange={(checked) => setFormData({ ...formData, alcohol: checked })}
                  className="scale-125"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Symptoms Assessment</h2>
              
              <div className="flex items-center justify-between p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="space-y-1">
                  <Label htmlFor="pain" className="text-lg font-medium cursor-pointer">
                    Persistent pain?
                  </Label>
                  <p className="text-sm text-muted-foreground">Unexplained ongoing pain</p>
                </div>
                <Switch
                  id="pain"
                  checked={formData.pain}
                  onCheckedChange={(checked) => setFormData({ ...formData, pain: checked })}
                  className="scale-125"
                />
              </div>

              <div className="flex items-center justify-between p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="space-y-1">
                  <Label htmlFor="lump" className="text-lg font-medium cursor-pointer">
                    Unusual lump?
                  </Label>
                  <p className="text-sm text-muted-foreground">New or growing lump</p>
                </div>
                <Switch
                  id="lump"
                  checked={formData.lump}
                  onCheckedChange={(checked) => setFormData({ ...formData, lump: checked })}
                  className="scale-125"
                />
              </div>

              <div className="flex items-center justify-between p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="space-y-1">
                  <Label htmlFor="weightLoss" className="text-lg font-medium cursor-pointer">
                    Unexplained weight loss?
                  </Label>
                  <p className="text-sm text-muted-foreground">Significant unintended weight loss</p>
                </div>
                <Switch
                  id="weightLoss"
                  checked={formData.weightLoss}
                  onCheckedChange={(checked) => setFormData({ ...formData, weightLoss: checked })}
                  className="scale-125"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Upload Image (Optional)</h2>
              
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-foreground mb-1">
                        {formData.image ? formData.image.name : 'Click to upload image'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="bg-accent/10 rounded-xl p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Note:</strong> Image upload is optional. 
                  This feature is prepared for future AI-based analysis integration.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12 text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            
            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                className="flex-1 h-12 text-base"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitTest.isPending}
                className="flex-1 h-12 text-base"
              >
                {submitTest.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Submit & Analyze'
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
