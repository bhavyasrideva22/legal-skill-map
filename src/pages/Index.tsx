import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Scale, 
  Brain, 
  Target, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  ArrowRight,
  Play
} from "lucide-react";
import heroImage from "@/assets/hero-cybercrime.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-cyber-purple" />,
      title: "Psychometric Evaluation",
      description: "Assess your personality fit, motivation, and cognitive style for cybercrime law advisory roles."
    },
    {
      icon: <Shield className="w-6 h-6 text-cyber-blue" />,
      title: "Technical Assessment", 
      description: "Evaluate your knowledge of cyber law, digital forensics, and regulatory compliance."
    },
    {
      icon: <Target className="w-6 h-6 text-cyber-teal" />,
      title: "WISCAR Analysis",
      description: "Comprehensive analysis of Will, Interest, Skill, Cognition, Ability, and Real-world alignment."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-law-gold" />,
      title: "Career Guidance",
      description: "Personalized recommendations and learning paths based on your assessment results."
    }
  ];

  const stats = [
    { label: "Assessment Duration", value: "20-30 min", icon: <Clock className="w-5 h-5" /> },
    { label: "Career Paths Analyzed", value: "5+", icon: <Users className="w-5 h-5" /> },
    { label: "Accuracy Rate", value: "95%", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-cyber-blue to-cyber-teal text-white">
              Professional Career Assessment
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-cyber-blue to-cyber-teal bg-clip-text text-transparent">
              Cybercrime Law Advisor 
              <br />
              <span className="text-4xl md:text-5xl">Readiness Assessment</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover your potential in the rapidly growing field of cybercrime law. 
              Our comprehensive assessment evaluates your psychological fit, technical readiness, 
              and career alignment to guide your journey into legal cybersecurity advisory roles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="xl" 
                variant="hero"
                onClick={() => navigate('/assessment')}
                className="flex items-center gap-3 text-lg"
              >
                <Play className="w-5 h-5" />
                Start Assessment
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="xl" variant="outline" className="text-lg">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border">
                  <div className="text-cyber-blue">
                    {stat.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Assessment Framework</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our multidisciplinary approach combines psychology, technical knowledge, 
              and career science to provide accurate guidance for your cybercrime law career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-cyber transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="mb-4 p-3 bg-muted rounded-lg w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">What You'll Discover</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 border-cyber-blue/20 hover:border-cyber-blue/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Scale className="w-6 h-6 text-cyber-blue" />
                    Career Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>• Psychological fit for legal advisory roles</p>
                  <p>• Alignment with cybercrime law specializations</p>
                  <p>• Personality match with required competencies</p>
                  <p>• Motivation and interest level analysis</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-cyber-teal/20 hover:border-cyber-teal/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-cyber-teal" />
                    Skills & Development
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>• Current technical knowledge level</p>
                  <p>• Cognitive readiness for complex problems</p>
                  <p>• Learning ability and growth potential</p>
                  <p>• Personalized skill development roadmap</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-cyber-purple/20 hover:border-cyber-purple/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-cyber-purple" />
                    Career Pathways
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>• Recommended specialization areas</p>
                  <p>• Alternative career options</p>
                  <p>• Industry role alignment</p>
                  <p>• Job market positioning advice</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-law-gold/20 hover:border-law-gold/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-law-gold" />
                    Learning Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>• Structured learning pathway</p>
                  <p>• Recommended courses and certifications</p>
                  <p>• Timeline for career readiness</p>
                  <p>• Resource recommendations</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-card via-muted/50 to-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Discover Your Potential?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the first step toward a rewarding career in cybercrime law advisory. 
            Get personalized insights and recommendations in just 20 minutes.
          </p>
          
          <Button 
            size="xl" 
            variant="hero"
            onClick={() => navigate('/assessment')}
            className="flex items-center gap-3 text-lg mx-auto"
          >
            <Play className="w-5 h-5" />
            Begin Your Assessment Journey
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-6">
            No registration required • Instant results • Completely confidential
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
