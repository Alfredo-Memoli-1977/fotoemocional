import { FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="flex rounded-b-lg bg-slate-800 p-4 text-white items-center justify-center gap-5">
      <span>© 2026 fotoEmocional</span>
      <a
        href="https://www.instagram.com/fotoEmocional"
        target="_blank"
        aria-label="Instagram"
        className="flex size-12 items-center justify-center rounded-full bg-black text-2xl transition-all duration-200 hover:-translate-y-2 hover:scale-110 hover:bg-white"
      >
        {/* <i className="bx bxl-instagram"></i> */}
        <FaInstagram className="text-white text-2xl hover:text-pink-500" />
      </a>
    </footer>
  );
};
