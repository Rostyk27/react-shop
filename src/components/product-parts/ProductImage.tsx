export default function ProductImage({
  imageSrc,
  imageAlt,
  width,
  height,
  className,
}: {
  imageSrc: string;
  imageAlt: string;
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <figure
      className={`flex overflow-hidden rounded-lg${
        className ? ' ' + className : ''
      }`}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        {...(width && { width })}
        {...(height && { height })}
        className="object-cover object-center"
      />
    </figure>
  );
}
