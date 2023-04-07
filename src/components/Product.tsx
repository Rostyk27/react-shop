import type IProduct from '../types';

export default function Product({
  id,
  name,
  link,
  price,
  imageSrc,
  imageAlt,
}: IProduct) {
  return (
    <div id={`pid_${id}`} className="product">
      <a href={link} className="hover:opacity-75" aria-hidden="true">
        <figure className="aspect-h-1 aspect-w-1 mb-4 w-full overflow-hidden rounded-lg bg-color-bg xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="object-cover object-center"
          />
        </figure>
      </a>

      <h3 className="mb-1">
        <a href={link} className="hover:text-color-tertiary">
          {name}
        </a>
      </h3>

      <small className="mb-2 block text-color-tertiary">{imageAlt}</small>

      <strong className="lg:text-lg">${price}</strong>
    </div>
  );
}
