// ProductDialog.tsx
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "@/features/products/api/ProductSlice";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProductDialog() {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state: any) => state.products);

  if (!selectedProduct) return null;

  return (
    <Dialog
      open={!!selectedProduct}
      onOpenChange={() => dispatch(setSelectedProduct(null))}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{selectedProduct.title}</DialogTitle>
        </DialogHeader>

        <p>{selectedProduct.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <p>Price: ${selectedProduct.price}</p>
          <p>Rating: {selectedProduct.rating}</p>
          <p>Brand: {selectedProduct.brand}</p>
          <p>Stock: {selectedProduct.stock}</p>
        </div>

        {/* Reviews */}
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Reviews</h3>
          {selectedProduct.reviews?.map((r: any, i: number) => (
            <div key={i} className="border p-3 rounded-lg">
              <p className="font-medium">{r.reviewerName}</p>
              <p className="text-sm">{r.comment}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}