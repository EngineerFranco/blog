import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer container>
      <div className="w-full">
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="DevFranco" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon 
              href="https://www.facebook.com/profile.php?id=100056745953659" 
              icon={BsFacebook}
              target="_blank" 
              rel="noopener noreferrer" 
            />
            <Footer.Icon 
              href="https://www.instagram.com/_jfmszxc/" 
              icon={BsInstagram}
              target="_blank" 
              rel="noopener noreferrer" 
            />
            <Footer.Icon 
              href="https://x.com/JenesFranco" 
              icon={BsTwitter}
              target="_blank" 
              rel="noopener noreferrer" 
            />
            <Footer.Icon 
              href="https://github.com/EngineerFranco?tab=repositories" 
              icon={BsGithub}
              target="_blank" 
              rel="noopener noreferrer" 
            />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterComponent;
