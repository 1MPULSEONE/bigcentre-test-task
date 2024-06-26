export interface ProductReturnCardProps {
  label: string;
  id: string;
  status: "rejected" | "pending" | "successfull";
}

const ProductReturnCard: React.FC<ProductReturnCardProps> = (props) => {
  const { label, id, status } = { ...props };
  return (
    <div className={"flex flex-col gap-y-[7px] bg-accent px-[15px] py-5"}>
      <label className={"text-16 font-medium leading-5 sm:text-18"}>
        {label}
      </label>
      <label className={"text-16 font-medium leading-5 text-blue sm:text-18"}>
        {id}
      </label>
      <div
        className={`flex w-min whitespace-nowrap break-words rounded-[3px] px-[10px] py-[5px] text-14 font-medium text-white ${
          status === "rejected"
            ? "bg-red"
            : status === "pending"
              ? "bg-orange"
              : "bg-green"
        }`}
      >
        {status === "rejected"
          ? "Возврат не был выполнен"
          : status === "pending"
            ? "Заявка на возврат в обработке"
            : "Возврат был выполнен"}
      </div>
    </div>
  );
};

export default ProductReturnCard;
