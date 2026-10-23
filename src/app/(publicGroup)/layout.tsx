
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

interface PublicGroupLayoutProps {
  children: React.ReactNode;
}

const PublicGroupLayout = ({ children }: PublicGroupLayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />

    </>
  );
};

export default PublicGroupLayout;
