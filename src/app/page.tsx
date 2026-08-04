import LinkAccount from "@/components/element/LinkAccount";
import { Button } from "@/components/ui/button";

const Home = async () => {
  return (
    <h1 className="text-red-400">
      <Button>Hi guys</Button>
      <LinkAccount />
    </h1>
  );
};

export default Home;
