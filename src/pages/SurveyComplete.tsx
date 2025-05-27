import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SurveyComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in">
            <CardHeader className="pb-6">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-scale-in">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Survey Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg text-gray-600 leading-relaxed">
                <p className="mb-4">
                  Thank you for taking the time to share your valuable insights
                  with us. Your feedback is crucial in helping us build a
                  platform that truly serves the Nigerian real estate and home
                  services market.
                </p>
                <p className="mb-6">
                  We'll use your responses to create features that address your
                  specific needs and challenges, making property search and
                  service discovery more efficient and reliable for everyone.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    What's Next?
                  </h3>
                </div>
                <p className="text-gray-700 text-center">
                  We'll analyze all survey responses and share key insights with
                  our community. Stay tuned for updates on our platform
                  development!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button
                  onClick={() => navigate("/")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-8 py-3"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm text-gray-500 text-center">
                  Have questions or feedback about this survey?{" "}
                  <a
                    href="mailto:uceewebdev@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    Contact us
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SurveyComplete;
