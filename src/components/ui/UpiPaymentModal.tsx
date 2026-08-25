"use client";

import { useMemo, useState } from "react";

interface UpiPaymentModalProps {
  onClose: () => void;
  planId: string;
  planName: string;
  amount: number;
  billingCycle: "monthly" | "annual";
}

type Step = "scan" | "processing" | "success";

const upiApps = [
  { name: "Google Pay", initials: "GPay" },
  { name: "PhonePe", initials: "PhPe" },
  { name: "Paytm", initials: "Paytm" },
  { name: "BHIM UPI", initials: "BHIM" },
];

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Purely decorative fake QR pattern — not a real scannable code.
// Deterministic (not Math.random) so it's pure across renders/hydration.
function generateFakeQrCells(size: number): boolean[] {
  return Array.from({ length: size }, (_, i) => {
    const x = i % 11;
    const y = Math.floor(i / 11);
    return (x * 31 + y * 17 + x * y * 7) % 9 < 4;
  });
}

function FakeQrCode() {
  const cells = useMemo(() => generateFakeQrCells(121), []);

  return (
    <div className="grid aspect-square w-full max-w-[220px] grid-cols-11 gap-[2px] rounded-lg bg-white p-3">
      {cells.map((filled, i) => (
        <div
          key={i}
          className={filled ? "bg-neutral-900" : "bg-white"}
          style={{ aspectRatio: "1 / 1" }}
        />
      ))}
    </div>
  );
}

export default function UpiPaymentModal({
  onClose,
  planId,
  planName,
  amount,
  billingCycle,
}: UpiPaymentModalProps) {
  const [step, setStep] = useState<Step>("scan");
  const [upiId, setUpiId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function simulatePayment() {
    if (!memberName.trim() || !email.trim() || !phone.trim()) {
      setError("Enter your name, email, and phone number first.");
      return;
    }
    setStep("processing");
    setError(null);
    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberName,
          email,
          phone,
          planId,
          planName,
          amount,
          billingCycle,
        }),
      });
      if (!response.ok) throw new Error("Subscription could not be saved");
      setStep("success");
    } catch {
      setError("We could not save your membership. Please try again.");
      setStep("scan");
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950 p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Go back"
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-neutral-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <span className="inline-block rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-yellow-400 uppercase">
          Demo &middot; Not a real payment
        </span>

        <h3 className="mt-4 text-lg font-bold text-white">Pay with UPI</h3>
        <p className="mt-1 text-sm text-neutral-400">
          {planName} &middot; {billingCycle === "monthly" ? "Monthly" : "Annual"}
        </p>
        <p className="mt-3 text-3xl font-extrabold text-white">{formatINR(amount)}</p>

        {step === "scan" && (
          <div className="mt-6">
            <div className="space-y-3">
              <input required value={memberName} onChange={(event) => setMemberName(event.target.value)} placeholder="Full name" className="w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-2.5 text-sm text-white outline-none focus:border-orange-500" />
              <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email for renewal reminders" className="w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-2.5 text-sm text-white outline-none focus:border-orange-500" />
              <input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone number" className="w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-2.5 text-sm text-white outline-none focus:border-orange-500" />
            </div>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            <div className="flex justify-center">
              <FakeQrCode />
            </div>
            <p className="mt-3 text-center text-xs text-neutral-500">
              Scan with any UPI app
            </p>

            <div className="mt-6 grid grid-cols-4 gap-3">
              {upiApps.map((app) => (
                <button
                  key={app.name}
                  type="button"
                  onClick={simulatePayment}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-3 text-center transition-colors hover:border-orange-500/50 hover:bg-white/10"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-[10px] font-bold text-orange-400">
                    {app.initials.slice(0, 2)}
                  </span>
                  <span className="text-[10px] text-neutral-400">{app.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-neutral-500">or pay via UPI ID</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="flex-1 rounded-lg border border-white/10 bg-neutral-900 px-4 py-2.5 text-sm text-white outline-none focus:border-orange-500"
              />
              <button
                type="button"
                onClick={simulatePayment}
                disabled={!upiId}
                className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
              >
                Pay
              </button>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="mt-10 flex flex-col items-center py-6">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-orange-500" />
            <p className="mt-4 text-sm text-neutral-300">Waiting for confirmation...</p>
          </div>
        )}

        {step === "success" && (
          <div className="mt-10 flex flex-col items-center py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="mt-4 text-base font-semibold text-white">
              Payment Successful (Demo)
            </p>
            <p className="mt-1 text-center text-sm text-neutral-400">
              This is a mock confirmation. No real transaction has taken place.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/20"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
