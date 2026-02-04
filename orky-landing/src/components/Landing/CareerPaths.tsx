"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Laptop,
  Cpu,
  Globe,
  Database,
  Shield,
  Code,
  ArrowRight,
} from "lucide-react";

const CareerPaths = () => {
  const careers = [
    {
      icon: <Laptop size={32} />,
      name: "Ingeniería Informática",
      description:
        "Formación integral en desarrollo de software, arquitectura de sistemas y gestión de proyectos.",
      color: "bg-cujae-yellow",
    },
    {
      icon: <Cpu size={32} />,
      name: "Sistemas Digitales",
      description:
        "Especialización en hardware, microprocesadores e integración de sistemas embebidos.",
      color: "bg-zinc-100",
    },
    {
      icon: <Shield size={32} />,
      name: "Ciberseguridad",
      description:
        "Protección de infraestructuras críticas y aseguramiento de la información en redes complejas.",
      color: "bg-cujae-black",
      text: "text-white",
    },
    {
      icon: <Database size={32} />,
      name: "Ciencia de Datos",
      description:
        "Análisis masivo de información e implementación de modelos de Inteligencia Artificial.",
      color: "bg-zinc-100",
    },
  ];

  return (
    <section id="carreras" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <h4 className="text-cujae-yellow font-bold uppercase tracking-widest text-sm">
              Programas Académicos
            </h4>
            <h2 className="text-4xl md:text-5xl font-bold text-cujae-black">
              Explora tu Futuro Profesional
            </h2>
          </div>
          <p className="text-zinc-500 max-w-md hidden md:block">
            Ofrecemos planes de estudio actualizados que responden a la demanda
            del mercado laboral tecnológico actual.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careers.map((career, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-3xl flex flex-col gap-6 group hover:shadow-2xl transition-all hover:-translate-y-2 ${career.color} ${career.text || "text-cujae-black"}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${career.text ? "bg-white/10" : "bg-black/5"}`}
              >
                {career.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold font-sans">{career.name}</h3>
                <p className={`text-sm opacity-70 leading-relaxed`}>
                  {career.description}
                </p>
              </div>
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-current/10">
                <span className="font-bold text-sm uppercase">Saber más</span>
                <div className="w-10 h-10 rounded-full border border-current/20 flex items-center justify-center group-hover:bg-current group-hover:text-black transition-colors">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPaths;
