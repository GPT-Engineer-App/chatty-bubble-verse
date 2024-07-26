import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to WhatsApp Clone</h1>
      <p className="text-xl mb-8">Experience a simplified version of WhatsApp right in your browser.</p>
      <Link to="/whatsapp">
        <Button size="lg">
          Start Chatting
        </Button>
      </Link>
    </div>
  );
};

export default Index;
