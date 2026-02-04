"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import imagesData from "../../data/imagesData";
import { ImagesResponse } from "../../types/images";
import { io } from "socket.io-client";

const Gallery = () => {
  const [images, setImages] = useState<ImagesResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const fetchImages = async () => {
    try {
      const data = await imagesData.getImages();
      setImages(data);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();

    // Configurar WebSocket
    const socket = io("http://localhost:4000");

    socket.on("gallery_updated", () => {
      console.log("Gallery updated via WebSocket, fetching new data...");
      fetchImages();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  // Ajustar página actual si queda fuera de rango tras una eliminación
  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    } else if (totalPages === 0) {
      setCurrentPage(0);
    }
  }, [images.length, totalPages, currentPage]);

  const startIndex = currentPage * itemsPerPage;
  const currentImages = images.slice(startIndex, startIndex + itemsPerPage);

  const getGridSize = (index: number) => {
    return index === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1";
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h4 className="text-cujae-yellow font-bold uppercase tracking-widest text-sm">
              Vida en el Campus
            </h4>
            <h2 className="text-4xl md:text-5xl font-bold text-cujae-black">
              Nuestros Espacios de Aprendizaje
            </h2>
          </div>

          {totalPages > 1 && (
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                aria-label="Anterior"
                title="Anterior"
                className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-cujae-yellow transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                aria-label="Siguiente"
                title="Siguiente"
                className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-cujae-yellow transition-colors disabled:opacity-30 disabled:cursor-not-allowed group"
              >
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="h-150 flex items-center justify-center">
            <Loader2 className="animate-spin text-cujae-yellow" size={48} />
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 md:grid-rows-2 gap-4 h-auto md:h-150 relative">
            <AnimatePresence mode="wait">
              {currentImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative rounded-3xl overflow-hidden group cursor-pointer aspect-square md:aspect-auto ${getGridSize(index)} bg-zinc-100`}
                >
                  <img
                    src={img.url}
                    alt={img.originalName}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                      <ImageIcon size={20} className="text-cujae-black" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <p className="font-bold text-lg text-white drop-shadow-md">
                      {img.originalName.split(".")[0]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="h-150 flex flex-col items-center justify-center text-zinc-400 gap-4">
            <ImageIcon size={64} strokeWidth={1} />
            <p className="text-xl font-medium">No hay imágenes disponibles</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
