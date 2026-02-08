"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Mail, Phone, MapPin, Send, Instagram } from "lucide-react";

const XIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const Footer = () => {
  return (
    <footer id="contacto" className="bg-cujae-black text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="flex flex-col gap-6 col-span-1 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-cujae-black text-xl">
                <img src="/images/orky.png" alt="orky" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg leading-tight uppercase tracking-wide">
                  Ingeniería
                </span>
                <span className="text-[10px] font-semibold text-white/50 uppercase tracking-tighter">
                  Informática CUJAE
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Profesionales en ingeniería Informática.
            </p>
            <div className="flex gap-4">
              {[
                {
                  Icon: Send,
                  href: "https://t.me/informaticaCujae",
                  label: "Telegram",
                },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/inf_cujae?igsh=OXR6NXYwMHdxZ2U1",
                  label: "Instagram",
                },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-cujae-yellow hover:text-cujae-black transition-all"
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg text-cujae-yellow">
              Enlaces Rápidos
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              {/* <Link href="#" className="hover:text-white transition-colors">
                Admisiones
              </Link> */}
              {/* <Link href="#" className="hover:text-white transition-colors">
                Planes de Estudio
              </Link> */}
              <Link
                href="https://t.me/CujaeInf_IC"
                className="hover:text-white transition-colors"
              >
                Investigación
              </Link>
              {/* <Link href="#" className="hover:text-white transition-colors">
                Postgrado
              </Link> */}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg text-cujae-yellow">Recursos</h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              {/* <Link href="#" className="hover:text-white transition-colors">
                Biblioteca Virtual
              </Link> */}
              <Link
                href="http://moodle.cujae.edu.cu"
                className="hover:text-white transition-colors"
              >
                Moodle Facultad
              </Link>
              {/* <Link href="#" className="hover:text-white transition-colors">
                Correo Institucional
              </Link> */}
              {/* <Link href="#" className="hover:text-white transition-colors">
                Secretaría Virtual
              </Link> */}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg text-cujae-yellow">Contacto</h4>
            <div className="flex flex-col gap-4 text-sm text-white/60">
              <div className="flex gap-3">
                <MapPin size={18} className="text-cujae-yellow shrink-0" />
                <span>
                  Calle 114 #11901, e/ Ciclovía y Rotonda, Marianao, La Habana,
                  Cuba.
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={18} className="text-cujae-yellow shrink-0" />
                <span>+53 5 500 4712</span>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={18} className="text-cujae-yellow shrink-0" />
                <span>rogerliva44@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs">
            © 2026 Facultad de Ingeniería Informática, CUJAE. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-8 text-xs text-white/40">
            <Link href="#" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
