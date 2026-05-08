import { useRef, useState, useEffect } from "react";

const fotos = [
  "/linho/linho1.jpg",
  "/linho/linho2.jpg",
  "/linho/linho3.jpg",
  "/linho/linho4.jpg",
  "/linho/linho5.jpg",
  "/linho/linho6.jpg",
];

function CarrosselLinho() {
  const carrosselRef = useRef(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [imagemCentral, setImagemCentral] = useState(0);

  // ===== DRAG =====
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - carrosselRef.current.offsetLeft;
    scrollLeft.current = carrosselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;

    e.preventDefault();

    const x = e.pageX - carrosselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    carrosselRef.current.scrollLeft = scrollLeft.current - walk;

    calcularCentral(); // atualiza em tempo real
  };

  // ===== DETECTA IMAGEM NO CENTRO =====
  const calcularCentral = () => {
    const container = carrosselRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centro = containerRect.left + containerRect.width / 2;

    const imgs = container.querySelectorAll("img");

    let menorDistancia = Infinity;
    let indexCentral = 0;

    imgs.forEach((img, i) => {
      const rect = img.getBoundingClientRect();
      const imgCentro = rect.left + rect.width / 2;

      const distancia = Math.abs(imgCentro - centro);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        indexCentral = i;
      }
    });

    setImagemCentral(indexCentral);
  };

  useEffect(() => {
    calcularCentral();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-6">
        Tecidos Linho
      </h1>

      <div
        ref={carrosselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onScroll={calcularCentral}
        className="overflow-x-auto flex gap-4 p-4 cursor-grab active:cursor-grabbing select-none"
      >
        {fotos.map((foto, i) => {
          const ativo = i === imagemCentral;

          return (
            <img
              key={i}
              src={foto}
              draggable="false"
              alt="linho"
              className={`object-cover rounded-xl transition-all duration-300 ${
                ativo
                  ? "w-56 h-56 scale-110 z-10"
                  : "w-48 h-48 opacity-70 scale-95"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CarrosselLinho;