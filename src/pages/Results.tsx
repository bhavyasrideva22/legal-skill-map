import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Brain, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  ArrowRight,
  Download,
  Home,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

interface AssessmentResults {
  scores: {
    psychometric: number;
    technical: number;
    wiscar: number;
    overall: number;
  };
  recommendation: string;
  completedAt: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('assessmentResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Results...</h2>
          <Progress value={66} className="w-64" />
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 65) return "text-yellow-500";
    return "text-red-500";
  };

  const getRecommendationIcon = (recommendation: string) => {
    if (recommendation === "Highly Recommended") return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (recommendation === "Recommended") return <Info className="w-6 h-6 text-yellow-500" />;
    return <AlertCircle className="w-6 h-6 text-red-500" />;
  };

  const careerPaths = [
    {
      title: "Cybercrime Law Consultant",
      description: "Advise organizations on cybersecurity compliance and legal frameworks",
      match: results.scores.overall >= 80 ? "Excellent Fit" : "Good Fit",
      requirements: ["J.D. or Law degree", "Cybersecurity certification", "2+ years experience"]
    },
    {
      title: "Digital Forensics Investigator", 
      description: "Investigate cybercrimes and provide expert testimony in legal proceedings",
      match: results.scores.technical >= 75 ? "Excellent Fit" : "Developing Fit",
      requirements: ["Technical background", "Forensics certification", "Legal knowledge"]
    },
    {
      title: "Compliance Officer",
      description: "Ensure organizational adherence to cybersecurity regulations and policies", 
      match: results.scores.psychometric >= 75 ? "Excellent Fit" : "Good Fit",
      requirements: ["Risk management skills", "Regulatory knowledge", "Communication skills"]
    }
  ];

  const learningPath = [
    {
      phase: "Foundation",
      duration: "3-6 months", 
      courses: ["Cyber Law Fundamentals", "Digital Privacy Basics", "Legal Research Methods"],
      status: results.scores.technical >= 70 ? "completed" : "current"
    },
    {
      phase: "Intermediate",
      duration: "6-12 months",
      courses: ["Advanced Cybersecurity Law", "Digital Forensics", "Regulatory Compliance"],
      status: results.scores.overall >= 75 ? "current" : "locked"
    },
    {
      phase: "Advanced", 
      duration: "12-18 months",
      courses: ["Expert Witness Training", "International Cyber Law", "Leadership in Legal Tech"],
      status: results.scores.overall >= 85 ? "current" : "locked"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Assessment Results</h1>
          <p className="text-xl text-muted-foreground">Your Cybercrime Law Advisor Career Analysis</p>
        </div>

        {/* Overall Recommendation */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-card via-card to-muted/30">
          <CardHeader>
            <div className="flex items-center gap-4">
              {getRecommendationIcon(results.recommendation)}
              <div>
                <CardTitle className="text-2xl">{results.recommendation}</CardTitle>
                <CardDescription>Based on your comprehensive assessment</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg mb-2">Overall Compatibility Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(results.scores.overall)}`}>
                  {results.scores.overall}%
                </p>
              </div>
              <div className="w-32">
                <Progress value={results.scores.overall} className="h-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Brain className="w-5 h-5 text-cyber-purple" />
              <CardTitle className="ml-2">Psychological Fit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`text-2xl font-bold ${getScoreColor(results.scores.psychometric)}`}>
                  {results.scores.psychometric}%
                </div>
                <Progress value={results.scores.psychometric} />
                <p className="text-sm text-muted-foreground">
                  Your personality traits and motivations align well with cybercrime law advisory roles.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Shield className="w-5 h-5 text-cyber-blue" />
              <CardTitle className="ml-2">Technical Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`text-2xl font-bold ${getScoreColor(results.scores.technical)}`}>
                  {results.scores.technical}%
                </div>
                <Progress value={results.scores.technical} />
                <p className="text-sm text-muted-foreground">
                  Your current knowledge of cyber law and technical concepts.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Target className="w-5 h-5 text-cyber-teal" />
              <CardTitle className="ml-2">WISCAR Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`text-2xl font-bold ${getScoreColor(results.scores.wiscar)}`}>
                  {results.scores.wiscar}%
                </div>
                <Progress value={results.scores.wiscar} />
                <p className="text-sm text-muted-foreground">
                  Will, Interest, Skill, Cognition, Ability to learn, and Real-world alignment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Paths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recommended Career Paths
            </CardTitle>
            <CardDescription>
              Based on your assessment results, here are the most suitable career opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {careerPaths.map((path, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{path.title}</h3>
                    <Badge variant={path.match.includes("Excellent") ? "default" : "secondary"}>
                      {path.match}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-medium">Key Requirements:</p>
                    {path.requirements.map((req, reqIndex) => (
                      <p key={reqIndex} className="text-xs text-muted-foreground">• {req}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Personalized Learning Path
            </CardTitle>
            <CardDescription>
              Structured progression to become job-ready in cybercrime law advisory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {learningPath.map((phase, index) => (
                <div key={index} className={`flex items-start gap-4 p-4 rounded-lg border ${
                  phase.status === 'completed' ? 'bg-green-50 border-green-200' :
                  phase.status === 'current' ? 'bg-blue-50 border-blue-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <div className={`p-2 rounded-full ${
                    phase.status === 'completed' ? 'bg-green-500' :
                    phase.status === 'current' ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`}>
                    {phase.status === 'completed' ? 
                      <CheckCircle className="w-4 h-4 text-white" /> :
                      <BookOpen className="w-4 h-4 text-white" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{phase.phase} Level</h3>
                      <Badge variant="outline">{phase.duration}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.courses.map((course, courseIndex) => (
                        <p key={courseIndex} className="text-sm text-muted-foreground">
                          • {course}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Full Report
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/')} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Return Home
          </Button>
          <Button variant="cyber" size="lg" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Start Learning Path
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;