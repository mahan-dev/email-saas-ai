"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { getAurinkoAuthUrl } from "@/lib/aurniko";

const LinkAccount = () => {
  return (
    <Button
      onClick={async () => {
        const res = await getAurinkoAuthUrl("Google");
        console.log("🛤️ ~ page.tsx:9 ~ res:", res);
      }}
    >
      Link account
    </Button>
  );
};

export default LinkAccount;
