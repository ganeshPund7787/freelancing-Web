declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLMarqueeElement> & {
        behavior?: string;
        direction?: string;
        scrollamount?: string;
        loop?: number;
        width?: string;
        height?: string;
      },
      HTMLMarqueeElement
    >;
  }
}
