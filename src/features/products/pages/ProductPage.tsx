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


import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchproduct} from "@/features/products/api/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import ProductTable from "../pages/ProductTable";
import ProductFilters from "../pages/ProductFilters";
import ProductStats from "../pages/ProductStats";
import ProductDialog from "../pages/ProductDialog";

export default function Productpage(){
    const dispatch=useAppDispatch();
    useEffect(() => {
        dispatch(fetchproduct());
    }, [dispatch]);
    return(
        <div className="p-4 space-y-4">
      <ProductStats />
      <ProductFilters />
      <ProductTable />
      <ProductDialog />
    </div>
    );
}