import { useRef } from "react";

const fotos = [
  "/suede/suede1.jpg",
  "/suede/suede2.jpg",
  "/suede/suede3.jpg",
  "/suede/suede4.jpg",
  "/suede/suede5.jpg",
  "/suede/suede6.jpg",
];

function CarrosselSuede() {
  const carrosselRef = useRef(null);

  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - carrosselRef.current.offsetLeft;
    scrollLeft = carrosselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carrosselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // velocidade
    carrosselRef.current.scrollLeft = scrollLeft - walk;
  };

return (
  <div>

    <h1 className="text-3xl font-bold text-center mt-6">
      Tecidos Suede
    </h1>

    <div
      ref={carrosselRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
     className="overflow-x-auto flex gap-4 p-4 cursor-grab active:cursor-grabbing select-none scrollbar-hide"
    >
      {fotos.map((foto, i) => (
        <img
          key={i}
          src={foto}
          draggable="false"
          className="w-48 h-48 object-cover rounded-xl"
          alt="Suede"
        />
      ))}
    </div>

  </div>
);
}

export default CarrosselSuede;