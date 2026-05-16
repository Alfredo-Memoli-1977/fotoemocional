interface Props {
  title: string;
  subTitle?: string;
}

export const JumButron = ({ title, subTitle }: Props) => {
  return (
    <div className="flex flex-col text-yellow-500 items-center justify-center w-full h-auto">
      <h1 className="text-3xl items-center justify-center">{title}</h1>
      <h4 className="my-3 text-xl items-center justify-center text-center">
        {subTitle}
      </h4>
    </div>
  );
};
