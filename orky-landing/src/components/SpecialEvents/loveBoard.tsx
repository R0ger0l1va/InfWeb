"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  ArrowLeft,
  ArrowRight,
  User,
  Star,
  Loader2,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import loveMessagesData from "@/src/data/specialEvents/loveMessagesData";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { LoveMessages } from "@/src/types/specialEvents/loveMessages";

// --- Types ---
interface LoveMessage {
  id: string | number;
  recipient: string;
  message: string;
  createdAt: string;
  likes?: number;
}

// --- Utils ---
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// --- Mock Data ---
const MOCK_MESSAGES: LoveMessage[] = Array.from({ length: 25 }).map((_, i) => ({
  id: `msg-${i + 1}`,
  recipient: i % 2 === 0 ? "Ana María" : "Carlos Pérez",
  message:
    i % 3 === 0
      ? "¡Gracias por ser una inspiración para todos nosotros! Tu dedicación en cada proyecto es admirable."
      : i % 3 === 1
        ? "Espero que tengas un día maravilloso lleno de alegría y éxito. ¡Te lo mereces!"
        : "Tu energía positiva contagia a todo el equipo. ¡Sigue brillando!",
  createdAt: "Hace 2 horas",
  likes: Math.floor(Math.random() * 50) + 1,
}));

// --- Constants ---
const LOVE_BG = "bg-rose-500";
const LOVE_TEXT = "text-rose-500";
const CHAT_BG_ODD = "bg-rose-500 text-white"; // Impares (Left)
const CHAT_BG_EVEN =
  "bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100"; // Pares (Right)

export default function LoveBoard() {
  const [messages, setMessages] = useState<LoveMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [likedMessages, setLikedMessages] = useState<Set<string | number>>(
    new Set(),
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load liked messages from localStorage
    const savedLikes = localStorage.getItem("orky_love_likes");
    if (savedLikes) {
      try {
        setLikedMessages(new Set(JSON.parse(savedLikes)));
      } catch (e) {
        console.error("Error parsing saved likes", e);
      }
    }

    const fetchMessages = async () => {
      try {
        const data = await loveMessagesData.getMessages();
        let formattedMessages: LoveMessage[] = [];

        if (data && data.length > 0) {
          formattedMessages = data.map((msg: LoveMessages) => ({
            id: msg.id,
            recipient: msg.destinator,
            message: msg.message,
            createdAt: formatDistanceToNow(new Date(msg.messageDate), {
              addSuffix: true,
              locale: es,
            }),
            likes: msg.likes || 0,
          }));
        } else {
          // Fallback to mock data if no data from API
          formattedMessages = MOCK_MESSAGES;
        }

        // Shuffle messages randomly every time the page is entered/reloaded
        setMessages(shuffleArray(formattedMessages));
      } catch (error) {
        console.error("Error fetching love messages:", error);
        setMessages(shuffleArray(MOCK_MESSAGES));
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Filtering
  const filteredMessages = messages.filter((msg) =>
    msg.recipient.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calcs
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMessages = filteredMessages.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top of the message container
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleLike = async (id: number | string) => {
    if (likedMessages.has(id)) return;

    try {
      const updatedMessage = await loveMessagesData.incrementLikes(id);

      // Update local state for messages
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, likes: updatedMessage.likes } : msg,
        ),
      );

      // Update liked messages set and localStorage
      const newLiked = new Set(likedMessages);
      newLiked.add(id);
      setLikedMessages(newLiked);
      localStorage.setItem(
        "orky_love_likes",
        JSON.stringify(Array.from(newLiked)),
      );
    } catch (error) {
      console.error("Error liking message:", error);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      {/* Container - Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-xl overflow-hidden backdrop-blur-md bg-white/80 dark:bg-black/40 ring-1 ring-border/50">
          {/* Header - Seasonal Event Style */}
          <div
            className={`relative ${LOVE_BG} p-5 sm:p-6 text-white overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/10" />{" "}
            {/* Texture overlay */}
            <div className="absolute -right-12 -top-12 opacity-20">
              <Heart className="w-64 h-64 rotate-12" strokeWidth={1} />
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-md animate-pulse" />
                  <Avatar className="w-16 h-16 border-2 border-white/50 shadow-lg">
                    <AvatarImage
                      src="/images/loveOrky.jpg"
                      alt="LoveOrky"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-white/20 text-white">
                      <Heart className="w-8 h-8 fill-current" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-white text-rose-600 rounded-full p-1 shadow-sm">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>

                <div className="text-center md:text-left space-y-2">
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                    Confesionario Anónimo{" "}
                    <span className="block sm:inline text-rose-100/90 text-sm sm:text-2xl md:text-3xl">
                      por el 14 de febrero
                    </span>
                    <span className="hidden md:inline mx-2 opacity-50 font-light">
                      |
                    </span>
                    <span className="block md:inline text-xs sm:text-lg md:text-xl opacity-90">
                      Ingeniería Informática
                    </span>
                  </h2>
                  <div className="text-rose-100 flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs sm:text-sm mt-1">
                    <span className="font-bold flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Buzón Anónimo
                    </span>
                    <span className="opacity-60 hidden sm:block">•</span>
                    <div className="flex items-center gap-1">
                      <span>Celebrando el</span>
                      <span className="font-bold">Amor</span>
                      <span>y la</span>
                      <span className="font-bold">Amistad</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-3 bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20 w-fit">
                  <span className="text-[10px] sm:text-xs font-medium text-white/90 uppercase tracking-widest px-2">
                    Mensajes
                  </span>
                  <div className="px-3 py-1 bg-white text-rose-600 rounded font-bold text-sm sm:text-lg shadow-sm">
                    {messages.length}
                  </div>
                </div>
                {/* Search Bar */}
                <div className="relative w-full sm:w-64 lg:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                  <input
                    type="text"
                    placeholder="Buscar destinatario..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-medium backdrop-blur-md"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Content Area - Chat Window Style */}
          <CardContent className="p-0 bg-[#e5ddd5] dark:bg-zinc-900/50 min-h-[500px] flex flex-col relative">
            {/* WhatsApp-like background pattern */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
              }}
            ></div>

            <div
              ref={scrollContainerRef}
              className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[600px] custom-scrollbar relative z-10"
            >
              {loading ? (
                <div className="h-96 flex flex-col items-center justify-center space-y-4 text-rose-500">
                  <Loader2 className="w-12 h-12 animate-spin" />
                  <p className="font-medium animate-pulse">
                    Cargando mensajes de amor...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <AnimatePresence mode="popLayout">
                    {currentMessages.length > 0 ? (
                      currentMessages.map((msg, index) => {
                        const isLeft = index % 2 === 0;
                        const isLiked = likedMessages.has(msg.id);

                        return (
                          <motion.div
                            key={msg.id}
                            layout
                            initial={{
                              opacity: 0,
                              scale: 0.9,
                              y: 10,
                              x: isLeft ? -20 : 20,
                            }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{
                              opacity: 0,
                              scale: 0.9,
                              transition: { duration: 0.2 },
                            }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`flex w-full ${isLeft ? "justify-start" : "justify-end"}`}
                          >
                            <div
                              className={`
                                    relative max-w-[85%] md:max-w-[70%] p-3 rounded-2xl shadow-sm
                                    ${isLeft ? `${CHAT_BG_ODD} rounded-tl-none` : `${CHAT_BG_EVEN} rounded-tr-none`}
                                `}
                            >
                              {/* Little triangle for speech bubble */}
                              <div
                                className={`absolute top-0 w-3 h-3 ${isLeft ? `-left-2 ${LOVE_BG}` : `-right-2 bg-white dark:bg-zinc-800`} 
                                    [clip-path:polygon(0_0,100%_0,100%_100%)] ${!isLeft && "scale-x-[-1]"}`}
                              ></div>

                              {/* Header inside bubble */}
                              <div
                                className={`flex items-center justify-between gap-4 mb-1 text-xs ${isLeft ? "text-rose-100" : "text-muted-foreground"}`}
                              >
                                <div className="flex items-center gap-1 font-bold">
                                  {isLeft ? (
                                    <User className="w-3 h-3" />
                                  ) : (
                                    <User className="w-3 h-3 text-muted-foreground" />
                                  )}
                                  <span className="font-black"> Para: </span>
                                  <span>{msg.recipient}</span>
                                </div>
                              </div>

                              {/* Message Body */}
                              <p
                                className={`text-sm leading-relaxed ${isLeft ? "text-white" : ""}`}
                              >
                                {msg.message}
                              </p>

                              {/* Footer (Time & Likes) */}
                              <div
                                className={`flex items-center justify-end gap-2 mt-1 text-[10px] ${isLeft ? "text-rose-100/70" : "text-gray-400"}`}
                              >
                                <span>{msg.createdAt}</span>
                                <button
                                  onClick={() => handleLike(msg.id)}
                                  disabled={isLiked}
                                  className={`flex items-center gap-0.5 transition-all focus:outline-none ${
                                    isLiked
                                      ? "cursor-default scale-110"
                                      : "hover:scale-110 active:scale-125"
                                  }`}
                                >
                                  <Heart
                                    className={`w-3 h-3 transition-colors ${
                                      isLiked && !isLeft
                                        ? "fill-rose-500 text-rose-500":
                                        isLiked
                                        ? "fill-white text-white":
                                         isLeft && !isLiked
                                          ? "fill-white/20 text-white hover:fill-rose-200"
                                          : "fill-gray-100 text-gray-300 hover:text-rose-500"
                                    }`}
                                  />
                                  <span
                                    className={
                                      isLiked && !isLeft
                                        ? "font-bold text-rose-500 "
                                        : isLeft && isLiked
                                          ? "font-bold text-white"
                                          : ""
                                    }
                                  >
                                    {msg.likes || 0}
                                  </span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center space-y-2 text-rose-500 opacity-60">
                        <Search className="w-12 h-12" />
                        <p className="font-medium">
                          No se encontraron mensajes para "{searchTerm}"
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t bg-white/60 dark:bg-black/60 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Mostrar</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(val: string) => {
                    setItemsPerPage(Number(val));
                    setCurrentPage(1); // Reset to page 1
                  }}
                >
                  <SelectTrigger className="w-[70px] h-8 text-xs">
                    <SelectValue placeholder="6" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
                <span>por página</span>
                <span className="ml-2 text-xs opacity-70">
                  (Encontrados: {filteredMessages.length})
                </span>
              </div>

              <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || totalPages === 0}
                  className="h-8 w-8 hover:text-rose-600"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>

                <div className="flex items-center px-2 text-sm font-medium">
                  <span className="text-rose-600 font-bold">
                    {filteredMessages.length > 0 ? currentPage : 0}
                  </span>
                  <span className="mx-1 text-muted-foreground">/</span>
                  <span>{totalPages}</span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="h-8 w-8 hover:text-rose-600"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <div className="flex items-center justify-center py-4 px-2 bg-linear-to-r from-transparent via-rose-500/10 to-transparent text-rose-600 dark:text-rose-400 text-sm font-medium italic">
            Desarrollado por Roger Oliva: Feliz jornada del amor y la amistad
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
