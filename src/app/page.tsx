"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/Dialog/Dialog";
import { NumberInput } from "~/components/NumberInput/NumberInput";
import Navbar from "~/components/Navbar/Navbar";
import ProductReturnCard from "~/components/ProductReturnCard/ProductReturnCard";
import { RadioGroup, RadioGroupItem } from "~/components/RadioGroup/RadioGroup";
import Image from "next/image";
import { Textarea } from "~/components/Textarea/Textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/Form/Form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  textInput1: z.string().min(15, {
    message: "Номер договора состоит из 12 символов",
  }),
  textInput2: z.string().min(1, {
    message: "Напишите, пожалуйста, комментарий",
  }),
  type: z.enum(["productDidntFit", "visibleDamage", "malfunction"], {
    required_error: "Вам нужно выбрать причину возврата",
  }),
  // file1: z.object({
  //   // Проверка на наличие файла.
  //   name: z.string().nonempty({ message: "Пожалуйста, выберите файл" }),
  //   // Проверка на тип файла.
  //   type: z
  //     .string()
  //     .regex(/image\/.*/)
  //     .optional()
  //     .refine(
  //       (value) => {
  //         if (value && !value.startsWith("image/")) {
  //           return false;
  //         }
  //         return true;
  //       },
  //       { message: "Пожалуйста, загрузите файл изображения" },
  //     ),
  //   // Проверка на размер файла.
  //   size: z
  //     .number()
  //     .optional()
  //     .refine(
  //       (value) => {
  //         if (value && value < 20000000) {
  //           // 2MB
  //           return false;
  //         }
  //         return true;
  //       },
  //       { message: "Размер файла должен быть не более 20MB" },
  //     ),
  // }),
  // file2: z.object({
  //   // Проверка на наличие файла.
  //   name: z.string().nonempty({ message: "Пожалуйста, выберите файл" }),
  //   // Проверка на тип файла.
  //   type: z
  //     .string()
  //     .regex(/image\/.*/)
  //     .optional()
  //     .refine(
  //       (value) => {
  //         if (value && !value.startsWith("image/")) {
  //           return false;
  //         }
  //         return true;
  //       },
  //       { message: "Пожалуйста, загрузите файл изображения" },
  //     ),
  //   // Проверка на размер файла.
  //   size: z
  //     .number()
  //     .optional()
  //     .refine(
  //       (value) => {
  //         if (value && value < 20000000) {
  //           // 2MB
  //           return false;
  //         }
  //         return true;
  //       },
  //       { message: "Размер файла должен быть не более 20MB" },
  //     ),
  // }),
});

const RefundGoodsPage: React.FC = () => {
  const [file1, setFile1] = useState<File[] | null>(null);
  const [file2, setFile2] = useState<File[] | null>(null);
  const [open, setOpen] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (file1 && file2) {
      console.log(
        `You submitted the following values: ${JSON.stringify({ ...data, ...file1, ...file2 }, null, 2)} `,
      );
      setOpen(false);
    } else {
      console.log("Пожалуйста, добавьте фотографии");
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      textInput1: "",
      textInput2: "",
      type: "productDidntFit",
    },
  });

  return (
    <main className="flex min-h-screen flex-col text-primary">
      <div className="flex flex-col gap-12 px-[15px] py-[30px] sm:flex-row sm:px-[42px] sm:py-[44px]">
        <Navbar />
        <div className={"flex flex-col gap-y-[18px]"}>
          <h1 className={"text-25 font-medium leading-6"}>Возвраты</h1>
          <div className={"flex flex-row flex-wrap gap-x-6 gap-y-4"}>
            <ProductReturnCard
              label={"Заявка на возврат от 4 марта"}
              id={"123 456 789"}
              status={"rejected"}
            />
            <ProductReturnCard
              label={"Заявка на возврат от 4 марта"}
              id={"123 456 789"}
              status={"successfull"}
            />
            <ProductReturnCard
              label={"Заявка на возврат от 4 марта"}
              id={"123 456 789"}
              status={"pending"}
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              className={
                "flex w-min whitespace-nowrap break-words rounded-[3px] bg-red px-5 py-2.5 text-14 font-medium text-white"
              }
              onClick={() => setOpen(true)}
            >
              Создать заявку на возврат
            </DialogTrigger>
            <DialogContent
              className={
                "!max-h-[820px] overflow-scroll overflow-x-hidden bg-white"
              }
            >
              <DialogHeader>
                <DialogTitle className={"pr-8 text-left !font-bold"}>
                  Укажите причину возврата
                </DialogTitle>
                <DialogDescription>
                  <Form {...form}>
                    <form
                      className={"flex flex-col gap-y-[30px] py-[30px]"}
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <FormField
                        control={form.control}
                        name="textInput1"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <NumberInput
                                type="number"
                                placeholder="Укажите номер договора"
                                onKeyDown={(e) => {
                                  if (
                                    e.key.match(/[0-9]/) ||
                                    e.key === "Backspace"
                                  ) {
                                    // @ts-ignore
                                    const value = e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );
                                    const formattedValue = value.replace(
                                      /(\d)(?=(\d{3})+(?!\d))/g,
                                      "$1 ",
                                    );
                                    // @ts-ignore
                                    e.target.value = formattedValue;
                                  } else {
                                    e.preventDefault();
                                  }
                                  4;
                                  // Ограничение до 12 символов с учетом пробелов
                                  if (
                                    // @ts-ignore
                                    e.target.value.length >= 15 &&
                                    e.key.match(/[0-9]/)
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage
                              className={
                                "!text-[0.675rem] font-medium text-red"
                              }
                            />
                          </FormItem>
                        )}
                      />
                      <div>
                        <h1 className={"text-left text-18 font-bold "}>
                          Выберите причину
                        </h1>
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  className={"pt-5"}
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormItem className="flex items-center bg-accent py-4 pl-[10px] pr-[15px] !text-12 sm:!text-14">
                                    <RadioGroupItem
                                      value="productDidntFit"
                                      id="r1"
                                    />
                                    <label
                                      htmlFor="r1"
                                      className={
                                        "!m-0 !ml-2.5 !p-0 pl-[10px] pr-[15px] text-left !text-12 text-[#666666] sm:!text-14"
                                      }
                                    >
                                      Мне не подошел товар
                                    </label>
                                  </FormItem>
                                  <FormItem className="flex items-center bg-accent py-4 pl-[10px] pr-[15px] !text-12 sm:!text-14">
                                    <RadioGroupItem
                                      value="visibleDamage"
                                      id="r2"
                                    />
                                    <label
                                      htmlFor="r2"
                                      className={
                                        "!m-0 !ml-2.5 !p-0 pl-[10px] pr-[15px] text-left !text-12 text-[#666666] sm:!text-14"
                                      }
                                    >
                                      Есть видимые повреждения
                                    </label>
                                  </FormItem>
                                  <FormItem className="-2 flex items-center bg-accent p-4 pl-[10px] pr-[15px] !text-14">
                                    <RadioGroupItem
                                      value="malfunction"
                                      id="r3"
                                    />
                                    <label
                                      htmlFor="r3"
                                      className={
                                        "!m-0 !ml-2.5 !p-0 text-left text-[#666666]"
                                      }
                                    >
                                      Не работает, плохо работает
                                    </label>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage
                                className={
                                  "!text-[0.675rem] font-medium text-red"
                                }
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className={"flex flex-col gap-y-5"}>
                        <h1 className={"text-left text-18 font-bold "}>
                          Комментарий
                        </h1>
                        <FormField
                          control={form.control}
                          name="textInput2"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Напишите комментарий"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage
                                className={
                                  "!text-[0.675rem] font-medium text-red"
                                }
                              />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className={"flex flex-col gap-y-5"}>
                        <div className={"flex flex-col gap-y-2"}>
                          <h1 className={"text-left text-18 font-bold "}>
                            Добавьте фото, чтобы подтвердить причину возврата
                          </h1>
                          <label
                            className={"text-left text-14 text-[#14121A] "}
                          >
                            В формате JPEG, PNG
                          </label>
                        </div>

                        <div
                          className={
                            "flex flex-col gap-x-6 gap-y-[5px] rounded-[8px] bg-accent p-5 sm:flex-row "
                          }
                        >
                          <Image
                            src={"/icons/icon-info.svg"}
                            width={24}
                            height={24}
                            alt={"Info"}
                            className={"self-start"}
                          />
                          <p
                            className={"text-left font-medium text-[#14121A] "}
                          >
                            Чтобы заявку одобрили, добавьте все требуемые фото.
                            Заявка может быть отклонена, если дефект получен
                            из-за неправильного использования товара.
                          </p>
                        </div>
                        <div className="flex w-full items-center justify-center bg-white">
                          <label
                            className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${file1 !== null && file1.length > 0 ? "border-red" : "border-[#1412A/20]"}  `}
                          >
                            <div
                              className="flex flex-col items-center justify-center pb-6 pt-5"
                              onDragStart={(e) => {
                                e.preventDefault();
                              }}
                              onDragLeave={(e) => {
                                e.preventDefault();
                              }}
                              onDragOver={(e) => {
                                e.preventDefault();
                              }}
                              onDrop={(e) => {
                                e.preventDefault();
                                let files = [...e.dataTransfer.files];
                                setFile1(files);
                                console.log(files);
                              }}
                            >
                              <Image
                                src={"/icons/icon-image.svg"}
                                alt={"Image of an item"}
                                width={30}
                                height={30}
                              />
                              <span className="text-14 font-semibold">
                                Товар целиком
                              </span>
                              <p className="hidden px-4 text-center text-xs text-gray-500 sm:block dark:text-gray-400">
                                {file1 && file1.length > 0
                                  ? file1.map((obj) => obj.name).join(", ")
                                  : "Выберите или перетащите файлы на устройстве"}
                              </p>
                              <p className=" px-4 text-xs text-gray-500 sm:hidden dark:text-gray-400 ">
                                {file1 && file1.length > 0
                                  ? file1.map((obj) => obj.name).join(", ")
                                  : "Выберите файлы на устройстве"}
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden h-0 w-0"
                              multiple={true}
                              onChange={(e) => {
                                e.preventDefault();
                                if (e.target.files) {
                                  let files = [...e.target.files];
                                  setFile1(files);
                                  console.log(files);
                                }
                              }}
                            />
                            {file1 !== null && file1.length > 0 && (
                              <label
                                className={
                                  "z-10 cursor-pointer pb-1 text-12 font-semibold text-red"
                                }
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  setFile1(null);
                                }}
                              >
                                Удалить файл
                              </label>
                            )}
                          </label>
                        </div>
                        <div className="flex w-full items-center justify-center bg-white">
                          <label
                            className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${file2 !== null && file2.length > 0 ? "border-red" : "border-[#1412A/20]"}  `}
                          >
                            <div
                              className="flex flex-col items-center justify-center pb-6 pt-5"
                              onDragStart={(e) => {
                                e.preventDefault();
                              }}
                              onDragLeave={(e) => {
                                e.preventDefault();
                              }}
                              onDragOver={(e) => {
                                e.preventDefault();
                              }}
                              onDrop={(e) => {
                                e.preventDefault();
                                let files = [...e.dataTransfer.files];
                                setFile2(files);
                                console.log(files);
                              }}
                            >
                              <Image
                                src={"/icons/icon-image.svg"}
                                alt={"Image of an item"}
                                width={30}
                                height={30}
                              />
                              <span className="text-14 font-semibold">
                                Дефект крупным планом
                              </span>
                              <p className="hidden px-4 text-xs text-gray-500 sm:block dark:text-gray-400 ">
                                {file2 && file2.length > 0
                                  ? file2.map((obj) => obj.name).join(", ")
                                  : "Выберите или перетащите файлы на устройстве"}
                              </p>
                              <p className=" px-4 text-xs text-gray-500 sm:hidden dark:text-gray-400 ">
                                {file2 && file2.length > 0
                                  ? file2.map((obj) => obj.name).join(", ")
                                  : "Выберите файлы на устройстве"}
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              multiple={true}
                              onChange={(e) => {
                                e.preventDefault();
                                if (e.target.files) {
                                  let files = [...e.target.files];
                                  setFile2(files);
                                  console.log(files);
                                }
                              }}
                            />
                            {file2 && (
                              <label
                                className={
                                  "cursor-pointer pb-1 text-12 font-semibold text-red"
                                }
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  setFile2(null);
                                }}
                              >
                                Удалить файл
                              </label>
                            )}
                          </label>
                        </div>
                      </div>
                      <button
                        className={
                          "rounded-[3px] bg-red p-2.5 text-14 font-medium text-white"
                        }
                        type="submit"
                      >
                        Отправить
                      </button>
                    </form>
                  </Form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
};

export default RefundGoodsPage;
