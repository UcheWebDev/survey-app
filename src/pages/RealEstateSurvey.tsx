import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeftIcon, ArrowRightIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const RealEstateSurvey = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState({
    primaryRole: "",
    listingMethods: [],
    biggestChallenges: [],
    platformInterest: "",
    valuableFeatures: [],
    communicationImportance: "",
    subscriptionInterest: "",
    seoImportance: "",
    serviceProvidersValue: ""
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
        .from('real_estate_surveys')
        .insert({
          primary_role: answers.primaryRole,
          listing_methods: answers.listingMethods,
          biggest_challenges: answers.biggestChallenges,
          platform_interest: answers.platformInterest,
          valuable_features: answers.valuableFeatures,
          communication_importance: answers.communicationImportance,
          subscription_interest: answers.subscriptionInterest,
          seo_importance: answers.seoImportance,
          service_providers_value: answers.serviceProvidersValue
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

      console.log("Real estate survey submitted successfully:", answers);
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
                What is your primary role?
              </Label>
              <RadioGroup 
                value={answers.primaryRole} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, primaryRole: value }))}
                className="space-y-3"
              >
                {[
                  "Real Estate Agent",
                  "Real Estate Agency",
                  "Property Developer",
                  "Property Manager",
                  "Other"
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
                How do you currently list and manage your properties online? (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "Our own company website",
                  "Property portals (e.g., PropertyPro.ng, Jumia House, NPC)",
                  "Social media (Facebook, Instagram, etc.)",
                  "Online classifieds (e.g., Jiji.ng)",
                  "Offline channels (e.g., print ads, word-of-mouth)"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox 
                      id={option}
                      checked={(answers.listingMethods as string[]).includes(option)}
                      onCheckedChange={(checked) => handleMultiSelect('listingMethods', option, checked as boolean)}
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
                What are the biggest challenges you face with current online property listing platforms? (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "High listing fees",
                  "Limited visibility for listings",
                  "Poor lead quality",
                  "Difficulty managing inquiries efficiently",
                  "Lack of comprehensive listing management tools",
                  "Outdated platform features",
                  "Poor mobile experience for clients"
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
                Would you be interested in a platform that allows you to easily post and manage your property listings, with a focus on reaching both buyers/tenants and potentially connecting them with home service providers?
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
                What features would be most valuable to you in an admin dashboard for managing listings? (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "Easy property upload with images and descriptions",
                  "Tracking views and inquiries per listing",
                  "Managing lead communication",
                  "Ability to update property status (e.g., available, sold, rented)",
                  "Analytics on listing performance",
                  "Option for paid featured listings or boosted visibility"
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
                How important is it for you to have direct communication tools with potential clients (buyers, tenants)?
              </Label>
              <RadioGroup 
                value={answers.communicationImportance} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, communicationImportance: value }))}
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
                Are you interested in subscription options that offer unlimited listings or advanced features?
              </Label>
              <RadioGroup 
                value={answers.subscriptionInterest} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, subscriptionInterest: value }))}
                className="space-y-3"
              >
                {[
                  "Yes",
                  "No",
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
                How important is it that the platform has strong SEO capabilities to ensure your listings are easily found on search engines?
              </Label>
              <RadioGroup 
                value={answers.seoImportance} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, seoImportance: value }))}
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

            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                Would you find value in a platform that also offers a directory of verified home service providers for your clients (e.g., for repairs, moving, renovations)?
              </Label>
              <RadioGroup 
                value={answers.serviceProvidersValue} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, serviceProvidersValue: value }))}
                className="space-y-3"
              >
                {[
                  "Yes",
                  "No",
                  "Maybe, if it's integrated seamlessly"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-100">
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
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mr-3">
                <BuildingOffice2Icon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Real Estate Professionals Survey</h1>
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
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white"
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

export default RealEstateSurvey;
