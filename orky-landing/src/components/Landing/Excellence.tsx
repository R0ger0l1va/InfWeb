"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Globe2, Lightbulb } from "lucide-react";

const Excellence = () => {
  const highlights = [
    {
      icon: <GraduationCap size={24} />,
      title: "Docencia de Clase Mundial",
      description:
        "Profesores altamente calificados con grados de Doctor y Máster liderando la enseñanza.",
    },
    {
      icon: <Globe2 size={24} />,
      title: "Impacto Global",
      description:
        "Convenios internacionales y proyectos de investigación con universidades de todo el mundo.",
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Innovación Constante",
      description:
        "Fomentamos la creatividad y el desarrollo de soluciones tecnológicas de vanguardia.",
    },
  ];

  return (
    <section id="facultad" className="py-24 bg-zinc-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-4">
              <div className="h-48 bg-cujae-yellow/20 rounded-2xl" />
              <div className="h-64 bg-cujae-black rounded-2xl flex items-end p-6">
                <p className="text-white font-bold text-xl leading-snug">
                  Excelencia en <br /> Investigación
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-12">
              <div className="h-64 bg-zinc-200 rounded-2xl overflow-hidden relative group">
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-cujae-blue/10 group-hover:bg-cujae-yellow/10 transition-colors" />
              </div>
              <div className="h-48 bg-cujae-yellow rounded-2xl p-6 flex flex-col justify-between">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <CheckCircle2 size={20} />
                </div>
                <p className="text-cujae-black font-bold">100% Compromiso</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <h4 className="text-cujae-orange font-bold uppercase tracking-widest text-sm">
                Nuestra Facultad
              </h4>
              <h2 className="text-4xl md:text-5xl font-bold text-cujae-black leading-tight">
                Comprometidos con la <br />
                <span className="text-cujae-yellow bg-cujae-black px-4 inline-block transform -skew-x-6">
                  Perfección
                </span>{" "}
                Técnica
              </h2>
            </div>

            <p className="text-zinc-600 text-lg">
              La Facultad de Ingeniería Informática de la CUJAE no es solo un
              centro de estudios, es un ecosistema de innovación donde la teoría
              y la práctica convergen para resolver los desafíos del siglo XXI.
            </p>

            <div className="flex flex-col gap-6">
              {highlights.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="shrink-0 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-cujae-black group-hover:bg-cujae-yellow transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-cujae-black text-lg">
                      {item.title}
                    </h5>
                    <p className="text-zinc-500 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-fit border-b-2 border-cujae-yellow pb-1 font-bold text-cujae-black hover:text-cujae-orange hover:border-cujae-orange transition-all">
              Conoce nuestra historia
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Excellence;
