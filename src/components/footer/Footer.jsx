import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-10 px-2 max-w-7xl mx-auto">
      <div className="grid grid-cols-3 gap-20">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-2">Pages</h2>
          <Link href="/">Home</Link>
          <Link href="/pages/artist">Artist</Link>
          <Link href="/pages/program">Program</Link>
          <Link href="/pages/booking">Booking</Link>
          <Link href="/pages/info">Info</Link>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-2">Contact</h2>
          <Link href="tel:+4512345678">Tel: +45 12 34 56 78</Link>
          <Link href="mailto:foofest@info.dk">Mail: Foofest@info.dk</Link>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.6965400706226!2d37.60481267691555!3d55.76377357308834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5aaea55555%3A0x799d9c88d68b6abe!2sTverskaya%20St%2C%2012%2C%20Moskva%2C%20Rusland%2C%20125009!5e0!3m2!1sda!2sdk!4v1733402670162!5m2!1sda!2sdk"
            width="100%"
            height="250"
            style={{ marginTop: 10, border: "0" }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-2">Social</h2>

          <div className="flex gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-500 transition duration-300"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-500 transition duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-500 transition duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-500 transition duration-300"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
      <p className="text-sm mb-4">© 2024 My Company. All rights reserved.</p>
    </div>
  );
};

export default Footer;
