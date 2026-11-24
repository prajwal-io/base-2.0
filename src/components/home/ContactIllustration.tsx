import Image from "next/image";

interface ContactIllustrationProps {
  visible: boolean;
  sent: boolean;
  titleId: string;
}

/** The supplied illustration sits directly on the Contact section surface. */
export function ContactIllustration({ visible, sent, titleId }: ContactIllustrationProps) {
  return (
    <div className="contact-artwork-wrap" data-visible={visible} data-sent={sent}>
      <h2 id={titleId} className="sr-only">Contact us</h2>
      <Image
        src="/images/contact-us-artwork-cutout-v2.png"
        alt="Illustrated community member pointing to a Contact us sign"
        width={1280}
        height={667}
        priority={false}
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="contact-artwork"
      />
    </div>
  );
}
