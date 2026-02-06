// import { useState } from "react";
// import { Button } from "../../Components/ui/button";
// import { Card } from "../../Components/ui/card";
// import { Input } from "../../Components/ui/input";
// import  Separator  from "../../Components/ui/separator";
// import { ChevronRight, Tag } from "lucide-react";

// const OrderSummary = ({ subtotal, discount, deliveryFee, total }) => {
//   const [promoCode, setPromoCode] = useState("");

//   return (
//     <Card className="p-6 h-fit">
//       <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

//       <div className="space-y-4 mb-6">
//         <div className="flex justify-between">
//           <span className="text-muted-foreground">Subtotal</span>
//           <span className="font-medium">${subtotal}</span>
//         </div>

//         {/* <div className="flex justify-between">
//           <span className="text-muted-foreground">Discount (-20%)</span>
//           <span className="font-medium text-destructive">-${discount}</span>
//         </div> */}


//         <div className="flex justify-between">
//   <span className="text-muted-foreground">Discount (-20%)</span>
//   <span className="font-medium text-red-500">-${discount}</span>
// </div>


//         <div className="flex justify-between">
//           <span className="text-muted-foreground">Delivery Fee</span>
//           <span className="font-medium">${deliveryFee}</span>
//         </div>

//         <Separator />

//         <div className="flex justify-between text-lg font-semibold">
//           <span>Total</span>
//           <span>${total}</span>
//         </div>
//       </div>

//       {/* Promo Code Section */}
//       <div className="mb-6">
//         <div className="flex gap-2">
//           <div className="relative flex-1">
//             <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Add promo code"
//               value={promoCode}
//               onChange={(e) => setPromoCode(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//            <Button className="bg-black text-white rounded px-6 py-2 hover:bg-gray-900 focus:outline-none">
//           Apply
//               </Button>


//         </div>
//       </div>

//       {/* Checkout Button */}
//       <Button className="w-full text-base font-semibold py-3 bg-primary hover:bg-primary/90">
//         Go to Checkout
//         <ChevronRight className="ml-2 h-4 w-4" />
//       </Button>
//     </Card>
//   );
// };
// export default OrderSummary;




// src/Pages/Cart/OrderSummary.jsx
import { useState } from "react";
import { ChevronRight, Tag } from "lucide-react";

export default function OrderSummary({ subtotal, discount, deliveryFee, total }) {
  const [promo, setPromo] = useState("");

  return (
    <div className="bg-white border border-gray-200 rounded-[18px] p-5 md:p-6 shadow-sm">
      <h2 className="text-[18px] md:text-[20px] font-extrabold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        <Row label="Subtotal" value={`₹${subtotal}`} />
        <Row label="Discount (-20%)" value={`-₹${discount}`} valueClass="text-red-500" />
        <Row label="Delivery Fee" value={`₹${deliveryFee}`} />
        <hr className="my-4 border-gray-200" />
        <Row label="Total" value={`₹${total}`} strong />
      </div>

      {/* promo input + apply */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Tag className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Add promo code"
            className="w-full h-[44px] bg-gray-100 rounded-full pl-9 pr-3 text-sm outline-none"
          />
        </div>
        <button
          className="h-[44px] px-5 rounded-full bg-black text-white font-semibold hover:bg-gray-900"
          type="button"
        >
          Apply
        </button>
      </div>

      {/* checkout button */}
      <button
        type="button"
        className="w-full h-[48px] rounded-full bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-900"
      >
        Go to Checkout
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function Row({ label, value, strong = false, valueClass = "" }) {
  return (
    <div className="flex items-center justify-between text-[14px]">
      <span className="text-gray-500">{label}</span>
      <span className={`${strong ? "font-extrabold text-[18px]" : "font-semibold"} ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}
