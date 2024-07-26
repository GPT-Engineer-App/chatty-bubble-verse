import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to WhatsApp Clone</h1>
      <p className="text-xl mb-8 text-center">Experience a simplified version of WhatsApp right in your browser.</p>
      <Link to="/whatsapp">
        <Button size="lg">
          Start Chatting
        </Button>
      </Link>
    </div>
  );
};

export default Index;
