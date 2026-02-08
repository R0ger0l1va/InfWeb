"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import LoveBoard from "../SpecialEvents/loveBoard";

const FacultyEvents = () => {
  const loveMes = [
    "te amo fidel",
    "te quiero Omar",
    "Ruben me excitas",
    "Andy loco te quiero",
    "te quiero Raul",
  ];

  const events = [
    {
      date: "Oct 28",
      title: "Feria de Innovación Tecnológica",
      location: "Salón de Actos, CUJAE",
      tag: "Investigación",
    },
    {
      date: "Nov 15",
      title: "Hackathon CUJAE 2024",
      location: "Laboratorio Central de Informática",
      tag: "Competencia",
    },
    {
      date: "Dic 05",
      title: "Seminario de IA y Ética",
      location: "Aula Magna",
      tag: "Educación",
    },
  ];

  return (
    <section id="eventos" className="py-24 bg-zinc-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h4 className="text-cujae-orange font-bold uppercase tracking-widest text-sm">
            Próximos Eventos
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold text-cujae-black">
            Mantente al Día con la Facultad
          </h2>
        </div>

        <section className="py-5 bg-gradient-to-b from-white to-rose-50/50">
          <LoveBoard />
        </section>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden group hover:shadow-xl transition-shadow border border-zinc-100"
            >
              <div className="h-48 bg-zinc-200 relative">
                {/* Image Placeholder */}
                <div className="absolute top-4 left-4 bg-cujae-yellow text-cujae-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {event.tag}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-cujae-black leading-none">
                      {event.date.split(" ")[1]}
                    </div>
                    <div className="text-xs font-bold text-zinc-400 uppercase">
                      {event.date.split(" ")[0]}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-zinc-200" />
                  <h3 className="text-xl font-bold text-cujae-black group-hover:text-cujae-orange transition-colors">
                    {event.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-2 text-zinc-500 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    9:00 AM - 4:00 PM
                  </div>
                </div>

                <button className="flex items-center gap-2 text-cujae-black font-bold text-sm group/btn">
                  Ver detalles{" "}
                  <ArrowUpRight
                    size={18}
                    className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-cujae-black text-white px-10 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all">
            Ver Calendario Completo
          </button>
        </div>
      </div>
    </section>
  );
};

export default FacultyEvents;
