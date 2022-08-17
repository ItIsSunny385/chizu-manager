import Link from "next/link";

interface Props {
  href: string;
  name: string;
  description: string;
}

const Card = (props: Props) => {
  return (
    <div className="xl:w-1/4 md:w-1/3 sm:w-1/2 p-2">
      <Link href={props.href}>
        <a className="block border border-gray-200 p-6 rounded-lg hover:bg-gray-100">
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
            {props.name}
          </h2>
          <p className="leading-relaxed text-base">{props.description}</p>
        </a>
      </Link>
    </div>
  );
};

export default Card;
