import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Database,
  FileText,
  Layers,
  Share2,
  Building2,
  AmpersandIcon,
  Shield,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Overview", href: "/dashboard", icon: BarChart3 },
  { name: "Census Indicators", href: "/indicators", icon: FileText },
  { name: "Registers(Coming Soon)", href: "/registers", icon: Database },
  { name: "Datasets", href: "/datasets", icon: Layers },
  { name: "Dissemination", href: "/dissemination", icon: Share2 },
  // { name: "Admin", href: "/admin", icon: Shield },
];

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-card-foreground">
                  Census Project Hub
                </span>
              </div>

              <div className="hidden md:flex space-x-6">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-card-foreground hover:bg-secondary"
                        )
                      }
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
};
