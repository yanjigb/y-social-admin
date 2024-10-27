import clsx from "clsx";

interface Props {
  className?: string;
  content: string;
}

export default function AppMarquee(props: Props) {
  const { className, content } = props;

  return (
    <marquee className={clsx("overflow-hidden bg-primary/10 text-base rounded flex items-center p-2 mt-4", className)}>
      {content}
    </marquee>
  );
}

