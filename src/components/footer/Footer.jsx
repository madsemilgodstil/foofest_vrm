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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2252.6517926981483!2d12.573703676907014!3d55.625474373037406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465254b8737420f1%3A0x9a4ee0ef5c00e9d8!2sParkeringsplads%2C%20Hannemanns%20All%C3%A9%2044D%2C%202300%20K%C3%B8benhavn!5e0!3m2!1sda!2sdk!4v1733234490603!5m2!1sda!2sdk" width="100%" height="250" style={{ marginTop: 10, border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg shadow-lg"></iframe>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-2">Social</h2>

          <div className="flex gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-500 transition duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-500 transition duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-500 transition duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-500 transition duration-300">
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
