import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeftIcon, ArrowRightIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ServiceProviderSurvey = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState({
    serviceType: [],
    clientAcquisition: [],
    biggestChallenges: [],
    platformInterest: "",
    valuableFeatures: [],
    verificationImportance: "",
    paymentWillingness: "",
    preferredPayments: [],
    mobileImportance: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleMultiSelect = (field: string, value: string, checked: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const submitSurvey = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('service_provider_surveys')
        .insert({
          service_type: answers.serviceType,
          client_acquisition: answers.clientAcquisition,
          biggest_challenges: answers.biggestChallenges,
          platform_interest: answers.platformInterest,
          valuable_features: answers.valuableFeatures,
          verification_importance: answers.verificationImportance,
          payment_willingness: answers.paymentWillingness,
          preferred_payments: answers.preferredPayments,
          mobile_importance: answers.mobileImportance
        });

      if (error) {
        console.error('Error submitting survey:', error);
        toast({
          title: "Error",
          description: "Failed to submit survey. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log("Service provider survey submitted successfully:", answers);
      toast({
        title: "Survey Submitted!",
        description: "Thank you for your valuable feedback.",
      });
      navigate("/survey/complete");
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast({
        title: "Error",
        description: "Failed to submit survey. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      submitSurvey();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                What type of service do you provide? (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "Electrician",
                  "Plumber",
                  "Mover",
                  "Interior Designer",
                  "Painter",
                  "Cleaner",
                  "Landscaper",
                  "Other"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox 
                      id={option}
                      checked={(answers.serviceType as string[]).includes(option)}
                      onCheckedChange={(checked) => handleMultiSelect('serviceType', option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                How do you currently find new clients for your services? (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "Word-of-mouth referrals",
                  "Social media (Facebook, Instagram, etc.)",
                  "Online directories/marketplaces (e.g., Jiji, specialized directories)",
                  "Your own website",
                  "Paid advertising",
                  "Other"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox 
                      id={option}
                      checked={(answers.clientAcquisition as string[]).includes(option)}
                      onCheckedChange={(checked) => handleMultiSelect('clientAcquisition', option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                What are your biggest challenges in acquiring new clients online? (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "Difficulty standing out from competitors",
                  "High cost of advertising",
                  "Lack of a dedicated platform",
                  "Building trust with potential clients",
                  "Managing inquiries efficiently",
                  "Verifying client legitimacy"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox 
                      id={option}
                      checked={(answers.biggestChallenges as string[]).includes(option)}
                      onCheckedChange={(checked) => handleMultiSelect('biggestChallenges', option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                Would you be interested in joining a platform that connects you directly with homeowners, tenants, and landlords seeking home-related services?
              </Label>
              <RadioGroup 
                value={answers.platformInterest} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, platformInterest: value }))}
                className="space-y-3"
              >
                {["Yes", "No"].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                What features would be most valuable to you on a service provider marketplace profile? (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "Ability to showcase your portfolio/images",
                  "Customer reviews and ratings",
                  "Direct contact forms/messaging from clients",
                  "Availability calendar integration",
                  "Option to list specific services and pricing",
                  "Admin dashboard to track leads and inquiries",
                  "Promotional/featured listing options"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox 
                      id={option}
                      checked={(answers.valuableFeatures as string[]).includes(option)}
                      onCheckedChange={(checked) => handleMultiSelect('valuableFeatures', option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                How important is it for new service providers to be "approved" or verified by the platform to ensure credibility?
              </Label>
              <RadioGroup 
                value={answers.verificationImportance} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, verificationImportance: value }))}
                className="space-y-3"
              >
                {[
                  "Extremely important",
                  "Very important",
                  "Moderately important",
                  "Slightly important",
                  "Not important"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                Would you be willing to pay a subscription fee or for featured listings to get more visibility on such a platform?
              </Label>
              <RadioGroup 
                value={answers.paymentWillingness} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, paymentWillingness: value }))}
                className="space-y-3"
              >
                {[
                  "Yes, for subscription",
                  "Yes, for featured listings/boosted visibility",
                  "No, I prefer free options",
                  "Maybe, depends on the cost and benefits"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                How important is it to you to have a mobile-friendly way to manage your profile and leads on the platform?
              </Label>
              <RadioGroup 
                value={answers.mobileImportance} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, mobileImportance: value }))}
                className="space-y-3"
              >
                {[
                  "Extremely important",
                  "Very important",
                  "Moderately important",
                  "Slightly important",
                  "Not important"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-teal-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mr-4 hover:bg-white/50"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mr-3">
                <WrenchScrewdriverIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Service Providers Survey</h1>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Survey Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Question {currentStep}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStep()}
              
              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="bg-white/50 hover:bg-white/80"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:opacity-90 text-white"
                >
                  {isSubmitting ? "Submitting..." : (currentStep === totalSteps ? "Complete Survey" : "Next")}
                  {currentStep !== totalSteps && !isSubmitting && <ArrowRightIcon className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderSurvey;
