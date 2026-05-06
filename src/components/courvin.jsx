import { useRef } from "react";

const fotos = [
  "/courvin/courvin1.jpg",
  "/courvin/courvin2.jpg",
  "/courvin/courvin3.jpg",
  "/courvin/courvin4.jpg",
  "/courvin/courvin5.jpg",
  "/courvin/courvin6.jpg",
];

function CarrosselCourvin() {
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
      Tecidos Courvin
    </h1>

    <div
      ref={carrosselRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="overflow-x-auto flex gap-4 p-4 cursor-grab active:cursor-grabbing select-none"
    >
      {fotos.map((foto, i) => (
        <img
          key={i}
          src={foto}
          draggable="false"
          className="w-48 h-48 object-cover rounded-xl"
          alt="Courvinu"
        />
      ))}
    </div>

  </div>
);
}

export default CarrosselCourvin;