"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type WalletDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "withdraw";
  onConfirm: (amount: number) => void;
};

export function WalletDialog({
  open,
  onOpenChange,
  mode,
  onConfirm,
}: WalletDialogProps) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (open) {
      setAmount("");
    }
  }, [open]);

  const handleConfirm = () => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      onConfirm(numericAmount);
      onOpenChange(false);
    }
  };

  const title = mode === "add" ? "Add Money" : "Withdraw Money";
  const description =
    mode === "add"
      ? "Enter the amount you want to add to your wallet."
      : "Enter the amount you want to withdraw from your wallet.";
  const buttonText = mode === "add" ? "Add" : "Withdraw";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              placeholder="₹0.00"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>{buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
