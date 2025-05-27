import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeftIcon, ArrowRightIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const UserSurvey = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState({
    primaryReason: "",
    searchFrequency: "",
    importantFilters: [],
    struggledWithProviders: "",
    mainChallenges: [],
    singlePlatformUseful: "",
    mobileImportance: "",
    preferredCommunication: [],
    usefulFeatures: [],
    currentPlatforms: ""
  });

  const totalSteps = 5;
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
        .from('user_surveys')
        .insert({
          primary_reason: answers.primaryReason,
          search_frequency: answers.searchFrequency,
          important_filters: answers.importantFilters,
          struggled_with_providers: answers.struggledWithProviders,
          main_challenges: answers.mainChallenges,
          single_platform_useful: answers.singlePlatformUseful,
          mobile_importance: answers.mobileImportance,
          preferred_communication: answers.preferredCommunication,
          useful_features: answers.usefulFeatures,
          current_platforms: answers.currentPlatforms
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

      console.log("User survey submitted successfully:", answers);
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
                What is your primary reason for visiting a real estate or home services website today?
              </Label>
              <RadioGroup 
                value={answers.primaryReason} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, primaryReason: value }))}
                className="space-y-3"
              >
                {[
                  "Looking to buy a property",
                  "Looking to rent a property", 
                  "Looking to sell a property",
                  "Looking to rent out a property",
                  "Looking for a home service (e.g., electrician, plumber, mover)",
                  "Just browsing/researching",
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
                How often do you typically search for properties or home services online?
              </Label>
              <RadioGroup 
                value={answers.searchFrequency} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, searchFrequency: value }))}
                className="space-y-3"
              >
                {[
                  "Daily",
                  "A few times a week",
                  "Once a week", 
                  "A few times a month",
                  "Less than once a month"
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

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                When searching for properties online, which of these filters are most important to you? (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "Location",
                  "Price range",
                  "Property type (e.g., apartment, house, land)",
                  "Number of bedrooms/bathrooms",
                  "Amenities (e.g., swimming pool, gym)",
                  "Property status (e.g., for sale, for rent)",
                  "Property size"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox 
                      id={option}
                      checked={(answers.importantFilters as string[]).includes(option)}
                      onCheckedChange={(checked) => handleMultiSelect('importantFilters', option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                Have you ever struggled to find reliable or verified service providers for your home needs?
              </Label>
              <RadioGroup 
                value={answers.struggledWithProviders} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, struggledWithProviders: value }))}
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

            {answers.struggledWithProviders === "Yes" && (
              <div>
                <Label className="text-lg font-medium text-gray-900 mb-4 block">
                  What were the main challenges? (Select all that apply)
                </Label>
                <div className="space-y-3">
                  {[
                    "Difficulty verifying their credibility/reviews",
                    "Trouble finding available providers",
                    "Unclear pricing",
                    "Poor communication",
                    "Lack of variety/options",
                    "Other"
                  ].map((option) => (
                    <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Checkbox 
                        id={option}
                        checked={(answers.mainChallenges as string[]).includes(option)}
                        onCheckedChange={(checked) => handleMultiSelect('mainChallenges', option, checked as boolean)}
                      />
                      <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                Would you find it useful to have a single platform where you can search for both properties and verified home service providers?
              </Label>
              <RadioGroup 
                value={answers.singlePlatformUseful} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, singlePlatformUseful: value }))}
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

            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                How important is it for you that a real estate/services website is mobile-responsive and easy to use on your phone?
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

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                What communication methods do you prefer when contacting a property owner/agent or service provider? (Select all that apply)
              </Label>
              <div className="space-y-3">
                {[
                  "Contact forms",
                  "In-site messaging",
                  "Direct phone call",
                  "WhatsApp/SMS integration",
                  "Email"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox 
                      id={option}
                      checked={(answers.preferredCommunication as string[]).includes(option)}
                      onCheckedChange={(checked) => handleMultiSelect('preferredCommunication', option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="cursor-pointer flex-1">{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-lg font-medium text-gray-900 mb-4 block">
                Do you currently use any other platforms for property search or home services in Nigeria? Please specify which ones and what you like/dislike about them.
              </Label>
              <Textarea 
                placeholder="e.g., PropertyPro.ng, Jumia House, Nigeria Property Centre (NPC), Jiji.ng, etc."
                value={answers.currentPlatforms}
                onChange={(e) => setAnswers(prev => ({ ...prev, currentPlatforms: e.target.value }))}
                className="min-h-24 resize-none"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3">
                <UsersIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Property Buyers & Renters Survey</h1>
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
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
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

export default UserSurvey;
