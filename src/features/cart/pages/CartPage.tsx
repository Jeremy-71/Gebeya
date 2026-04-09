import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcart, setSelectedCart } from "../api/CartSlice";

// shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 5;

const CartPage = () => {
  const dispatch = useDispatch();
  const { carts, isLoading, isError, message } = useSelector(
    (state: any) => state.cart
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchcart() as any);
  }, [dispatch]);

  // Pagination logic
  const totalPages = Math.ceil(carts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCarts = carts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (isLoading) {
    return <div className="p-6 text-lg">Loading carts...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Error: {message}</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      {/* <div className="flex flex-col md:flex-row  md:justify-between gap-2">
        <h1 className="text-xl  font-bold">🛒 Cart List</h1>
        <span className="text-sm text-muted-foreground">
          Total: {carts.length} carts
        </span>
      </div> */}

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentCarts.map((cart: any) => (
         <Card
  key={cart.id}
  className="w-full max-w-[260px] mx-auto hover:shadow-md transition p-2"
>
  <CardHeader className="py-2 px-3">
    <div className="flex justify-between items-center">
      <CardTitle className="text-sm font-semibold">
        Cart #{cart.id}
      </CardTitle>
      <Badge className="text-xs px-2 py-0">
        {cart.totalProducts}
      </Badge>
    </div>
  </CardHeader>

  <CardContent className="space-y-2 px-3 pb-3">
    <div className="text-xs text-muted-foreground flex justify-between">
      <span>Qty</span>
      <span>{cart.totalQuantity}</span>
    </div>

    <div className="text-sm font-semibold flex justify-between">
      <span>Total</span>
      <span>${cart.total}</span>
    </div>

    {cart.products.slice(0, 1).map((p: any) => (
      <div key={p.id} className="flex items-center gap-2">
        <img
          src={p.thumbnail}
          alt={p.title}
          className="w-8 h-8 rounded object-cover"
        />
        <p className="text-xs line-clamp-1">{p.title}</p>
      </div>
    ))}

    <Button size="sm" className="h-7 text-xs w-full mt-1">
      View
    </Button>
  </CardContent>
</Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </Button>

        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            size="sm"
            variant={currentPage === index + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CartPage;