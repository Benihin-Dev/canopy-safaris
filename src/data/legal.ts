/* Privacy Policy and Terms text. Edit the words here and the popup AND the
   /privacy and /terms pages update together. */

export type LegalSection = { title: string; body: string };
export type LegalDoc = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

export const CONTACT_EMAIL = "jastanric@outlook.com";

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  updated: "November 2026",
  sections: [
    {
      title: "What we collect",
      body: "When you send a booking request we receive your name, email address, WhatsApp number, hotel or pickup place, any notes you type, and the details of what you chose (service, date, guests and extras). We do not collect payment card details on this website.",
    },
    {
      title: "How we use it",
      body: "We use your details only to check availability, send you a PDF quote, and reply to you by email or WhatsApp. We do not sell your information, and we do not share it with anyone who is not needed to run your booking.",
    },
    {
      title: "Where it is stored",
      body: "Booking requests are saved in a Google Sheet, and the PDF quote is saved in Google Drive. Both are private to us. Guest reviews shown on this site are also read from a Google Sheet.",
    },
    {
      title: "Third-party services",
      body: "Some pages play YouTube videos using YouTube's privacy-enhanced mode. The WhatsApp buttons open WhatsApp, which has its own privacy policy. Today's dollar to rupee rate is fetched by our server, so your details are never sent to the rate service.",
    },
    {
      title: "Cookies and storage",
      body: "We do not use advertising cookies or analytics. Your browser stores one small setting, your chosen currency, so the site remembers it next time.",
    },
    {
      title: "Your choices",
      body: `You can ask us to see or delete anything you sent by emailing ${CONTACT_EMAIL}.`,
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms and Conditions",
  updated: "November 2026",
  sections: [
    {
      title: "Booking requests",
      body: "Sending the booking form is a request, not a confirmed booking. We check availability, email you a PDF with every cost listed, and your booking is confirmed when you reply to us by email or WhatsApp.",
    },
    {
      title: "Prices and payment",
      body: "Prices are shown in US dollars. The rupee amount is only an approximate guide based on the day's exchange rate. Park tickets are set by the park and may change. Payment details are confirmed by our team when we reply to your booking.",
    },
    {
      title: "Changes and cancellations",
      body: "Please tell us as early as you can by email or WhatsApp if your plans change. Any cancellation or refund terms that apply to your booking are written in the PDF quote we send you.",
    },
    {
      title: "Wildlife and weather",
      body: "Safaris take place in the wild, so we cannot promise any particular sighting. Weather, park rules or park closures can change or delay a tour, and we will help you rearrange it where we can.",
    },
    {
      title: "Your safety",
      body: "Please follow your guide's instructions and the park rules at all times, stay inside the vehicle where asked, and keep a safe distance from animals. Rental guests are responsible for riding or driving safely and returning the vehicle as agreed.",
    },
    {
      title: "Using this website",
      body: "The photos, text and design on this site belong to Canopy Safaris. Please do not copy them without asking us first.",
    },
    {
      title: "Contact",
      body: `Questions about these terms? Email ${CONTACT_EMAIL}.`,
    },
  ],
};
