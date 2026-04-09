// import { Card,CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Heart,ShoppingCart,Star } from "lucide-react";
// import { ProductsResponse } from "../types/productType";
// type Product =ProductsResponse["products"][0];
// export  const  ProductCard = ({ product }: { product: Product }) =>{
//     return(
//         <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition max-w-[220px]">
            
// <div className=" relative h-36 bg-gray-50 flex items-center justify-center overflow-hidden ">
//  <img
//     src={product.images?.[0]}
//     alt={product.title}
//     className="max-h-full max-w-full object-contain p-3 group-hover:scale-105 transition"
//   />


// <Button 
//  size="icon"
// variant="ghost"
// className="absolute top-2 right-2 bg-white rounde-full shadow"
// >
// <Heart className="w-4 h-4"/>
// </Button>
// </div>
// <CardContent className="p-3 space-y-2">
        
//         {/* Title */}
//         <h3 className="text-xs font-medium line-clamp-2 ">
//           {product.title}
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-1 text-xs text-muted-foreground">
//           <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
//           <span>{product.rating}</span>
//           <span>({product.reviews.length} reviews)</span>
//         </div>

//         {/* Price */}
//         <div className="flex items-center justify-between pt-2">
//           <span className="font-semibold text-base">
//             ${product.price}
//           </span>

//           <Button size="sm" className="h-8 w-8">
//             <ShoppingCart className="w-4 h-4" />
//           </Button>
//         </div>
//       </CardContent>
//         </Card>
//     )

// }
// export default ProductCard;






// 



import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { ProductsResponse } from "../types/productType";

type Product = ProductsResponse["products"][0];

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="group h-full flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200 bg-white">
      
      {/* Image */}
      <div className="relative h-20 bg-gray-50 flex items-center justify-center overflow-hidden p-1.5 flex-shrink-0">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-1 right-1 bg-white/90 hover:bg-white shadow-sm rounded-full h-5 w-5"
        >
          <Heart className="w-3 h-3 text-gray-500 hover:text-red-500 transition-colors" />
        </Button>
      </div>

      {/* Content */}
      <CardContent className="p-2.5 flex-1 flex flex-col">
        <h3 className="font-medium text-[10px] leading-tight line-clamp-2 text-gray-900 mb-2 flex-1">
          {product.title}
        </h3>

        <div className="flex items-center gap-0.5 text-[9px] text-gray-500 mb-3">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="font-medium text-gray-700">
            {product.rating?.toFixed(1) || "0.0"}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-sm text-gray-900">
            ${product.price}
          </span>
          <Button
            size="sm"
            className="h-6 w-6 rounded-md bg-black hover:bg-gray-900"
          >
            <ShoppingCart className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
 

export default ProductCard;