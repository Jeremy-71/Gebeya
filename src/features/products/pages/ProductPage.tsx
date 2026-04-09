// import { UseDispatch,useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchproduct } from "../api/ProductSlice";
// import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
// import { Skeleton } from "@/components/ui/skeleton";
// const ProductPage=()=>{

//     const dispatch=useAppDispatch();

//     const {products, isLoading, isError, message, } = useAppSelector((state: any) => state.products);
    // useEffect(() => {
    //     dispatch(fetchproduct());
    // }, [dispatch]);


//     if (isLoading) return <Skeleton className="w-full h-full" />;
//     if (isError) return <div>Error loading products: {message}</div>;

//     if (!products || products.length === 0) {
//       return <div>No products found.</div>;
//     }
//  const allReviews = (products ?? []).flatMap((product: any) => product.reviews ?? []);
//     return (
//         <div>
//             <h1>Products and Reviews</h1>
//             <p>{products.length} products loaded</p>
//             <ul>
//                 {products.map((product: any) => (
//                     <li key={product.id}>${product.price?.toFixed(2) ?? "0.00"} - {product.category} {product.rating} </li>
//                 ))}
//             </ul>
//            <div>
//              <h2>Reviews</h2>
//       <ul>
//         {allReviews.map((review: any, i: number) => (
//           <li key={i}>{review.rating} - {review.comment} -{review.reviewerName}</li>
//         ))}
//       </ul>
//            </div>
//         </div>
//     );
// }
// export default ProductPage;
// 


// import { useEffect } from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {fetchproduct} from "@/features/products/api/ProductSlice";
// import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
// import ProductTable from "../pages/ProductTable";
// import ProductFilters from "../pages/ProductFilters";
// import ProductStats from "../pages/ProductStats";
// import ProductDialog from "../pages/ProductDialog";
// import ProductCard from "../pages/ProductCard";
// import  ProductsList from "../pages/ProductsList"
// import { AppDispatch, RootState } from "@/Store";

// const ProductPage = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { products, isLoading } = useSelector(
//     (state: RootState) => state.products
//   );

//   useEffect(() => {
//     dispatch(fetchproduct());
//   }, [dispatch]);

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
        
//       ))}
      
//     </div>
//   );
// };

// export default ProductPage;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproduct } from "@/features/products/api/ProductSlice";
import { AppDispatch, RootState } from "@/Store";

import ProductCard from "../pages/ProductCard";   // Your updated ProductCard
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, isLoading, isError, message } = useSelector(
    (state: RootState) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(fetchproduct());
  }, [dispatch]);

  if (isLoading) return <p className="text-center py-10 text-lg">Loading products...</p>;
  if (isError) return <div className="text-red-500 text-center py-10">Error: {message}</div>;
  if (!products || products.length === 0) {
    return <div className="text-center py-10">No products found.</div>;
  }

  // Pagination Logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8 px-4">
      {/* Header */}
     

      {/* Products Grid with Fixed Height Cards - 8 per page */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {currentProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50 cursor-not-allowed" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        isActive={pageNum === currentPage}
                        onClick={() => handlePageChange(pageNum)}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50 cursor-not-allowed" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductPage;





