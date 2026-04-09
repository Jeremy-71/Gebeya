import {useSelector} from "react-redux"
import ProductRow from "@/features/products/pages/ProductRow";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
export default function ProductTable(){
    const {products}=useSelector((state:any)=>state.products);
    return (
    <Table>
      <TableHeader>
        <TableRow>
           <TableHead>Image</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((p: any) => (
          <ProductRow key={p.id} product={p} />
        ))}
      </TableBody>
    </Table>
  );
}