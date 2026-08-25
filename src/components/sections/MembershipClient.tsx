"use client";

import { useState } from "react";
import { type BillingCycle, type MembershipPlan } from "@/lib/plans";
import UpiPaymentModal from "@/components/ui/UpiPaymentModal";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function discountedPrice(price: number, discountPercent: number) {
  return Math.round(price * (1 - discountPercent / 100));
}

export default function MembershipClient({
  plans,
  discountPercent,
}: {
  plans: MembershipPlan[];
  discountPercent: number;
}) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);

  return (
    <section id="membership" className="bg-neutral-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Membership &amp; Pricing
          </h2>
          <p className="mt-4 text-neutral-400">
            Simple, transparent plans. Pick monthly flexibility or save with an annual
            commitment.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                billingCycle === "monthly"
                  ? "bg-orange-500 text-white"
                  : "text-neutral-300 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                billingCycle === "annual"
                  ? "bg-orange-500 text-white"
                  : "text-neutral-300 hover:text-white"
              }`}
            >
              Annual <span className="text-xs opacity-80">(save ~17%)</span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const originalPrice =
              billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual;
            const price = discountedPrice(originalPrice, discountPercent);

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  plan.featured
                    ? "border-orange-500 bg-neutral-900 shadow-xl shadow-orange-500/10"
                    : "border-white/10 bg-neutral-900/50"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-neutral-400">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    {formatINR(price)}
                  </span>
                  <span className="text-sm text-neutral-400">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {discountPercent > 0 && (
                  <p className="mt-1 text-sm text-neutral-500 line-through">
                    {formatINR(originalPrice)}
                  </p>
                )}

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-neutral-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-0.5 h-5 w-5 shrink-0 text-orange-500"
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
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  className={`mt-8 w-full rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                    plan.featured
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Buy Now
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedPlan && (
        <UpiPaymentModal
          onClose={() => setSelectedPlan(null)}
          planId={selectedPlan.id}
          planName={selectedPlan.name}
          amount={
            discountedPrice(
              billingCycle === "monthly"
                ? selectedPlan.priceMonthly
                : selectedPlan.priceAnnual,
              discountPercent,
            )
          }
          billingCycle={billingCycle}
        />
      )}
    </section>
  );
}
