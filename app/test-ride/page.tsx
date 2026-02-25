import TestRideForm from "@/components/forms/TestRideForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Test Ride | Energica Motor Company",
  description:
    "Book a free test ride on any Energica electric motorcycle at an authorised dealer near you. No commitment required.",
};

export default function TestRidePage() {
  return <TestRideForm />;
}
