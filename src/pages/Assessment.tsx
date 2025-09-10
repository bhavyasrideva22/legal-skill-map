import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, ArrowLeft, Shield, Scale, Brain, Target } from "lucide-react";

interface Question {
  id: string;
  type: "radio" | "slider" | "scenario";
  category: "psychometric" | "technical" | "wiscar";
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

const assessmentQuestions: Question[] = [
  // Psychometric Questions
  {
    id: "interest_1",
    type: "slider",
    category: "psychometric",
    question: "How interested are you in staying updated with cybersecurity threats and legal frameworks?",
    min: 1,
    max: 5,
    step: 1
  },
  {
    id: "motivation_1",
    type: "radio",
    category: "psychometric",
    question: "What primarily motivates you to pursue a career in cybercrime law?",
    options: [
      "Making a positive impact on digital society",
      "High earning potential",
      "Intellectual challenge and problem-solving",
      "Job security and stability",
      "Prestige and recognition"
    ]
  },
  {
    id: "personality_1",
    type: "scenario",
    category: "psychometric",
    question: "A company experiences a data breach affecting thousands of customers. As a cybercrime law advisor, your first priority would be:",
    options: [
      "Immediately assess legal compliance and notification requirements",
      "Gather technical evidence and coordinate with forensics teams",
      "Communicate with stakeholders and manage public relations",
      "Review insurance policies and potential liabilities"
    ]
  },
  
  // Technical Questions
  {
    id: "tech_1",
    type: "radio",
    category: "technical",
    question: "Which of the following best describes the GDPR's approach to data breach notification?",
    options: [
      "Notification within 72 hours to supervisory authority",
      "Immediate notification to all affected individuals",
      "Notification only if financial loss exceeds €10,000",
      "Voluntary notification based on company policy"
    ]
  },
  {
    id: "tech_2",
    type: "radio",
    category: "technical",
    question: "In digital forensics, what is the primary purpose of creating a hash value of evidence?",
    options: [
      "To compress the file size",
      "To ensure data integrity and authenticity",
      "To encrypt sensitive information",
      "To speed up analysis processes"
    ]
  },
  {
    id: "tech_3",
    type: "scenario",
    category: "technical",
    question: "A client asks about liability for a ransomware attack on their cloud infrastructure. Which legal framework would be most relevant?",
    options: [
      "Computer Fraud and Abuse Act (CFAA)",
      "Stored Communications Act (SCA)",
      "Electronic Communications Privacy Act (ECPA)",
      "Cybersecurity Information Sharing Act (CISA)"
    ]
  },

  // WISCAR Framework Questions
  {
    id: "will_1",
    type: "slider",
    category: "wiscar",
    question: "Rate your willingness to continuously learn new cybersecurity laws and regulations:",
    min: 1,
    max: 5,
    step: 1
  },
  {
    id: "skill_1",
    type: "slider",
    category: "wiscar",
    question: "How would you rate your current understanding of cyber law principles?",
    min: 1,
    max: 5,
    step: 1
  },
  {
    id: "cognitive_1",
    type: "radio",
    category: "wiscar",
    question: "When faced with a complex legal-technical problem, you typically:",
    options: [
      "Break it down into smaller, manageable components",
      "Consult multiple expert opinions before proceeding",
      "Research extensively before taking action",
      "Trust your instincts and act quickly"
    ]
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isCompleting, setIsCompleting] = useState(false);

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const question = assessmentQuestions[currentQuestion];

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeAssessment = () => {
    setIsCompleting(true);
    
    // Calculate scores (simplified for demo)
    const psychometricScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const technicalScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const wiscarScore = Math.floor(Math.random() * 25) + 75; // 75-100
    const overallScore = Math.floor((psychometricScore + technicalScore + wiscarScore) / 3);

    // Store results
    const results = {
      answers,
      scores: {
        psychometric: psychometricScore,
        technical: technicalScore,
        wiscar: wiscarScore,
        overall: overallScore
      },
      recommendation: overallScore >= 80 ? "Highly Recommended" : overallScore >= 65 ? "Recommended" : "Further Development Needed",
      completedAt: new Date().toISOString()
    };

    localStorage.setItem('assessmentResults', JSON.stringify(results));

    setTimeout(() => {
      navigate('/results');
    }, 2000);
  };

  const currentAnswer = answers[question.id];
  const isAnswered = currentAnswer !== undefined;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'psychometric': return <Brain className="w-5 h-5" />;
      case 'technical': return <Shield className="w-5 h-5" />;
      case 'wiscar': return <Target className="w-5 h-5" />;
      default: return <Scale className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'psychometric': return 'text-cyber-purple';
      case 'technical': return 'text-cyber-blue';
      case 'wiscar': return 'text-cyber-teal';
      default: return 'text-law-gold';
    }
  };

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-teal rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Completing Assessment</h2>
            <p className="text-muted-foreground mb-6">Analyzing your responses and generating personalized recommendations...</p>
            <Progress value={100} className="w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${getCategoryColor(question.category)}`}>
                {getCategoryIcon(question.category)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Cybercrime Law Assessment</h1>
                <p className="text-sm text-muted-foreground capitalize">{question.category} Evaluation</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {assessmentQuestions.length}</p>
              <Progress value={progress} className="w-32 mt-2" />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
            {question.type === "scenario" && (
              <CardDescription>
                Choose the option that best represents your approach or understanding.
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {question.type === "radio" && (
              <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "slider" && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Strongly Disagree</span>
                  <span>Neutral</span>
                  <span>Strongly Agree</span>
                </div>
                <Slider
                  value={currentAnswer ? [currentAnswer] : [3]}
                  onValueChange={(value) => handleAnswer(value[0])}
                  min={question.min}
                  max={question.max}
                  step={question.step}
                  className="w-full"
                />
                <div className="text-center">
                  <span className="text-lg font-semibold text-primary">
                    {currentAnswer || 3} / {question.max}
                  </span>
                </div>
              </div>
            )}

            {question.type === "scenario" && (
              <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option} id={`scenario-${index}`} className="mt-1" />
                    <Label htmlFor={`scenario-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex items-center gap-2"
            variant={currentQuestion === assessmentQuestions.length - 1 ? "hero" : "default"}
          >
            {currentQuestion === assessmentQuestions.length - 1 ? "Complete Assessment" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;