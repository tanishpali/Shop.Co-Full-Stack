import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

const CartItem = ({
  id,
  name,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,

  // optional (backend may not send)
  size = "N/A",
  color = "N/A",
}) => {
  return (
    <Card className="p-4 mb-4 border border-border">
      <div className="flex gap-4">
        {/* Product Image */}
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-lg object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback-product.png";
          }}
        />

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                {name}
              </h3>

              {/* Only show size/color if available */}
              {(size !== "N/A" || color !== "N/A") && (
                <div className="text-sm text-muted-foreground space-y-1">
                  {size !== "N/A" && <p>Size: {size}</p>}
                  {color !== "N/A" && <p>Color: {color}</p>}
                </div>
              )}
            </div>

            {/* Remove Button */}
            <Button
              variant="destructiveGhost"
              size="icon"
              onClick={() => onRemove(id)}
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">₹{price}</p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  onQuantityChange(id, Math.max(1, quantity - 1))
                }
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="w-8 text-center font-medium">
                {quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={() => onQuantityChange(id, quantity + 1)}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;




// // src/Pages/Cart/CartItem.jsx
// import { Minus, Plus, Trash2 } from "lucide-react";

// export default function CartItem({
//   id,
//   name,
//   size,
//   color,
//   price,
//   quantity,
//   image,
//   onQuantityChange,
//   onRemove,
// }) {
//   return (
//     <div className="flex items-start gap-4">
//       {/* image */}
//       <div className="w-[84px] h-[84px] rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover"
//           onError={(e) => (e.currentTarget.style.opacity = 0.2)}
//         />
//       </div>

//       {/* content */}
//       <div className="flex-1 min-w-0">
//         <div className="flex items-start justify-between gap-3">
//           <div className="min-w-0">
//             <h3 className="font-semibold text-[16px] md:text-[17px] text-black truncate">
//               {name}
//             </h3>
//             <p className="text-[13px] text-gray-500 leading-tight mt-1">Size: {size}</p>
//             <p className="text-[13px] text-gray-500 leading-tight">Color: {color}</p>

//             <p className="text-[20px] font-extrabold mt-3">${price}</p>
//           </div>

//           {/* delete */}
//           <button
//             onClick={() => onRemove(id)}
//             aria-label="Remove"
//             className="shrink-0 p-1 rounded-md text-red-500 hover:bg-red-50"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>

//         {/* qty control pill */}
//         <div className="mt-3 ml-auto w-fit bg-gray-100 rounded-full px-3 py-1 flex items-center gap-3">
//           <button
//             onClick={() => onQuantityChange(id, quantity - 1)}
//             className="h-8 w-8 grid place-items-center rounded-md bg-white border border-gray-200 hover:bg-gray-50"
//             aria-label="Decrease"
//           >
//             <Minus className="w-4 h-4" />
//           </button>
//           <span className="w-5 text-center font-semibold">{quantity}</span>
//           <button
//             onClick={() => onQuantityChange(id, quantity + 1)}
//             className="h-8 w-8 grid place-items-center rounded-md bg-white border border-gray-200 hover:bg-gray-50"
//             aria-label="Increase"
//           >
//             <Plus className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
