"use client";
import React from "react";
import { Heart } from "lucide-react";

export function WishlistButton() {
  return (
    <>
      <Heart
        color="#97fb57"
        className="absolute top-2 right-2"
        onClick={() => console.log("wish clicked")}
      />
    </>
  );
}
