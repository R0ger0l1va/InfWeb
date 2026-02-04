"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, BookOpen, Users } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-cujae-yellow/5 skew-x-12 translate-x-1/4 -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cujae-yellow/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 bg-cujae-yellow/10 px-4 py-2 rounded-full w-fit">
            <span className="w-2 h-2 bg-cujae-yellow rounded-full animate-pulse" />
            <span className="text-xs font-bold text-cujae-black/70 uppercase tracking-widest">
              Liderazgo en Tecnología
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-cujae-black leading-[1.1]">
            Potenciando Mentes en <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cujae-black via-cujae-orange to-cujae-blue">
              Ingeniería Informática
            </span>
          </h1>

          <p className="text-lg text-zinc-600 max-w-lg leading-relaxed">
            Formando a los futuros líderes tecnológicos de Cuba. Vive la
            experiencia académica más completa de la CUJAE con excelencia,
            innovación y compromiso social.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-cujae-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20">
              Explorar Carreras <ArrowRight size={20} />
            </button>
            <button className="bg-white text-cujae-black border-2 border-zinc-100 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:border-cujae-yellow transition-all hover:bg-cujae-yellow/5 group">
              <div className="w-10 h-10 bg-cujae-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={16} fill="currentColor" />
              </div>
              Ver Video
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-zinc-100 mt-4">
            <div>
              <div className="text-3xl font-bold text-cujae-black">45+</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">
                Años de Excelencia
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cujae-black">2k+</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">
                Graduados
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cujae-black">15+</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">
                Laboratorios
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          {/* Main Image Placeholder */}
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <div className="aspect-4/5 bg-zinc-100 flex items-center justify-center">
              {/* Replace with actual faculty image later */}
              <div className="flex flex-col items-center gap-4 text-zinc-300">
                <Users size={80} strokeWidth={1} />
                <span className="text-sm font-medium">
                  Imagen Facultad Informática
                </span>
              </div>
            </div>
          </div>

          {/* Floaters */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -left-10 z-20 bg-white p-4 rounded-2xl shadow-xl border border-zinc-50 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-cujae-yellow rounded-xl flex items-center justify-center text-cujae-black">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-cujae-black">
                Nuevo Plan E
              </div>
              <div className="text-[10px] text-zinc-400">
                Actualización 2024
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-10 -right-5 z-20 bg-cujae-black p-6 rounded-2xl shadow-xl flex flex-col gap-2"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-cujae-black bg-zinc-700"
                />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-cujae-black bg-cujae-yellow flex items-center justify-center text-[10px] font-bold">
                +40
              </div>
            </div>
            <div className="text-xs font-semibold text-white/70">
              Profesores de Excelencia
            </div>
          </motion.div>

          {/* Yellow Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cujae-yellow/20 blur-[120px] -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
