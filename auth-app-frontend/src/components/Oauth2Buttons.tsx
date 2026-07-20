import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

function Oauth2Buttons() {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8086";

  return (
    <div className="space-y-3">
      {/* GitHub */}
      <a
        href={`${baseUrl}/oauth2/authorization/github`}
        className="block"
      >
        <Button type="button" variant="outline" className="h-12 w-full cursor-pointer">
          <FaGithub className="mr-2 h-5 w-5" />
          Continue with GitHub
        </Button>
      </a>

      {/* Google */}
      <a
        href={`${baseUrl}/oauth2/authorization/google`}
        className="block"
      >
        <Button type="button" variant="outline" className="h-12 w-full cursor-pointer">
          <FaGoogle className="mr-2 h-5 w-5" />
          Continue with Google
        </Button>
      </a>
    </div>
  );
}

export default Oauth2Buttons;