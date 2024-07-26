import { MessageCircle } from "lucide-react";
import WhatsAppClone from "./pages/WhatsAppClone.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "WhatsApp Clone",
    to: "/",
    icon: <MessageCircle className="h-4 w-4" />,
    page: <WhatsAppClone />,
  },
];
