import {useDispatch} from "react-redux";
import {setSelectedProduct} from "@/features/products/api/ProductSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
// } from "@/components/ui/table";
export default function ProductRow({product}:any){
    const dispatch=useDispatch();
    return(
        <tr>
      <td className="p-2">
        <div>
          <p className="font-medium">{product.title}</p>
          <p className="text-sm text-gray-500">{product.brand}</p>
        </div>
      </td>

      <td>{product.category}</td>
      <td>${product.price}</td>
      <td>{product.stock}</td>

      <td>
        <Badge variant={product.stock > 0 ? "default" : "destructive"}>
          {product.stock > 0 ? "In Stock" : "Out"}
        </Badge>
      </td>

      <td>
        <Button onClick={() => dispatch(setSelectedProduct(product))}>
          View
        </Button>
      </td>
    </tr>
  );
    
}