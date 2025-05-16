import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to: string;
}

export const BackButton = ({ to }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to, {replace: true})}
      className="flex items-center text-sm font-medium hover:underline hover:bg-gray-50 hover:scale-105 p-3"
    >
      <ArrowLeft className="mr-1" />
      Back
    </button>
  );
};
