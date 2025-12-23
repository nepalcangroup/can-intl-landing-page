import { ShoppingCart, MousePointerClick } from "lucide-react";

export function FloatingOrderButton({ onClick }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        onClick={onClick}
        className="group perspective-500"
        style={{ perspective: "500px" }}
      >
        <div
          className="relative transition-transform duration-500 ease-in-out group-hover:[transform:rotateY(180deg)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front side */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-white"
            style={{
              backfaceVisibility: "hidden",
              backgroundColor: "var(--custom-red)",
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="font-semibold text-sm whitespace-nowrap">
              Want to place your order?
            </span>
          </div>

          {/* Back side */}
          <div
            className="absolute inset-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full shadow-lg [transform:rotateY(180deg)] text-white"
            style={{
              backfaceVisibility: "hidden",
              backgroundColor: "var(--custom-red)",
            }}
          >
            <MousePointerClick className="w-4 h-4" />
            <span className="font-semibold text-sm whitespace-nowrap">
              Click here!
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
