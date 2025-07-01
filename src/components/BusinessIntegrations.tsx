import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Search,
  Star,
  Calendar,
  Mail,
  Camera,
  Home,
  FileText,
  Truck,
  Zap,
  MessageSquare,
  Building,
  CheckCircle,
  AlertCircle,
  Settings,
  Cloud,
  Facebook,
  Users,
  MapPin,
  Phone,
  FileImage,
  Bot,
  Globe,
  Move,
  LucideIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DropResult } from "react-beautiful-dnd";

interface BusinessIntegration {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  connected: boolean;
  category:
    | "sales-crm"
    | "project-field"
    | "communication-reviews"
    | "document-storage"
    | "automation"
    | "miscellaneous";
  apiKey?: string;
  webhookUrl?: string;
  features: string[];
  order: number;
}

export const BusinessIntegrations = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<BusinessIntegration[]>([
    // Sales, CRM & Lead Management
    {
      id: "salesrabbit",
      name: "SalesRabbit",
      description: "Door-to-door sales and lead management",
      icon: Users,
      connected: false,
      category: "sales-crm",
      features: ["Lead tracking", "Door-to-door sales", "Territory management"],
      order: 0,
    },
    {
      id: "thumbtack",
      name: "Thumbtack",
      description: "Lead generation and customer matching",
      icon: Star,
      connected: false,
      category: "sales-crm",
      features: ["Lead generation", "Customer matching", "Quote requests"],
      order: 1,
    },
    {
      id: "hover",
      name: "Hover",
      description: "3D property measurements and estimates",
      icon: Home,
      connected: false,
      category: "sales-crm",
      features: [
        "3D measurements",
        "Automated estimates",
        "Material calculations",
      ],
      order: 2,
    },
    {
      id: "roofr",
      name: "Roofr",
      description: "Roofing measurement and estimation tool",
      icon: Home,
      connected: false,
      category: "sales-crm",
      features: [
        "Roof measurements",
        "Material estimates",
        "Proposal generation",
      ],
      order: 3,
    },
    {
      id: "angi",
      name: "Angi",
      description: "Lead generation and customer reviews",
      icon: Star,
      connected: false,
      category: "sales-crm",
      features: ["Lead generation", "Customer reviews", "Service requests"],
      order: 4,
    },
    {
      id: "hubspot",
      name: "HubSpot",
      description: "CRM and marketing automation platform",
      icon: Building,
      connected: true,
      category: "sales-crm",
      apiKey: "hub-key-***********",
      features: ["CRM management", "Marketing automation", "Lead scoring"],
      order: 5,
    },
    {
      id: "mailchimp-crm",
      name: "Mailchimp",
      description: "Email marketing and customer communication",
      icon: Mail,
      connected: false,
      category: "sales-crm",
      features: ["Email campaigns", "Customer lists", "Marketing automation"],
      order: 6,
    },
    {
      id: "facebook-leads",
      name: "Facebook Lead Ads",
      description: "Social media lead generation",
      icon: Facebook,
      connected: false,
      category: "sales-crm",
      features: [
        "Lead generation",
        "Social advertising",
        "Campaign management",
      ],
      order: 7,
    },
    {
      id: "forms-integration",
      name: "Form Integrations",
      description: "Jotform, Gravity Forms, Google Forms, etc.",
      icon: FileText,
      connected: false,
      category: "sales-crm",
      features: ["Form submissions", "Lead capture", "Contact forms"],
      order: 8,
    },
    {
      id: "calendly-crm",
      name: "Calendly",
      description: "Appointment scheduling and booking",
      icon: Calendar,
      connected: true,
      category: "sales-crm",
      apiKey: "cal-key-***********",
      features: [
        "Appointment booking",
        "Schedule sync",
        "Availability management",
      ],
      order: 9,
    },

    // Project & Field Management
    {
      id: "companycam",
      name: "CompanyCam",
      description: "Photo documentation and project tracking",
      icon: Camera,
      connected: true,
      category: "project-field",
      apiKey: "cc-key-***********",
      features: ["Photo organization", "Project timeline", "Client sharing"],
      order: 10,
    },
    {
      id: "eagleview",
      name: "EagleView",
      description: "Aerial imagery and property analysis",
      icon: MapPin,
      connected: false,
      category: "project-field",
      features: ["Aerial imagery", "Property analysis", "Measurement tools"],
      order: 11,
    },
    {
      id: "photo-id",
      name: "PHOTO iD by U Scope",
      description: "Professional photo documentation",
      icon: FileImage,
      connected: false,
      category: "project-field",
      features: [
        "Photo documentation",
        "Before/after shots",
        "Professional reporting",
      ],
      order: 12,
    },
    {
      id: "beacon-pro",
      name: "Beacon PRO+",
      description: "Material ordering and inventory",
      icon: Truck,
      connected: false,
      category: "project-field",
      features: ["Material ordering", "Inventory tracking", "Pricing updates"],
      order: 13,
    },
    {
      id: "qxo",
      name: "QXO (formerly Beacon)",
      description: "Building materials and supply chain",
      icon: Building,
      connected: false,
      category: "project-field",
      features: ["Material sourcing", "Supply chain", "Bulk ordering"],
      order: 14,
    },
    {
      id: "roof-hub",
      name: "Roof Hub by SRS Distribution",
      description: "Roofing materials and distribution",
      icon: Home,
      connected: false,
      category: "project-field",
      features: [
        "Roofing materials",
        "Distribution network",
        "Inventory management",
      ],
      order: 15,
    },
    {
      id: "roofle",
      name: "Roofle",
      description: "Roofing project management",
      icon: Home,
      connected: false,
      category: "project-field",
      features: ["Project management", "Material tracking", "Job scheduling"],
      order: 16,
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Calendar synchronization and scheduling",
      icon: Calendar,
      connected: true,
      category: "project-field",
      apiKey: "gcal-key-***********",
      features: ["Schedule sync", "Appointment booking", "Team calendars"],
      order: 17,
    },
    {
      id: "google-maps",
      name: "Google Maps",
      description: "Mapping and location services",
      icon: MapPin,
      connected: true,
      category: "project-field",
      apiKey: "gmap-key-***********",
      features: [
        "Route optimization",
        "Location tracking",
        "Address validation",
      ],
      order: 18,
    },

    // Communication & Reviews
    {
      id: "gmail",
      name: "Gmail",
      description: "Email communication and management",
      icon: Mail,
      connected: true,
      category: "communication-reviews",
      apiKey: "gmail-key-***********",
      features: ["Email management", "Communication tracking", "Contact sync"],
      order: 19,
    },

    // Document Management & Storage
    {
      id: "dropbox",
      name: "Dropbox",
      description: "Cloud file storage and sharing",
      icon: Cloud,
      connected: false,
      category: "document-storage",
      features: ["File storage", "Document sharing", "Version control"],
      order: 20,
    },
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Cloud storage and collaboration",
      icon: Cloud,
      connected: true,
      category: "document-storage",
      apiKey: "gdrive-key-***********",
      features: ["File storage", "Real-time collaboration", "Document sharing"],
      order: 21,
    },

    // Automation Platforms
    {
      id: "zapier",
      name: "Zapier",
      description: "Workflow automation between apps",
      icon: Zap,
      connected: true,
      category: "automation",
      apiKey: "zap-key-***********",
      features: ["App connections", "Automated workflows", "Data sync"],
      order: 22,
    },
    {
      id: "leadsbridge",
      name: "LeadsBridge",
      description: "Marketing automation and lead management",
      icon: Bot,
      connected: false,
      category: "automation",
      features: ["Lead automation", "Marketing sync", "Data integration"],
      order: 23,
    },

    // Other / Miscellaneous
    {
      id: "hailtrace",
      name: "HailTrace",
      description: "Weather and hail damage tracking",
      icon: Cloud,
      connected: false,
      category: "miscellaneous",
      features: ["Weather tracking", "Hail damage reports", "Insurance claims"],
      order: 24,
    },
    {
      id: "mysalesman",
      name: "mySalesman",
      description: "Sales management and tracking",
      icon: Users,
      connected: false,
      category: "miscellaneous",
      features: [
        "Sales tracking",
        "Performance metrics",
        "Commission management",
      ],
      order: 25,
    },
    {
      id: "microsoft-outlook",
      name: "Microsoft Outlook",
      description: "Email and calendar management",
      icon: Mail,
      connected: false,
      category: "miscellaneous",
      features: ["Email management", "Calendar sync", "Contact management"],
      order: 26,
    },
    {
      id: "xero",
      name: "Xero",
      description: "Accounting and financial management",
      icon: FileText,
      connected: false,
      category: "miscellaneous",
      features: ["Accounting", "Financial reporting", "Invoice management"],
      order: 27,
    },
    {
      id: "google-local-services",
      name: "Google Local Services Ads",
      description: "Local advertising and lead generation",
      icon: Search,
      connected: false,
      category: "miscellaneous",
      features: ["Local advertising", "Lead generation", "Service visibility"],
      order: 28,
    },
    {
      id: "google-contacts",
      name: "Google Contacts",
      description: "Contact management and synchronization",
      icon: Users,
      connected: true,
      category: "miscellaneous",
      apiKey: "gcontacts-key-***********",
      features: ["Contact sync", "Address book", "Customer management"],
      order: 29,
    },
    {
      id: "openphone",
      name: "OpenPhone",
      description: "Business phone and communication",
      icon: Phone,
      connected: false,
      category: "miscellaneous",
      features: ["Business phone", "SMS messaging", "Call management"],
      order: 30,
    },
    {
      id: "docusign",
      name: "DocuSign",
      description: "Electronic signature and document management",
      icon: FileText,
      connected: true,
      category: "miscellaneous",
      apiKey: "ds-key-***********",
      features: ["E-signatures", "Document templates", "Workflow automation"],
      order: 31,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIntegration, setSelectedIntegration] =
    useState<BusinessIntegration | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");

  const categories = [
    { id: "all", label: "All Integrations", count: integrations.length },
    {
      id: "sales-crm",
      label: "Sales, CRM & Lead Management",
      count: integrations.filter((i) => i.category === "sales-crm").length,
    },
    {
      id: "project-field",
      label: "Project & Field Management",
      count: integrations.filter((i) => i.category === "project-field").length,
    },
    {
      id: "communication-reviews",
      label: "Communication & Reviews",
      count: integrations.filter((i) => i.category === "communication-reviews")
        .length,
    },
    {
      id: "document-storage",
      label: "Document Management & Storage",
      count: integrations.filter((i) => i.category === "document-storage")
        .length,
    },
    {
      id: "automation",
      label: "Automation Platforms",
      count: integrations.filter((i) => i.category === "automation").length,
    },
    {
      id: "miscellaneous",
      label: "Other / Miscellaneous",
      count: integrations.filter((i) => i.category === "miscellaneous").length,
    },
  ];

  const filteredIntegrations =
    selectedCategory === "all"
      ? integrations.sort((a, b) => a.order - b.order)
      : integrations
          .filter((i) => i.category === selectedCategory)
          .sort((a, b) => a.order - b.order);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(filteredIntegrations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order values
    const updatedIntegrations = integrations.map((integration) => {
      const newIndex = items.findIndex((item) => item.id === integration.id);
      if (newIndex !== -1) {
        return { ...integration, order: newIndex };
      }
      return integration;
    });

    setIntegrations(updatedIntegrations);

    toast({
      title: "Order Updated",
      description: "Integration order has been saved.",
    });
  };

  const connectIntegration = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              connected: true,
              apiKey: apiKeyInput || "key-***********",
            }
          : integration,
      ),
    );
    setApiKeyInput("");
    setSelectedIntegration(null);
    toast({
      title: "Integration Connected",
      description: `Successfully connected to ${integrations.find((i) => i.id === integrationId)?.name}`,
    });
  };

  const disconnectIntegration = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === integrationId
          ? { ...integration, connected: false, apiKey: undefined }
          : integration,
      ),
    );
    toast({
      title: "Integration Disconnected",
      description: `Disconnected from ${integrations.find((i) => i.id === integrationId)?.name}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Business Tool Integrations</h2>
          <p className="text-muted-foreground">
            Connect with essential construction business tools
          </p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          {integrations.filter((i) => i.connected).length} /{" "}
          {integrations.length} Connected
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="setup">Setup & Configuration</TabsTrigger>
          <TabsTrigger value="reorder">Reorder Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Category Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Filter by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.label}
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIntegrations.map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">
                            {integration.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge
                        className={
                          integration.connected
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {integration.connected ? "Connected" : "Not Connected"}
                      </Badge>

                      <div className="text-xs text-muted-foreground">
                        <strong>Features:</strong>{" "}
                        {integration.features.join(", ")}
                      </div>

                      {integration.connected ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            Test
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              disconnectIntegration(integration.id)
                            }
                            className="flex-1"
                          >
                            Disconnect
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setSelectedIntegration(integration)}
                          className="w-full"
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="setup" className="space-y-4">
          {selectedIntegration ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <selectedIntegration.icon className="h-5 w-5" />
                  Setup {selectedIntegration.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="apiKey">API Key / Access Token</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder={`Enter your ${selectedIntegration.name} API key`}
                  />
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    <strong>Features:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    {selectedIntegration.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => connectIntegration(selectedIntegration.id)}
                    disabled={!apiKeyInput}
                  >
                    Connect
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedIntegration(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select an integration from the Overview tab to configure it
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reorder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Move className="h-5 w-5" />
                Reorder Integrations
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Drag and drop integrations to reorder them within each category
              </p>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="integrations">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {filteredIntegrations.map((integration, index) => (
                        <Draggable
                          key={integration.id}
                          draggableId={integration.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center gap-3 p-3 border rounded-lg ${
                                snapshot.isDragging
                                  ? "bg-muted"
                                  : "bg-background"
                              }`}
                            >
                              <Move className="h-4 w-4 text-muted-foreground" />
                              <integration.icon className="h-6 w-6 text-blue-600" />
                              <div className="flex-1">
                                <p className="font-medium">
                                  {integration.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {integration.description}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  integration.connected
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {integration.connected
                                  ? "Connected"
                                  : "Not Connected"}
                              </Badge>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
