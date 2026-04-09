import { NavLink } from "react-router-dom";
import{
     LayoutDashboard,
  Users,
  Package,
  Folder,
  BarChart,
  Settings
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
const navItems=[
    {name:"Dashboard", path:"/", icon:LayoutDashboard},
    {name:"Products", path:"/products", icon:Package},
    {name:"Cart", path:"/cart", icon:Folder},
    {name:"Customers", path:"/customers", icon:Users},
    {name:"Analytics", path:"/analytics", icon:BarChart},
];
export default function Sidebar(){
    return(
        <aside className="h-screen w-64 border-r bg-white">
            <div className="text-red-600 font-bold h-17 flex items-center px-6 text-lg border-b">
                Gebeya

            </div>
            <ScrollArea className="h-[calc(100%-68px)]">
                <nav className="p-4 space-y-2">
                    {navItems.map((item)=>{
                        const Icon=item.icon;
                        return(
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-violet-300",
                    isActive
                      ? "bg-gray-100 font-semibold text-black border-1-4 border-black"
                      : "text-gray-600"
                                    )
                                }
                            >
                                <Icon className="h-5 w-5" />
                                {item.name}
                            </NavLink>
                        )
                    })}
                </nav>
                <div className="mt-auto p-4">
                    <NavLink
                    to="/settings"
                    className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-100",
                isActive ? "bg-gray-100 font-semibold" : "text-gray-600"
              )
            }
          >
              <Settings className="w-5 h-5" />
                Settings
          </NavLink>
                </div>
            </ScrollArea>
        </aside>
    )
}