import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <div
      className={
        "flex h-min min-w-[195px] flex-col gap-y-5 bg-accent px-[15px] py-5"
      }
    >
      <div className={"flex flex-row gap-x-2.5"}>
        <Image
          width={24}
          height={24}
          alt={"Return of goods"}
          src={"icons/icon-return-of-goods_active.svg"}
        />
        <a className={"font-500 text-16 font-medium text-red"}>
          Возврат товара
        </a>
      </div>
    </div>
  );
};

export default Navbar;
