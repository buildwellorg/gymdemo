import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";

export type SubscriptionStatus = "active" | "expired";

export interface Subscription {
  id: string;
  memberName: string;
  email: string;
  phone: string;
  planId: string;
  planName: string;
  billingCycle: "monthly" | "annual";
  amount: number;
  currency: "INR";
  status: SubscriptionStatus;
  isEndingSoon: boolean;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
}

const SUBSCRIPTIONS_COLLECTION = "subscriptions";

function demoSubscriptions(): Subscription[] {
  const now = new Date();
  const dateFromNow = (days: number) => {
    const date = new Date(now);
    date.setDate(date.getDate() + days);
    return date;
  };

  return [
    {
      id: "demo-renew-soon",
      memberName: "Aarav Sharma (Demo)",
      email: "aarav.demo@example.com",
      phone: "+91 90000 00001",
      planId: "basic",
      planName: "Basic",
      billingCycle: "monthly",
      amount: 1999,
      currency: "INR",
      status: "active",
      isEndingSoon: true,
      startAt: dateFromNow(-23),
      endAt: dateFromNow(7),
      createdAt: dateFromNow(-23),
    },
    {
      id: "demo-active",
      memberName: "Priya Patel (Demo)",
      email: "priya.demo@example.com",
      phone: "+91 90000 00002",
      planId: "gold",
      planName: "Gold",
      billingCycle: "monthly",
      amount: 2499,
      currency: "INR",
      status: "active",
      isEndingSoon: false,
      startAt: dateFromNow(-5),
      endAt: dateFromNow(25),
      createdAt: dateFromNow(-5),
    },
    {
      id: "demo-expired",
      memberName: "Rohan Mehta (Demo)",
      email: "rohan.demo@example.com",
      phone: "+91 90000 00003",
      planId: "basic",
      planName: "Basic",
      billingCycle: "monthly",
      amount: 1999,
      currency: "INR",
      status: "expired",
      isEndingSoon: false,
      startAt: dateFromNow(-38),
      endAt: dateFromNow(-8),
      createdAt: dateFromNow(-38),
    },
  ];
}

function toDate(value: Timestamp | Date | undefined): Date {
  return value instanceof Timestamp ? value.toDate() : value ?? new Date(0);
}

export async function createSubscription(input: {
  memberName: string;
  email: string;
  phone: string;
  planId: string;
  planName: string;
  billingCycle: "monthly" | "annual";
  amount: number;
  startAt?: Date;
  endAt?: Date;
}) {
  const startAt = input.startAt ?? new Date();
  const endAt = input.endAt ?? new Date(startAt);
  if (!input.endAt) {
    endAt.setMonth(endAt.getMonth() + (input.billingCycle === "monthly" ? 1 : 12));
  }

  const reference = getAdminDb().collection(SUBSCRIPTIONS_COLLECTION).doc();
  await reference.set({
    ...input,
    currency: "INR",
    status: "active",
    startAt,
    endAt,
    createdAt: FieldValue.serverTimestamp(),
    lastReminderKey: null,
  });

  return reference.id;
}

export async function getSubscriptions(): Promise<Subscription[]> {
  const snapshot = await getAdminDb()
    .collection(SUBSCRIPTIONS_COLLECTION)
    .orderBy("endAt", "asc")
    .get();

  if (!snapshot.docs.length && process.env.DEMO_SUBSCRIPTIONS === "true") {
    return demoSubscriptions();
  }

  return snapshot.docs.map((document) => {
    const data = document.data();
    const endAt = toDate(data.endAt);
    const daysRemaining = (endAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000);
    return {
      id: document.id,
      memberName: data.memberName,
      email: data.email,
      phone: data.phone,
      planId: data.planId,
      planName: data.planName,
      billingCycle: data.billingCycle,
      amount: data.amount,
      currency: data.currency,
      status: endAt.getTime() > Date.now() ? "active" : "expired",
      isEndingSoon: daysRemaining <= 7 && daysRemaining > 0,
      startAt: toDate(data.startAt),
      endAt,
      createdAt: toDate(data.createdAt),
    };
  });
}