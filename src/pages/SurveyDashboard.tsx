
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartBarIcon, UserGroupIcon, BuildingOfficeIcon, HomeIcon } from '@heroicons/react/24/outline';

const SurveyDashboard = () => {
  // Fetch user surveys
  const { data: userSurveys, isLoading: userLoading } = useQuery({
    queryKey: ['userSurveys'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_surveys')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Fetch service provider surveys
  const { data: providerSurveys, isLoading: providerLoading } = useQuery({
    queryKey: ['providerSurveys'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_provider_surveys')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Fetch real estate surveys
  const { data: realEstateSurveys, isLoading: realEstateLoading } = useQuery({
    queryKey: ['realEstateSurveys'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('real_estate_surveys')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const isLoading = userLoading || providerLoading || realEstateLoading;

  // Prepare chart data
  const surveyCountData = [
    { name: 'Users', count: userSurveys?.length || 0, color: '#3B82F6' },
    { name: 'Service Providers', count: providerSurveys?.length || 0, color: '#10B981' },
    { name: 'Real Estate', count: realEstateSurveys?.length || 0, color: '#F59E0B' },
  ];

  const primaryReasonData = userSurveys?.reduce((acc: any[], survey) => {
    const reason = survey.primary_reason;
    const existing = acc.find(item => item.reason === reason);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ reason, count: 1 });
    }
    return acc;
  }, []) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <ChartBarIcon className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading survey data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Survey Analytics Dashboard</h1>
          <p className="text-lg text-gray-600">Track and analyze survey responses from users, service providers, and real estate professionals</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Surveys</CardTitle>
              <UserGroupIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{userSurveys?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Buyers & Renters</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Service Provider Surveys</CardTitle>
              <BuildingOfficeIcon className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{providerSurveys?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Service Providers</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Real Estate Surveys</CardTitle>
              <HomeIcon className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{realEstateSurveys?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Real Estate Professionals</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Survey Responses Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={surveyCountData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>User Primary Reasons</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={primaryReasonData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ reason, count }) => `${reason}: ${count}`}
                  >
                    {primaryReasonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tables */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User Surveys</TabsTrigger>
            <TabsTrigger value="providers">Service Providers</TabsTrigger>
            <TabsTrigger value="realestate">Real Estate</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>User Survey Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Primary Reason</TableHead>
                      <TableHead>Search Frequency</TableHead>
                      <TableHead>Platform Useful</TableHead>
                      <TableHead>Mobile Importance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userSurveys?.map((survey) => (
                      <TableRow key={survey.id}>
                        <TableCell>{formatDate(survey.created_at)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{survey.primary_reason}</Badge>
                        </TableCell>
                        <TableCell>{survey.search_frequency}</TableCell>
                        <TableCell>{survey.single_platform_useful}</TableCell>
                        <TableCell>{survey.mobile_importance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Service Provider Survey Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Service Types</TableHead>
                      <TableHead>Platform Interest</TableHead>
                      <TableHead>Verification Importance</TableHead>
                      <TableHead>Payment Willingness</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {providerSurveys?.map((survey) => (
                      <TableRow key={survey.id}>
                        <TableCell>{formatDate(survey.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {survey.service_type?.slice(0, 2).map((type: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                            {survey.service_type?.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{survey.service_type.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{survey.platform_interest}</TableCell>
                        <TableCell>{survey.verification_importance}</TableCell>
                        <TableCell>{survey.payment_willingness}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="realestate">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Real Estate Survey Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Primary Role</TableHead>
                      <TableHead>Platform Interest</TableHead>
                      <TableHead>Subscription Interest</TableHead>
                      <TableHead>SEO Importance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {realEstateSurveys?.map((survey) => (
                      <TableRow key={survey.id}>
                        <TableCell>{formatDate(survey.created_at)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{survey.primary_role}</Badge>
                        </TableCell>
                        <TableCell>{survey.platform_interest}</TableCell>
                        <TableCell>{survey.subscription_interest}</TableCell>
                        <TableCell>{survey.seo_importance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SurveyDashboard;