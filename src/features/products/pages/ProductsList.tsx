'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductsResponse } from '../types/productType';    

type Product = ProductsResponse["products"][0];

interface ProductsListProps {
  products: Product[];   // Pass all your products here
}

export default function ProductsList({ products }: ProductsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10">
      {/* Products Grid - Only 8 cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
        {currentProducts.map((product) => (
          <ProductCard key={product.id || product.title} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Showing info */}
      {products.length > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + productsPerPage, products.length)} of {products.length} products
        </p>
      )}
    </div>
  );
}