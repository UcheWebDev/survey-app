
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Wrench, Building2, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      id: "user",
      title: "Property Buyers & Renters",
      description: "Looking to buy, rent, or just browsing properties",
      icon: Users,
      route: "/survey/user",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: "service-provider",
      title: "Service Providers",
      description: "Electricians, plumbers, movers, designers, and more",
      icon: Wrench,
      route: "/survey/service-provider",
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: "real-estate",
      title: "Real Estate Professionals",
      description: "Agents, agencies, developers, and property managers",
      icon: Building2,
      route: "/survey/real-estate",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
         
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Property & Services
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Insights Survey
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Help us understand your needs in the real estate and home services market. 
            Your insights will shape the future of property search and service discovery in Nigeria.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Which best describes you?
            </h2>
            <p className="text-lg text-gray-600">
              Choose your category to get a personalized survey experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card 
                  key={type.id} 
                  className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => navigate(type.route)}
                >
                  <CardHeader className="text-center pb-4">
                   
                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                      {type.description}
                    </CardDescription>
                    <Button 
                      className={`w-full bg-gradient-to-r ${type.gradient} hover:opacity-90 text-white border-0 py-6 text-lg font-medium group-hover:shadow-lg transition-all duration-300`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(type.route);
                      }}
                    >
                      Start Survey
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-2xl mx-auto text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-fade-in">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Why Your Input Matters
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            We're building a comprehensive platform that connects property seekers with verified service providers. 
            Your responses will help us create features that truly serve your needs in the Nigerian real estate market.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              5-10 minutes
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Anonymous
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Secure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
