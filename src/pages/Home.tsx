import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function Home() {
  const [text, setText] = useState('');
  const [submitCount, setSubmitCount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const MAX_SUBMISSIONS = 3;

  // Load initial count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('submitCount');
    if (savedCount) {
      setSubmitCount(parseInt(savedCount, 10));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Increment counter and save to localStorage
    const newCount = submitCount + 1;
    setSubmitCount(newCount);
    localStorage.setItem('submitCount', newCount.toString());

    console.log('Submitted:', text);
    setText('');

    // Check if max submissions reached
    if (newCount >= MAX_SUBMISSIONS) {
      toast({
        title: 'Maximum submissions reached',
        description: 'Please sign in to continue using the app',
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  const isSubmitDisabled = submitCount >= MAX_SUBMISSIONS;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Your App</span>
          </div>
          <Link to="/login">
            <Button variant="outline" size="sm">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Welcome to Your App
          </h1>
          <p className="text-xl text-muted-foreground">
            Enter your text below and see the magic happen
          </p>
        </div>

        {/* Input Form */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1"
                disabled={isSubmitDisabled}
              />

              <Button
                type="submit"
                disabled={isSubmitDisabled}
                className={
                  isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }
              >
                Magic
              </Button>
            </div>
          </form>

          {/* Submit Counter */}
          <div className="mt-4 text-center">
            <span className="text-sm text-muted-foreground">
              Total submissions:{' '}
              <span className="font-medium text-foreground">{submitCount}</span>
              {submitCount < MAX_SUBMISSIONS && (
                <span className="text-sm text-muted-foreground ml-2">
                  ({MAX_SUBMISSIONS - submitCount} remaining)
                </span>
              )}
            </span>
          </div>

          {/* Preview Section */}
          {text && (
            <div className="mt-8 p-6 bg-card rounded-lg border shadow-sm">
              <h2 className="text-sm font-medium text-muted-foreground mb-2">
                Preview
              </h2>
              <p className="text-lg">{text}</p>
            </div>
          )}

          {isSubmitDisabled && (
            <div className="mt-8 p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                You've reached the maximum number of submissions.{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in to continue
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
