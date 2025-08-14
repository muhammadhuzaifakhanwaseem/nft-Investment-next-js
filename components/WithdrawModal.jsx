import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Minus } from "lucide-react";

export default function WithdrawModal({ withdrawModalOpen, setWithdrawModalOpen, loginToken }) {
  const [methods, setMethods] = useState([]);
  const [methodId, setMethodId] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  // Load saved details from localStorage
  useEffect(() => {
    if (withdrawModalOpen) {
      // Load methods
      fetch("https://stocktitan.site/api/withdrawal/methods")
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") setMethods(data.methods);
        })
        .catch(err => console.error(err));

      // Load saved user data
      const savedData = localStorage.getItem("withdraw_account");
      if (savedData) {
        const { methodId, wallet } = JSON.parse(savedData);
        setMethodId(methodId);
        setWallet(wallet);
      }
    }
  }, [withdrawModalOpen]);

  const handleWithdraw = async () => {
    if (!methodId || !amount || !wallet) return alert("Fill all fields");
    setLoading(true);
    localStorage.setItem("withdraw_account", JSON.stringify({ methodId, wallet }));
    setIsBound(true);
    try {
      const res = await fetch("https://stocktitan.site/api/withdrawals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login_token: loginToken,
          method_id: methodId,
          amount: parseFloat(amount),
          wallet_address: wallet
        })
      });
      const data = await res.json();
      alert(data.message);
      if (data.status === "success") {
        setWithdrawModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting withdrawal");
    }
    setLoading(false);
  };

  const [isBinded, setIsBound] = useState(!!localStorage.getItem("withdraw_account"));

  const handleUnbind = () => {
    setIsBound(false);
    setMethodId("");
    setWallet("");
    localStorage.removeItem("withdraw_account");
  };

  return (
    <Dialog open={withdrawModalOpen} onOpenChange={setWithdrawModalOpen}>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-green-400/35 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Minus className="h-5 w-5 text-orange-400" />
            Withdraw Funds
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Dropdown */}
          <div>
            <Label className="text-gray-300 mb-3">Withdrawal Method</Label>
            <select
              className="w-full bg-gray-800/50 border border-gray-700 text-white p-2 rounded"
              value={methodId}
              onChange={(e) => setMethodId(e.target.value)}
              disabled={isBinded} // disable if saved
            >
              <option value="">Select method</option>
              {methods.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Instructions */}
          {methodId && (
            <div className="bg-gray-800/30 rounded-lg p-3 text-sm text-gray-300">
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    methods.find((m) => m.id === parseInt(methodId))?.withdraw_instruction || ""
                }}
              />
            </div>
          )}

          {/* Amount */}
          <div>
            <Label className="text-gray-300 mb-3">Withdrawal Amount</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Wallet Address */}
          <div>
            <Label className="text-gray-300 mb-3">Wallet / Account</Label>
            <Input
              placeholder="Enter wallet or account number"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              disabled={isBinded} // disable if saved
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => setWithdrawModalOpen(false)}
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-fuchsia-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleWithdraw}
              disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              {loading ? "Processing..." : "Withdraw"}
            </Button>
          </div>
          {isBinded ?
            <Button onClick={handleUnbind} className="bg-red-600 hover:bg-red-700 text-white">
              Unbind Withdrawal Account
            </Button> : ""
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}
