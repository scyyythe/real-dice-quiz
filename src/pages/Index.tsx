import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DiceFace from "@/components/DiceFace";

interface Question {
  number: number;
  question: string;
  answer: string;
}

const questions: Question[] = [
  { number: 1, question: "What do you call the term 5x?", answer: "Monomial" },
  { number: 2, question: "32 × 4 = ?", answer: "128" },
  { number: 3, question: "It has two terms.", answer: "Binomial" },
  { number: 4, question: "21 × 6 = ?", answer: "126" },
  { number: 5, question: "It has three terms.", answer: "Trinomial" },
  { number: 6, question: "State the full name of the teacher.", answer: "Miss Janah Angelique Ubas" },
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      if (key >= "1" && key <= "6" && !currentQuestion) {
        const questionNum = parseInt(key);
        const question = questions.find((q) => q.number === questionNum);
        if (question) {
          setCurrentQuestion(question);
          setShowAnswer(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuestion]);

  const handleReturn = () => {
    setCurrentQuestion(null);
    setShowAnswer(false);
  };

  const handleDiceClick = (num: number) => {
    if (!currentQuestion) {
      const question = questions.find((q) => q.number === num);
      if (question) {
        setCurrentQuestion(question);
        setShowAnswer(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <header className="mb-8 text-center animate-scale-in">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          🎲 Math Dice Quiz
        </h1>
        <p className="text-lg text-muted-foreground">Press 1–6!</p>
      </header>

      <main className="w-full max-w-2xl">
        {!currentQuestion ? (
          <Card className="p-12 text-center shadow-[var(--shadow-soft)] bg-gradient-to-br from-card to-muted border-2 border-border rounded-[var(--radius)] animate-scale-in">
            <div className="space-y-6">
              <div className="text-6xl mb-4">🎲</div>
              <h2 className="text-3xl font-semibold text-foreground">
                Press a number (1–6) to begin!
              </h2>
              <p className="text-muted-foreground text-lg">
                Roll your dice, then press the matching number key
              </p>
              <div className="flex justify-center gap-3 mt-8 flex-wrap">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleDiceClick(num)}
                    className="focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
                    aria-label={`Select question ${num}`}
                  >
                    <DiceFace number={num} />
                  </button>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-10 shadow-[var(--shadow-hover)] bg-gradient-to-br from-card to-background border-2 border-primary/20 rounded-[var(--radius)] animate-scale-in">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <DiceFace number={currentQuestion.number} size="md" />
                <h2 className="text-2xl font-semibold text-foreground">Question #{currentQuestion.number}</h2>
              </div>

              <div className="bg-muted/50 rounded-2xl p-8 border border-border">
                <p className="text-2xl text-foreground font-medium leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>

              <div className="bg-accent/30 rounded-2xl p-8 border-2 border-accent relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h3 className="text-lg font-semibold text-accent-foreground">Answer:</h3>
                </div>
                <p 
                  className={`text-3xl font-bold text-accent-foreground transition-all duration-500 ${
                    !showAnswer ? 'blur-xl select-none' : 'blur-0 animate-fade-in'
                  }`}
                >
                  {currentQuestion.answer}
                </p>
                {!showAnswer && (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40 rounded-2xl backdrop-blur-sm"></div>
                )}
              </div>

              {!showAnswer ? (
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="w-full py-6 text-xl font-semibold rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  Show Answer 💡
                </Button>
              ) : (
                <Button
                  onClick={handleReturn}
                  className="w-full py-6 text-xl font-semibold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] animate-fade-in"
                >
                  Return
                </Button>
              )}
            </div>
          </Card>
        )}
      </main>

      <footer className="mt-8 text-center text-muted-foreground animate-fade-in">
        <p className="text-sm">🎀 Made with love for the classroom 🎀</p>
      </footer>
    </div>
  );
};

export default Index;
