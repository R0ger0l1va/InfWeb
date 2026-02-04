"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question:
        "¿Cuáles son los requisitos de ingreso para Ingeniería Informática?",
      answer:
        "Los aspirantes deben haber concluido el bachillerato y realizar los exámenes de ingreso nacionales (Matemática, Español e Historia). Los cupos se otorgan según el escalafón nacional.",
    },
    {
      question: "¿La facultad cuenta con laboratorios especializados?",
      answer:
        "Sí, contamos con más de 15 laboratorios equipados con tecnología moderna para redes, inteligencia artificial, desarrollo de software y sistemas digitales.",
    },
    {
      question: "¿Existen programas de intercambio para estudiantes?",
      answer:
        "La facultad mantiene convenios con universidades en Europa, América Latina y Asia, permitiendo estancias de investigación y semestres de intercambio para estudiantes destacados.",
    },
    {
      question: "¿Cuál es la duración de la carrera?",
      answer:
        "La carrera de Ingeniería Informática (Plan E) tiene una duración de 4 años, diseñados para una formación intensiva y práctica.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h4 className="text-cujae-orange font-bold uppercase tracking-widest text-sm">
            Preguntas Frecuentes
          </h4>
          <h2 className="text-4xl font-bold text-cujae-black">
            Resolvemos tus Dudas
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-zinc-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-cujae-black md:text-lg">
                  {faq.question}
                </span>
                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? "bg-cujae-black text-white" : "bg-zinc-100 text-zinc-400"}`}
                >
                  {openIndex === index ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-zinc-500 leading-relaxed border-t border-zinc-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
