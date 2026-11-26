import { FiShield, FiUserCheck, FiTool, FiHeadphones } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

const guarantees = [
  {
    Icon: FiShield,
    title: "Liability Protection",
    text: "Every confirmed booking is backed by clear damage and liability terms for hosts and creators.",
  },
  {
    Icon: FiUserCheck,
    title: "Verified Profiles",
    text: "Hosts and creators sign in with verified accounts, so you always know who you are working with.",
  },
  {
    Icon: FiTool,
    title: "Equipment Safety",
    text: "Security deposits and listed equipment details keep gear safe and expectations clear.",
  },
  {
    Icon: FiHeadphones,
    title: "24/7 Host Support",
    text: "Stuck on a booking at midnight? Our support team is on hand around the clock.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="Host Guarantee & Creator Support"
          title="Create with confidence"
          subtitle="Protection and support for both sides of every booking."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map(({ Icon, title, text }) => (
            <div key={title} className="h-full rounded-box border border-base-300 bg-base-100 p-6">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-lg font-semibold">{title}</h3>
              <p className="text-sm opacity-80">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}