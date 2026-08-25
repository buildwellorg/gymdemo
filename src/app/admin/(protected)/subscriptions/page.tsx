import { getSubscriptions } from "@/lib/subscriptions";
import { getPricingPlans } from "@/lib/data/pricing";
import ExistingMemberForm from "@/components/admin/ExistingMemberForm";
import ReminderButton from "@/components/admin/ReminderButton";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function AdminSubscriptionsPage() {
  const [subscriptions, plans] = await Promise.all([getSubscriptions(), getPricingPlans()]);
  const active = subscriptions.filter((subscription) => subscription.status === "active");
  const endingSoon = active.filter((subscription) => subscription.isEndingSoon);
  const expired = subscriptions.filter((subscription) => subscription.status === "expired");

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Subscriptions</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Track member access and upcoming renewals.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-white">Add existing member</h2>
        <p className="mt-1 text-sm text-neutral-400">Record a membership that was sold before this system was set up.</p>
        <ExistingMemberForm plans={plans} />
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Active", active.length, "text-green-400"],
          ["Ending within 7 days", endingSoon.length, "text-orange-400"],
          ["Expired", expired.length, "text-red-400"],
        ].map(([label, count, color]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-neutral-900/50 p-5">
            <p className="text-sm text-neutral-400">{label}</p>
            <p className={`mt-2 text-3xl font-bold ${color}`}>{count}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-neutral-900/50">
        <table className="w-full min-w-190 text-left text-sm">
          <thead className="border-b border-white/10 text-xs tracking-wide text-neutral-500 uppercase">
            <tr>
              <th className="px-5 py-4">Member</th>
              <th className="px-5 py-4">Plan</th>
              <th className="px-5 py-4">Started</th>
              <th className="px-5 py-4">Ends</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td className="px-5 py-4">
                  <p className="font-semibold text-white">{subscription.memberName}</p>
                  <p className="mt-1 text-xs text-neutral-500">{subscription.email}</p>
                  <p className="text-xs text-neutral-500">{subscription.phone}</p>
                </td>
                <td className="px-5 py-4 text-neutral-300">
                  {subscription.planName}
                  <p className="mt-1 text-xs text-neutral-500">
                    {formatINR(subscription.amount)} / {subscription.billingCycle}
                  </p>
                </td>
                <td className="px-5 py-4 text-neutral-400">{formatDate(subscription.startAt)}</td>
                <td className="px-5 py-4 text-neutral-300">{formatDate(subscription.endAt)}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${subscription.status === "expired" ? "bg-red-500/10 text-red-400" : endingSoon.includes(subscription) ? "bg-orange-500/10 text-orange-400" : "bg-green-500/10 text-green-400"}`}>
                    {subscription.status === "expired" ? "Expired" : endingSoon.includes(subscription) ? "Renew soon" : "Active"}
                  </span>
                  {subscription.billingCycle === "monthly" && (subscription.status === "expired" || subscription.isEndingSoon) && (
                    <ReminderButton subscriptionId={subscription.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!subscriptions.length && <p className="px-5 py-10 text-center text-sm text-neutral-500">No subscriptions recorded yet.</p>}
      </div>
    </div>
  );
}