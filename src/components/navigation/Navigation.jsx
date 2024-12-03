import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex justify-between py-4 max-w-7xl mx-auto">
      <div className="flex space-x-6">
        <Link href="/">Home</Link>
        <Link href="/pages/artist">Artist</Link>
        <Link href="/pages/program">Program</Link>
        <Link href="/pages/booking">Booking</Link>
        <Link href="/pages/info">Info</Link>
      </div>
    </div>
  );
};

export default Navigation;
