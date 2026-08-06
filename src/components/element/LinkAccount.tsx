"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { getAurinkoAuthUrl } from "@/lib/aurniko";
import { url } from "inspector";

const LinkAccount = () => {
  return (
    <Button
      onClick={async () => {
        const res = await getAurinkoAuthUrl("Google");
        window.location.href = url;
        console.log("🛤️ ~ page.tsx:9 ~ res:", res);
      }}
    >
      Link account
    </Button>
  );
};

export default LinkAccount;
